// ── XP, Levels, Ranks, Streaks ──────────────────────────────────────────────

const STORAGE_KEY = "jp_gamification";

export interface GamificationState {
  xp: number;
  level: number;
  totalCorrect: number;
  totalAnswered: number;
  streak: number;
  lastActiveDate: string; // ISO date string (YYYY-MM-DD)
  longestStreak: number;
  achievements: string[];
}

// XP required to reach each level (cumulative)
// Level 1 = 0 XP, Level 2 = 50 XP, Level 3 = 150 XP, etc.
function xpForLevel(level: number): number {
  if (level <= 1) return 0;
  // Quadratic scaling: each level needs more XP
  return Math.floor(25 * (level - 1) * (level - 1) + 25 * (level - 1));
}

export function xpToNextLevel(state: GamificationState): { current: number; needed: number; progress: number } {
  const currentLevelXp = xpForLevel(state.level);
  const nextLevelXp = xpForLevel(state.level + 1);
  const needed = nextLevelXp - currentLevelXp;
  const current = state.xp - currentLevelXp;
  return { current, needed, progress: Math.min(current / needed, 1) };
}

// Japanese learning rank titles
export const RANKS: { minLevel: number; title: string; titleJp: string }[] = [
  { minLevel: 1, title: "Beginner", titleJp: "初心者" },
  { minLevel: 3, title: "Novice", titleJp: "見習い" },
  { minLevel: 5, title: "Apprentice", titleJp: "弟子" },
  { minLevel: 8, title: "Student", titleJp: "学生" },
  { minLevel: 12, title: "Scholar", titleJp: "学者" },
  { minLevel: 16, title: "Adept", titleJp: "達人" },
  { minLevel: 20, title: "Expert", titleJp: "名人" },
  { minLevel: 25, title: "Master", titleJp: "師匠" },
  { minLevel: 30, title: "Grandmaster", titleJp: "大師" },
  { minLevel: 40, title: "Sage", titleJp: "仙人" },
];

export function getRank(level: number): { title: string; titleJp: string } {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (level >= r.minLevel) rank = r;
  }
  return rank;
}

export function getNextRank(level: number): { title: string; titleJp: string; minLevel: number } | null {
  for (const r of RANKS) {
    if (r.minLevel > level) return r;
  }
  return null;
}

// XP awards
const BASE_XP_CORRECT = 10;
const BASE_XP_PERFECT_ROUND = 25; // bonus for 100% on a quiz
const STREAK_MULTIPLIER = 0.1; // +10% per streak day (capped at 2x)

export function calculateXpGain(correct: boolean, streakDays: number): number {
  if (!correct) return 0;
  const multiplier = Math.min(1 + streakDays * STREAK_MULTIPLIER, 2);
  return Math.round(BASE_XP_CORRECT * multiplier);
}

export function calculateBonusXp(sessionCorrect: number, sessionTotal: number, streakDays: number): number {
  if (sessionTotal === 0) return 0;
  const pct = sessionCorrect / sessionTotal;
  let bonus = 0;
  if (pct === 1) bonus = BASE_XP_PERFECT_ROUND;
  else if (pct >= 0.9) bonus = 15;
  else if (pct >= 0.7) bonus = 5;
  const multiplier = Math.min(1 + streakDays * STREAK_MULTIPLIER, 2);
  return Math.round(bonus * multiplier);
}

// Streak logic
function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

function getYesterdayDate(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

export function updateStreak(state: GamificationState): GamificationState {
  const today = getTodayDate();
  if (state.lastActiveDate === today) return state; // already active today

  const yesterday = getYesterdayDate();
  if (state.lastActiveDate === yesterday) {
    // Continue streak
    const newStreak = state.streak + 1;
    return {
      ...state,
      streak: newStreak,
      longestStreak: Math.max(state.longestStreak, newStreak),
      lastActiveDate: today,
    };
  }

  // Streak broken (or first day)
  return {
    ...state,
    streak: 1,
    lastActiveDate: today,
    longestStreak: Math.max(state.longestStreak, 1),
  };
}

// Achievement definitions
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // CSS class or emoji-free descriptor
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first_correct", title: "First Step", description: "Answer your first question correctly", icon: "sparkle" },
  { id: "ten_correct", title: "Getting Started", description: "Get 10 correct answers", icon: "flame" },
  { id: "fifty_correct", title: "On a Roll", description: "Get 50 correct answers", icon: "zap" },
  { id: "hundred_correct", title: "Century", description: "Get 100 correct answers", icon: "trophy" },
  { id: "five_hundred_correct", title: "Dedicated", description: "Get 500 correct answers", icon: "star" },
  { id: "streak_3", title: "Consistent", description: "Maintain a 3-day streak", icon: "flame" },
  { id: "streak_7", title: "Committed", description: "Maintain a 7-day streak", icon: "flame" },
  { id: "streak_14", title: "Devoted", description: "Maintain a 14-day streak", icon: "flame" },
  { id: "streak_30", title: "Unstoppable", description: "Maintain a 30-day streak", icon: "flame" },
  { id: "perfect_round", title: "Flawless", description: "Get 100% on a quiz", icon: "crown" },
  { id: "level_5", title: "Rising Star", description: "Reach level 5", icon: "star" },
  { id: "level_10", title: "Skilled", description: "Reach level 10", icon: "star" },
  { id: "level_20", title: "Veteran", description: "Reach level 20", icon: "star" },
];

