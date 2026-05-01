# Málstöðin — Codebase Audit Report

Audit date: 2026-05-01  
Branch: `claude/audit-malstodhin-codebase-OPOD6`  
Scope: All `.html` files in project root and subdirectories, plus `netlify/functions/`.

---

## CHECK 1 — Model usage

**STATUS: ISSUES FOUND**

Rules:
- `gpt-4o-mini` must be used for all scoring/feedback calls (STIG/ENDURGJÖF pattern)
- `gpt-4o` must be used **only** for translation evaluation (Þýðingar tab — JSON with `correct`, `detected_language`, `feedback_is`, `feedback_native`, `correct_translation`)

---

### Type A — gpt-4o used for scoring/feedback (should be gpt-4o-mini)

These files use `gpt-4o` for simple scoring or plain-text feedback where `gpt-4o-mini` is required.

- **FILE:** `synis/hlustun_ahugamal.html` (line 221): gpt-4o for plain-text short-answer feedback ("SKILAÐU BARA TEXTANUM") → `gpt-4o-mini`
- **FILE:** `synis/hlustun_sund.html` (line 237): gpt-4o for JSON `{correct, feedback}` scoring → `gpt-4o-mini`
- **FILE:** `synis/hlustun3_latur.html` (line 224): gpt-4o for JSON `{correct, feedback}` scoring → `gpt-4o-mini`
- **FILE:** `synis/bjorgunarsveitir.html` (line 221): gpt-4o for plain-text feedback ("SKILAÐU BARA TEXTANUM") → `gpt-4o-mini`
- **FILE:** `synis/likamsraekt.html` (line 219): gpt-4o for plain-text feedback ("SKILAÐU BARA TEXTANUM") → `gpt-4o-mini`
- **FILE:** `umsokn/lesflipar.html` (line 237): gpt-4o for plain-text feedback ("SKILAÐU BARA TEXTANUM") → `gpt-4o-mini`
- **FILE:** `umsokn/07_harpa_og_eirikur_kaupa.html` (line 192): gpt-4o for plain-text feedback ("SKILAÐU BARA TEXTANUM") → `gpt-4o-mini`
- **FILE:** `umsokn/hlustun7_bonus.html` (line 338): gpt-4o for JSON `{correct, feedback}` scoring → `gpt-4o-mini`
- **FILE:** `skuggi.html` (lines 218, 419): gpt-4o for pronunciation feedback (JSON scoring) → `gpt-4o-mini`
- **FILE:** `malmenni/mynd1.html` (line 269): gpt-4o for grammar feedback ("málfarsendurgjöf") → `gpt-4o-mini`
- **FILE:** `isat1ic/hlustanir/aukahlustun_karnival.html` (line 349): gpt-4o for JSON `{correct, feedback}` scoring → `gpt-4o-mini`
- **FILE:** `isat1ic/hlustanir/aukahlustun_bjorgun.html` (line 369): gpt-4o for content evaluation JSON `{correct, feedback}` → `gpt-4o-mini`
- **FILE:** `byrjun/eydufylling.html` (line 139): gpt-4o for grammar scoring JSON → `gpt-4o-mini`
- **FILE:** `byrjun/hlustun.html` (line 658): gpt-4o for correctness evaluation JSON → `gpt-4o-mini`
- **FILE:** `isan1ie/synisprof3.html` (line 366): gpt-4o for all evaluations incl. scoring JSON → `gpt-4o-mini`

---

### Type B — gpt-4o used for conversation AI / game logic (not translation)

These files use `gpt-4o` for conversation responses or game AI — neither scoring nor the required translation JSON pattern. Per audit rules, `gpt-4o` is reserved exclusively for translation evaluation.

