const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');
const { readDb, writeDb, genId } = require('../db');
const { TASKS, getTaskById } = require('../tasks');
const adminAuth = require('../adminAuth');

const router = express.Router();
const UPLOAD_DIR = path.join(__dirname, '..', '..', 'data', 'uploads');
const TOTAL_REAL_DAYS = TASKS.filter((t) => !t.pending).length;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(UPLOAD_DIR, req.params.id);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).slice(0, 10);
    cb(null, `${genId('img')}${ext}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) return cb(new Error('只能上傳圖片檔案'));
    cb(null, true);
  },
});

function stripPin(task) {
  const { pin, ...rest } = task;
  return rest;
}

// 依「已核可」的連續天數，算出目前解鎖到第幾個 seq（pending 的天自動視為通過）
function approvalSatisfied(task, submissions) {
  if (task.pending) return true;
  return submissions.some((s) => s.taskId === task.id && s.status === 'approved');
}

function unlockedSeqCount(submissions) {
  let count = 0;
  for (const task of TASKS) {
    if (!approvalSatisfied(task, submissions)) break;
    count += 1;
  }
  return count;
}

function traineeView(trainee, db) {
  const submissions = db.submissions.filter((s) => s.traineeId === trainee.id);
  const pinUnlocks = db.pinUnlocks.filter((p) => p.traineeId === trainee.id).map((p) => p.taskId);
  const seqUnlocked = unlockedSeqCount(submissions);
  const approvedRealCount = TASKS.filter((t) => !t.pending && submissions.some((s) => s.taskId === t.id && s.status === 'approved')).length;
  return {
    trainee,
    submissions,
    pinUnlocks,
    seqUnlocked: Math.min(seqUnlocked + 1, TASKS.length), // 下一天也讓夥伴看到「輸入PIN」畫面
    approvedCount: approvedRealCount,
    totalRealDays: TOTAL_REAL_DAYS,
  };
}

// ---- 課程內容（不含PIN，避免外流） ----
router.get('/tasks', (req, res) => {
  res.json({ tasks: TASKS.map(stripPin), totalRealDays: TOTAL_REAL_DAYS });
});

// ---- 審核台金鑰驗證（給前端登入畫面測試用） ----
router.get('/admin-check', adminAuth, (req, res) => {
  res.json({ ok: true });
});

// ---- 建立／取得夥伴身份（免密碼） ----
router.post('/trainees', (req, res) => {
  const { id, name } = req.body;
  if (!id || !String(name || '').trim()) return res.status(400).json({ error: '缺少 id / name' });
  const db = readDb();
  let trainee = db.trainees.find((t) => t.id === id);
  if (trainee) {
    trainee.name = String(name).trim();
  } else {
    trainee = { id: String(id), name: String(name).trim(), createdAt: new Date().toISOString() };
    db.trainees.push(trainee);
  }
  writeDb(db);
  res.json(traineeView(trainee, db));
});

router.get('/trainees/:id', (req, res) => {
  const db = readDb();
  const trainee = db.trainees.find((t) => t.id === req.params.id);
  if (!trainee) return res.status(404).json({ error: '找不到這位夥伴，請重新輸入姓名建立' });
  res.json(traineeView(trainee, db));
});

// ---- 輸入當天PIN解鎖 ----
router.post('/trainees/:id/pin', (req, res) => {
  const { taskId, pin } = req.body;
  const db = readDb();
  const trainee = db.trainees.find((t) => t.id === req.params.id);
  if (!trainee) return res.status(404).json({ error: '找不到這位夥伴' });

  const task = getTaskById(taskId);
  if (!task || task.pending) return res.status(400).json({ error: '找不到這一天的內容' });

  const { seqUnlocked } = traineeView(trainee, db);
  if (task.seq >= seqUnlocked) return res.status(403).json({ error: '這一天還沒解鎖，請先完成前一天並等待上級核可' });

  if (String(pin).trim() !== task.pin) return res.status(400).json({ error: 'PIN碼錯誤，請跟上級確認今天的PIN' });

  const already = db.pinUnlocks.some((p) => p.traineeId === trainee.id && p.taskId === task.id);
  if (!already) {
    db.pinUnlocks.push({ traineeId: trainee.id, taskId: task.id, unlockedAt: new Date().toISOString() });
    writeDb(db);
  }
  res.json({ ok: true });
});

// ---- 送出當天回饋 ----
router.post('/trainees/:id/submissions', (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });

    const db = readDb();
    const trainee = db.trainees.find((t) => t.id === req.params.id);
    if (!trainee) return res.status(404).json({ error: '找不到這位夥伴' });

    const task = getTaskById(req.body.taskId);
    if (!task || task.pending) return res.status(400).json({ error: '找不到這一天的內容' });

    const view = traineeView(trainee, db);
    if (task.seq >= view.seqUnlocked) {
      return res.status(403).json({ error: '這一天還沒解鎖，請先完成前一天並等待上級核可' });
    }
    const pinOk = view.pinUnlocks.includes(task.id);
    if (!pinOk) {
      return res.status(403).json({ error: '請先輸入今天的PIN碼，才能送出回饋' });
    }

    const note = String(req.body.note || '').trim();
    const takeaway = String(req.body.takeaway || '').trim();
    if (!note) return res.status(400).json({ error: '請簡短描述你完成的內容' });
    if (!takeaway) return res.status(400).json({ error: '請填寫「這堂課學會了什麼」' });

    const existing = db.submissions.filter((s) => s.traineeId === trainee.id && s.taskId === task.id);
    const latest = existing[existing.length - 1];
    if (latest && (latest.status === 'pending' || latest.status === 'approved')) {
      return res.status(409).json({ error: '這一天已經送出過了' });
    }

    const submission = {
      id: genId('sub'),
      traineeId: trainee.id,
      taskId: task.id,
      note,
      takeaway,
      imagePath: req.file ? `/uploads/${trainee.id}/${req.file.filename}` : null,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      reviewedAt: null,
      reviewerNote: null,
    };
    db.submissions.push(submission);
    writeDb(db);
    res.status(201).json(submission);
  });
});

// ---- 上級審核總覽（含每天PIN，需要審核台金鑰） ----
router.get('/review', adminAuth, (req, res) => {
  const db = readDb();
  const trainees = db.trainees
    .map((trainee) => traineeView(trainee, db))
    .sort((a, b) => new Date(b.trainee.createdAt) - new Date(a.trainee.createdAt));
  res.json({ tasks: TASKS, trainees }); // 這裡的 TASKS 含 pin，給上級看
});

router.post('/submissions/:id/review', adminAuth, (req, res) => {
  const { status, reviewerNote } = req.body;
  if (!['approved', 'rejected'].includes(status)) return res.status(400).json({ error: 'status 必須是 approved 或 rejected' });
  const db = readDb();
  const submission = db.submissions.find((s) => s.id === req.params.id);
  if (!submission) return res.status(404).json({ error: '找不到這筆送出紀錄' });

  submission.status = status;
  submission.reviewerNote = reviewerNote ? String(reviewerNote).trim() : null;
  submission.reviewedAt = new Date().toISOString();
  writeDb(db);
  res.json(submission);
});

router.delete('/submissions/:id', adminAuth, (req, res) => {
  const db = readDb();
  const index = db.submissions.findIndex((s) => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: '找不到這筆送出紀錄' });

  const [submission] = db.submissions.splice(index, 1);
  writeDb(db);

  if (submission.imagePath && submission.imagePath.startsWith('/uploads/')) {
    const filePath = path.join(UPLOAD_DIR, submission.imagePath.slice('/uploads/'.length));
    fs.unlink(filePath, () => {});
  }
  res.json({ ok: true });
});

module.exports = router;
