# Málstöðin — Exercise Inventory

This document catalogs the exercise content across the platform's primary course (ÍSAT1ÍA), identifies recurring UI patterns, and notes structural conventions shared across exercise types. See [[malstodin-overview]] for platform context and [[malstodin-pedagogical-decisions]] for the learning theory behind these choices.

---

## Exercise Types

The platform organizes exercises into three skill-domain categories, each with a distinct visual theme:

| Domain | Icelandic label | Icon | Color theme | Subdirectory |
|---|---|---|---|---|
| Reading comprehension | Lestextar | 📖 | Blue (`blue-600`) | `lestextar/` |
| Listening comprehension | Hlustun | 🎧 | Green (`green-600`) | `hlustun/` |
| Conversation / speaking | Spjall | 💬 | Purple (`purple-600`) | `spjall/` |
| Pronunciation | Hljóðritun | 🔊 | — | `hljodritun/` |
| Games | Leikir | 🎮 | — | `leikir/` |

---

## Reading Exercises (Lestextar) — ÍSAT1ÍA

Each reading exercise presents a short narrative or informational text in Icelandic, followed by three tabs of comprehension tasks.

| # | Filename | Title (inferred) | CEFR Level | Exercise Types | Skills Practiced |
|---|---|---|---|---|---|
| 1 | `01_arni_elsa_harpa_hulda.html` | Árni, Elsa, Harpa og Hulda | A1–A2 | MC · Short answers · Discussion | Reading comprehension, writing, speaking |
| 2 | `02_ysa_i_raspi.html` | Ása í ráðspeki | A1–A2 | MC · Short answers · Discussion | Reading comprehension, writing, speaking |
| 3 | `03_*.html` | *(topic 3)* | A1–A2 | MC · Short answers · Discussion | Reading comprehension, writing, speaking |
| 4–13 | `04_` – `13_*.html` | *(topics 4–13)* | A1–A2 | MC · Short answers · Discussion | Reading comprehension, writing, speaking |

**Tab structure for every reading exercise:**

| Tab | Icelandic name | Task format | Feedback mechanism |
|---|---|---|---|
| 1 | Krossaspurningar | Multiple choice (3–5 questions, shuffled options) | Instant color-coded visual (✓/✗) |
| 2 | Stuttar spurningar | Short written answers (full sentences required) | AI scoring 0–5 (STIG) + prose feedback |
| 3 | Umræðuspurningar | Open discussion questions | AI conversation with grammar nudge |

---

## Listening Exercises (Hlustun) — ÍSAT1ÍA

Each listening exercise pairs a recorded Icelandic audio dialogue with a vocabulary glossary and five comprehension task tabs. Audio is served as MP3 files committed to the repository.

| # | Filename | Title | CEFR Level | Exercise Types | Skills Practiced |
|---|---|---|---|---|---|
| 1 | `hlustun1_fjolskyldan.html` | Fjölskyldan (The Family) | A1–A2 | Trans · T/F · MC · Short · Matching | Listening, translation, reading comprehension, writing |
| 2 | `hlustun2_*.html` | *(topic 2)* | A1–A2 | Trans · T/F · MC · Short · Matching | Listening, translation, reading comprehension, writing |
| 3–12 | `hlustun3_` – `hlustun12_*.html` | *(topics 3–12)* | A1–A2 | Trans · T/F · MC · Short · Matching | Listening, translation, reading comprehension, writing |

**Tab structure for every listening exercise:**

