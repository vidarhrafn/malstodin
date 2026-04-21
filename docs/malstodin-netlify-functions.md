# Málstöðin — Netlify Functions

All server-side logic is implemented as Netlify serverless functions in `netlify/functions/`. They are invoked by the browser at `/.netlify/functions/<name>` via HTTP POST (or GET for diagnostics). All functions are Node.js; the bundler is `esbuild` as configured in `netlify.toml`.

See [[malstodin-overview]] for how these functions fit into the overall architecture.

---

## Function Inventory

### `openai.js` — AI Feedback and Conversation

**Purpose**: Central proxy to the OpenAI Chat Completions API. Used for short-answer grading, conversation simulation, grammar checking, and translation evaluation.

**Receives** (POST body):
```json
{
  "messages": [{ "role": "system|user|assistant", "content": "..." }],
  "max_tokens": 120,
  "model": "gpt-4o-mini",
  "temperature": 0.2
}
```

**Returns**:
```json
{ "content": "<assistant reply text>" }
```
or on error:
```json
{ "error": "<message>" }
```

**Model**: `gpt-4o-mini` (cost-optimized; adequate for A1–A2 language feedback)

**Environment variable**: `OPENAI_API_KEY`

**Usage patterns in exercises**:

| Pattern | `temperature` | `max_tokens` | Role in exercise |
|---|---|---|---|
| Short-answer grading | 0.2 | 120 | Evaluate written answer; return STIG + ENDURGJÖF |
| Discussion / conversation | 0.5 | 150 | Simulate Icelandic teacher; respond naturally |
| Grammar check | 0.2 | 80 | Identify one grammatical error only (or return `ENGIN`) |
| Translation evaluation | 0.2 | 120 | Evaluate translation; return JSON with correctness + bilingual feedback |

**AI prompt patterns**:

*Short-answer grading* — The system prompt instructs the model to act as an Icelandic language teacher evaluating a beginner's written response. The response must follow a strict two-field format:
```
STIG: [0-5]
ENDURGJÖF: [one sentence of feedback in Icelandic]
```
- `STIG` (score) is parsed by the frontend and mapped to red/amber/green
- `ENDURGJÖF` (feedback) is displayed verbatim to the learner

*Grammar check* — A separate, parallel call with a tightly constrained system prompt. The model must return either `ENGIN` (no error) or a single corrective sentence. Feedback is suppressed if the model is less than 80% confident, reducing false positives that would confuse beginners.

*Conversation* — System prompt establishes the AI as a friendly Icelandic teacher ("Þú ert vingjarnlegur íslenskukennari...") with contextual information about the exercise (e.g., who is in the photograph). Responses are limited to 1–2 sentences to maintain a natural conversational pace.

---

### `speak.js` — Azure Icelandic Text-to-Speech

**Purpose**: Converts text to speech using Microsoft Azure Cognitive Services with Icelandic neural voices. This is the primary TTS function for all Icelandic-language audio output.

**Receives** (POST body):
```json
{
  "text_to_speak": "Halló, hvernig hefur þú það?",
  "voice": "is-IS-GudrunNeural",
  "rate": "1.0"
}
```

**Returns**:
```json
{ "audio_base64": "<base64-encoded MP3>" }
```

**Azure voices used**:

| Voice ID | Gender | Character | Usage |
|---|---|---|---|
| `is-IS-GudrunNeural` | Female | Default; warm, clear | AI teacher responses (default) |
| `is-IS-GunnarNeural` | Male | Alternative | Available for male-voice contexts |

**Audio format**: MP3, 24 kHz, 48 kbit/s, mono

**Rate control**: `0.75` (slow) · `1.0` (normal) · `1.25` (fast) — mirrors the audio player speed controls

**Synthesis method**: SSML (Speech Synthesis Markup Language), enabling precise control over rate and voice selection

**Environment variables**: `AZURE_SPEECH_KEY`, `AZURE_SPEECH_REGION`

---

### `tts.js` — OpenAI Text-to-Speech (Fallback)

**Purpose**: Generates speech using OpenAI's TTS API. Serves as a non-Icelandic fallback or for contexts where Azure is unavailable.

**Receives** (POST body):
```json
{
  "text": "Hello, how are you?",
  "voice": "nova"
}
```

**Returns**:
```json
{ "audio": "<base64>", "contentType": "audio/mpeg" }
```

**Model**: `tts-1`  
**Default voice**: `nova` (neutral, clear)  
**Speed**: 0.9 (slightly slower than default for learner comprehension)  
**Environment variable**: `OPENAI_API_KEY`

**Note**: OpenAI TTS does not support Icelandic natively; this function is appropriate for English-language instructions or fallback scenarios only.

---

### `auth-firebase.js` — Course Access Verification

**Purpose**: Verifies that a user holds a valid, non-expired Firebase ID token and has active access to the requested course. Called on every exercise page load as a gate before content is shown.

**Receives** (POST body):
```json
{
  "idToken": "<Firebase ID token>",
  "course": "isat1ia"
}
```

**Returns** (success):
```json
{
  "valid": true,
  "uid": "<user UID>",
  "course": "isat1ia",
  "expiresAt": "<ISO date string>"
}
```

**Logic**:
1. Verify Firebase ID token via `firebase-admin`
2. Look up `user_access/{uid}` in Firestore
3. Check that `user_access[course].expires_at` is in the future
4. Return validation result

**Environment variables**: `FIREBASE_SERVICE_ACCOUNT` (JSON), `FIREBASE_PROJECT_ID`

---

### `activate-code.js` — Redeem Access Code

**Purpose**: Processes a student's first-time use of a teacher-issued access code. Grants six months of course access and records activation details.

