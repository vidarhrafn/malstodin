# Málstöðin — Platform Overview

**Málstöðin** (Icelandic: "The Language Station") is a web-based platform for teaching Icelandic as a second language. It delivers structured, AI-enhanced exercises targeting learners at the A1–A2 proficiency levels as defined by the Common European Framework of Reference for Languages (CEFR), with some materials extending toward B1–B2. The platform is designed for use in formal instruction contexts — primarily adult learners in Iceland enrolled in language courses at technical schools or continuing education institutions — and assumes that exercises are assigned by a teacher and completed independently by students.

---

## Target Audience

- **Primary users**: Adult learners of Icelandic as a second language (L2 Icelandic), CEFR A1–B2
- **Institutional context**: Technical schools and continuing education colleges in Iceland (e.g., Tækniskólinn)
- **Teacher role**: Instructors distribute time-limited access codes; the platform handles authentication and progress tracking automatically
- **Learner profile**: Multilingual adults with diverse L1 backgrounds; the AI feedback system is designed to be language-agnostic and detects the learner's native language automatically in translation tasks

---

## Tech Stack Summary

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | HTML5 + React 18 (CDN) | Exercise UI, routing, state |
| Styling | Tailwind CSS (CDN) | Responsive design, theming |
| Serverless backend | Netlify Functions (Node.js) | API endpoints for AI and TTS |
| AI feedback | OpenAI GPT-4o-mini | Short-answer grading, conversation simulation |
| Text-to-speech | Azure Cognitive Services | Icelandic TTS (`is-IS-GudrunNeural`, `is-IS-GunnarNeural`) |
| Authentication | Firebase Auth | Email/password and Google OAuth |
| Database | Firebase Firestore | User access, progress tracking |
| Hosting | Netlify | Static files + serverless functions |
| Supplementary DB | Supabase | Optional fallback for user/progress data |
| Vocabulary source | Google Sheets (TSV export) | Word lists fetched at runtime |

A deliberate architectural decision is the **absence of a build toolchain**: all pages are standalone HTML files that load React and Babel from CDN, meaning any file can be edited and deployed without a compilation step. This lowers the barrier for ongoing content development significantly.

---

## Courses

The platform hosts multiple parallel courses, each in its own directory:

| Directory | Course ID | Description |
|---|---|---|
| `isat1ia/` | ÍSAT1ÍA | Main course; most fully developed |
| `isat1ic/` | ÍSAT1ÍC | Secondary variant; parallel structure |
| `isan1ib/` | ÍSAN1ÍB | Beginner course; chapter-based organization |
| `isan1ie/` | ÍSAN1ÍE | Additional beginner variant |

Each course is self-contained with its own login page, exercise subdirectories, and access code system.

---

## Overall Architecture

```
Browser (React + Tailwind, no build step)
        │
        ├── Firebase Auth  ──────────────────────── Firestore
        │   (login.html)                            (user_access, progress)
        │
        ├── /.netlify/functions/openai  ──────────── OpenAI API (GPT-4o-mini)
        │   (short-answer grading, conversation)
        │
        ├── /.netlify/functions/speak   ──────────── Azure Cognitive Services
        │   (Icelandic TTS)                          (is-IS-GudrunNeural)
        │
        ├── /.netlify/functions/tts     ──────────── OpenAI TTS API (nova voice)
        │   (fallback TTS, non-Icelandic)
        │
        ├── /.netlify/functions/auth-firebase  ────── Firestore (access verification)
        │   (gate on every exercise load)
        │
        └── /.netlify/functions/get-words  ─────────── Google Sheets (TSV)
            (vocabulary lists at runtime)
```

### Request Lifecycle for an Exercise

1. Student loads an exercise page
2. Firebase ID token is retrieved; `auth-firebase` function verifies token validity and course access expiry
3. Exercise renders; audio is served from `/media/` (MP3 files committed to repository)
4. Student submits a short answer → `openai` function grades it (0–5 STIG score)
5. Student engages in conversation → `openai` function simulates an Icelandic teacher and, in a parallel call, checks grammar
6. AI responses are optionally spoken aloud via `speak` (Azure Icelandic TTS) or `tts` (OpenAI)
7. On exercise completion, a Firestore document is written to `progress/{uid}/{course}/{exerciseId}`

### Access Control Model

Access is governed by teacher-issued codes rather than open registration. A teacher creates codes in Firestore; students enter a code on their first login, which grants six months of access to a specific course. The `activate-code` function enforces code validity, course matching, and expiry. Once activated, access is checked on every page load via `auth-firebase`.

---

## Related Documentation

- [[malstodin-exercises]] — Full inventory of exercises with CEFR levels and skill types
- [[malstodin-netlify-functions]] — API layer: all serverless functions documented in detail
- [[malstodin-pedagogical-decisions]] — Language learning principles behind the design
- [[malstodin-ideas-and-gaps]] — Observations on gaps, patterns, and future directions
