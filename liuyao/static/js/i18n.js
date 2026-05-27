// 国际化：语言状态、翻译表、工具函数

let LANG = 'zh';

// 爻名（初九/初六 … 上九/上六）
function yaoName(pos, yang) {
  if (LANG === 'en') return `Line ${pos} (${yang ? 'yang' : 'yin'})`;
  const yn = yang ? '九' : '六';
  if (pos === 1) return '初' + yn;
  if (pos === 6) return '上' + yn;
  return yn + YAOPOS[pos - 1];
}

// 干支显示（英文时展开）
function tgzhi(gz) {
  if (LANG === 'zh') return gz;
  const tg = gz[0], dz = gz.slice(1);
  return (TG_EN[tg] || tg) + ' ' + (DZ_EN[dz] || dz);
}

function dzOnly(dz) {
  return LANG === 'zh' ? dz : (DZ_EN[dz] || dz);
}

const I18N = {
  zh: {
    title: '六爻排盘',
    subtitle: '纳甲 · 六亲 · 六神 · 空亡 · 卦身',
    castTime: '起卦时间',
    nowBtn: '当前时间',
    castMethod: '起卦方式',
    coinMethod: '摇钱法',
    manualInput: '手动输入',
    castBtn: '排　盘',
    resetBtn: '重　置',
    shakeBtn: '摇　卦',
    shakeReady: '准备摇第一爻',
    shakeDone: '六爻完成 ✓',
    showResult: '显示排盘',
    recast: '重新起卦',
    aiLabel: 'AI 解卦', aiBtn: '✦ AI 解卦', aiPlaceholder: '点击下方按钮获取 AI 解读',
    sidebarTitle: '历史记录',
    siZhi: (y,m,d,h,k) => `年柱 <b>${y}</b>　月柱 <b>${m}</b>　日柱 <b>${d}</b>　时柱 <b>${h}</b>　空亡 <b>${k}</b>`,
    metaTitle: '四值 · 空亡 · 卦身',
    yearPillar:'年柱', monthPillar:'月柱', dayPillar:'日柱', hourPillar:'时柱',
    void:'空亡', guaShenLbl:'卦身',
    guaShenFmt: (b,bn) => `本卦 ${b} ｜ 变卦 ${bn}`,
    thLine:'爻', thSpirit:'六神', thRel:'六亲', thPrimary:'本卦', thChanged:'变卦',
    secGuaci:'卦辞', secDongYao:'动爻爻辞', secBian:'变卦',
    guaciMissing: name => `${name}卦辞待补充`,
    lq: {父母:'父母', 子孙:'子孙', 兄弟:'兄弟', 妻财:'妻财', 官鬼:'官鬼'},
    ls: {青龙:'青龙', 朱雀:'朱雀', 勾陈:'勾陈', 螣蛇:'螣蛇', 白虎:'白虎', 玄武:'玄武'},
    dong:'动', void_mark:'空',
    oldYin:'老阴 ✕', shaoYang:'少阳 ——', shaoYin:'少阴 — —', oldYang:'老阳 ○',
    guaNumFmt: (name,num) => `第${num}卦`,
    bianGuaFmt: (name,num) => `${name}（第${num}卦）`,
    prepLine: i => `准备摇${['初','二','三','四','五','上'][i]}爻`,
    shaking:  i => `${['初','二','三','四','五','上'][i]}爻`,
  },
  en: {
    title: '六爻 Oracle',
    subtitle: 'Na Jia · Six Relatives · Six Spirits · Void · Hexagram Body',
    castTime: 'Cast Time',
    nowBtn: 'Now',
    castMethod: 'Cast Method',
    coinMethod: 'Coin Method',
    manualInput: 'Manual Input',
    castBtn: 'Cast',
    resetBtn: 'Reset',
    shakeBtn: 'Shake',
    shakeReady: 'Ready to cast Line 1',
    shakeDone: 'All six lines cast ✓',
    showResult: 'Show Reading',
    recast: 'New Reading',
    aiLabel: 'AI Reading', aiBtn: '✦ AI Reading', aiPlaceholder: 'Click the button below for an AI interpretation',
    sidebarTitle: 'History',
    siZhi: (y,m,d,h,k) => `Year <b>${y}</b>　Month <b>${m}</b>　Day <b>${d}</b>　Hour <b>${h}</b>　Void <b>${k}</b>`,
    metaTitle: 'Four Pillars · Void · Hexagram Body',
    yearPillar:'Year', monthPillar:'Month', dayPillar:'Day', hourPillar:'Hour',
    void:'Void', guaShenLbl:'Body',
    guaShenFmt: (b,bn) => `Primary ${b} ｜ Transformed ${bn}`,
    thLine:'Line', thSpirit:'Spirit', thRel:'Relative', thPrimary:'Primary', thChanged:'Transformed',
    secGuaci:'Judgment', secDongYao:'Changing Lines', secBian:'Transformed Hexagram',
    guaciMissing: name => `${name} — judgment not yet available`,
    lq: {父母:'Parents', 子孙:'Descendants', 兄弟:'Siblings', 妻财:'Wealth', 官鬼:'Officer'},
    ls: {青龙:'Azure Dragon', 朱雀:'Vermilion Bird', 勾陈:'Earth Guardian', 螣蛇:'Soaring Serpent', 白虎:'White Tiger', 玄武:'Black Tortoise'},
    dong:'→', void_mark:'void',
    oldYin:'Old Yin ✕', shaoYang:'Young Yang ——', shaoYin:'Young Yin — —', oldYang:'Old Yang ○',
    guaNumFmt: (name,num) => `Hex. ${num}`,
    bianGuaFmt: (name,num) => `${name} (Hex. ${num})`,
    prepLine: i => `Ready for Line ${i + 1}`,
    shaking:  i => `Line ${i + 1}`,
  }
};

function tr(key, ...args) {
  const v = I18N[LANG][key];
  return typeof v === 'function' ? v(...args) : v;
}
function tlq(zh) { return I18N[LANG].lq[zh] || zh; }
function tls(zh) { return I18N[LANG].ls[zh] || zh; }

function setLang(lang) {
  LANG = lang;
  document.getElementById('btnZh').classList.toggle('on', lang === 'zh');
  document.getElementById('btnEn').classList.toggle('on', lang === 'en');
  document.body.classList.toggle('en', lang === 'en');
  applyLang();
}
