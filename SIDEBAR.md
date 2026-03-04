# Málstöðin – Hönnunarstaðall

Þetta skjal er leiðarvísir fyrir alla síðugerð í Málstöðinni. Þegar ný síða er búin til eða eldri uppfærð skal fylgja þessum stöðlum í öllum atriðum.

---

## 1. Síðutegundir og litaþema

Þrjár tegundir af æfingaríhlutum eru til. Sérhver tegund hefur sitt litaþema sem
heldur í gegn í öllum gluggum, hnappar og merkimiðum.

| Tegund | Emoji | Litaþema |
|---|---|---|
| Lestexti | 📖 | Blátt (`blue-600`) |
| Hlustunaræfing | 🎧 | Grænt (`green-600`) |
| Spjallæfing | 💬 | Fjólublátt (`purple-600`) |

Litaþemið á við um: hnappa, virka flipa, hljóðspilara, leiðbeiningabox og framvindureit.

---

## 2. HTML haus (head)

Sama uppbygging á öllum síðum:

```
charset UTF-8
viewport width=device-width, initial-scale=1.0
React 18 (production)
ReactDOM 18 (production)
Babel standalone
Tailwind CSS (cdn)
```

**Titill í vafraflipa:**
`[Emoji] [Tegund] [Nr]: [Heiti] – Málstöðin`

Dæmi:
- `📖 Lestexti 1: Áhugamál – Málstöðin`
- `🎧 Hlustun 1: Áhugamál – Málstöðin`
- `💬 Spjall 1: Áhugamál – Málstöðin`

---

