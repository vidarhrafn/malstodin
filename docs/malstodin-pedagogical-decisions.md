# Málstöðin — Pedagogical Decisions

This document examines the language learning principles reflected in the design of Málstöðin, how AI-generated feedback is deployed pedagogically, and the implicit theory of second language acquisition (SLA) that underpins the platform's exercise architecture. See [[malstodin-exercises]] for the full exercise inventory and [[malstodin-netlify-functions]] for implementation details of the AI feedback layer.

---

## Underlying Language Learning Principles

### 1. Integrated Skills Development

Málstöðin is structured so that each thematic unit (e.g., "Family," "Daily routines") is addressed through three complementary exercise types: reading comprehension (*lestextar*), listening comprehension (*hlustun*), and conversation (*spjall*). This mirrors the principle of **integrated skills instruction** (Grabe & Stoller, 2002), in which receptive and productive modalities reinforce one another. A learner who reads about Icelandic family vocabulary, then hears it in a naturalistic dialogue, then attempts to use it in a simulated conversation engages in spaced repetition of lexical and grammatical forms across three distinct processing modalities.

### 2. Comprehensible Input and Output

The platform operationalizes Krashen's *Input Hypothesis* (i+1) and Swain's *Output Hypothesis* in complementary ways:

- **Comprehensible input**: Reading texts and audio dialogues are calibrated to A1–A2 level. Audio playback speed controls (0.75×, 1×, 1.25×) allow learners to adjust the challenge level of naturalistic input, supporting access to slightly above-level material without abandoning comprehension entirely.
- **Pushed output**: Short-answer tasks and conversation exercises require production of complete Icelandic sentences, not just recognition. The AI teacher does not provide the answer; it responds to what the learner produces, creating a pressure to communicate meaningfully.

### 3. Pre-Teaching Vocabulary (Cognitive Load Management)

Every listening exercise presents a collapsible vocabulary glossary before any exercise tabs are shown. Each entry includes the word, its grammatical category (noun gender: *kk*/*kvk*/*hk*, or part of speech: *lo* for adjective), and an Icelandic-language gloss or definition. This is a direct application of **cognitive load theory** (Sweller, 1988): by making key vocabulary available before the audio plays, the platform reduces the extraneous cognitive load of unknown words so that learners can allocate working memory to comprehension of the whole text.

The decision to gloss vocabulary in Icelandic rather than the learner's L1 reflects a communicative approach that keeps the learning environment maximally in the target language.

### 4. Noticing and Focus on Form

The grammar feedback system in conversation exercises (*spjall*) embodies Schmidt's *Noticing Hypothesis* (1990): learners must consciously attend to a linguistic form for it to enter long-term memory. Rather than correcting every error (which risks overwhelming beginners and interrupting communicative flow), the system:

1. Makes a separate, parallel API call dedicated solely to grammar analysis
2. Surfaces at most one correction per turn
3. Suppresses feedback when the model's confidence is below 80%
4. Presents corrections as amber highlight badges visually distinct from the main conversational response

This design draws on **recasts and metalinguistic feedback** research in instructed SLA (Lyster & Ranta, 1997), which suggests that brief, salient form-focused feedback is more effective when it does not interrupt the communicative exchange entirely.

### 5. Authentic Communicative Tasks

The conversation exercises are image-based: learners describe a photograph to an AI teacher who responds as a naturalistic interlocutor. Image description tasks are well-established in communicative language teaching (CLT) as a means of eliciting genuine information-gap communication — the learner holds information (what they see) that the interlocutor does not, creating an authentic communicative purpose. The AI's system prompt establishes specific context about the photograph, enabling contextually coherent responses that move the conversation forward rather than recycling the same generic prompts.

The 4-turn limit per topic and the 3-topic structure per exercise provide scaffolded progression: short, manageable chunks reduce anxiety while ensuring learners practice sustained engagement within each topic.

### 6. Multiple Comprehension Question Types

Listening and reading exercises present several task types (multiple choice, true/false, short answer, translation, matching) in a consistent sequence. This reflects **task sequencing** principles that move from recognition (multiple choice, true/false) to recall (short answers) to production (discussion). The progression from lower to higher cognitive demand within a single exercise unit is consistent with Bloom's taxonomy as applied to L2 reading and listening pedagogy.

