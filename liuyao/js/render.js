// UI 渲染函数：元信息、排盘表格、卦辞

function makeYaoHTML(yang, dong) {
  const chCls = dong ? 'ch' : '';
  const dongMark = dong ? `<span class="dong-tag">${yang ? '○' : '✕'}</span>` : '';
  if (yang) {
    return `<span class="yao-sym ${chCls}" style="display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;"><span class="ln yang"></span></span>${dongMark}`;
  } else {
    return `<span class="yao-sym ${chCls}" style="display:inline-flex;flex-direction:row;gap:6px;align-items:center;vertical-align:middle;"><span class="ln yin-l"></span><span class="ln yin-r"></span></span>${dongMark}`;
  }
}

// 四值 · 空亡 · 卦身
function renderMeta(sz, kong, guaShen, bianGuaShen) {
  const L = I18N[LANG];
  document.getElementById('metaCard').innerHTML = `
  <span class="sec-label">${L.metaTitle}</span>
  <div class="meta-grid">
    <div class="meta-item"><div class="meta-k">${L.yearPillar}</div><div class="meta-v">${tgzhi(sz.year)}</div></div>
    <div class="meta-item"><div class="meta-k">${L.monthPillar}</div><div class="meta-v">${tgzhi(sz.month)}</div></div>
    <div class="meta-item"><div class="meta-k">${L.dayPillar}</div><div class="meta-v">${tgzhi(sz.day)}</div></div>
    <div class="meta-item"><div class="meta-k">${L.hourPillar}</div><div class="meta-v">${tgzhi(sz.hour)}</div></div>
    <div class="meta-item"><div class="meta-k">${L.void}</div><div class="meta-v">${kong.map(d => dzOnly(d)).join(' · ') || '—'}</div></div>
    <div class="meta-item"><div class="meta-k">${L.guaShenLbl}</div><div class="meta-v">${tr('guaShenFmt', dzOnly(guaShen), dzOnly(bianGuaShen))}</div></div>
  </div>`;
}

// 排盘主表格
// 列顺序：爻名 | 六神 | 六亲纳甲 | 本卦爻象 | [变卦爻象 | 变卦六亲纳甲]
function renderPaipan(benGua, bianGua, hasDong, benYao, bianYao, benNJ, bianNJ, benLQ, bianLQ, liushen, shiPos, yingPos, kong) {
  const card = document.getElementById('paipanCard');
  const bianShiPos  = bianGua.shi;
  const bianYingPos = bianGua.ying;

  function guaTitle(gua) {
    const en  = gua.ename ? ` <span style="font-size:.72rem;color:var(--muted);font-weight:300;">${gua.ename}</span>` : '';
    const num = tr('guaNumFmt', gua.name, gua.num);
    return `<span class="gua-name">${gua.name}${LANG === 'en' ? en : ''}</span><span class="gua-num">${num}</span>`;
  }

  let ghdHTML = `<div class="gua-hd">${guaTitle(benGua)}`;
  if (hasDong) ghdHTML += `<span class="gua-arr">→</span>${guaTitle(bianGua)}`;
  ghdHTML += `</div>`;

  const L = I18N[LANG];
  let thead = `<thead><tr>
    <th>${L.thLine}</th><th>${L.thSpirit}</th>
    <th>${L.thRel}</th><th>${L.thPrimary}</th>`;
  if (hasDong) thead += `<th class="mid-div">${L.thChanged}</th><th>${L.thRel}</th>`;
  thead += `</tr></thead>`;

  function syTag(isShi, isYing) {
    if (!isShi && !isYing) return '';
    const label = isShi ? (LANG === 'zh' ? '世' : 'Self') : (LANG === 'zh' ? '应' : 'Resp');
    const cls   = isShi ? 'sm' : 'ym';
    return `<span class="shi-ying ${cls}">${label}</span>`;
  }

  const WX_EN = {木:'Wood', 火:'Fire', 土:'Earth', 金:'Metal', 水:'Water'};

  let tbody = '<tbody>';
  for (let i = 5; i >= 0; i--) {
    const pos   = i + 1;
    const yang  = benYao[i] === 1;
    const dong  = isDong(selTypes[i]);
    const byang = bianYao[i] === 1;
    const dz    = benNJ[i]  || '?';
    const bdz   = bianNJ[i] || '?';
    const isKong  = kong.includes(dz);
    const isShi   = pos === shiPos;
    const isYing  = pos === yingPos;
    const bIsShi  = pos === bianShiPos;
    const bIsYing = pos === bianYingPos;

    const kongStr = isKong ? ` <span style="font-size:.55rem;color:var(--muted2);">${L.void_mark}</span>` : '';

    const benWx  = DZ_WX[dz]  || '土';
    const bianWx = DZ_WX[bdz] || '土';
    const dzDisp  = LANG === 'zh' ? dz  : (DZ_EN[dz]  || dz);
    const bdzDisp = LANG === 'zh' ? bdz : (DZ_EN[bdz] || bdz);
    const benWxDisp  = LANG === 'zh' ? benWx  : (WX_EN[benWx]  || benWx);
    const bianWxDisp = LANG === 'zh' ? bianWx : (WX_EN[bianWx] || bianWx);

    const benLQNJ  = `<span class="lq wx-${benWx}">${tlq(benLQ[i])}</span><span class="nj-dz wx-${benWx}">${dzDisp}${benWxDisp}</span>${kongStr}`;
    const bianLQNJ = `<span class="lq wx-${bianWx}">${tlq(bianLQ[i])}</span><span class="nj-dz wx-${bianWx}">${bdzDisp}${bianWxDisp}</span>`;

    const benSymHTML  = makeYaoHTML(yang,  dong)  + syTag(isShi,  isYing);
    const bianSymHTML = makeYaoHTML(byang, false)  + syTag(bIsShi, bIsYing);

    let row = `<tr class="${dong ? 'dong' : ''}">
      <td class="col-pos">${yaoName(pos, yang)}</td>
      <td class="col-ls">${tls(liushen[i])}</td>
      <td class="col-lqnj" style="text-align:left;padding-left:10px;">${benLQNJ}</td>
      <td class="yao-cell">${benSymHTML}</td>`;
    if (hasDong) {
      row += `<td class="yao-cell mid-div">${bianSymHTML}</td>
      <td class="col-lqnj" style="text-align:left;padding-left:8px;">${bianLQNJ}</td>`;
    }
    row += `</tr>`;
    tbody += row;
  }
  tbody += '</tbody>';

  card.innerHTML = ghdHTML + `<table class="paipan">${thead}${tbody}</table>`;
}

