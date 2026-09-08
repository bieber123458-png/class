(function () {
  const el = (id) => document.getElementById(id);
  const STATUS_LABEL = { pending: '審核中', approved: '已核可', rejected: '已退回' };

  let TASKS = [];
  let trainees = [];
  const openIds = new Set();

  function getKey() { return localStorage.getItem('peirouAdminKey') || ''; }

  async function api(path, options = {}) {
    const headers = Object.assign({}, options.headers, { 'x-admin-key': getKey() });
    const res = await fetch(path, Object.assign({}, options, { headers }));
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || '發生錯誤，請稍後再試');
    return data;
  }

  // ---- 進入金鑰驗證 ----
  async function tryEnter(key) {
    localStorage.setItem('peirouAdminKey', key);
    try {
      await api('/api/admin-check');
      el('gate').classList.add('hidden');
      el('app').classList.remove('hidden');
      initApp();
    } catch (err) {
      el('keyError').textContent = '金鑰錯誤，請重新輸入';
      localStorage.removeItem('peirouAdminKey');
    }
  }
  el('keySubmit').addEventListener('click', () => tryEnter(el('keyInput').value.trim()));
  el('keyInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') tryEnter(el('keyInput').value.trim()); });
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function fmtTime(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  }

  function renderPinCheat() {
    const real = TASKS.filter((t) => !t.pending);
    el('pinCheat').innerHTML = `
      <h3>每天PIN碼一覽（自行決定何時公佈給大家）</h3>
      <div class="pin-grid">
        ${real.map((t) => `<div class="pin-chip"><div class="d">DAY ${t.day}</div><div class="p">${escapeHtml(t.pin)}</div></div>`).join('')}
      </div>`;
  }

  function latestFor(trainee, taskId) {
    const list = trainee.submissions.filter((s) => s.taskId === taskId).sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt));
    return list[list.length - 1] || null;
  }

  function renderTaskRow(trainee, task) {
    if (task.pending) return '';
    const pinEntered = trainee.pinUnlocks.includes(task.id);
    const sub = latestFor(trainee, task.id);
    if (!sub) {
      if (!pinEntered) return '';
      return `<div class="review-task">
        <div class="review-task-head">
          <strong>DAY ${task.day} · ${escapeHtml(task.title)}</strong>
          <span class="badge badge-pin">已輸入PIN，尚未送出</span>
        </div>
      </div>`;
    }
    let html = `<div class="review-task" data-submission-id="${sub.id}">
      <div class="review-task-head">
        <strong>DAY ${task.day} · ${escapeHtml(task.title)}</strong>
        <span class="badge badge-${sub.status}">${STATUS_LABEL[sub.status]}・${fmtTime(sub.submittedAt)}</span>
      </div>
      <div class="result-block">
        <div class="label">回傳內容</div><div>${escapeHtml(sub.note)}</div>
        <div class="label" style="margin-top:6px;">這堂課學會了什麼</div><div>${escapeHtml(sub.takeaway)}</div>
        ${sub.imagePath ? `<img src="${escapeHtml(sub.imagePath)}" alt="上傳圖片" />` : ''}
      </div>`;
    if (sub.status === 'pending') {
      html += `<div class="review-actions">
        <textarea placeholder="給夥伴的回覆（選填，退回時建議說明原因）"></textarea>
        <button class="secondary" data-action="approve">核可，解鎖下一天</button>
        <button class="danger" data-action="reject">退回補件</button>
      </div>`;
    } else if (sub.reviewerNote) {
      html += `<div class="reviewer-note ${sub.status === 'approved' ? 'ok' : 'bad'}">上級回覆：${escapeHtml(sub.reviewerNote)}（${fmtTime(sub.reviewedAt)}）</div>`;
    }
    html += '</div>';
    return html;
  }

  function renderTrainee(t) {
    const total = t.totalRealDays;
    const pct = total ? Math.round((t.approvedCount / total) * 100) : 0;
    const pendingCount = t.submissions.filter((s) => s.status === 'pending').length;
    const open = openIds.has(t.trainee.id);

    const card = document.createElement('div');
    card.className = 'trainee-card';
    card.innerHTML = `
      <div class="trainee-head" data-toggle="${t.trainee.id}">
        <div>
          <h3>${escapeHtml(t.trainee.name)} ${pendingCount ? `<span class="badge badge-pending">${pendingCount} 項待審核</span>` : ''}</h3>
          <div class="meta">加入於 ${fmtTime(t.trainee.createdAt)}</div>
        </div>
        <div class="trainee-progress">
          <div class="progress-bar"><div class="progress-bar-fill" style="width:${pct}%;"></div></div>
          <div class="progress-text">${t.approvedCount} / ${total} 天已完成</div>
        </div>
      </div>
      <div class="trainee-body ${open ? 'open' : ''}">
        ${TASKS.map((task) => renderTaskRow(t, task)).join('') || '<div class="empty-state">這位夥伴還沒有任何進度</div>'}
      </div>
    `;

    card.querySelector('.trainee-head').addEventListener('click', () => {
      if (openIds.has(t.trainee.id)) openIds.delete(t.trainee.id); else openIds.add(t.trainee.id);
      card.querySelector('.trainee-body').classList.toggle('open');
    });

    card.querySelectorAll('[data-action]').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const row = btn.closest('.review-task');
        const submissionId = row.dataset.submissionId;
        const reviewerNote = row.querySelector('textarea').value.trim();
        const status = btn.dataset.action === 'approve' ? 'approved' : 'rejected';
        btn.disabled = true;
        try {
          await api(`/api/submissions/${submissionId}/review`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status, reviewerNote }),
          });
          openIds.add(t.trainee.id);
          await load();
        } catch (err) { alert(err.message); btn.disabled = false; }
      });
    });
    return card;
  }

  function render() {
    const pendingOnly = el('pendingOnly').checked;
    const list = el('traineeList');
    list.innerHTML = '';
    const filtered = pendingOnly ? trainees.filter((t) => t.submissions.some((s) => s.status === 'pending')) : trainees;
    if (!filtered.length) { list.innerHTML = '<div class="empty-state">目前沒有資料</div>'; return; }
    filtered.forEach((t) => list.appendChild(renderTrainee(t)));
  }

  async function load() {
    try {
      const data = await api('/api/review');
      TASKS = data.tasks;
      trainees = data.trainees;
      renderPinCheat();
      render();
    } catch (err) {
      el('traineeList').innerHTML = `<div class="empty-state">${escapeHtml(err.message)}</div>`;
    }
  }

  function initApp() {
    el('refreshBtn').addEventListener('click', load);
    el('pendingOnly').addEventListener('change', render);
    load();
    setInterval(load, 15000);
  }

  // 若已經存過金鑰，先嘗試自動登入
  if (getKey()) tryEnter(getKey());
})();
