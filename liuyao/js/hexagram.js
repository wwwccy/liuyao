// 天干地支基础常量
const TG = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const DZ = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const YAOPOS = ['初','二','三','四','五','上'];

// 英文翻译
const TG_EN = {
  甲:'Jia (Yang Wood)', 乙:'Yi (Yin Wood)', 丙:'Bing (Yang Fire)', 丁:'Ding (Yin Fire)',
  戊:'Wu (Yang Earth)', 己:'Ji (Yin Earth)', 庚:'Geng (Yang Metal)', 辛:'Xin (Yin Metal)',
  壬:'Ren (Yang Water)', 癸:'Gui (Yin Water)'
};
const DZ_EN = {
  子:'Zi (Rat)', 丑:'Chou (Ox)', 寅:'Yin (Tiger)', 卯:'Mao (Rabbit)',
  辰:'Chen (Dragon)', 巳:'Si (Snake)', 午:'Wu (Horse)', 未:'Wei (Goat)',
  申:'Shen (Monkey)', 酉:'You (Rooster)', 戌:'Xu (Dog)', 亥:'Hai (Pig)'
};

// 五行归属
const DZ_WX = {子:'水',丑:'土',寅:'木',卯:'木',辰:'土',巳:'火',午:'火',未:'土',申:'金',酉:'金',戌:'土',亥:'水'};
const TG_WX = {甲:'木',乙:'木',丙:'火',丁:'火',戊:'土',己:'土',庚:'金',辛:'金',壬:'水',癸:'水'};
const GONG_WX = {乾:'金',兑:'金',离:'火',震:'木',巽:'木',坎:'水',艮:'土',坤:'土'};

const LIUHE = {子:'丑',丑:'子',寅:'亥',亥:'寅',卯:'戌',戌:'卯',辰:'酉',酉:'辰',巳:'申',申:'巳',午:'未',未:'午'};
const LIUSHEN = ['青龙','朱雀','勾陈','螣蛇','白虎','玄武'];
const LIUSHEN_START = {甲:0,乙:0,丙:1,丁:1,戊:2,己:3,庚:4,辛:4,壬:5,癸:5};

// 八卦（三爻，初爻在前）
const BAGUA = [
  {name:'乾', tri:[1,1,1]},
  {name:'兑', tri:[1,1,0]},
  {name:'离', tri:[1,0,1]},
  {name:'震', tri:[1,0,0]},
  {name:'巽', tri:[0,1,1]},
  {name:'坎', tri:[0,1,0]},
  {name:'艮', tri:[0,0,1]},
  {name:'坤', tri:[0,0,0]},
];

function triIdx(t) {
  return BAGUA.findIndex(b => b.tri[0]===t[0] && b.tri[1]===t[1] && b.tri[2]===t[2]);
}

