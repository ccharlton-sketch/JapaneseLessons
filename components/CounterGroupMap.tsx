"use client";
import { COUNTER_GROUPS, getCardsByGroup, CounterGroup } from "@/data/counters";
import { Box, PawPrint, Clock, Utensils, Building } from "lucide-react";

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
    <div className="grid gap-4 sm:grid-cols-2">
      {COUNTER_GROUPS.map((g, i) => {
        const count = getCardsByGroup(g.id).length;
        const Icon = ICON_MAP[g.icon];
        return (
          <button
            key={g.id}
            onClick={() => onSelect(g.id)}
            className={`animate-fade-up stagger-${Math.min(i + 1, 10)} group rounded-2xl border bg-card p-5 text-left card-elevated hover:card-elevated-hover hover:border-primary/50 hover-lift active:scale-[0.97]`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className="size-5 text-primary" strokeWidth={1.5} />
                  <span className="text-xs font-semibold text-muted-foreground">
                    Group {g.id}
                  </span>
                </div>
                <div className="font-bold text-base">{g.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{g.subtitle}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm font-bold text-primary tabular-nums">{count}</div>
                <div className="text-xs text-muted-foreground">cards</div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
