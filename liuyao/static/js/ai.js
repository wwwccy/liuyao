// AI 解卦：调用 /api/interpret，展示结果

let _lastSiZhi = null;

function doInterpret() {
  const btn    = document.getElementById('aiBtn');
  const result = document.getElementById('aiResult');
  const L      = I18N[LANG];

  if (!lastCastGua) return;

  btn.disabled = true;
  result.className = 'ai-loading';
  result.textContent = LANG === 'zh' ? '正在解卦……' : 'Interpreting…';

  const payload = {
    guaName:  lastCastGua.name,
    bianGua:  lastCastBianGua ? lastCastBianGua.name : '',
    yaoTypes: selTypes,
    lang:     LANG,
    siZhi:    _lastSiZhi || {},
  };

  fetch('/api/interpret', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload),
  })
    .then(r => r.json())
    .then(data => {
      if (data.error) throw new Error(data.error);
      result.className = 'ai-text';
      result.textContent = data.interpretation;
    })
    .catch(err => {
      result.className = 'ai-placeholder';
      result.textContent = LANG === 'zh'
        ? `解卦失败：${err.message}`
        : `Interpretation failed: ${err.message}`;
    })
    .finally(() => { btn.disabled = false; });
}

// divination.js 在 doCast 结束后调用此函数传入卦象和四柱
function onCastComplete(benGua, bianGua, sz) {
  lastCastGua     = benGua;
  lastCastBianGua = bianGua;
  _lastSiZhi      = sz;

  // 重置 AI 区
  const result = document.getElementById('aiResult');
  result.className  = 'ai-placeholder';
  result.textContent = LANG === 'zh'
    ? '点击下方按钮获取 AI 解读'
    : 'Click the button below for an AI interpretation';
  document.getElementById('aiBtn').disabled = false;
}