// 六十四卦（l=下卦索引, u=上卦索引, shi=世爻位, ying=应爻位）
const GUA64 = [
  // 乾宫（金）
  {name:'乾为天',   ename:'The Creative',                         l:0,u:0,shi:6,ying:3,num:1,  gong:'乾'},
  {name:'天风姤',   ename:'Coming to Meet',                       l:4,u:0,shi:1,ying:4,num:44, gong:'乾'},
  {name:'天山遁',   ename:'Retreat',                              l:6,u:0,shi:2,ying:5,num:33, gong:'乾'},
  {name:'天地否',   ename:'Standstill',                           l:7,u:0,shi:3,ying:6,num:12, gong:'乾'},
  {name:'风地观',   ename:'Contemplation',                        l:7,u:4,shi:4,ying:1,num:20, gong:'乾'},
  {name:'山地剥',   ename:'Splitting Apart',                      l:7,u:6,shi:5,ying:2,num:23, gong:'乾'},
  {name:'火地晋',   ename:'Progress',                             l:7,u:2,shi:4,ying:1,num:35, gong:'乾'},
  {name:'火天大有', ename:'Great Possession',                     l:0,u:2,shi:3,ying:6,num:14, gong:'乾'},
  // 坎宫（水）
  {name:'坎为水',   ename:'The Abysmal',                          l:5,u:5,shi:6,ying:3,num:29, gong:'坎'},
  {name:'水泽节',   ename:'Limitation',                           l:1,u:5,shi:1,ying:4,num:60, gong:'坎'},
  {name:'水雷屯',   ename:'Difficulty at the Beginning',          l:3,u:5,shi:2,ying:5,num:3,  gong:'坎'},
  {name:'水火既济', ename:'After Completion',                     l:2,u:5,shi:3,ying:6,num:63, gong:'坎'},
  {name:'泽火革',   ename:'Revolution',                           l:2,u:1,shi:4,ying:1,num:49, gong:'坎'},
  {name:'雷火丰',   ename:'Abundance',                            l:2,u:3,shi:5,ying:2,num:55, gong:'坎'},
  {name:'地火明夷', ename:'Darkening of the Light',               l:2,u:7,shi:4,ying:1,num:36, gong:'坎'},
  {name:'地水师',   ename:'The Army',                             l:5,u:7,shi:3,ying:6,num:7,  gong:'坎'},
  // 艮宫（土）
  {name:'艮为山',   ename:'Keeping Still',                        l:6,u:6,shi:6,ying:3,num:52, gong:'艮'},
  {name:'山火贲',   ename:'Grace',                                l:2,u:6,shi:1,ying:4,num:22, gong:'艮'},
  {name:'山天大畜', ename:'The Taming Power of the Great',        l:0,u:6,shi:2,ying:5,num:26, gong:'艮'},
  {name:'山泽损',   ename:'Decrease',                             l:1,u:6,shi:3,ying:6,num:41, gong:'艮'},
  {name:'火泽睽',   ename:'Opposition',                           l:1,u:2,shi:4,ying:1,num:38, gong:'艮'},
  {name:'天泽履',   ename:'Treading',                             l:1,u:0,shi:5,ying:2,num:10, gong:'艮'},
  {name:'风泽中孚', ename:'Inner Truth',                          l:1,u:4,shi:4,ying:1,num:61, gong:'艮'},
  {name:'风山渐',   ename:'Development',                          l:6,u:4,shi:3,ying:6,num:53, gong:'艮'},
  // 震宫（木）
  {name:'震为雷',   ename:'The Arousing',                         l:3,u:3,shi:6,ying:3,num:51, gong:'震'},
  {name:'雷地豫',   ename:'Enthusiasm',                           l:7,u:3,shi:1,ying:4,num:16, gong:'震'},
  {name:'雷水解',   ename:'Deliverance',                          l:5,u:3,shi:2,ying:5,num:40, gong:'震'},
  {name:'雷风恒',   ename:'Duration',                             l:4,u:3,shi:3,ying:6,num:32, gong:'震'},
  {name:'地风升',   ename:'Pushing Upward',                       l:4,u:7,shi:4,ying:1,num:46, gong:'震'},
  {name:'水风井',   ename:'The Well',                             l:4,u:5,shi:5,ying:2,num:48, gong:'震'},
  {name:'泽风大过', ename:'Preponderance of the Great',           l:4,u:1,shi:4,ying:1,num:28, gong:'震'},
  {name:'泽雷随',   ename:'Following',                            l:3,u:1,shi:3,ying:6,num:17, gong:'震'},
  // 巽宫（木）
  {name:'巽为风',   ename:'The Gentle',                           l:4,u:4,shi:6,ying:3,num:57, gong:'巽'},
  {name:'风天小畜', ename:'The Taming Power of the Small',        l:0,u:4,shi:1,ying:4,num:9,  gong:'巽'},
  {name:'风火家人', ename:'The Family',                           l:2,u:4,shi:2,ying:5,num:37, gong:'巽'},
  {name:'风雷益',   ename:'Increase',                             l:3,u:4,shi:3,ying:6,num:42, gong:'巽'},
  {name:'天雷无妄', ename:'Innocence',                            l:3,u:0,shi:4,ying:1,num:25, gong:'巽'},
  {name:'火雷噬嗑', ename:'Biting Through',                       l:3,u:2,shi:5,ying:2,num:21, gong:'巽'},
  {name:'山雷颐',   ename:'Nourishment',                          l:3,u:6,shi:4,ying:1,num:27, gong:'巽'},
  {name:'山风蛊',   ename:'Work on the Decayed',                  l:4,u:6,shi:3,ying:6,num:18, gong:'巽'},
  // 离宫（火）
  {name:'离为火',   ename:'The Clinging',                         l:2,u:2,shi:6,ying:3,num:30, gong:'离'},
  {name:'火山旅',   ename:'The Wanderer',                         l:6,u:2,shi:1,ying:4,num:56, gong:'离'},
  {name:'火风鼎',   ename:'The Cauldron',                         l:4,u:2,shi:2,ying:5,num:50, gong:'离'},
  {name:'火水未济', ename:'Before Completion',                    l:5,u:2,shi:3,ying:6,num:64, gong:'离'},
  {name:'山水蒙',   ename:'Youthful Folly',                       l:5,u:6,shi:4,ying:1,num:4,  gong:'离'},
  {name:'风水涣',   ename:'Dispersion',                           l:5,u:4,shi:5,ying:2,num:59, gong:'离'},
  {name:'天水讼',   ename:'Conflict',                             l:5,u:0,shi:4,ying:1,num:6,  gong:'离'},
  {name:'天火同人', ename:'Fellowship',                           l:2,u:0,shi:3,ying:6,num:13, gong:'离'},
  // 坤宫（土）
  {name:'坤为地',   ename:'The Receptive',                        l:7,u:7,shi:6,ying:3,num:2,  gong:'坤'},
  {name:'地雷复',   ename:'Return',                               l:3,u:7,shi:1,ying:4,num:24, gong:'坤'},
  {name:'地泽临',   ename:'Approach',                             l:1,u:7,shi:2,ying:5,num:19, gong:'坤'},
  {name:'地天泰',   ename:'Peace',                                l:0,u:7,shi:3,ying:6,num:11, gong:'坤'},
  {name:'雷天大壮', ename:'The Power of the Great',               l:0,u:3,shi:4,ying:1,num:34, gong:'坤'},
  {name:'泽天夬',   ename:'Breakthrough',                         l:0,u:1,shi:5,ying:2,num:43, gong:'坤'},
  {name:'水天需',   ename:'Waiting',                              l:0,u:5,shi:4,ying:1,num:5,  gong:'坤'},
  {name:'水地比',   ename:'Holding Together',                     l:7,u:5,shi:3,ying:6,num:8,  gong:'坤'},
  // 兑宫（金）
  {name:'兑为泽',   ename:'The Joyous',                           l:1,u:1,shi:6,ying:3,num:58, gong:'兑'},
  {name:'泽水困',   ename:'Oppression',                           l:5,u:1,shi:1,ying:4,num:47, gong:'兑'},
  {name:'泽地萃',   ename:'Gathering Together',                   l:7,u:1,shi:2,ying:5,num:45, gong:'兑'},
  {name:'泽山咸',   ename:'Influence',                            l:6,u:1,shi:3,ying:6,num:31, gong:'兑'},
  {name:'水山蹇',   ename:'Obstruction',                          l:6,u:5,shi:4,ying:1,num:39, gong:'兑'},
  {name:'地山谦',   ename:'Modesty',                              l:6,u:7,shi:5,ying:2,num:15, gong:'兑'},
  {name:'雷山小过', ename:'Preponderance of the Small',           l:6,u:3,shi:4,ying:1,num:62, gong:'兑'},
  {name:'雷泽归妹', ename:'The Marrying Maiden',                  l:1,u:3,shi:3,ying:6,num:54, gong:'兑'},
];

