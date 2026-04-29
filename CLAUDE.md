# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Important:** This project uses Next.js 16 (Turbopack), which has breaking changes from earlier versions. Read `node_modules/next/dist/docs/` before writing framework code and heed any deprecation notices.

## Commands

```bash
npm run dev      # Dev server on http://localhost:3000 (Turbopack)
npm run build    # Production build — run this to catch type errors before finishing work
npm run start    # Serve the production build
npm run lint     # ESLint
```

There is no test suite. `npm run build` is the primary correctness check — always run it before declaring work done.

## Architecture

### Routes

| Route | Purpose |
|---|---|
| `/` | Home — tabbed shell (Lessons, Counters, Kana) |
| `/flashcards/[lesson]` | Vocabulary flashcard session for a lesson (1–10) |
| `/counters/[group]` | Counter quiz + reference for a group (1–5) |
| `/counters` | Counter group index (redirects only; map is embedded in home tabs) |

### Data layer (`data/`)

- **`words.ts`** — 310 vocabulary words, each tagged with `lesson` (1–10), `script`, `category`, `english[]` (all accepted answers), `hint`. `sampleWords(lesson, 10)` draws a random 10-card quiz from the full lesson pool. `checkAnswer` normalises spaces/hyphens/case for fuzzy EN matching.
- **`counters.ts`** — 98 `CounterQuizCard` objects across 5 groups. Cards carry `allAnswers[]` for accepted variants. `sampleCounterCards(group, 10)` samples for quizzes; `getCardsByGroup` returns the full set for the reference table.

### State & persistence (`lib/`)

- **`progress.ts`** — All vocabulary progress lives in `localStorage` under `jp_learn_progress`. `loadProgress()` always force-unlocks all 10 lessons on read (by design — all lessons are open). `computeLessonScore` marks a word mastered when `correct >= 1 && correct > incorrect`. Counters have no persistence.
- **`speech.ts`** — Thin wrapper around `window.speechSynthesis` with `lang: "ja-JP"`, rate 0.8. Always cancels any in-progress speech before speaking.
- **`useTTSPreference.ts`** — Persists TTS on/off in `localStorage` under `jp_tts_enabled`. Shared across all pages via the same key — toggling in one place affects all.

### Components

- **`FlashCard`** — Handles both `jp-to-en` and `en-to-jp` modes, both `multiple-choice` and `type` input modes. Receives `ttsEnabled` as a prop so the parent controls TTS.
- **`KanaStudy`** — Alphabet reference organised by row with script filter (hiragana / katakana / both) and romaji toggle for self-testing.
- **`KanaChart`** — Flat quick-reference grid.
- **`KanaKeyboard`** — On-screen hiragana/katakana keyboard that inserts characters into an answer field; used in `type` mode for EN→JP.
- **`CounterReference`** — Study table grouped by counter suffix (`〜枚`, `〜本`, etc.) with a reading/hint toggle.
- **`LessonMap`** / **`CounterGroupMap`** — Navigation grids for lessons and counter groups.

### Auth & database (`lib/auth.ts`, `lib/db.ts`, `lib/useAuth.ts`)

- **Database:** Turso (hosted libSQL). Uses `@prisma/adapter-libsql` + `PrismaLibSql` factory (takes `{ url, authToken }`, NOT a pre-created client). Prisma v7 requires a driver adapter — no `DATABASE_URL` in schema, connection is configured at runtime in `lib/db.ts`.
- **Auth:** NextAuth v5 (`next-auth@beta`) with JWT session strategy. The Prisma adapter is intentionally NOT used — mixing it with JWT sessions breaks Google OAuth silently (user appears signed in but session never persists). Instead, the `signIn` callback manually upserts the user into the database.
- **Google OAuth:** Uses `signIn('google', { callbackUrl: window.location.href })` — must allow a full redirect (no `redirect: false`). Local progress is saved to `sessionStorage` before the redirect and merged back on return.
- **Credentials provider:** Email/password signup hits `POST /api/auth` (custom route) to create the user, then calls `signIn('credentials', { redirect: false })`. JWT strategy is required for credentials to work.
- **Progress sync:** `saveProgress(p, true)` fires a background `POST /api/progress`. On login, client fetches server progress and calls `mergeProgress(local, server)` — takes the higher correct/incorrect count per word so neither side loses data.
- **`useAuth`** — wraps `useSession` from next-auth/react. Returns `{ user, loading, signIn, signUp, signOut }` — same interface regardless of provider.
- **`components/Providers.tsx`** — thin `"use client"` wrapper that holds `<SessionProvider>`, imported by `app/layout.tsx` (which is a server component and can't use hooks directly).

### Deployment

- **Vercel project:** `japanese-lessons` (GitHub-connected, auto-deploys on push to `main`). The production URL is `https://japanese-lessons-pi.vercel.app`. There is a separate `japanese-learnings` project created by the CLI — ignore it.
- **Required env vars on Vercel:** `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `AUTH_SECRET`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` (set to `https://japanese-lessons-pi.vercel.app`), `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.
- **Google OAuth redirect URI** registered in Google Cloud Console: `https://japanese-lessons-pi.vercel.app/api/auth/callback/google`. If the production URL ever changes this must be updated.
- **Prisma migrations:** There is no `prisma migrate` workflow against Turso. Run migrations manually via `turso db shell japanese-learnings < prisma/migrations/<name>/migration.sql`.
- **`npm run build`** runs `prisma generate && next build` — the generate step is required on Vercel because the generated client is not committed.

### Key conventions

- All pages are `"use client"` — there is no server-side data fetching.
- `@/*` maps to the project root (e.g. `@/data/words`, `@/lib/speech`).
- The `font-japanese` utility class (`globals.css`) applies `var(--font-japanese)` (Noto Sans JP) for all kana/kanji rendering.
- Turbopack root is pinned to `__dirname` in `next.config.ts` to avoid picking up the parent monorepo's `src/middleware.ts`.
