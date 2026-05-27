import os
import json
import sqlite3
from datetime import datetime
from pathlib import Path
from flask import Flask, render_template, jsonify, request, g
from anthropic import Anthropic

app = Flask(__name__)

DATABASE = Path(__file__).parent / 'liuyao.db'
GUACI_PATH = Path(__file__).parent / 'static' / 'data' / 'guaci.json'

_anthropic = None
def get_anthropic():
    global _anthropic
    if _anthropic is None:
        _anthropic = Anthropic(api_key=os.environ.get('ANTHROPIC_API_KEY', ''))
    return _anthropic

# ── SQLite ──────────────────────────────────────────────
def get_db():
    db = getattr(g, '_db', None)
    if db is None:
        db = g._db = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_db(exc):
    db = getattr(g, '_db', None)
    if db:
        db.close()

def init_db():
    with app.app_context():
        db = get_db()
        schema = Path(__file__).parent / 'schema.sql'
        db.executescript(schema.read_text())
        db.commit()

# ── 页面 ────────────────────────────────────────────────
@app.route('/')
def index():
    return render_template('index.html')

# ── 卦辞数据 ─────────────────────────────────────────────
@app.route('/api/guaci')
def api_guaci():
    if GUACI_PATH.exists():
        return jsonify(json.loads(GUACI_PATH.read_text(encoding='utf-8')))
    return jsonify({})

# ── AI 解卦 ──────────────────────────────────────────────
@app.route('/api/interpret', methods=['POST'])
def api_interpret():
    data = request.get_json()
    gua   = data.get('guaName', '')
    bian  = data.get('bianGua', '')
    types = data.get('yaoTypes', [])
    lang  = data.get('lang', 'zh')
    sz    = data.get('siZhi', {})

    dong  = sum(1 for v in types if v in ('6', '9'))

    if lang == 'zh':
        prompt = f"""你是精通六爻的易学老师，请为以下卦象给出简洁解读（200字以内）：

起卦时间：年{sz.get('year','')} 月{sz.get('month','')} 日{sz.get('day','')} 时{sz.get('hour','')}
本卦：{gua}，动爻{dong}个
{f'变卦：{bian}' if bian and bian != gua else '无变卦'}

从卦象格局、动爻变化、吉凶趋向三角度简析，语言简洁易懂。"""
    else:
        prompt = f"""You are a knowledgeable I Ching teacher. Give a concise reading (under 150 words):

Cast time: Year {sz.get('year','')} Month {sz.get('month','')} Day {sz.get('day','')} Hour {sz.get('hour','')}
Primary hexagram: {gua}, {dong} changing line(s)
{f'Transformed hexagram: {bian}' if bian and bian != gua else 'No transformation'}

Briefly cover the overall pattern, significance of changing lines, and general outlook."""

    try:
        msg = get_anthropic().messages.create(
            model='claude-opus-4-5',
            max_tokens=500,
            messages=[{'role': 'user', 'content': prompt}]
        )
        return jsonify({'interpretation': msg.content[0].text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ── 历史记录 ──────────────────────────────────────────────
@app.route('/api/history', methods=['GET'])
def history_list():
    db   = get_db()
    rows = db.execute(
        'SELECT * FROM readings ORDER BY created_at DESC LIMIT 60'
    ).fetchall()
    return jsonify([dict(r) for r in rows])

@app.route('/api/history', methods=['POST'])
def history_save():
    d  = request.get_json()
    db = get_db()
    db.execute(
        '''INSERT INTO readings
           (gua_name, bian_gua_name, yao_types, year_gz, month_gz, day_gz, hour_gz, lang)
           VALUES (?,?,?,?,?,?,?,?)''',
        (d.get('guaName',''), d.get('bianGuaName',''),
         json.dumps(d.get('yaoTypes',[])),
         d.get('yearGz',''), d.get('monthGz',''),
         d.get('dayGz',''),  d.get('hourGz',''),
         d.get('lang','zh'))
    )
    db.commit()
    return jsonify({'ok': True})

@app.route('/api/history/<int:rid>', methods=['DELETE'])
def history_delete(rid):
    db = get_db()
    db.execute('DELETE FROM readings WHERE id = ?', (rid,))
    db.commit()
    return jsonify({'ok': True})

# ── 启动 ─────────────────────────────────────────────────
if __name__ == '__main__':
    if not DATABASE.exists():
        init_db()
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port, debug=os.environ.get('FLASK_ENV') == 'development')