export function checkNewAchievements(state: GamificationState): string[] {
  const newAchievements: string[] = [];
  const has = (id: string) => state.achievements.includes(id);

  if (!has("first_correct") && state.totalCorrect >= 1) newAchievements.push("first_correct");
  if (!has("ten_correct") && state.totalCorrect >= 10) newAchievements.push("ten_correct");
  if (!has("fifty_correct") && state.totalCorrect >= 50) newAchievements.push("fifty_correct");
  if (!has("hundred_correct") && state.totalCorrect >= 100) newAchievements.push("hundred_correct");
  if (!has("five_hundred_correct") && state.totalCorrect >= 500) newAchievements.push("five_hundred_correct");
  if (!has("streak_3") && state.streak >= 3) newAchievements.push("streak_3");
  if (!has("streak_7") && state.streak >= 7) newAchievements.push("streak_7");
  if (!has("streak_14") && state.streak >= 14) newAchievements.push("streak_14");
  if (!has("streak_30") && state.streak >= 30) newAchievements.push("streak_30");
  if (!has("level_5") && state.level >= 5) newAchievements.push("level_5");
  if (!has("level_10") && state.level >= 10) newAchievements.push("level_10");
  if (!has("level_20") && state.level >= 20) newAchievements.push("level_20");

  return newAchievements;
}

// Main state management
function defaultState(): GamificationState {
  return {
    xp: 0,
    level: 1,
    totalCorrect: 0,
    totalAnswered: 0,
    streak: 0,
    lastActiveDate: "",
    longestStreak: 0,
    achievements: [],
  };
}

export function loadGamification(): GamificationState {
  if (typeof window === "undefined") return defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    return { ...defaultState(), ...JSON.parse(raw) };
  } catch {
    return defaultState();
  }
}

export function saveGamification(state: GamificationState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// Record a quiz answer and return updated state + events
export interface GamificationEvent {
  type: "xp_gain" | "level_up" | "achievement" | "streak_update";
  value?: number;
  achievementId?: string;
  newLevel?: number;
}

export function recordGamificationAnswer(
  state: GamificationState,
  correct: boolean
): { state: GamificationState; events: GamificationEvent[] } {
  const events: GamificationEvent[] = [];
  let s = { ...state };

  // Update streak
  const streaked = updateStreak(s);
  if (streaked.streak !== s.streak) {
    events.push({ type: "streak_update", value: streaked.streak });
  }
  s = streaked;

  // Record answer
  s.totalAnswered += 1;
  if (correct) s.totalCorrect += 1;

  // Award XP
  const xpGain = calculateXpGain(correct, s.streak);
  if (xpGain > 0) {
    s.xp += xpGain;
    events.push({ type: "xp_gain", value: xpGain });

    // Check level up
    const newLevel = computeLevel(s.xp);
    if (newLevel > s.level) {
      s.level = newLevel;
      events.push({ type: "level_up", newLevel });
    }
  }

  // Check achievements
  const newAchievements = checkNewAchievements(s);
  for (const a of newAchievements) {
    s.achievements = [...s.achievements, a];
    events.push({ type: "achievement", achievementId: a });
  }

  return { state: s, events };
}

export function recordQuizComplete(
  state: GamificationState,
  sessionCorrect: number,
  sessionTotal: number
): { state: GamificationState; events: GamificationEvent[] } {
  const events: GamificationEvent[] = [];
  let s = { ...state };

  // Bonus XP for quiz performance
  const bonus = calculateBonusXp(sessionCorrect, sessionTotal, s.streak);
  if (bonus > 0) {
    s.xp += bonus;
    events.push({ type: "xp_gain", value: bonus });

    const newLevel = computeLevel(s.xp);
    if (newLevel > s.level) {
      s.level = newLevel;
      events.push({ type: "level_up", newLevel });
    }
  }

  // Perfect round achievement
  if (sessionCorrect === sessionTotal && sessionTotal > 0) {
    if (!s.achievements.includes("perfect_round")) {
      s.achievements = [...s.achievements, "perfect_round"];
      events.push({ type: "achievement", achievementId: "perfect_round" });
    }
  }

  // Re-check level achievements after bonus XP
  const newAchievements = checkNewAchievements(s);
  for (const a of newAchievements) {
    if (!s.achievements.includes(a)) {
      s.achievements = [...s.achievements, a];
      events.push({ type: "achievement", achievementId: a });
    }
  }

  return { state: s, events };
}

function computeLevel(xp: number): number {
  let level = 1;
  while (xpForLevel(level + 1) <= xp) {
    level++;
  }
  return level;
}
