"use client";
import { COUNTER_GROUPS, getCardsByGroup, CounterGroup } from "@/data/counters";
import { Box, PawPrint, Clock, Utensils, Building, ChevronRight } from "lucide-react";

const ICON_MAP: Record<CounterGroup["icon"], typeof Box> = {
  "box": Box,
  "paw-print": PawPrint,
  "clock": Clock,
  "utensils": Utensils,
  "building": Building,
};

interface Props {
  onSelect: (group: number) => void;
}

export default function CounterGroupMap({ onSelect }: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {COUNTER_GROUPS.map((g, i) => {
        const count = getCardsByGroup(g.id).length;
        const Icon = ICON_MAP[g.icon];
        return (
          <button
            key={g.id}
            onClick={() => onSelect(g.id)}
            className={`animate-fade-up stagger-${Math.min(i + 1, 10)} group rounded-2xl border bg-card p-5 text-left card-elevated hover:card-elevated-hover hover:border-primary/40 hover-lift active:scale-[0.97] transition-all`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="size-4.5 text-primary" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-[15px] leading-tight">{g.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{g.subtitle}</div>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span className="text-sm font-bold text-primary tabular-nums">{count}</span>
                <ChevronRight className="size-4 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" strokeWidth={1.5} />
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
