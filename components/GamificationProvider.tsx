"use client";
import { createContext, useContext, useState, useCallback, useRef, ReactNode } from "react";
import {
  GamificationState,
  GamificationEvent,
  loadGamification,
  saveGamification,
  recordGamificationAnswer,
  recordQuizComplete,
} from "@/lib/gamification";
import { playCorrect, playIncorrect, playLevelUp, playAchievement, playStreak, playQuizComplete } from "@/lib/sounds";
import XpToast from "@/components/XpToast";
import LevelUpOverlay from "@/components/LevelUpOverlay";

const SOUND_KEY = "jp_sounds_enabled";

function loadSoundPref(): boolean {
  if (typeof window === "undefined") return true;
  const raw = localStorage.getItem(SOUND_KEY);
  return raw !== "false";
}

interface GamificationCtx {
  state: GamificationState;
  recordAnswer: (correct: boolean) => GamificationEvent[];
  completeQuiz: (sessionCorrect: number, sessionTotal: number) => GamificationEvent[];
  soundEnabled: boolean;
  toggleSound: () => void;
  refresh: () => void;
}

const Ctx = createContext<GamificationCtx | null>(null);

export function useGamificationCtx(): GamificationCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useGamificationCtx must be used within GamificationProvider");
  return ctx;
}

export default function GamificationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GamificationState>(() => loadGamification());
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => loadSoundPref());
  const [toastEvent, setToastEvent] = useState<GamificationEvent | null>(null);
  const [levelUpLevel, setLevelUpLevel] = useState<number | null>(null);
  const toastQueue = useRef<GamificationEvent[]>([]);

  const showNextToast = useCallback(() => {
    if (toastQueue.current.length > 0) {
      setToastEvent(toastQueue.current[0]);
      toastQueue.current = toastQueue.current.slice(1);
    } else {
      setToastEvent(null);
    }
  }, []);

  const queueEvents = useCallback((events: GamificationEvent[]) => {
    // Level up gets a full overlay
    const levelUp = events.find((e) => e.type === "level_up");
    if (levelUp) {
      setLevelUpLevel(levelUp.newLevel!);
    }

    // Other events get toasts (XP, achievements, streaks)
    const toastable = events.filter((e) => e.type !== "level_up");
    if (toastable.length > 0) {
      toastQueue.current = [...toastQueue.current, ...toastable];
      // Show first toast if none active
      if (!toastEvent) showNextToast();
    }
  }, [toastEvent, showNextToast]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      localStorage.setItem(SOUND_KEY, String(next));
      return next;
    });
  }, []);

  const playEventSounds = useCallback((events: GamificationEvent[], soundOn: boolean) => {
    if (!soundOn) return;
    for (const e of events) {
      switch (e.type) {
        case "streak_update":
          playStreak();
          break;
        case "level_up":
          setTimeout(() => playLevelUp(), 200);
          break;
        case "achievement":
          setTimeout(() => playAchievement(), 400);
          break;
      }
    }
  }, []);

  const recordAnswer = useCallback((correct: boolean): GamificationEvent[] => {
    const current = loadGamification();
    const { state: newState, events } = recordGamificationAnswer(current, correct);
    saveGamification(newState);
    setState(newState);

    if (soundEnabled) {
      if (correct) playCorrect();
      else playIncorrect();
    }

    playEventSounds(events, soundEnabled);
    queueEvents(events);
    return events;
  }, [soundEnabled, playEventSounds, queueEvents]);

  const completeQuiz = useCallback((sessionCorrect: number, sessionTotal: number): GamificationEvent[] => {
    const current = loadGamification();
    const { state: newState, events } = recordQuizComplete(current, sessionCorrect, sessionTotal);
    saveGamification(newState);
    setState(newState);

    if (soundEnabled) playQuizComplete();
    playEventSounds(events, soundEnabled);
    queueEvents(events);
    return events;
  }, [soundEnabled, playEventSounds, queueEvents]);

  const refresh = useCallback(() => {
    setState(loadGamification());
  }, []);

  return (
    <Ctx.Provider value={{ state, recordAnswer, completeQuiz, soundEnabled, toggleSound, refresh }}>
      {children}

      {/* Toast notifications */}
      <XpToast event={toastEvent} onDismiss={showNextToast} />

      {/* Level up overlay */}
      {levelUpLevel !== null && (
        <LevelUpOverlay
          level={levelUpLevel}
          onDismiss={() => setLevelUpLevel(null)}
        />
      )}
    </Ctx.Provider>
  );
}
