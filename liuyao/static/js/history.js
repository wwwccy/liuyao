// 历史记录：侧边栏加载、渲染、删除

let _sidebarOpen = true;

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const mask    = document.getElementById('sidebarMask');
  const wrap    = document.querySelector('.main-wrap');
  const isMobile = window.innerWidth <= 700;

  if (isMobile) {
    const open = sidebar.classList.toggle('open');
    mask.classList.toggle('open', open);
  } else {
    _sidebarOpen = !_sidebarOpen;
    sidebar.classList.toggle('hidden', !_sidebarOpen);
    wrap.classList.toggle('sidebar-closed', !_sidebarOpen);
  }
}

function fmtDate(iso) {
  const d = new Date(iso);
  const p = x => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

async function loadHistory() {
  try {
    const res  = await fetch('/api/history');
    const rows = await res.json();
    renderHistory(rows);
  } catch (_) {}
}

function renderHistory(rows) {
  const list  = document.getElementById('historyList');
  const empty = document.getElementById('historyEmpty');

  if (!rows.length) {
    list.innerHTML = '<div class="sidebar-empty" id="historyEmpty">暂无记录</div>';
    return;
  }

  list.innerHTML = rows.map(r => {
    const bian = r.bian_gua_name && r.bian_gua_name !== r.gua_name
      ? `<div class="hi-bian">→ ${r.bian_gua_name}</div>` : '';
    return `<div class="history-item" onclick="loadReading(${r.id})">
      <button class="hi-del" onclick="deleteReading(event,${r.id})">✕</button>
      <div class="hi-name">${r.gua_name}</div>
      ${bian}
      <div class="hi-date">${fmtDate(r.created_at)}</div>
    </div>`;
  }).join('');
}

async function saveReading(guaName, bianGuaName, sz) {
  try {
    await fetch('/api/history', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        guaName, bianGuaName,
        yaoTypes: selTypes,
        yearGz:  sz.year, monthGz: sz.month,
        dayGz:   sz.day,  hourGz:  sz.hour,
        lang: LANG,
      })
    });
    loadHistory();
  } catch (_) {}
}

async function deleteReading(e, id) {
  e.stopPropagation();
  await fetch(`/api/history/${id}`, {method: 'DELETE'});
  loadHistory();
}

// placeholder — full re-cast from history would need serialized yao state
function loadReading(id) {
  // future: populate form from saved data
}

document.addEventListener('DOMContentLoaded', loadHistory);