- **FILE:** `synis/bjorgunarsveitir.html` (line 327): gpt-4o for conversation AI response → `gpt-4o-mini` or justified gpt-4o only if moved to translation
- **FILE:** `synis/hlustun4_bjorgun.html` (line 286): gpt-4o for conversation AI response → `gpt-4o-mini`
- **FILE:** `synis/spjall_ahugamal.html` (line ~194): gpt-4o for main conversation AI reply → `gpt-4o-mini`
- **FILE:** `umsokn/lesflipar.html` (line 350): gpt-4o for conversation AI response → `gpt-4o-mini`
- **FILE:** `umsokn/07_harpa_og_eirikur_kaupa.html` (line 305): gpt-4o for conversation AI → `gpt-4o-mini`
- **FILE:** `leikir/hver-er-madurinn.html` (lines 125, 185): gpt-4o for game AI (20 questions) → `gpt-4o-mini`
- **FILE:** `leikir/tollurinn.html` (lines 124, 203, 257): gpt-4o for game/customs-officer AI → `gpt-4o-mini`
- **FILE:** `malmenni/veitingastadur.html` (lines 339, 367, 421): gpt-4o for conversation roleplay AI → `gpt-4o-mini`
- **FILE:** `malmenni/fatabud.html` (lines 322, 349): gpt-4o for conversation AI → `gpt-4o-mini`
- **FILE:** `malmenni/fotin.html` (line 131): gpt-4o for conversation AI → `gpt-4o-mini`
- **FILE:** `isat1ic/spjall/spjall_ahugamal.html`: gpt-4o for conversation AI → `gpt-4o-mini`
- **FILE:** `isat1ic/lestextar/sumarvinna_alex.html` (lines 280, 386): gpt-4o for feedback text and conversation AI → `gpt-4o-mini`
- **FILE:** `byrjun/spjall.html` (lines 103, 173): gpt-4o for conversation AI → `gpt-4o-mini`
- **FILE:** `byrjun/kaffihusid.html` (lines 103, 172): gpt-4o for conversation AI → `gpt-4o-mini`
- **FILE:** `byrjun/sjalfsprof.html` (lines 222, 250, 273, 501): gpt-4o for multiple evaluation/assessment calls → `gpt-4o-mini`
- **FILE:** `byrjun/k1.html` (lines 281, 330): gpt-4o for large evaluation calls (2000–2500 tokens) → `gpt-4o-mini`
- **FILE:** `byrjun/innlogn.html` (lines 73, 101): gpt-4o for UI hint translation and word lookup (not Þýðingar tab) → `gpt-4o-mini`
- **FILE:** `isat1ia/myndalysing/elsa.html` (line 531): gpt-4o for image-description evaluation → `gpt-4o-mini`

---

### Type C — gpt-4o-mini used for translation evaluation (should be gpt-4o)

These files have the correct Þýðingar tab JSON pattern (`detected_language`, `feedback_is`, `feedback_native`, `correct_translation`) but use `gpt-4o-mini` instead of `gpt-4o`.

- **FILE:** `isat1ia/hlustun/hlustun1_fjolskyldan.html` (callOpenAI hardcodes `gpt-4o-mini`): translation tab → `gpt-4o`
- **FILE:** `isat1ia/hlustun/hlustun2_bakstur.html`: translation tab → `gpt-4o`
- **FILE:** `isat1ia/hlustun/hlustun3_leikhus.html`: translation tab → `gpt-4o`
- **FILE:** `isat1ia/hlustun/hlustun4_veitingastadur.html`: translation tab → `gpt-4o`
- **FILE:** `isat1ia/hlustun/hlustun5_vinir.html`: translation tab → `gpt-4o`
- **FILE:** `isat1ia/hlustun/hlustun6_hrekkjavaka.html`: translation tab → `gpt-4o`
- **FILE:** `isat1ia/hlustun/hlustun7_bonus.html`: translation tab → `gpt-4o`
- **FILE:** `isat1ia/hlustun/hlustun8_pizza.html`: translation tab → `gpt-4o`
- **FILE:** `isat1ia/hlustun/hlustun9_bjorninn.html`: translation tab → `gpt-4o`
- **FILE:** `isat1ia/hlustun/hlustun10_skolinn.html`: translation tab → `gpt-4o`
- **FILE:** `isat1ia/hlustun/hlustun11_framtidin.html`: translation tab → `gpt-4o`
- **FILE:** `isat1ia/hlustun/hlustun12_sumarvinna.html`: translation tab → `gpt-4o`
- **FILE:** `isat1ic/hlustanir/hlustun4_jol.html`: translation tab (`detected_language`) → `gpt-4o`
- **FILE:** `isat1ic/hlustanir/hlustun6_sumardagurinn_fyrsti.html`: translation tab (`detected_language`) → `gpt-4o`

---

### Files with CORRECT model usage (representative sample)

These files correctly use `gpt-4o` only for translation (Þýðingar tab) and `gpt-4o-mini` for all STIG/ENDURGJÖF scoring:

