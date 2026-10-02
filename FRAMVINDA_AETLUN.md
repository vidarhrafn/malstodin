# Framvinda nemenda – fjögur stig á reit – verkáætlun

Þetta skjal er minni verkefnisins. Hver áfangi er vistaður (commit + push) þegar honum lýkur.
Ef samtal slitnar heldur næsta lota áfram frá fyrsta óloknum áfanga hér að neðan.
Samhengi (stjórnborð, Netlify-föll, Firestore-reglur): sjá `BEKKIR_AETLUN.md`.

Grein: `claude/lucid-fermi-6en1cp`

---

## Markmið

Í framvindutöflu `stjornbord.html` (flipi „Framvinda nemenda“) verði fjögur stig á reit:

| Litur | Merking |
|---|---|
| grár | ekki byrjað |
| gulur | byrjað (`status: 'opened'`) |
| ljósgrænn með dekkri ramma | lokið, ekki allt rétt |
| heilgrænn | lokið, allt rétt |

Tooltip sýnir t.d. „Lokið – 8/10 rétt“. Ekki rautt/appelsínugult. „Lokið“-dálkurinn telur bæði grænu stigin.

## Ákvarðanir Viðars (samþykktar 2.10.2026 – ekki spyrja aftur)

1. **„Allt rétt“ = rétt í fyrstu tilraun** við hverja spurningu.
2. **Besta niðurstaða gildir** ef æfing er endurtekin – nemandi fellur aldrei niður um stig.
3. **Allt rétt = 100 %** (`correct === total`).
4. **Spjall og leikir: aðeins gulur og heilgrænn** – engin rétt/rangt-mæling.
5. **Sjálfspróf:** sami fjórlitur; tooltip sýnir stig („Lokið – 34/40 rétt“).
6. **Týndar æfingar bætast við stjórnborðið** (sjá áfanga 1).

## Gagnasnið

`progress/{uid}/{course}/{exerciseId}`:
- `status: 'completed'` = kláraði (óháð villum), auk `correct` og `total` (heiltölur, fyrsta tilraun)
  þar sem rétt/rangt á við.
- Við endurtekningu: skrifa aðeins ef `correct` er hærra en það sem fyrir er (lesa fyrst).
- Eldri `completed` án talna → heilgrænt.
- `firestore.rules` – engin breyting (nemandi les/skrifar eigið `progress`).

## Áfangar

Staða: ⬜ ekki byrjað · 🟨 í vinnslu · ✅ lokið

### ✅ Áfangi 1 – Týndar æfingar í stjórnborðið
- ÍSAT1ÍC: nýir flipar 💬 Spjall, 🎮 Leikir, 📝 Sjálfspróf; aukahlustanir (A1–A6) í 🎧 Hlustun;
  aukalestextar (A1–A2) í 📖 Lestextar.
- ÍSAT1ÍA: flash-leikir F1–F4 í 🎮 Leikir; nýr flipi 📝 Sjálfspróf (P1–P4).
- Heiti æfingar birtist þegar músin er yfir dálkhaus.

### ✅ Áfangi 2 – Fjögurra stiga litir
- `teacher-data.js` skilar `{ status, correct?, total? }` fyrir hverja æfingu.
- **Lagfæring:** æfingarnar skrifa `status: 'opened'` í hvert sinn sem þær eru opnaðar – líka eftir að
  þeim er lokið – svo nemandi sem opnaði æfingu aftur „féll“ í gult. Nú telst æfing lokið ef
  `completed_at` er til (helst við `merge`). Lagar líka eldri gögn.
- `stjornbord.html`: fjórir litir (`cell-none`, `cell-opened`, `cell-partial`, `cell-completed`),
  tooltip „Lokið – 8/10 rétt“, skýringar efst og í ❓ Leiðbeiningum, „Lokið“ telur bæði grænu stigin.
- Prófað: allar samsetningar gagna (eldri, nýjar, ógildar tölur) gefa réttan lit.

