# Málstöðin — Ideas and Gaps

This document identifies features that appear to be in progress, recurring code patterns that could be abstracted into reusable components, and prioritized suggestions for future development. It is based on structural analysis of the codebase rather than user research. See [[malstodin-pedagogical-decisions]] for the pedagogical rationale behind existing design choices and [[malstodin-exercises]] for the current exercise inventory.

---

## Features That Appear Planned But Not Yet Built

### 1. Per-Question Analytics

The Supabase `saveProgress` action accepts fields including `mc_score`, `tf_score`, `short_score`, and `matching_score`, and the `saveActivity` action accepts arbitrary `data` payloads. However, the admin dashboard (`admin-data.js`) currently returns only high-level engagement data (activation dates, expiry, code usage counts). The data schema is ready for per-question analytics — dashboards showing which questions learners find hardest, or aggregated class performance by tab type — but this view has not been implemented on the frontend.

**Suggested completion**: A teacher-facing analytics panel showing score distributions per exercise and per tab type would make the platform significantly more useful for formative assessment and curriculum revision.

### 2. Pronunciation Recording and Feedback

The `hljodritun/` directories contain 12–13 pronunciation exercise files, and corresponding audio files exist in `media/hljodritun/`. The current structure suggests these exercises play model audio for learners to hear. However, there is no evidence in the codebase of a speech recording interface (Web Audio API / MediaRecorder) or a server-side endpoint for evaluating learner pronunciation. The Azure Speech SDK supports pronunciation assessment natively and could be integrated through a new Netlify function.

**Suggested completion**: Add a `pronounce.js` function using Azure's pronunciation assessment API, and add a record-and-compare interface to pronunciation exercise pages.

### 3. Extended Writing Tasks

No current exercise type requires extended written production (emails, descriptions, short essays). The infrastructure for AI grading of short answers is mature and could be extended to evaluate longer compositions with adapted system prompts addressing coherence, vocabulary range, and grammatical accuracy.

**Suggested completion**: A `skrif` (writing) exercise type with word-count targets, a multi-criteria rubric (STIG for content, grammar, and lexical range separately), and AI-generated reformulations of the learner's text as a model answer.

### 4. Vocabulary Game Integration with Progress Tracking

The games hub (`leikir/`) contains several vocabulary games (Teiknileikur, Orðaleikur, Mahjong, Fantasíuleikur), but games do not appear to write progress data to Firebase. Given that the progress tracking infrastructure is already in place for exercises, integrating games into the same `progress/{uid}/{course}/{gameId}` schema would allow teachers to see vocabulary game engagement alongside exercise completion.

### 5. Spaced Repetition Vocabulary System

Vocabulary is currently pre-taught within each exercise via static glossary cards. There is no cross-exercise vocabulary tracking — a learner who has seen the word *fjölskylda* (family) in exercises 1, 3, and 7 has no mechanism for scheduled review of that word. A spaced repetition system (SRS) integrated into the games or a dedicated flashcard section could significantly strengthen vocabulary retention.

### 6. B1–B2 Exercise Tier

The existing materials are labeled A1–A2, but the platform name and course IDs suggest ambitions for higher levels. No B1–B2 exercise files are present in the explored codebase. Extending the AI system prompts to evaluate at B1–B2 level is straightforward; the primary investment would be in writing or sourcing higher-level texts and recordings.

---

## Recurring Patterns That Could Be Abstracted

### 1. Short-Answer Question Block

The pattern of "question text → text input → submit button → FeedbackBadge" appears in nearly every exercise (all reading and listening exercises, some conversation exercises). It is currently re-implemented as inline HTML+JavaScript on each page. Extracting this into a React component would:
- Reduce duplication across ~150+ exercise files
- Allow a single point of change for feedback display improvements
- Enable consistent tracking behavior (e.g., marking the question as `done` after a passing score)

**Proposed component**:
```jsx
<ShortAnswerQuestion
  questionText="Hverjir eru í fjölskyldunni?"
  systemPrompt="..."
  exerciseContext="..."
  onComplete={() => markTabDone('short')}
/>
```

### 2. Multiple-Choice Question Block

Similarly, the pattern of "question text → shuffled answer options → instant visual feedback" is re-implemented in every reading and listening exercise. A `MultipleChoiceQuestion` component with built-in shuffling, state management, and accessibility labeling would reduce the per-file JavaScript significantly.