function findGua(l, u) {
  return GUA64.find(g => g.l===l && g.u===u) || {name:'未知', shi:6, ying:3, num:0};
}

// 纳甲：每宫六爻对应地支
const BAGUA_NAJIA = {
  乾: ['子','寅','辰','午','申','戌'],
  兑: ['巳','卯','丑','亥','酉','未'],
  离: ['卯','丑','亥','酉','未','巳'],
  震: ['子','寅','辰','午','申','戌'],
  巽: ['丑','亥','酉','未','巳','卯'],
  坎: ['寅','辰','午','申','戌','子'],
  艮: ['辰','午','申','戌','子','寅'],
  坤: ['未','巳','卯','丑','亥','酉'],
};

const NAJIA_OVERRIDE = {};

function getNaJia(gua) {
  if (NAJIA_OVERRIDE[gua.name]) return NAJIA_OVERRIDE[gua.name];
  const lower = BAGUA[gua.l].name;
  const upper = BAGUA[gua.u].name;
  const lowerDZ = BAGUA_NAJIA[lower];
  const upperDZ = BAGUA_NAJIA[upper];
  return [lowerDZ[0], lowerDZ[1], lowerDZ[2], upperDZ[3], upperDZ[4], upperDZ[5]];
}

function getGuaData(gua) {
  return { dz: getNaJia(gua) };
}
