"use client";
import { LessonProgress } from "@/lib/progress";
import { getWordsByLesson } from "@/data/words";
import { Check, Lock, ChevronRight } from "lucide-react";

const LESSON_LABELS: Record<number, string> = {
  1: "Basics & Greetings",
  2: "Numbers",
  3: "Colors",
  4: "Food & Drinks",
  5: "Family & Body",
  6: "Daily Life",
  7: "Nature & Animals",
  8: "Emotions & Adjectives",
  9: "Common Verbs",
  10: "Advanced Topics",
};

const LESSON_WORD_COUNTS: Record<number, number> = Object.fromEntries(
  Object.keys(LESSON_LABELS).map((n) => [Number(n), getWordsByLesson(Number(n)).length])
);

interface Props {
  lessons: Record<number, LessonProgress>;
  onSelect: (lesson: number) => void;
}

export default function LessonMap({ lessons, onSelect }: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {Object.entries(LESSON_LABELS).map(([numStr, label], i) => {
        const num = Number(numStr);
        const lp = lessons[num];
        const wordCount = LESSON_WORD_COUNTS[num];
        const isCompleted = lp?.completed;
        const isLocked = !lp?.unlocked;

        return (
          <button
            key={num}
            disabled={isLocked}
            onClick={() => onSelect(num)}
            className={`animate-fade-up stagger-${Math.min(i + 1, 10)} group relative rounded-2xl border p-5 text-left transition-all hover-lift active:scale-[0.97] ${
              isLocked
                ? "border-border bg-muted/20 opacity-50 cursor-not-allowed"
                : isCompleted
                ? "border-green-500/30 bg-gradient-to-br from-green-50/50 to-card dark:from-green-950/20 dark:to-card card-elevated hover:card-elevated-hover"
                : "border-border bg-card card-elevated hover:card-elevated-hover hover:border-primary/40"
            }`}
          >
            {/* Lesson number badge */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className={`size-9 rounded-lg flex items-center justify-center shrink-0 font-bold text-sm tabular-nums ${
                  isCompleted
                    ? "bg-green-500/10 text-green-600 dark:text-green-400"
                    : isLocked
                    ? "bg-muted text-muted-foreground"
                    : "bg-primary/10 text-primary"
                }`}>
                  {isCompleted ? <Check className="size-4" strokeWidth={2.5} /> : isLocked ? <Lock className="size-3.5" strokeWidth={1.5} /> : num}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-[15px] leading-tight">{label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{wordCount} words</div>
                </div>
              </div>
              {lp?.unlocked && !isLocked && (
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-base font-bold tabular-nums text-primary">{lp.score}%</span>
                  <ChevronRight className="size-4 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" strokeWidth={1.5} />
                </div>
              )}
            </div>

            {/* Progress bar */}
            {lp?.unlocked && (
              <div className="mt-3.5 h-1.5 rounded-full bg-muted/60 overflow-hidden">
                <div
                  className={`h-full rounded-full ${isCompleted ? "bg-green-500/70" : "bg-primary/70"}`}
                  style={{ width: `${lp.score}%`, transition: "width 600ms cubic-bezier(0.23, 1, 0.32, 1)" }}
                />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
