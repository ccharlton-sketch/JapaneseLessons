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

### Key conventions

- All pages are `"use client"` — there is no server-side data fetching.
- `@/*` maps to the project root (e.g. `@/data/words`, `@/lib/speech`).
- The `font-japanese` utility class (`globals.css`) applies `var(--font-japanese)` (Noto Sans JP) for all kana/kanji rendering.
- Turbopack root is pinned to `__dirname` in `next.config.ts` to avoid picking up the parent monorepo's `src/middleware.ts`.
