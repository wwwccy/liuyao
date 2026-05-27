// 干支历计算
// 基准：1984-01-01 = 甲午（第30个干支）

const BASE_Y = 1984, BASE_M = 1, BASE_D = 1, BASE_IDX = 30;

function dateDiff(y, m, d) {
  function jdn(yy, mm, dd) {
    const a = Math.floor((14 - mm) / 12);
    const Y = yy + 4800 - a, M = mm + 12 * a - 3;
    return dd + Math.floor((153 * M + 2) / 5) + 365 * Y
      + Math.floor(Y / 4) - Math.floor(Y / 100) + Math.floor(Y / 400) - 32045;
  }
  return jdn(y, m, d) - jdn(BASE_Y, BASE_M, BASE_D);
}

function getDayGZ(y, m, d) {
  const diff = dateDiff(y, m, d);
  const idx = ((BASE_IDX + diff) % 60 + 60) % 60;
  return TG[idx % 10] + DZ[idx % 12];
}

function getYearGZIdx(y, m, d) {
  let yr = y;
  if (m < 2 || (m === 2 && d < 4)) yr--;
  return ((yr - 1984) % 60 + 60) % 60;
}

function getYearGZ(y, m, d) {
  const i = getYearGZIdx(y, m, d);
  return TG[i % 10] + DZ[i % 12];
}

// 节气：每月入节大约日期及对应地支月
const JIEQI = [
  {m:1,  d:6,  dz:'丑'}, {m:2,  d:4,  dz:'寅'}, {m:3,  d:6,  dz:'卯'},
  {m:4,  d:5,  dz:'辰'}, {m:5,  d:6,  dz:'巳'}, {m:6,  d:6,  dz:'午'},
  {m:7,  d:7,  dz:'未'}, {m:8,  d:7,  dz:'申'}, {m:9,  d:8,  dz:'酉'},
  {m:10, d:8,  dz:'戌'}, {m:11, d:7,  dz:'亥'}, {m:12, d:7,  dz:'子'},
];

function getMonthDZ(m, d) {
  let cur = '丑';
  for (let i = JIEQI.length - 1; i >= 0; i--) {
    const jq = JIEQI[i];
    if (m > jq.m || (m === jq.m && d >= jq.d)) { cur = jq.dz; break; }
  }
  if (m === 1 && d < JIEQI[0].d) cur = '子';
  return cur;
}

function getMonthGZ(y, m, d) {
  const yearTGIdx = getYearGZIdx(y, m, d) % 10;
  const monthDZ = getMonthDZ(m, d);
  const mdzI = DZ.indexOf(monthDZ);
  const bases = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0];
  const seq = (mdzI - 2 + 12) % 12;
  return TG[(bases[yearTGIdx] + seq) % 10] + monthDZ;
}

function getHourDZ(h) {
  const hh = h === 23 ? -1 : h;
  return DZ[Math.floor((hh + 1) / 2) % 12];
}

function getHourGZ(y, m, d, h) {
  const dayIdx = ((BASE_IDX + dateDiff(y, m, d)) % 60 + 60) % 60;
  const dayTGI = dayIdx % 10;
  const hourDZ = getHourDZ(h);
  const hdzI = DZ.indexOf(hourDZ);
  const bases = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8];
  return TG[(bases[dayTGI] + hdzI) % 10] + hourDZ;
}

// 解析 datetime-local 字符串
function parseInput() {
  const v = document.getElementById('timeInput').value;
  if (!v) {
    const n = new Date();
    return {y: n.getFullYear(), m: n.getMonth()+1, d: n.getDate(), h: n.getHours(), min: n.getMinutes()};
  }
  const [date, time] = v.split('T');
  const [y, mo, day] = date.split('-').map(Number);
  const [h, min] = (time || '00:00').split(':').map(Number);
  return {y, m: mo, d: day, h, min};
}

function getSiZhi() {
  const {y, m, d, h} = parseInput();
  return {
    year:  getYearGZ(y, m, d),
    month: getMonthGZ(y, m, d),
    day:   getDayGZ(y, m, d),
    hour:  getHourGZ(y, m, d, h),
  };
}

// 空亡表（六甲旬）
const KW_TBL = [
  {xun:'甲子', kong:['戌','亥']}, {xun:'甲戌', kong:['申','酉']},
  {xun:'甲申', kong:['午','未']}, {xun:'甲午', kong:['辰','巳']},
  {xun:'甲辰', kong:['寅','卯']}, {xun:'甲寅', kong:['子','丑']},
];

function getKong(dayGZ) {
  const tgI = TG.indexOf(dayGZ[0]), dzI = DZ.indexOf(dayGZ[1]);
  const xI = (dzI - tgI + 12) % 12;
  const f = KW_TBL.find(x => x.xun === '甲' + DZ[xI]);
  return f ? f.kong : [];
}
