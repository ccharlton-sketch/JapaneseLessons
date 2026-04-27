"use client";

interface Props {
  value: number;
  onChange: (n: number) => void;
  max: number;
  presets?: number[];
}

export default function QuestionCountPicker({ value, onChange, max, presets = [5, 10, 15, 20] }: Props) {
  const validPresets = presets.filter((p) => p <= max);
  // Always include max if it isn't already a preset
  if (!validPresets.includes(max)) validPresets.push(max);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs text-muted-foreground whitespace-nowrap">Questions:</span>
      <div className="flex rounded-lg border overflow-hidden text-sm">
        {validPresets.map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={`px-3 py-1.5 transition-colors ${
              value === n ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"
            }`}
          >
            {n === max && !presets.includes(max) ? `${n} (all)` : n}
          </button>
        ))}
      </div>
    </div>
  );
}
