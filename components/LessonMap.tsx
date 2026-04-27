"use client";
import { LessonProgress } from "@/lib/progress";
import { getWordsByLesson } from "@/data/words";

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

interface Props {
  lessons: Record<number, LessonProgress>;
  onSelect: (lesson: number) => void;
}

export default function LessonMap({ lessons, onSelect }: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {Object.entries(LESSON_LABELS).map(([numStr, label]) => {
        const num = Number(numStr);
        const lp = lessons[num];
        const wordCount = getWordsByLesson(num).length;

        return (
          <button
            key={num}
            disabled={!lp?.unlocked}
            onClick={() => onSelect(num)}
            className={`group relative rounded-2xl border-2 p-4 text-left transition-all duration-200 ${
              !lp?.unlocked
                ? "border-border bg-muted/30 opacity-50 cursor-not-allowed"
                : lp.completed
                ? "border-green-500 bg-green-50 dark:bg-green-950/20 hover:shadow-md"
                : "border-primary/40 bg-card hover:border-primary hover:shadow-md"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    Lesson {num}
                  </span>
                  {lp?.completed && (
                    <span className="text-green-600 text-sm">✓</span>
                  )}
                  {!lp?.unlocked && (
                    <span className="text-muted-foreground text-sm">🔒</span>
                  )}
                </div>
                <div className="font-semibold text-base">{label}</div>
                <div className="text-xs text-muted-foreground mt-1">{wordCount} words</div>
              </div>
              {lp?.unlocked && (
                <div className="text-right shrink-0">
                  <div className="text-lg font-bold text-primary">{lp.score}%</div>
                  <div className="text-xs text-muted-foreground">mastery</div>
                </div>
              )}
            </div>
            {lp?.unlocked && (
              <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${lp.score}%` }}
                />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