| Tab | Icelandic name | Task format | Feedback mechanism |
|---|---|---|---|
| 1 | Þýðingar | Word/phrase translation (learner's L1 auto-detected) | AI JSON response: correctness + bilingual feedback |
| 2 | Rétt/Rangt | True/False statements (6–8 items) about the audio | Instant visual (✓/✗) |
| 3 | Krossaspurningar | Multiple choice (4 questions, shuffled options) | Instant visual |
| 4 | Stuttar spurningar | Short written answers (3 questions) | AI scoring 0–5 + prose feedback |
| 5 | Pörun | Matching task (connect items from two columns) | Instant visual |

**After all tabs are complete**: a "Vel gert!" (Well done!) celebration state unlocks the full audio transcript, rendered as color-coded chat bubbles per speaker.

**Supplementary features:**
- Sticky audio player at the top of the page with playback rate selector (0.75×, 1×, 1.25×)
- Collapsible vocabulary accordion (default: open) showing word, grammatical category (kk/kvk/hk, lo), and Icelandic gloss

---

## Conversation Exercises (Spjall) — ÍSAT1ÍA

Each conversation exercise presents a photograph depicting people in a scene. The learner describes the image in Icelandic and engages in a multi-turn exchange with an AI teacher who simulates a patient, encouraging native Icelandic speaker.

| # | Filename | Title | CEFR Level | Exercise Types | Skills Practiced |
|---|---|---|---|---|---|
| 1 | `spjall1.html` | Krakkarnir í Reykjavík | A1–A2 | Image description · AI conversation | Speaking (written), pragmatic competence |
| 2 | `spjall2.html` | *(topic 2)* | A1–A2 | Image description · AI conversation | Speaking (written), pragmatic competence |
| 3–12 | `spjall3.html` – `spjall12.html` | *(topics 3–12)* | A1–A2 | Image description · AI conversation | Speaking (written), pragmatic competence |

**Structure:**
- Each exercise contains 3 sequential topics (e.g., describe person 1 → person 2 → scene)
- Each topic is limited to 4 conversational turns; after 4 turns, the AI prompts the learner to move on or continue
- After 3 topics are completed, the exercise is marked done

**AI interaction model:**
1. Learner sends a message in Icelandic
2. Two parallel API calls are made:
   - *Main response*: AI teacher replies naturally in Icelandic (1–2 sentences, temp 0.5, 150 tokens)
   - *Grammar check*: Separate LLM call identifies one grammatical error at >80% confidence (temp 0.2, 80 tokens)
3. Grammar feedback appears as an amber pill badge (📌 icon) only if an error is identified
4. AI response can be played aloud via Azure Icelandic TTS

---

## Pronunciation Exercises (Hljóðritun) — ÍSAT1ÍA

The repository contains 13 pronunciation exercise files in `hljodritun/` with associated audio in `media/hljodritun/`. Detailed tab structure varies; these exercises primarily focus on phonetic recognition and production practice.

---

## Games (Leikir)

The platform includes a dedicated games hub with vocabulary and language games. Games exist both as course-embedded versions and as standalone exercises in `leikir/`:

| Game | File | Description |
|---|---|---|
| Teiknileikur | `teiknileikur.html` | Drawing guessing game (Icelandic vocabulary) |
| Orðaleikur | `ordaleikur.html` | Word game |
| Mahjong | `mahjong.html` | Tile-matching vocabulary game |
| Fantasíuleikur | `fantasiuleikur.html` | Fantasy/role-play vocabulary game |

---

## Recurring UI Patterns

### FeedbackBadge

Used in all AI-graded short-answer tasks. Displays a score (0–5), a single feedback sentence, and a "Reyna aftur" (Try again) link.

| Score range | Color | Semantic meaning |
|---|---|---|
| 0–1 | Red | Incorrect or insufficient |
| 2–3 | Amber | Partially correct |
| 4–5 | Green | Correct or excellent |

### ProgressBar (Fixed Bottom Navigation)

A fixed bar at the bottom of every exercise page shows one button per tab. Each button is filled in the exercise's theme color once the tab is marked `done: true`, and gray otherwise. Clicking a button jumps directly to that tab. This gives learners a persistent overview of their progress without occupying content space.

### SectionHeader

A consistent header block used at the top of every exercise page, displaying:
- Exercise icon + number + title
- Subtitle showing exercise category and CEFR level (e.g., "Lesskilningur · A1–A2")

### Sticky Audio Player (Listening exercises only)

Positioned at the top of the viewport (`position: sticky; top: 0; z-index: 50`), the audio player persists while the learner scrolls through exercise content. Includes playback speed controls and a shadow to visually separate it from content below.

### Vocabulary Accordion (Listening exercises only)

A collapsible section (open by default) showing pre-taught vocabulary before exercise tabs begin. Each entry is a yellow card showing the Icelandic word, grammatical information (noun gender or part of speech), and an Icelandic-language gloss or definition. This is a deliberate cognitive load management strategy.

### Answer Option Styling

Multiple-choice and True/False answer buttons use a consistent four-state visual:

| State | Border | Background |
|---|---|---|
| Default | Light gray | White |
| Hover | Light theme color | Light |
| Selected | Theme color | Light theme |
| Correct | Green | Light green |
| Incorrect | Red | Light red |

### Fade-In Animation

All newly appearing content (tab panels, feedback badges, unlocked transcripts) uses a 0.35-second `fadeIn` animation (`opacity: 0 → 1` + `translateY(10px → 0)`), providing visual continuity without distraction.

---

## Related Documentation

- [[malstodin-overview]] — Platform architecture and tech stack
- [[malstodin-netlify-functions]] — AI and TTS API layer
- [[malstodin-pedagogical-decisions]] — Learning theory rationale for exercise design
- [[malstodin-ideas-and-gaps]] — Gaps in coverage and suggestions for expansion
