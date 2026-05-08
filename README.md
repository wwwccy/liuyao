# 六爻排盘 · Liu Yao Oracle

A single-file Six Lines (六爻) divination tool built on traditional Na Jia (纳甲) methodology. No installation, no dependencies — open the HTML file and start reading.

**English / 中文 bilingual interface.**

---

## Features

- **三钱法 Coin casting** — shake three coins six times to generate a hexagram, or enter lines manually
- **四值 Four Pillars** — year, month, day, and hour stems and branches calculated from cast time (Beijing time)
- **纳甲 Na Jia** — full 64-hexagram earthly branch table based on《卜筮正宗》
- **六亲 Six Relatives** — calculated from the hexagram palace's Five Element, displayed with full earthly branch and element (e.g. 父母辰土 / Parents Chen Earth)
- **六神 Six Spirits** — assigned from the day stem, starting at Line 1 (青龙 Azure Dragon → 朱雀 Vermilion Bird → 勾陈 Earth Guardian → 螣蛇 Soaring Serpent → 白虎 White Tiger → 玄武 Black Tortoise)
- **空亡 Void** — calculated from the day pillar's 旬 cycle, marked on each line
- **卦身 Hexagram Body** — yang hexagram starts from 子 (Rat), yin hexagram starts from 午 (Horse), counted up to the Self line position
- **世应 Self & Response** — marked on both Primary and Transformed hexagram
- **变卦 Transformed hexagram** — shown alongside Primary when changing lines are present; Six Relatives calculated using the **Primary** hexagram's palace element
- **卦辞爻辞 Judgments & Line texts** — bilingual (中/EN), for hexagrams included in `guaci.md`
- **Bilingual UI** — toggle between 中文 and EN in the top-right corner; all labels, Six Relatives, Six Spirits, stems/branches, and hexagram names translate fully

---

## Usage

1. Download `liuyao.html`
2. Open it in any modern browser — no server needed
3. Set the cast time (defaults to current time)
4. Choose **摇钱法** (coin) or **手动输入** (manual)
5. Cast or enter six lines from Line 1 (bottom) to Line 6 (top)
6. Click **排盘 / Cast**

---

## File Structure

```
liuyao.html     — the entire app (single file, ~45KB)
guaci.md        — bilingual judgment & line text source (update and paste into HTML)
README.md       — this file
```

Everything lives in `liuyao.html`. The JavaScript is inline, no build step required.

---

## Updating Judgments (卦辞爻辞)

Judgments are stored in the `GUACI` object inside `liuyao.html`. The format mirrors `guaci.md`:

```javascript
'乾为天': {
  zh: {
    guaci: '元亨，利贞。',
    baihua: '大为亨通，适宜守持正道。',
    yaoci: [
      { t: '初九：潜龙，勿用。', b: '阳气潜伏，时机未至。' },
      // ... lines 2–6
    ]
  },
  en: {
    guaci: 'Great success. Persistence furthers.',
    baihua: 'Supreme success through perseverance and righteousness.',
    yaoci: [
      { t: 'Line 1: Hidden dragon. Do not act.', b: 'The time is not yet right for action.' },
      // ... lines 2–6
    ]
  }
}
```

To add a hexagram: edit `guaci.md` with the bilingual content, then paste the converted JS object into the `GUACI = { ... }` block in the HTML.

---

## Na Jia System

The earthly branch sequences used are:

| Palace | Sequence (Line 1 → Line 6) |
|--------|---------------------------|
| 乾 Qian | 子寅辰午申戌 |
| 坎 Kan  | 寅辰午申戌子 |
| 艮 Gen  | 辰午申戌子寅 |
| 震 Zhen | 子寅辰午申戌 |
| 巽 Xun  | 丑亥酉未巳卯 |
| 离 Li   | 卯丑亥酉未巳 |
| 坤 Kun  | 未巳卯丑亥酉 |
| 兑 Dui  | 巳卯丑亥酉未 |

Any hexagram's Na Jia = lower trigram's palace [lines 1–3] + upper trigram's palace [lines 4–6].  
Exception: 山火贲 uses a fixed override per classical sources.

---

## Six Relatives Reference

| Relationship (中/EN) | Rule |
|----------------------|------|
| 父母 Parents | Element generates the palace element |
| 子孙 Descendants | Palace element generates the line element |
| 兄弟 Siblings | Same element as palace |
| 妻财 Wealth | Palace element overcomes the line element |
| 官鬼 Officer | Line element overcomes the palace element |

---

## Translation Reference

**Six Spirits 六神**

| 中文 | English |
|------|---------|
| 青龙 | Azure Dragon |
| 朱雀 | Vermilion Bird |
| 勾陈 | Earth Guardian |
| 螣蛇 | Soaring Serpent |
| 白虎 | White Tiger |
| 玄武 | Black Tortoise |

**Six Relatives 六亲**

| 中文 | English |
|------|---------|
| 父母 | Parents |
| 子孙 | Descendants |
| 兄弟 | Siblings |
| 妻财 | Wealth |
| 官鬼 | Officer |

---

## Methodology Notes

- **Day pillar** is calculated using a Julian Day Number formula from a verified reference point (1984-01-01 = 甲午). No browser timezone conversion is applied — the input datetime is treated directly as Beijing time.
- **Month pillar** uses approximate solar term dates (节气). For borderline dates near a term, verify against a traditional almanac (万年历).
- **Hexagram Body (卦身)**: yang Self line starts counting from 子 at Line 1; yin Self line starts from 午 at Line 1. The body falls on the line position equal to the Self line number.
- **Transformed hexagram Six Relatives** use the **Primary hexagram's** palace element, not the Transformed hexagram's palace.

---

## License

MIT — free to use, modify, and distribute.
