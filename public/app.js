(function () {
  const el = (id) => document.getElementById(id);
  const STATUS_LABEL = { pending: '審核中', approved: '已核可', rejected: '已退回，請補件' };

  let TASKS = [];
  let state = null; // { trainee, submissions, pinUnlocks, seqUnlocked, approvedCount, totalRealDays }

  function traineeId() { return localStorage.getItem('peirouTraineeId') || ''; }
  function traineeName() { return localStorage.getItem('peirouTraineeName') || ''; }

  async function api(path, options = {}) {
    const res = await fetch(path, options);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || '發生錯誤，請稍後再試');
    return data;
  }
  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return `id_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
  }
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  async function enter(name) {
    el('nameError').textContent = '';
    if (!name.trim()) { el('nameError').textContent = '請輸入姓名或暱稱'; return; }
    let id = traineeId();
    if (!id) id = uuid();
    try {
      const data = await api('/api/trainees', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name: name.trim() }),
      });
      localStorage.setItem('peirouTraineeId', id);
      localStorage.setItem('peirouTraineeName', data.trainee.name);
      showApp();
    } catch (err) { el('nameError').textContent = err.message; }
  }
  el('nameSubmit').addEventListener('click', () => enter(el('nameInput').value));
  el('nameInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') enter(el('nameInput').value); });
  el('refreshBtn').addEventListener('click', () => load(true));

  // ---- block renderer ----
  function renderBlock(b) {
    switch (b.type) {
      case 'subhead': return `<div class="subhead">${escapeHtml(b.text)}</div>`;
      case 'p': return `<p class="${b.lead ? 'lead' : ''}">${escapeHtml(b.text)}</p>`;
      case 'list': return `<ul>${b.items.map((i) => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`;
      case 'voicelist': return `<div class="voicelist">${b.items.map((i) => `<span>${escapeHtml(i)}</span>`).join('')}</div>`;
      case 'qa': return `<div class="qa-block"><div class="q">Q：${escapeHtml(b.q)}</div><div class="a">A：${escapeHtml(b.a)}</div></div>`;
      case 'quote': return `<div class="quote">${escapeHtml(b.text)}</div>`;
      case 'links': return `<div class="links">${b.items.map((l) => `<a href="${escapeHtml(l.url)}" target="_blank" rel="noopener">${escapeHtml(l.label)} ↗</a>`).join('')}</div>`;
      case 'fillBlank': return `<div class="fill-blank">${b.rows.map((r) => `<div class="fb-row"><span class="prompt">${escapeHtml(r.prompt)}</span><span class="example">${escapeHtml(r.example)}</span></div>`).join('')}</div>`;
      case 'table': return `<div class="table-scroll"><table class="price"><tr>${b.headers.map((h) => `<th>${escapeHtml(h)}</th>`).join('')}</tr>${b.rows.map((row) => `<tr>${row.map((c, i) => `<td${i === 0 ? '' : ''}>${escapeHtml(c)}</td>`).join('')}</tr>`).join('')}</table></div>`;
      case 'practice': return `<div class="practice">${b.items.map((p) => `<div class="row"><span>${escapeHtml(p.q)}</span><span class="ans">${escapeHtml(p.a)}</span></div>`).join('')}</div>`;
      case 'groupList': return b.items.map((g) => `<div class="group-row"><span>${escapeHtml(g.name)}${g.note ? `<small>${escapeHtml(g.note)}</small>` : ''}</span><span class="count">${escapeHtml(g.count)}</span></div>`).join('');
      case 'gapnote': return `<div class="gapnote">${escapeHtml(b.text)}</div>`;
      default: return '';
    }
  }

  function latestSubmissionFor(taskId) {
    const list = state.submissions.filter((s) => s.taskId === taskId).sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt));
    return list[list.length - 1] || null;
  }

  function renderResult(sub) {
    let html = `<div class="result-block">
      <div class="label">回傳內容</div><div>${escapeHtml(sub.note)}</div>
      <div class="label" style="margin-top:6px;">這堂課學會了什麼</div><div>${escapeHtml(sub.takeaway)}</div>`;
    if (sub.imagePath) html += `<img src="${escapeHtml(sub.imagePath)}" alt="上傳圖片" />`;
    if (sub.status === 'approved' && sub.reviewerNote) html += `<div class="reviewer-note ok">上級回覆：${escapeHtml(sub.reviewerNote)}</div>`;
    if (sub.status === 'rejected' && sub.reviewerNote) html += `<div class="reviewer-note bad">上級退回原因：${escapeHtml(sub.reviewerNote)}</div>`;
    html += '</div>';
    return html;
  }

  function renderSubmitForm(task, rejected) {
    return `<form class="submit-form" data-task-id="${task.id}">
      <label class="field-label">${escapeHtml(task.submitHint || '簡述你完成的內容')}</label>
      <textarea data-field="note" required></textarea>
      <label class="field-label">這堂課學會了什麼？</label>
      <textarea data-field="takeaway" required></textarea>
      <input type="file" accept="image/*" data-field="image" />
      <div style="margin-top:10px;"><button type="submit" class="primary">${rejected ? '重新送出' : '送出，交給上級審核'}</button></div>
      <div class="error"></div>
    </form>`;
  }

  function renderPinForm(task) {
    return `<form class="pin-form" data-task-id="${task.id}">
      <label class="field-label">請輸入今天的 3 位數 PIN 碼（跟上級索取）</label>
      <input type="text" inputmode="numeric" pattern="[0-9]*" maxlength="3" data-field="pin" required />
      <button type="submit" class="primary" style="margin-left:8px;">解鎖</button>
      <div class="error"></div>
    </form>`;
  }

  function renderDay(task) {
    const locked = task.seq >= state.seqUnlocked;
    const pending = !!task.pending;
    const pinOk = state.pinUnlocks.includes(task.id);
    const sub = (!locked && !pending) ? latestSubmissionFor(task.id) : null;

    let status = 'todo';
    if (locked) status = 'locked';
    else if (pending) status = 'pending-day';
    else if (!pinOk) status = 'needpin';
    else if (sub) status = sub.status;

    const card = document.createElement('div');
    const cardStateClass = status === 'approved' ? 'approved' : status === 'pending' ? 'pending-review' : status === 'rejected' ? 'rejected' : locked ? 'locked' : '';
    card.className = `day-card ${cardStateClass}`;

    let badgeHtml = '';
    if (locked) badgeHtml = '<span class="badge badge-locked">未解鎖</span>';
    else if (pending) badgeHtml = '<span class="badge badge-todo">待補充</span>';
    else if (!pinOk) badgeHtml = '<span class="badge badge-pin">需輸入PIN</span>';
    else if (!sub) badgeHtml = '<span class="badge badge-todo">待完成</span>';
    else badgeHtml = `<span class="badge badge-${sub.status}">${STATUS_LABEL[sub.status]}</span>`;

    let bodyHtml = '<div class="day-body">';
    if (locked) {
      bodyHtml += '<div class="locked-note">🔒 完成上一天並經上級核可後才會解鎖</div>';
    } else if (pending) {
      bodyHtml += (task.blocks || []).map(renderBlock).join('');
    } else if (!pinOk) {
      bodyHtml += renderPinForm(task);
    } else {
      if (task.image) {
        bodyHtml += `<img class="day-image" src="${escapeHtml(task.image.src)}" alt="${escapeHtml(task.image.caption || '')}" />`;
        if (task.image.caption) bodyHtml += `<div class="day-image-caption">${escapeHtml(task.image.caption)}</div>`;
      }
      bodyHtml += (task.blocks || []).map(renderBlock).join('');
      if (!sub || sub.status === 'rejected') bodyHtml += renderSubmitForm(task, !!sub);
      else bodyHtml += renderResult(sub);
    }
    bodyHtml += '</div>';

    card.innerHTML = `
      <div class="day-head">
        <h3><span class="day-num">DAY ${task.day}</span>${escapeHtml(task.title)}${task.minutes ? ` <span class="day-minutes">－${task.minutes}分鐘</span>` : ''}</h3>
        ${badgeHtml}
      </div>
      ${bodyHtml}
    `;

    const pinForm = card.querySelector('form.pin-form');
    if (pinForm) pinForm.addEventListener('submit', (e) => submitPin(e, task));
    const subForm = card.querySelector('form.submit-form');
    if (subForm) subForm.addEventListener('submit', (e) => submitDay(e, task));

    return card;
  }

  function render() {
    el('greeting').textContent = `哈囉，${state.trainee.name}`;
    const list = el('dayList');
    list.innerHTML = '';
    TASKS.forEach((task) => list.appendChild(renderDay(task)));
    const total = state.totalRealDays;
    const pct = total ? Math.round((state.approvedCount / total) * 100) : 0;
    el('progressFill').style.width = `${pct}%`;
    el('progressText').textContent = `${state.approvedCount} / ${total} 天已完成`;
  }

  async function submitPin(e, task) {
    e.preventDefault();
    const form = e.target;
    const errBox = form.querySelector('.error');
    errBox.textContent = '';
    const pin = form.querySelector('[data-field="pin"]').value.trim();
    try {
      await api(`/api/trainees/${traineeId()}/pin`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId: task.id, pin }),
      });
      await load(true);
    } catch (err) { errBox.textContent = err.message; }
  }

  async function submitDay(e, task) {
    e.preventDefault();
    const form = e.target;
    const errBox = form.querySelector('.error');
    errBox.textContent = '';
    const note = form.querySelector('[data-field="note"]').value.trim();
    const takeaway = form.querySelector('[data-field="takeaway"]').value.trim();
    const file = form.querySelector('[data-field="image"]').files[0];
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    const fd = new FormData();
    fd.append('taskId', task.id);
    fd.append('note', note);
    fd.append('takeaway', takeaway);
    if (file) fd.append('image', file);
    try {
      await api(`/api/trainees/${traineeId()}/submissions`, { method: 'POST', body: fd });
      await load(true);
    } catch (err) { errBox.textContent = err.message; btn.disabled = false; }
  }

  function isTyping() {
    const a = document.activeElement;
    return a && (a.tagName === 'TEXTAREA' || (a.tagName === 'INPUT' && a.type !== 'checkbox'));
  }

  async function load(force) {
    if (!force && isTyping()) return;
    try {
      const [tasksRes, traineeRes] = await Promise.all([
        api('/api/tasks'),
        api(`/api/trainees/${traineeId()}`),
      ]);
      TASKS = tasksRes.tasks;
      state = traineeRes;
      render();
    } catch (err) {
      localStorage.removeItem('peirouTraineeId');
      showGate();
    }
  }

  function showApp() {
    el('gate').classList.add('hidden');
    el('app').classList.remove('hidden');
    load(true);
    setInterval(() => load(false), 15000);
  }
  function showGate() {
    el('app').classList.add('hidden');
    el('gate').classList.remove('hidden');
    if (traineeName()) el('nameInput').value = traineeName();
  }

  if (traineeId()) showApp(); else showGate();
})();