### 3. AI Conversation Widget

The conversation interface (chat bubble display, turn counter, grammar badge, TTS playback button) is implemented across all 12 spjall exercises and also appears in reading exercise discussion tabs. A shared `ConversationWidget` component accepting a `systemPrompt` and `maxTurns` prop would unify this pattern and make future improvements (e.g., message history export, session continuity) easier to ship.

### 4. Audio Player (Sticky)

The sticky audio player with speed controls is duplicated across all listening exercises. It could be a self-contained React component initialized with a `src` prop.

### 5. Vocabulary Accordion

Pre-teaching vocabulary cards appear in all listening exercises with an identical structure (word, grammatical info, gloss). A `VocabularyAccordion` component accepting a word list as data (ideally fetched from Google Sheets via `get-words.js`) would separate content from presentation and allow vocabulary lists to be updated without touching exercise HTML files.

### 6. Auth Guard

Every exercise page currently includes inline JavaScript to call `auth-firebase`, handle errors, and redirect to login. This logic is identical across several hundred files. Extracting it into a shared `authGuard.js` module loaded via `<script>` tag would mean any future change to the access-check logic (e.g., adding a grace period, supporting multiple tokens) requires editing one file rather than hundreds.

---

## Suggestions for Future Development

### Short Term (Low Effort, High Impact)

1. **Shared JS modules**: Extract the auth guard, FeedbackBadge renderer, and AI call wrapper into shared scripts referenced across all pages. This is the single highest-leverage refactor in the codebase given the no-build-toolchain architecture.

2. **Progress analytics view**: Build a per-exercise score distribution panel into the admin dashboard using the score fields already supported by `supabase.js`.

3. **Vocabulary SRS integration**: Connect `get-words.js` to a lightweight SRS algorithm (e.g., SM-2) and surface a daily review deck on the course landing page.

### Medium Term (Moderate Effort)

4. **Pronunciation feedback**: Integrate Azure pronunciation assessment into `hljodritun/` exercises, giving learners a phoneme-level score on their recorded attempts.

5. **Writing exercises**: Add a `skrif/` section with AI-graded composition tasks at A2–B1 level.

6. **Teacher exercise builder**: A simple admin interface for creating new short-answer or MC exercises from a text + question list, generating a new HTML file from a template, would dramatically accelerate content production.

### Longer Term (Higher Effort, Strategic Value)

7. **Learner dashboard**: A student-facing view of their own progress across exercises (completion rates, score trends, vocabulary seen) would strengthen the self-regulation and autonomy features already present in the exercise UX.

8. **B1–B2 course tier**: Once the component patterns are abstracted, new exercises at a higher CEFR level can be produced by adapting existing templates with new content and adjusted AI system prompts.

9. **Offline / PWA support**: The no-build architecture is almost ready for a Progressive Web App conversion (Service Worker for caching exercise pages and audio). This would be valuable for learners with unreliable internet access, which is a real constraint in some immigrant and refugee populations that Icelandic L2 courses serve.

10. **Corpus integration**: Connecting to a learner corpus of common A1–A2 errors in Icelandic (if one were developed or published) would allow AI feedback prompts to be specifically calibrated to the most frequent errors made by learners of specific L1 backgrounds.

---

## Structural Observations for Grant Applications

For researchers or grant writers, the following structural features of Málstöðin are worth foregrounding as evidence of technical maturity and scalability:

- **Multi-course architecture**: The codebase already hosts four parallel course variants (ÍSAT1ÍA, ÍSAT1ÍC, ÍSAN1ÍB, ÍSAN1ÍE), demonstrating that the platform can support curriculum diversification without architectural changes.
- **Cost-controlled AI**: The choice of GPT-4o-mini and per-function token limits reflects an economically sustainable approach to AI integration that does not scale costs linearly with learner volume.
- **Teacher access management**: The access code system with expiry tracking is production-ready and removes the need for institutional IT support for user provisioning.
- **Modular data layer**: The parallel Firebase and Supabase integrations indicate architectural flexibility; migrating to a different data backend (e.g., for GDPR compliance reasons) is feasible without rewriting exercise pages.

---

## Related Documentation

- [[malstodin-overview]] — Platform architecture and tech stack
- [[malstodin-exercises]] — Current exercise inventory
- [[malstodin-pedagogical-decisions]] — Learning theory underpinning the platform
- [[malstodin-netlify-functions]] — API layer documentation
