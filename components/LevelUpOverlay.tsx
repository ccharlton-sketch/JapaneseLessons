"use client";
import { useEffect, useState } from "react";
import { getRank, getNextRank } from "@/lib/gamification";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

interface Props {
  level: number;
  onDismiss: () => void;
}

export default function LevelUpOverlay({ level, onDismiss }: Props) {
  const [visible, setVisible] = useState(false);
  const rank = getRank(level);
  const nextRank = getNextRank(level);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  function handleDismiss() {
    setVisible(false);
    setTimeout(onDismiss, 350);
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-350 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleDismiss}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/85 backdrop-blur-md" />

      {/* Content */}
      <div
        className={`relative max-w-xs w-full text-center flex flex-col items-center gap-5 p-8 rounded-3xl border bg-card card-elevated transition-all duration-500 ${
          visible ? "scale-100 translate-y-0" : "scale-90 translate-y-12"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Radial glow */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/15 via-primary/5 to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
        </div>

        {/* Level badge */}
        <div className="relative">
          <div className="size-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
            <span className="text-3xl font-bold text-primary tabular-nums">{level}</span>
          </div>
          <div className="absolute -top-2 -right-2 size-7 rounded-full bg-primary flex items-center justify-center">
            <Zap className="size-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
        </div>

        <div className="relative space-y-1">
          <h2 className="text-2xl font-bold tracking-tighter">Level up</h2>
          <p className="text-base text-muted-foreground">
            You reached <span className="font-semibold text-foreground">{rank.title}</span>
          </p>
          <p className="font-japanese text-lg text-primary font-medium">{rank.titleJp}</p>
        </div>

        {nextRank && (
          <p className="text-xs text-muted-foreground relative">
            Next: {nextRank.title} <span className="font-japanese">({nextRank.titleJp})</span> at level {nextRank.minLevel}
          </p>
        )}

        <Button onClick={handleDismiss} className="relative w-full" size="lg">
          Continue
        </Button>
      </div>
    </div>
  );
}
