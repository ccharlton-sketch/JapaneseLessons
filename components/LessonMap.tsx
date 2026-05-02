"use client";
import { LessonProgress } from "@/lib/progress";
import { getWordsByLesson } from "@/data/words";
import { Check, Lock } from "lucide-react";

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
    <div className="grid gap-4 sm:grid-cols-2">
      {Object.entries(LESSON_LABELS).map(([numStr, label], i) => {
        const num = Number(numStr);
        const lp = lessons[num];
        const wordCount = LESSON_WORD_COUNTS[num];

        return (
          <button
            key={num}
            disabled={!lp?.unlocked}
            onClick={() => onSelect(num)}
            className={`animate-fade-up stagger-${Math.min(i + 1, 10)} group relative rounded-2xl border p-5 text-left hover-lift active:scale-[0.97] ${
              !lp?.unlocked
                ? "border-border bg-muted/30 opacity-40 cursor-not-allowed"
                : lp.completed
                ? "border-green-500/50 bg-green-50/50 dark:bg-green-950/20 card-elevated hover:card-elevated-hover"
                : "border-border bg-card card-elevated hover:card-elevated-hover hover:border-primary/50"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Lesson {num}
                  </span>
                  {lp?.completed && (
                    <Check className="size-3.5 text-green-600" strokeWidth={2} />
                  )}
                  {!lp?.unlocked && (
                    <Lock className="size-3.5 text-muted-foreground" strokeWidth={1.5} />
                  )}
                </div>
                <div className="font-bold text-base">{label}</div>
                <div className="text-xs text-muted-foreground mt-1">{wordCount} words</div>
              </div>
              {lp?.unlocked && (
                <div className="text-right shrink-0">
                  <div className="text-lg font-bold text-primary tabular-nums">{lp.score}%</div>
                  <div className="text-xs text-muted-foreground">mastery</div>
                </div>
              )}
            </div>
            {lp?.unlocked && (
              <div className="mt-3 h-2 rounded-full bg-muted/60 overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary/80"
                  style={{ width: `${lp.score}%`, transition: 'width 600ms cubic-bezier(0.23, 1, 0.32, 1)' }}
                />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
