# Hringferð um Ísland - Menntaspil

Spil þar sem nemendur ferðast hringinn um Ísland, svara spurningum og læra um landið okkar.

## Skrár sem þarf að uploada á malstodin.org

1. **index.html** - Aðal HTML skrá
2. **game.js** - JavaScript kóði fyrir spilið
3. **island-punktar.png** - Kortamynd af Íslandi

## Uppsetning

### Skref 1: Uploada skrám
1. Farðu í malstodin.org
2. Búðu til nýja möppu (t.d. `/hringferd/`)
3. Uploadaðu öllum þremur skránum í sömu möppu

### Skref 2: Athuga Azure TTS
Spilið notar Azure Text-to-Speech í gegnum Netlify function sem þú hefur þegar uppsett í `/.netlify/functions/speak`

Það ætti að virka sjálfkrafa ef:
- Netlify functions eru virkar á malstodin.org
- Azure TTS lykill er rétt stilltur

## Hvernig spilið virkar

### Upphaf
- 2-4 leikmenn skrá nöfn sín
- Fá landvætti (🐉🦅🐂🗿)

### Leikur
1. Leikmaður kastar teningi (1-6)
2. Færist um spilaborðið
3. Lendir á stað → spurning poppar upp
4. Azure TTS les upp stuttan texta um staðinn
5. Spurning birtist með 4 valmöguleikum
6. **Rétt svar** → fær að kasta aftur (max 2x í röð)
7. **Rangt svar** → næsti leikmaður

### Sigur
Fyrsti leikmaðurinn sem klárar alla 30 staðina vinnur!

## Staðir á kortinu (30 í röð)

1. Reykjavík (byrjun)
2. Borgarnes
3. Snæfellsjökull
4. Stykkishólmur
5. Rauðisandur
6. Látrabjarg
7. Dynjandi
8. Ísafjörður
9. Hólmavík
10. Hvammstangi
11. Blönduós
12. Siglufjörður
13. Akureyri
14. Goðafoss
15. Mývatn
16. Húsavík
17. Ásbyrgi
18. Dettifoss
19. Vopnafjörður
20. Egilsstaðir
21. Seyðisfjörður
22. Djúpivogur
23. Höfn
24. Jökulsárlón
25. Skaftafell
26. Vík í Mýrdal
27. Skógafoss
28. Seljalandsfoss
29. Vestmannaeyjar
30. Bláa lónið

## Næstu skref - Bæta við spurningum

Eins og er er sama spurningin á öllum stöðum (prófunargögn).

Til að bæta við raunverulegum spurningum fyrir hvern stað:

1. Opnaðu `game.js`
2. Finndu `const questionData = {...}`
3. Breyttu í:

```javascript
const questionsForLocations = {
    "Reykjavík": {
        story: "Reykjavík er höfuðborg Íslands...",
        question: "Hvenær var Reykjavík stofnuð?",
        answers: ["874", "1786", "1918", "1944"],
        correctAnswer: 1,
        icon: "🏛️"
    },
    "Jökulsárlón": {
        story: "Jökulsárlón er stærsta jökullón Íslands...",
        question: "Hvað heitir jökullinn?",
        answers: ["Vatnajökull", "Breiðamerkurjökull", "Langjökull", "Hofsjökull"],
        correctAnswer: 1,
        icon: "🏔️"
    },
    // ... fleiri staðir
};
```

4. Í `showQuestion()` fallinu, breyttu:
```javascript
const locationName = location.name;
const questionData = questionsForLocations[locationName];
```

## Tæknilegar upplýsingar

- **Landscape mode** - spilið er best í láréttri átt
- **Azure TTS** - Guðrún rödd (is-IS-GudrunNeural)
- **Teningur** - 1-6, animation við kast
- **Max 2 í röð** - leikmenn geta kastað max 2x í röð ef þeir svara rétt

## Prófun

Áður en þú byrjar að nota þetta með nemendum:
1. Prófaðu alla 30 staðina
2. Athugaðu að Azure TTS virki
3. Prófaðu með mörgum leikmönnum

---

**Búið til af:** Claude
**Dagsetning:** Nóvember 2024
