// 起卦与排盘核心逻辑

let benYao_g = [];

function yaoVal(v) { return (v === '6' || v === '8') ? 0 : 1; }
function isDong(v) { return v === '6' || v === '9'; }

// 六亲：根据卦宫五行与爻地支五行的生克关系推算
function getSixQin(gongWx, yaoWx) {
  const sheng = {木:'火', 火:'土', 土:'金', 金:'水', 水:'木'};
  const ke    = {木:'土', 土:'水', 水:'火', 火:'金', 金:'木'};

  if (gongWx === yaoWx)          return '兄弟';
  if (sheng[yaoWx] === gongWx)   return '父母';
  if (sheng[gongWx] === yaoWx)   return '子孙';
  if (ke[yaoWx]    === gongWx)   return '官鬼';
  if (ke[gongWx]   === yaoWx)    return '妻财';
  return '?';
}

// 卦身：阳世从子起，阴世从午起，顺数到世爻
function getGuaShen(shiPos, shiYang) {
  const dzAll = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
  const startIdx = shiYang ? 0 : 6;
  return dzAll[(startIdx + shiPos - 1) % 12];
}

function doCast() {
  const sz   = getSiZhi();
  const kong = getKong(sz.day);

  const benYao  = selTypes.map(v => yaoVal(v));
  benYao_g = benYao;
  const bianYao = selTypes.map((v, i) => isDong(v) ? 1 - benYao[i] : benYao[i]);
  const hasDong = selTypes.some(v => isDong(v));

  const benL  = triIdx([benYao[0],  benYao[1],  benYao[2]]);
  const benU  = triIdx([benYao[3],  benYao[4],  benYao[5]]);
  const bianL = triIdx([bianYao[0], bianYao[1], bianYao[2]]);
  const bianU = triIdx([bianYao[3], bianYao[4], bianYao[5]]);

  const benGua  = findGua(benL,  benU);
  const bianGua = findGua(bianL, bianU);

  const benNJ  = getGuaData(benGua).dz;
  const bianNJ = getGuaData(bianGua).dz;

  const benGongWx  = GONG_WX[benGua.gong];
  const bianGongWx = GONG_WX[bianGua.gong];

  const benLQ  = benNJ.map(dz => getSixQin(benGongWx,  DZ_WX[dz]));
  const bianLQ = bianNJ.map(dz => getSixQin(benGongWx, DZ_WX[dz])); // 变卦六亲仍用本卦宫五行

  const lsStart = LIUSHEN_START[sz.day[0]] || 0;
  const liushen = Array.from({length: 6}, (_, i) => LIUSHEN[(lsStart + i) % 6]);

  const guaShen      = getGuaShen(benGua.shi,  benYao[benGua.shi  - 1] === 1);
  const bianGuaShen  = getGuaShen(bianGua.shi, bianYao[bianGua.shi - 1] === 1);

  renderMeta(sz, kong, guaShen, bianGuaShen);
  renderPaipan(benGua, bianGua, hasDong, benYao, bianYao, benNJ, bianNJ, benLQ, bianLQ, liushen, benGua.shi, benGua.ying, kong);
  renderGuaci(benGua, bianGua, hasDong, benYao);

  document.getElementById('result').classList.remove('hidden');
  setTimeout(() => document.getElementById('result').scrollIntoView({behavior: 'smooth'}), 50);
}