- `isat1ic/hlustanir/hlustun1_ahugamal.html` — gpt-4o-mini for STIG, gpt-4o for detected_language ✓
- `isat1ic/hlustanir/hlustun2_likamsraekt.html` ✓
- `isat1ic/hlustanir/hlustun3_bjorgunarsveit.html` ✓
- `isat1ic/hlustanir/hlustun5_paskar.html` ✓
- `isat1ic/hlustanir/hlustun7_divali.html` ✓
- `isat1ic/hlustanir/hlustun8_17juni.html` ✓
- `isat1ic/hlustanir/hlustun9_sumarvinna.html` ✓
- `isat1ic/hlustanir/hlustun10_fallhlifarstokk.html` ✓
- `isat1ic/hlustanir/hlustun11_dbcooper.html` ✓
- `isat1ic/hlustanir/hlustun12_mona_lisa.html` ✓
- `isat1ic/hlustanir/aukahlustun_ahugamal.html` ✓
- `isat1ic/hlustanir/aukahlustun_latur.html` ✓
- `isat1ic/hlustanir/aukahlustun_jolahefdir.html` ✓
- `isat1ic/lestextar/bjorgunarsveitir.html` ✓
- `isat1ic/lestextar/sumardagurinn_fyrsti.html` ✓
- `isat1ic/lestextar/17_juni.html` ✓
- `isat1ic/lestextar/divali_ljosahatid.html` ✓
- `isat1ic/lestextar/fallhlifin.html` ✓
- `isat1ic/lestextar/sumarvinna_veroniku.html` ✓
- `umsokn/hlustun7_bonus.html` (line 282, translation tab) ✓

**Total violations: 47 (15 Type A + 18 Type B + 14 Type C)**

---

## CHECK 2 — JSON parse safety

**STATUS: ISSUES FOUND**

Rule: Every file calling `gpt-4o` that expects JSON **must** clean markdown fences before parsing:
```js
const clean = result.replace(/```json\s*/g, '').replace(/```/g, '').trim();
```

---

### FAIL — JSON.parse on raw OpenAI output (no cleaning)

- **FILE:** `skuggi.html` (line 220): `const parsed = JSON.parse(result)` — raw `gpt-4o` output, no fence removal → add cleaning step before parse
- **FILE:** `skuggi.html` (line 421): `const parsed = JSON.parse(result)` — same function, second call site → add cleaning step before parse
- **FILE:** `umsokn/hlustun7_bonus.html` (line 89): `extractFirstJSON()` finds first `{` / last `}` but skips fence removal → add `.replace(/\`\`\`json\s*/g, '').replace(/\`\`\`/g, '')` before slice
- **FILE:** `synis/spjall_ahugamal.html` (line ~203): `jsonData = JSON.parse(lastLine)` — last line of `gpt-4o` response parsed directly → add cleaning; same file has correct pattern at line ~287
- **FILE:** `malmenni/fotin.html` (line 38): `JSON.parse(last)?.action` — last line of `gpt-4o` response, no fence removal → add cleaning step
- **FILE:** `isan1ie/synisprof3.html` (lines 384, 505, 525): `JSON.parse(res)` — raw response from `callAI()` (which uses `gpt-4o`) parsed without any cleaning at three call sites → add cleaning before each parse
- **FILE:** `isat1ic/spjall/spjall_ahugamal.html` (line ~280): `jsonData = JSON.parse(lastLine)` — last line of `gpt-4o` response, no cleaning → add cleaning step; same file has correct pattern later

**Total failures: 7 call sites across 6 files**

---

### PASS — Correct cleaning before JSON.parse (representative sample)

- `umsokn/07_harpa_og_eirikur_kaupa.html` (line 316): `JSON.parse(cleanResult)` with fence removal ✓
- `umsokn/lesflipar.html` (line 361): `JSON.parse(cleanResult)` ✓
- `synis/bjorgunarsveitir.html` (line 338): `JSON.parse(cleanResult)` ✓
- `synis/hlustun3_latur.html` (line 243): `JSON.parse(clean)` ✓
- `synis/likamsraekt.html` (line 336): `JSON.parse(cleanResult)` ✓
- `synis/spjall_ahugamal.html` (line ~287): `JSON.parse(cleanResult)` ✓
- `synis/hlustun4_bjorgun.html` (line 46): `extractFirstJSON()` with fence removal ✓
- `synis/hlustun_sund.html` (line 252): `JSON.parse(cleanResponse)` ✓
- `malmenni/mynd1.html` (line 58): `parseJSONSafe()` with cleaning ✓
- `byrjun/k1.html` (lines 284, 333): `JSON.parse(clean)` ✓
- `byrjun/spjall.html` (lines 120, 191): `JSON.parse(cleanResponse)` ✓
- `byrjun/kaffihusid.html` (lines 113, 183): `JSON.parse(cleanResponse)` ✓
- `isat1ic/lestextar/bjorgunarsveitir.html` (line 484): `JSON.parse(cleanResult)` ✓
- `isat1ic/lestextar/divali_ljosahatid.html` (line 369): `JSON.parse(clean)` ✓
- `isat1ic/hlustanir/hlustun5_paskar.html` (line 257): `JSON.parse(clean)` with fence removal ✓

---

## Summary Table

| Check | Status | Issue count |
|-------|--------|-------------|
| 1 – Model usage | ISSUES FOUND | 47 violations (15 Type A · 18 Type B · 14 Type C) |
| 2 – JSON parse safety | ISSUES FOUND | 7 unsafe call sites across 6 files |