## 3. Bakgrunnur og leturgerð

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  background: linear-gradient(to bottom, #f8f7f4 0%, #e8e6e1 100%);
  min-height: 100vh;
}
```

Þetta er fast á öllum síðum, breytist ekki eftir tegund.

---

## 4. Haus (header)

Fastur hvítur haus efst, ekki sticky. Uppbygging:

```
← Til baka   (textalink, ekki hnappur)
[Emoji] [Tegund] [Nr]: [Heiti]   (H1, font-light, text-3xl)
[Undirtitill] · A1–A2             (p, font-light, text-sm, text-gray-500)
```

Undirtitlar eftir tegund:
- Lestexti: `Lesskilningur · A1–A2`
- Hlustun: `Hlustunarverkefni · A1–A2`
- Spjall: `Samtalsæfing · A1–A2`

**Persónumerkimiðar** (litlir pillur til hægri í haus): Aðeins á hlustunar- og spjallsíðum
þar sem nafngreindar persónur koma við sögu. Ekki á lestextasíðum.

---

## 5. Leiðbeiningabox

Á öllum þremur síðutegundum, beint undir haus í `<main>`.
Litir eftir þema: `bg-[liti]-50 border border-[liti]-200 border-l-4 border-l-[liti]-500`.

Innihald eftir tegund:

**Lestexti:**
```
📖 Lestu textann hægt og rólega
✏️ Svaraðu krossaspurningunum
📝 Svaraðu stuttum spurningum með heilum setningum
💬 Ræddu spurningarnar með AI
```

**Hlustun:**
```
📘 Lestu lykilorðin hér að neðan fyrst
🎧 Hlustaðu á samtalið 2–3 sinnum
✏️ Svaraðu öllum flokkum spurninga
🔓 Þegar allt er lokið opnast textinn
```

**Spjall:**
```
💬 Spjallaðu um efnið með AI-kennaranum
🔄 Ef þú færð rangt: prófaðu að laga setninguna
✅ Þegar þú hefur lokið öllum efnisþáttum ertu búin/n
```

---

## 6. Lykilorðahluti (aðeins hlustun)

Fellanlegur hluti (`▼ Sýna` / `▲ Fela`) með gulum kortum fyrir hvert orð.
Sjálfgefið opinn (`true`). Kemur á undan hljóðspilaranum.

Hvert lykilorðakort: `bg-yellow-50 border border-yellow-200 rounded-lg p-3`
- Orð og kyn (`font-medium text-sm`)
- Vísbending/skýring (`text-xs text-gray-600 font-light`)

---

## 7. Hljóðspilari (aðeins hlustun)

Fastur efst (sticky, z-50) þegar notandinn skrollar. Þema: grænt.

Inniheldur:
- Spila/pása hnappur (kringlóttur, `bg-green-600`)
- Nafn hljóðskrár/texti: `🎧 Hlusta á samtalið`
- Hraðatakkar: `0.75×`, `1×`, `1.25×` (sjálfgefið `1×`)

```css
.sticky-player {
  position: sticky;
  top: 0;
  z-index: 50;
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.08);
}
```

---

## 8. Flipar (tabs)

**Alltaf sticky efst** (z-40, kemur fyrir neðan sticky-player ef hann er til).
Flipaslán er hluti af hvítu spjaldi sem efnið er í.

```css
.tab-btn { transition: all 0.2s; position: relative; }
.tab-btn:not(.active):hover { background: #f3f4f6; }
.tab-btn.active { background: white; color: #2563eb; font-weight: 500; }
.tab-btn.active::after {
  content: ''; position: absolute; bottom: -1px; left: 0; right: 0;
  height: 3px; background: #2563eb; border-radius: 2px 2px 0 0;
}
```

Þegar flipa er lokið (`done: true`) birtist `✓` við hliðina á titlinum.

**Flipar eftir tegund:**

Lestexti:
1. `✓ Krossaspurningar`
2. `📝 Stuttar spurningar`
3. `💬 Umræðuspurningar`

Hlustun:
1. `🔵 Þýðingar`
2. `✅ Rétt/Rangt`
3. `🔵 Krossaspurningar`
4. `📝 Stuttar spurningar`

Spjall: Engin flipar – efni er línulegt (ein umræða í einu).

---

## 9. Svarmöguleikar (MC og Rétt/Rangt)

**CSS klasanöfn** – sama alls staðar:

```css
.answer-option {
  border: 2px solid #e5e7eb;
  transition: all 0.2s;
  cursor: pointer;
}
.answer-option:hover:not(.opt-disabled) { border-color: #93c5fd; background: #eff6ff; }
.answer-option.opt-selected  { border-color: #3b82f6; background: #eff6ff; }
.answer-option.opt-correct   { border-color: #22c55e; background: #f0fdf4; }
.answer-option.opt-incorrect { border-color: #ef4444; background: #fef2f2; }
.answer-option.opt-disabled  { cursor: default; }
```

Þegar niðurstaða er komin: `✓` til hægri á réttum valkosti, `✗` á röngum völdum.

---

## 10. FeedbackBadge (AI endurgjöf)

Samræmd útfærsla á öllum síðum. Notar `score` (0–5):

| Stig | Litur | Merking |
|---|---|---|
| 4–5 | Grænt | Rétt / vel gert |
| 2–3 | Gult/amber | Nokkuð rétt |
| 0–1 | Rautt | Rangt / reyndu aftur |

Birting: `STIG: [tala]` og `ENDURGJÖF: [ein setning á íslensku]`

Alltaf `Reyna aftur` hlekkur undir endurgjöfinni.

---

## 11. Framvinduraking

**Fast neðst á skjánum** (`fixed bottom-0`) á öllum síðutegundum.
Litaþema eftir síðutegund.

```
[Þemalitur] bg-white border-t shadow-lg
Inniheldur: einn takki fyrir hvern flipa/þátt
Lokinn: fylltur í þemaliti  |  Ólokinn: grár
```

Hnappar í framvindustikunni virka sem flakkstakkar á milli flipa.

---

## 12. Textaopnun þegar allt er lokið (hlustun)

Þegar öllum flipum hlustunaræfingar er lokið birtist `🎉 Vel gert!` kassi
með takka til að opna/loka samtalstextanum. Textinn er sýndur sem spjallbólur
(chat bubbles) litaðar eftir persónum.

Þetta gildir **aðeins** um hlustunaræfingar. Lestextasíður hafa textann sýnilegan
frá byrjun (fellanlegann). Spjallsíður hafa engan slíkan hluta.

---

## 13. Spjallviðmót (aðeins spjall)

- `max-w-2xl` (þrengra en aðrar síður vegna spjallsniðsins)
- Spjallgluggi með `max-height` og `overflow-y: auto`
- Notandabólur: til hægri, `bg-blue-100`
- AI-bólur: til vinstri, `bg-gray-100`
- Innsláttarsvæði fast neðst í spjallglugganum (ekki sama og framvinduraking)
- Lykilorðahluti (`📘 Lykilorð`) fyrir neðan spjallgluggann

Umræðuþema (topics) eru línuleg: þema 1 → þema 2 → þema 3.
Þema-titill sést efst í spjallinum, ekki sem flipar.

---

## 14. Max-width og bil

| Síðutegund | Max-width |
|---|---|
| Lestexti | `max-w-4xl` |
| Hlustun | `max-w-4xl` |
| Spjall | `max-w-2xl` |

`main`: `mx-auto px-4 mt-6 space-y-4 pb-20`
(pb-20 til að gefa pláss fyrir fasta framvindusiku)

---

## 15. JavaScript stíll

**Alltaf nútímalegur stíll:**
- `const` / `let` (aldrei `var`)
- Arrow functions (`() => {}`)
- `async/await` (ekki `.then()` keðjur)
- Destructuring þar sem við á

```javascript
// Rétt
const checkAnswer = async (i) => {
  const ans = shortAnswers[i].trim();
  if (!ans) return;
  // ...
};

// Rangt
function checkAnswer(i) {
  var ans = shortAnswers[i].trim();
  // ...
}
```

---

## 16. OpenAI API kall

Samræmt mynstur á öllum síðum:

```javascript
async function callOpenAI(messages, maxTokens = 120, temperature = 0.2) {
  const r = await fetch('/.netlify/functions/openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages,
      max_tokens: maxTokens,
      model: 'gpt-4o-mini',
      temperature,
    }),
  });
  const data = await r.json();
  if (!r.ok || data.error) throw new Error(data.error || `HTTP ${r.status}`);
  return data.content;
}
```

---

## 17. Fadeinn hreyfing

Ein `fadeIn` skilgreining á öllum síðum:

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-in { animation: fadeIn 0.35s ease both; }
```

Notuð þegar: flipaefni opnast, endurgjöf birtist, textahlutir opnast.

---

## 18. Skráaheiti

```
lestextar/[heiti].html         t.d. lestextar/ahugamal.html
hlustanir/hlustun[nr]_[heiti].html  t.d. hlustanir/hlustun1_ahugamal.html
spjall/spjall[nr]_[heiti].html      t.d. spjall/spjall1_ahugamal.html
```

Nota alltaf lágstafi og undirstrik, engar sérstæðar íslenskar stafir í skráarheitum.

---

## 19. Almennar hönnunarreglur

- **Farsímamiðuð:** Allt sem er sticky/fast er hannað með þumalfingur í huga.
  Neðri framvindusika er aðgengilegar en hliðar-sidebar.
- **font-light** er sjálfgefið fyrir meginmál. `font-medium` eða `font-semibold`
  aðeins þar sem sérstök áhersla þarf.
- **Engar skuggalegar shadows** – `shadow-sm` er hámark nema í sticky-player.
- **Rounded-xl** á spjöld og kortum. `rounded-lg` á minni íhlutum.
- Allar litabreytingar með `transition-colors` eða `transition: all 0.2s`.
