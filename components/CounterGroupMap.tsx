"use client";
import { COUNTER_GROUPS, getCardsByGroup } from "@/data/counters";

interface Props {
  onSelect: (group: number) => void;
}

export default function CounterGroupMap({ onSelect }: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {COUNTER_GROUPS.map((g) => {
        const count = getCardsByGroup(g.id).length;
        return (
          <button
            key={g.id}
            onClick={() => onSelect(g.id)}
            className="group rounded-2xl border-2 border-primary/30 bg-card p-4 text-left hover:border-primary hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{g.emoji}</span>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    Group {g.id}
                  </span>
                </div>
                <div className="font-semibold text-base">{g.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{g.subtitle}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm font-medium text-primary">{count}</div>
                <div className="text-xs text-muted-foreground">cards</div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
