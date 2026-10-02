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

### ⬜ Áfangi 2 – Fjögurra stiga litir
- `teacher-data.js` skilar `correct`/`total` með stöðunni.
- `stjornbord.html`: fjórir litir, tooltip, skýringar efst, „Lokið“ telur bæði grænu stigin.

### ⬜ Áfangi 3 – Hljóðritun ÍC og ÍA
- „completed“ þegar lokið (líka með villum), með `correct`/`total` (fyrsta tilraun, besta niðurstaða).

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