**Receives** (POST body):
```json
{
  "idToken": "<Firebase ID token>",
  "code": "ABCD1234",
  "course": "isat1ia"
}
```

**Returns** (success):
```json
{
  "success": true,
  "expiresAt": "<ISO date string>"
}
```

**Logic**:
1. Verify Firebase ID token
2. Look up code in Firestore `access_codes/{code}`
3. Verify code belongs to the requested course
4. Check that the code itself has not expired
5. If student already has valid access to the course, return the existing expiry date (idempotent)
6. Otherwise, write `user_access/{uid}/{course}` with `expires_at = now + 6 months`
7. Increment `use_count` on the code document

**Environment variables**: `FIREBASE_SERVICE_ACCOUNT`, `FIREBASE_PROJECT_ID`

---

### `verify-code.js` — Pre-Login Code Validation

**Purpose**: Checks whether a code string is valid without requiring the user to be logged in. Used on the login page to give immediate feedback before account creation.

**Receives** (POST body):
```json
{ "code": "ABCD1234" }
```

**Returns**:
```json
{ "valid": true, "course": "isat1ia", "expiresAt": "<ISO date>" }
```

**Environment variables**: `FIREBASE_SERVICE_ACCOUNT`, `FIREBASE_PROJECT_ID`

---

### `admin-data.js` — Teacher / Admin Dashboard

**Purpose**: Returns aggregate user and code data to the admin dashboard. Protected by a simple password check (no Firebase token required for admin access).

**Receives** (POST body):
```json
{
  "adminPassword": "<secret>",
  "course": "isat1ia"
}
```

**Returns**:
```json
{
  "users": [
    {
      "uid": "...",
      "email": "student@example.is",
      "displayName": "Jón Jónsson",
      "course": "isat1ia",
      "expiresAt": "2025-12-01",
      "daysLeft": 42,
      "isExpired": false
    }
  ],
  "codes": [
    {
      "code": "ABCD1234",
      "course": "isat1ia",
      "expiresAt": "2025-09-01",
      "useCount": 15,
      "lastUsedAt": "2025-04-10"
    }
  ],
  "stats": {
    "totalUsers": 30,
    "activeUsers": 28,
    "expiredUsers": 2,
    "totalCodes": 5,
    "usedCodes": 5
  }
}
```

**Environment variables**: `ADMIN_PASSWORD`, `FIREBASE_SERVICE_ACCOUNT`, `FIREBASE_PROJECT_ID`

---

### `supabase.js` — Supabase User and Progress Management

**Purpose**: Alternative/supplementary data layer using Supabase (PostgreSQL). Provides login, progress saving, activity logging, and basic analytics. Secondary to Firebase in the current architecture.

**Receives** (POST body):
```json
{ "action": "<action name>", ...actionParams }
```

**Supported actions**:

| Action | Parameters | Returns |
|---|---|---|
| `login` | `{ username, password }` | User object |
| `saveProgress` | `{ user_id, exercise_id, score, completed, ...scores }` | Progress record |
| `saveActivity` | `{ user_id, exercise_id, activity_type, data, time_spent }` | Activity record |
| `getAllUsers` | `{}` | Array of `{ id, username, role }` |
| `getAllProgress` | `{}` | All progress records |
| `getProgress` | `{ user_id }` | Progress records for one user |

**Environment variables**: `SUPABASE_URL`, `SUPABASE_ANON_KEY`

---

### `get-words.js` — Google Sheets Vocabulary Fetch

**Purpose**: Fetches a vocabulary word list from a Google Sheets document published as TSV. Allows teachers to maintain vocabulary lists in a spreadsheet and have them reflected in exercises at runtime.

**Receives** (POST body):
```json
{ "sheetUrl": "https://docs.google.com/spreadsheets/..." }
```

**Returns**:
```json
{ "words": ["fjölskylda", "faðir", "móðir", ...] }
```

**Notes**: Extracts only the first column of the TSV. CORS headers are set to allow browser-direct calls if needed.

---

### `diag_openai.js` — OpenAI API Diagnostic

**Purpose**: Health-check endpoint for verifying OpenAI API key validity. Development and operational monitoring use only.

**Receives**: GET request (no body)

**Returns**:
```json
{
  "usingKeyEnding": "...xyz",
  "status": "ok",
  "openaiProjectHeader": "proj_...",
  "response": "Hello! ..."
}
```

**Environment variable**: `OPENAI_API_KEY`

---

## Environment Variables Summary

| Variable | Used by | Purpose |
|---|---|---|
| `OPENAI_API_KEY` | `openai.js`, `tts.js`, `diag_openai.js` | OpenAI API authentication |
| `AZURE_SPEECH_KEY` | `speak.js` | Azure Cognitive Services authentication |
| `AZURE_SPEECH_REGION` | `speak.js` | Azure region (e.g., `northeurope`) |
| `FIREBASE_SERVICE_ACCOUNT` | `auth-firebase.js`, `activate-code.js`, `verify-code.js`, `admin-data.js` | Firebase Admin SDK credentials (JSON string) |
| `FIREBASE_PROJECT_ID` | `auth-firebase.js`, `activate-code.js`, `verify-code.js`, `admin-data.js` | Firebase project identifier |
| `SUPABASE_URL` | `supabase.js` | Supabase project URL |
| `SUPABASE_ANON_KEY` | `supabase.js` | Supabase anonymous API key |
| `ADMIN_PASSWORD` | `admin-data.js` | Simple password for teacher dashboard access |

---

## Related Documentation

- [[malstodin-overview]] — Platform architecture context
- [[malstodin-exercises]] — How the AI functions are invoked from exercise pages
- [[malstodin-pedagogical-decisions]] — How AI feedback is used pedagogically
