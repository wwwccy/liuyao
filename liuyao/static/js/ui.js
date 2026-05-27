// UI 交互：时间、摇钱、手动输入、重置、语言切换

let selTypes  = [null, null, null, null, null, null];
let shakeTypes = [], shakeStep = 0;

// ── 时间 ──
function setNow() {
  const n = new Date();
  const p = x => String(x).padStart(2, '0');
  document.getElementById('timeInput').value =
    `${n.getFullYear()}-${p(n.getMonth()+1)}-${p(n.getDate())}T${p(n.getHours())}:${p(n.getMinutes())}`;
  refreshSizhi();
}

function refreshSizhi() {
  const sz   = getSiZhi();
  const kong = getKong(sz.day);
  const kongStr = kong.map(d => dzOnly(d)).join(' · ') || '—';
  document.getElementById('sizhiShow').innerHTML =
    tr('siZhi', tgzhi(sz.year), tgzhi(sz.month), tgzhi(sz.day), tgzhi(sz.hour), kongStr);
}

// ── 模式切换 ──
function switchMode(m) {
  document.getElementById('tabC').classList.toggle('on', m === 'coin');
  document.getElementById('tabM').classList.toggle('on', m === 'man');
  document.getElementById('coinSec').className = m === 'coin' ? 'show' : '';
  document.getElementById('manSec').className  = m === 'man'  ? '' : 'hide';
}

// ── 摇钱法 ──
function rnd() { return Math.random() < 0.5 ? 3 : 2; }

function doShake() {
  if (shakeStep >= 6) return;
  const coins = [rnd(), rnd(), rnd()];
  const sum   = coins.reduce((a, b) => a + b, 0);
  const L     = I18N[LANG];

  let type, cls, label;
  if      (sum === 6) { type = '6'; cls = 's-yinc';  label = L.oldYin;   }
  else if (sum === 9) { type = '9'; cls = 's-yangc'; label = L.oldYang;  }
  else if (sum === 7) { type = '7'; cls = 's-yang';  label = L.shaoYang; }
  else                { type = '8'; cls = 's-yin';   label = L.shaoYin;  }

  [0, 1, 2].forEach(i => {
    const el = document.getElementById('c' + i);
    el.classList.add('shaking');
    setTimeout(() => { el.classList.remove('shaking'); el.textContent = coins[i] === 3 ? '正' : '反'; }, 350);
  });

  setTimeout(() => {
    shakeTypes[shakeStep] = type;
    const res = document.getElementById('shakeRes');
    const row = document.createElement('div');
    row.className = 'shake-row ' + cls;
    const yang = (type === '7' || type === '9');
    row.innerHTML = `<span class="sl">${tr('shaking', shakeStep)}</span><span>${makeYaoHTML(yang, isDong(type))}</span><span class="st">${label}</span>`;
    res.appendChild(row);
    shakeStep++;

    if (shakeStep < 6) {
      document.getElementById('shakeInd').textContent = tr('prepLine', shakeStep);
    } else {
      document.getElementById('shakeInd').textContent = I18N[LANG].shakeDone;
      document.getElementById('shakeBtn').disabled = true;
      document.getElementById('shakeCastRow').style.display = 'flex';
    }
  }, 400);
}

function castFromShake() {
  selTypes = [...shakeTypes];
  doCast();
}

// ── 手动输入 ──
function buildManualGrid() {
  const g = document.getElementById('yaoGrid');
  g.innerHTML = '';
  const L    = I18N[LANG];
  const btns = [
    {l: L.oldYin,   v: '6', c: 'a-yinc'},
    {l: L.shaoYang, v: '7', c: 'a-yang'},
    {l: L.shaoYin,  v: '8', c: 'a-yin'},
    {l: L.oldYang,  v: '9', c: 'a-yangc'},
  ];
  for (let i = 5; i >= 0; i--) {
    const r = document.createElement('div');
    r.className = 'yao-row';
    r.innerHTML = `<div class="yao-label">${YAOPOS[i]}爻</div>
    <div class="type-btns" id="tb${i}">${btns.map(b => `<button class="type-btn" onclick="selT(${i},'${b.v}','${b.c}',this)">${b.l}</button>`).join('')}</div>
    <div class="yao-prev" id="yp${i}"></div>`;
    g.appendChild(r);
  }
}

function selT(i, v, c, btn) {
  document.getElementById('tb' + i).querySelectorAll('.type-btn').forEach(b => b.className = 'type-btn');
  btn.classList.add(c);
  selTypes[i] = v;
  document.getElementById('yp' + i).textContent = {6:'✕', 7:'—', 8:'--', 9:'○'}[v] || '';
}

function castManual() {
  if (selTypes.some(t => t === null)) { alert('请选择全部六爻'); return; }
  doCast();
}

// ── 重置 ──
function resetAll() {
  selTypes = [null, null, null, null, null, null];
  shakeTypes = []; shakeStep = 0; benYao_g = [];
  buildManualGrid();
  document.getElementById('shakeRes').innerHTML = '';
  document.getElementById('shakeInd').textContent = I18N[LANG].shakeReady;
  document.getElementById('shakeBtn').textContent = I18N[LANG].shakeBtn;
  document.getElementById('shakeBtn').disabled = false;
  document.getElementById('shakeCastRow').style.display = 'none';
  [0, 1, 2].forEach(i => document.getElementById('c' + i).textContent = '正');
  document.getElementById('result').classList.add('hidden');
}

// ── 语言切换后刷新所有 UI 文本 ──
function applyLang() {
  const L = I18N[LANG];
  document.querySelector('.title').textContent    = L.title;
  document.querySelector('.subtitle').textContent = L.subtitle;
  document.querySelectorAll('.sec-label')[0].textContent = L.castTime;
  document.getElementById('nowBtnEl').textContent  = L.nowBtn;
  document.querySelectorAll('.sec-label')[1].textContent = L.castMethod;
  document.getElementById('tabC').textContent         = L.coinMethod;
  document.getElementById('tabM').textContent         = L.manualInput;
  document.getElementById('shakeBtn').textContent     = L.shakeBtn;
  document.getElementById('castManualBtn').textContent = L.castBtn;
  document.getElementById('resetManualBtn').textContent = L.resetBtn;
  document.getElementById('showResultBtn').textContent = L.showResult;
  document.getElementById('recastBtn').textContent    = L.recast;
  document.getElementById('aiLabel').textContent      = L.aiLabel;
  document.getElementById('aiBtn').textContent        = L.aiBtn;
  document.getElementById('sidebarTitle').textContent = L.sidebarTitle;
  if (shakeStep === 0) document.getElementById('shakeInd').textContent = L.shakeReady;
  buildManualGrid();
  refreshSizhi();
}

// ── 初始化 ──
document.addEventListener('DOMContentLoaded', () => {
  setNow();
  buildManualGrid();
  document.getElementById('timeInput').addEventListener('change', refreshSizhi);
  document.body.classList.toggle('en', LANG === 'en');
  applyLang();
});
