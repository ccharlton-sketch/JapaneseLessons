export interface WordProgress {
  correct: number;
  incorrect: number;
  lastSeen: number; // timestamp
}

export interface LessonProgress {
  unlocked: boolean;
  completed: boolean;
  score: number; // 0-100
}

export interface AppProgress {
  words: Record<string, WordProgress>;
  lessons: Record<number, LessonProgress>;
  unlockedLesson: number; // highest unlocked lesson
}

const STORAGE_KEY = "jp_learn_progress";

function defaultProgress(): AppProgress {
  const lessons: Record<number, LessonProgress> = {};
  for (let i = 1; i <= 10; i++) {
    lessons[i] = { unlocked: true, completed: false, score: 0 };
  }
  return { words: {}, lessons, unlockedLesson: 10 };
}

export function loadProgress(): AppProgress {
  if (typeof window === "undefined") return defaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    const saved = JSON.parse(raw) as AppProgress;
    // Ensure all lessons are always unlocked regardless of saved state
    const lessons = { ...saved.lessons };
    for (let i = 1; i <= 10; i++) {
      if (!lessons[i]) lessons[i] = { unlocked: true, completed: false, score: 0 };
      else lessons[i] = { ...lessons[i], unlocked: true };
    }
    return { ...saved, lessons, unlockedLesson: 10 };
  } catch {
    return defaultProgress();
  }
}

export function saveProgress(p: AppProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

export function recordAnswer(
  progress: AppProgress,
  wordId: string,
  correct: boolean
): AppProgress {
  const existing = progress.words[wordId] ?? { correct: 0, incorrect: 0, lastSeen: 0 };
  return {
    ...progress,
    words: {
      ...progress.words,
      [wordId]: {
        correct: existing.correct + (correct ? 1 : 0),
        incorrect: existing.incorrect + (correct ? 0 : 1),
        lastSeen: Date.now(),
      },
    },
  };
}

export function computeLessonScore(
  progress: AppProgress,
  lessonWords: { id: string }[]
): number {
  if (lessonWords.length === 0) return 0;
  const mastered = lessonWords.filter((w) => {
    const wp = progress.words[w.id];
    return wp && wp.correct >= 1 && wp.correct > wp.incorrect;
  }).length;
  return Math.round((mastered / lessonWords.length) * 100);
}

// Unlock next lesson if score >= 70%
export function maybeUnlockNext(
  progress: AppProgress,
  lesson: number,
  score: number
): AppProgress {
  if (score < 70 || lesson >= 10) return progress;
  const nextLesson = lesson + 1;
  if (progress.lessons[nextLesson]?.unlocked) return progress;
  return {
    ...progress,
    unlockedLesson: Math.max(progress.unlockedLesson, nextLesson),
    lessons: {
      ...progress.lessons,
      [nextLesson]: { ...progress.lessons[nextLesson], unlocked: true },
      [lesson]: { ...progress.lessons[lesson], completed: score >= 70, score },
    },
  };
}
