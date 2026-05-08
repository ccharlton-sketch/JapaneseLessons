"use client";
import { useEffect, useState } from "react";
import { GamificationEvent, ACHIEVEMENTS, getRank } from "@/lib/gamification";
import { Flame, Star, Trophy, Zap } from "lucide-react";

interface Props {
  event: GamificationEvent | null;
  onDismiss: () => void;
}

export default function XpToast({ event, onDismiss }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!event) return;
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 300);
    }, 2200);
    return () => clearTimeout(timer);
  }, [event, onDismiss]);

  if (!event) return null;

  let icon: React.ReactNode;
  let content: React.ReactNode;
  let accentClass = "border-primary/20 bg-card";

  switch (event.type) {
    case "xp_gain":
      icon = <Star className="size-4 text-primary" strokeWidth={2} />;
      content = <span className="text-primary font-bold tabular-nums">+{event.value} XP</span>;
      break;
    case "level_up":
      icon = <Zap className="size-4 text-primary" strokeWidth={2} />;
      content = (
        <span className="font-bold">
          Level {event.newLevel} — {getRank(event.newLevel!).title}
        </span>
      );
      accentClass = "border-primary/30 bg-primary/5";
      break;
    case "achievement": {
      const ach = ACHIEVEMENTS.find((a) => a.id === event.achievementId);
      icon = <Trophy className="size-4 text-amber-500" strokeWidth={2} />;
      content = (
        <span className="font-semibold">{ach?.title ?? "Achievement unlocked"}</span>
      );
      accentClass = "border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/20";
      break;
    }
    case "streak_update":
      icon = <Flame className="size-4 text-orange-500" strokeWidth={2} />;
      content = <span className="font-bold text-orange-600 dark:text-orange-400">{event.value} day streak</span>;
      accentClass = "border-orange-500/20 bg-orange-50/50 dark:bg-orange-950/20";
      break;
  }

  return (
    <div
      className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm transition-all duration-300 card-elevated ${accentClass} ${
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-3 scale-95"
      }`}
    >
      {icon}
      {content}
    </div>
  );
}