// 卦辞 + 动爻爻辞
function renderGuaci(benGua, bianGua, hasDong, benYao) {
  const el = document.getElementById('guaciCard');
  const L  = I18N[LANG];
  const gc = GUACI[benGua.name];
  const gcLang = gc ? gc[LANG] : null;

  if (!gcLang) {
    el.innerHTML = `<span class="sec-label">${L.secGuaci}</span><div style="color:var(--muted);font-size:.73rem;">${L.guaciMissing(benGua.name)}</div>`;
    return;
  }

  const dongList = selTypes.map((v, i) => ({v, i})).filter(x => isDong(x.v));

  let html = `<div class="guaci-block">
    <span class="sec-label">${L.secGuaci}</span>
    <div class="guaci-ttl">${benGua.name}${LANG === 'en' && benGua.ename ? ' — ' + benGua.ename : ''}</div>
    <div class="guaci-orig">${gcLang.guaci}</div>
    <div class="guaci-bh">${gcLang.baihua}</div>
  </div>`;

  if (dongList.length > 0) {
    html += `<div style="margin-top:14px;"><span class="sec-label">${L.secDongYao}</span>`;
    dongList.forEach(({i}) => {
      const yang = benYao[i] === 1;
      const yc   = gcLang.yaoci[i];
      if (yc) html += `<div class="yaoci-item">
        <div class="yaoci-pos">${yaoName(i + 1, yang)}</div>
        <div class="yaoci-orig">${yc.t}</div>
        <div class="yaoci-bh">${yc.b}</div>
      </div>`;
    });
    html += `</div>`;
  }

  if (hasDong) {
    const bgc = GUACI[bianGua.name];
    const bgcLang = bgc ? bgc[LANG] : null;
    html += `<div style="margin-top:14px;"><span class="sec-label">${L.secBian}</span>
    <div style="font-size:.85rem;color:var(--ink);letter-spacing:.1em;padding:6px 0;">${bianGua.name}${LANG === 'en' && bianGua.ename ? ' — ' + bianGua.ename : ''} (${LANG === 'zh' ? '第' + bianGua.num + '卦' : 'Hex. ' + bianGua.num})</div>
    ${bgcLang ? `<div class="guaci-bh">${bgcLang.guaci}</div>` : ''}
    </div>`;
  }

  el.innerHTML = html;
}