### 7. Intrinsic Motivation and Completion Feedback

Progress bars, per-tab completion indicators, and "Vel gert!" (Well done!) celebrations are implementation of **gamification** principles grounded in self-determination theory (Deci & Ryan, 1985): providing clear evidence of incremental progress supports learner autonomy and competence, two of the three basic psychological needs that drive intrinsic motivation. The transcript unlock mechanism — the full audio transcript becomes readable only after all exercise tabs are completed — creates a mild but effective behavioral incentive for completing the full task cycle.

### 8. Learner Autonomy and Flexibility

Several design decisions privilege learner control:
- "Reyna aftur" (Try again) on AI-graded tasks allows revision without penalty
- Speed controls on audio acknowledge that listening anxiety is a real obstacle for L2 learners
- The transcript unlock is available but not mandatory — learners who wish to review the text may do so without being forced to read it during the listening task itself
- The platform does not time exercises or penalize multiple attempts

These features align with autonomy-supportive pedagogy (Ushioda, 2011), which emphasizes learner agency and self-regulation over compliance-based instruction.

---

## How AI Feedback Is Used Pedagogically

### Short-Answer Grading (0–5 STIG Scale)

The AI evaluates written responses on a six-point scale and returns a single sentence of feedback in Icelandic. The scoring is mapped to a traffic-light color system (red, amber, green) that gives learners an immediate visual gestalt of their performance before reading the detailed feedback.

Key pedagogical implications:
- **Delayed elaboration**: The score is shown first, feedback second, mirroring principles of assessment for learning (Black & Wiliam, 1998) that suggest goal clarity precedes specific correction
- **Single-sentence feedback**: The constraint forces the AI to prioritize the most salient issue, reducing cognitive overload from lengthy corrections
- **Feedback in Icelandic**: Learners read the feedback in the target language, providing additional input even during the correction stage

### Conversation and Grammar Feedback (Spjall)

The two-call architecture — one call for conversational response, one for grammar checking — reflects a pedagogical separation between fluency and accuracy work. In instructed SLA, the tension between fluency-focused and accuracy-focused instruction is well-documented (Skehan, 1998). Málstöðin's design attempts to serve both by:
- Ensuring the main conversational exchange prioritizes meaning and communicative success
- Adding lightweight accuracy feedback that learners can notice without their exchange being derailed

The amber visual styling of grammar badges (as opposed to the red used for incorrect answers) signals that grammar feedback is informational rather than evaluative — a deliberate affordance design choice.

### Translation Feedback (Þýðingar tab)

The translation evaluation function auto-detects the learner's L1 and returns bilingual feedback (both in the learner's L1 and in Icelandic). This design acknowledges the multilingual reality of Icelandic L2 classrooms, where learners may come from dozens of different language backgrounds. Rather than providing a single-language correction that may itself be incomprehensible to the learner, the bilingual response maintains the target language frame while ensuring accessibility.

---

## Observations on Exercise Type Coverage

### What Is Present

| Skill | CEFR Modes | Exercise Types |
|---|---|---|
| Reading | Receptive/written | MC, short answer, discussion |
| Listening | Receptive/oral | T/F, MC, translation, short answer, matching |
| Speaking (mediated writing) | Productive/interactive | Image-based conversation |
| Vocabulary | Receptive | Pre-teaching glossary, matching |

### What Is Less Developed

- **Extended writing**: There is no exercise type requiring paragraphs, emails, or structured compositions — a notable gap at the A2–B1 transition
- **Explicit grammar instruction**: Grammar is addressed reactively (via feedback) rather than proactively; there is no dedicated grammar exercise type
- **Pronunciation production**: Pronunciation exercises (*hljóðritun*) exist but the interactive component is not documented in detail; it is unclear whether learners can record and receive feedback on their own speech
- **Peer interaction**: All exercises are individual; there is no collaborative or peer-feedback component
- **Reading fluency**: Speed reading, timed reading, or extensive reading tasks are absent

These observations are developed further in [[malstodin-ideas-and-gaps]].

---

## Related Documentation

- [[malstodin-overview]] — Platform architecture and tech stack
- [[malstodin-exercises]] — Full exercise inventory
- [[malstodin-netlify-functions]] — AI feedback implementation
- [[malstodin-ideas-and-gaps]] — Development priorities and feature gaps