### ✅ Áfangi 3 – Hljóðritun ÍC og ÍA
- „Spurning“ = setning. `correct` = setningar sem voru alveg réttar í fyrstu tilraun,
  `total` = fjöldi setninga. „Lokið“ skráist þegar allar setningar eru búnar (líka með villum).
- **ÍC (12 skrár) – villa löguð:** „completed“ var skráð þegar eyður *einnar* setningar voru allar
  réttar (og aldrei ef nemandi skrifaði allt rétt í fyrstu tilraun). Nú tilkynnir hver setning
  `App` einu sinni og „completed“ skráist þegar þær eru allar búnar. „opened“ skráist einu sinni
  (áður einu sinni fyrir hverja setningu).
- **ÍA (13 skrár):** skráði þegar „completed“ rétt; nú líka `correct`/`total`.
- `writeProgress(..., score)` les fyrst eigið skjal og skrifar tölur aðeins ef `correct` er hærra
  (besta niðurstaða). Ef lestur mistekst eru tölur ekki skrifaðar (frekar en að lækka).
- Nemandi sér í lokin: „🏁 Verkefninu er lokið! 3 af 5 setningum rétt í fyrstu tilraun.“
- Prófað í Chromium með gervi-Firebase, allar 25 skrár: 1 rétt + 4 röng → `completed`, 1/5;
  endurtekning með verri niðurstöðu lækkar ekki; betri niðurstaða hækkar.

**Prófun áfanga 1–3 eftir birtingu (Viðar):**
1. Stjórnborð → Framvinda → ÍSAT1ÍC: flipar 💬 Spjall, 🎮 Leikir, 📝 Sjálfspróf sjást; A1–A6 í Hlustun, A1–A2 í Lestextum.
   Músin yfir dálkhaus (t.d. S2) sýnir heiti æfingar. ÍSAT1ÍA: F1–F4 í Leikjum og 📝 Sjálfspróf.
2. Huliðsgluggi, prufunemandi (`vidarhrafn+nemandiN@gmail.com`) í bekknum „prufa“ → ÍC → Hljóðritun 1.
   Skrifa eina setningu rétt, hinar vitlaust og fylla í eyður. Í lokin: „🏁 Verkefninu er lokið! 1 af 5 …“.
3. Stjórnborð → ↻ Uppfæra → R1 ljósgrænn með ramma, tooltip „Lokið – 1/5 rétt“, „Lokið“-dálkur telur hann.
4. Nemandi endurtekur R1 með allt rétt → R1 heilgrænn „Lokið – 5/5 rétt“. Endurtaka aftur með villum → helst heilgrænn.
5. Opna R1 aftur (án þess að klára) → helst grænn (féll áður í gult).

### ⬜ Áfangi 4 – Hlustun
### ⬜ Áfangi 5 – Lestextar
### ⬜ Áfangi 6 – Sjálfspróf
### ⬜ Áfangi 7 – Spjall og leikir (aðeins tryggja að „completed“ skráist)

**Prófun eftir hverja tegund:** prufunemandi (`vidarhrafn+nemandiN@gmail.com`, huliðsgluggi)
í bekknum „prufa“ (ÍSAT1ÍC, bekkjarkóði V2NNXN).

## Niðurstöður skönnunar (endurtekin 2.10.2026)

- Staðfest: öll auðkenni í lista Viðars eru skráð af æfingum en vantar í stjórnborðið.
- **Nýtt:** `isat1ic/leikir/visbendingaleikurB1-3.html` skráir `leikir_visbendingaleikurB1-3`
  en er ekki tengd af forsíðu ÍC → ekki bætt við stjórnborðið (spyrja Viðar síðar).
- `spjall2_ahugamal` (Myndaspjall) og `spjall2_likamsraekt` eru ekki tengd af forsíðu ÍC,
  en bætt við eins og Viðar bað um.
- Leikir ÍC sem skrá aðeins `opened` í dag (aldrei `completed`): flash, mahjong, ord, teiknileikur
  → lagað í áfanga 7.
