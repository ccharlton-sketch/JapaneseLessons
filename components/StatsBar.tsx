"use client";
import { GamificationState, xpToNextLevel, getRank, getNextRank } from "@/lib/gamification";
import { Progress } from "@/components/ui/progress";
import { Flame, Star, Zap, Trophy } from "lucide-react";

interface Props {
  state: GamificationState;
  compact?: boolean;
}

export default function StatsBar({ state, compact = false }: Props) {
  const { current, needed, progress } = xpToNextLevel(state);
  const rank = getRank(state.level);
  const nextRank = getNextRank(state.level);

  if (compact) {
    return (
      <div className="flex items-center gap-3 text-sm">
        <div className="flex items-center gap-1.5 text-primary font-semibold">
          <div className="size-5 rounded-md bg-primary/10 flex items-center justify-center">
            <Zap className="size-3" strokeWidth={2.5} />
          </div>
          <span className="tabular-nums">{state.level}</span>
        </div>
        {state.streak > 0 && (
          <div className="flex items-center gap-1 text-orange-500 font-semibold">
            <Flame className="size-3.5" strokeWidth={2.5} />
            <span className="tabular-nums">{state.streak}</span>
          </div>
        )}
        <div className="flex-1 max-w-[120px]">
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary progress-shimmer"
              style={{ width: `${progress * 100}%`, transition: "width 600ms cubic-bezier(0.23, 1, 0.32, 1)" }}
            />
          </div>
        </div>
        <span className="text-xs text-muted-foreground tabular-nums">{current}/{needed}</span>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-card p-5 card-elevated">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Level badge */}
          <div className="relative">
            <div className="size-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10">
              <span className="text-lg font-bold text-primary tabular-nums">{state.level}</span>
            </div>
            {state.streak >= 3 && (
              <div className="absolute -top-1 -right-1 size-5 rounded-full bg-orange-500 flex items-center justify-center">
                <Flame className="size-3 text-white" strokeWidth={2.5} />
              </div>
            )}
          </div>
          <div>
            <div className="font-bold leading-tight">{rank.title}</div>
            <div className="text-xs text-muted-foreground font-japanese">{rank.titleJp}</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {state.streak > 0 && (
            <div className="text-center" title={`${state.streak} day streak (best: ${state.longestStreak})`}>
              <div className="flex items-center gap-1 text-orange-500">
                <Flame className="size-4" strokeWidth={2} />
                <span className="text-sm font-bold tabular-nums">{state.streak}</span>
              </div>
              <div className="text-[10px] text-muted-foreground">streak</div>
            </div>
          )}
          <div className="text-center" title={`${state.xp} total XP`}>
            <div className="flex items-center gap-1 text-primary">
              <Star className="size-4" strokeWidth={2} />
              <span className="text-sm font-bold tabular-nums">{state.xp.toLocaleString()}</span>
            </div>
            <div className="text-[10px] text-muted-foreground">XP</div>
          </div>
          {state.achievements.length > 0 && (
            <div className="text-center" title={`${state.achievements.length} achievements`}>
              <div className="flex items-center gap-1 text-amber-500">
                <Trophy className="size-4" strokeWidth={2} />
                <span className="text-sm font-bold tabular-nums">{state.achievements.length}</span>
              </div>
              <div className="text-[10px] text-muted-foreground">badges</div>
            </div>
          )}
        </div>
      </div>

      {/* XP progress */}
      <div className="space-y-1.5">
        <div className="h-2.5 rounded-full bg-muted/80 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 progress-shimmer"
            style={{ width: `${progress * 100}%`, transition: "width 800ms cubic-bezier(0.23, 1, 0.32, 1)" }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span className="tabular-nums">{current} / {needed} XP to level {state.level + 1}</span>
          {nextRank && (
            <span>
              Next rank: {nextRank.title} <span className="font-japanese">({nextRank.titleJp})</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
