import React from "react";

export function MetricCardSkeleton() {
  return (
    <div className="w-full p-5 rounded-3xl border border-[var(--glass-card-border)] bg-[var(--glass-card-bg)] animate-pulse flex flex-col items-start gap-4">
      {/* Icon placeholder */}
      <div className="w-9 h-9 rounded-xl bg-slate-300/20 dark:bg-slate-700/20" />
      {/* Number placeholder */}
      <div className="w-20 h-8 rounded bg-slate-300/20 dark:bg-slate-700/20" />
      {/* Text placeholders */}
      <div className="w-16 h-3 rounded bg-slate-300/20 dark:bg-slate-700/20" />
      <div className="w-12 h-2.5 rounded bg-slate-300/20 dark:bg-slate-700/20" />
    </div>
  );
}

export function ProfileCardSkeleton() {
  return (
    <div className="w-full p-5 rounded-3xl border border-[var(--glass-card-border)] bg-[var(--glass-card-bg)] animate-pulse flex items-center gap-4">
      {/* Avatar circular placeholder */}
      <div className="w-14 h-14 rounded-full bg-slate-300/20 dark:bg-slate-700/20" />
      <div className="flex flex-col gap-2 flex-1">
        {/* Name and username */}
        <div className="w-24 h-4 rounded bg-slate-300/20 dark:bg-slate-700/20" />
        <div className="w-32 h-3 rounded bg-slate-300/20 dark:bg-slate-700/20" />
      </div>
    </div>
  );
}

export function HeatmapSkeleton() {
  return (
    <div className="w-full p-6 rounded-3xl border border-[var(--glass-card-border)] bg-[var(--glass-card-bg)] animate-pulse flex flex-col gap-4">
      {/* Header bar */}
      <div className="w-40 h-4 rounded bg-slate-300/20 dark:bg-slate-700/20" />
      {/* Grid placeholder */}
      <div className="grid grid-cols-53 gap-1 w-full overflow-x-auto">
        {Array.from({ length: 53 }).map((_, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-1">
            {Array.from({ length: 7 }).map((_, rowIdx) => (
              <div
                key={rowIdx}
                className="w-[10px] h-[10px] rounded-[2px] bg-slate-300/10 dark:bg-slate-700/10"
              />
            ))}
          </div>
        ))}
      </div>
      {/* Legend bar */}
      <div className="w-32 h-3 rounded self-end bg-slate-300/20 dark:bg-slate-700/20" />
    </div>
  );
}

export function ContestChartSkeleton() {
  return (
    <div className="w-full p-6 rounded-3xl border border-[var(--glass-card-border)] bg-[var(--glass-card-bg)] animate-pulse flex flex-col gap-6">
      {/* Header bar */}
      <div className="w-48 h-4 rounded bg-slate-300/20 dark:bg-slate-700/20" />
      {/* Line area placeholder */}
      <div className="w-full h-44 rounded-2xl bg-slate-300/10 dark:bg-slate-700/10 flex items-end px-4 py-2 justify-between">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="w-8 rounded-t bg-slate-300/20 dark:bg-slate-700/20"
            style={{ height: `${20 + Math.random() * 60}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function DifficultyChartSkeleton() {
  return (
    <div className="w-full p-6 rounded-3xl border border-[var(--glass-card-border)] bg-[var(--glass-card-bg)] animate-pulse flex flex-col items-center gap-6">
      <div className="w-40 h-4 rounded bg-slate-300/20 dark:bg-slate-700/20" />
      <div className="w-32 h-32 rounded-full border-[12px] border-slate-300/20 dark:border-slate-700/20 flex items-center justify-center">
        <div className="w-12 h-4 rounded bg-slate-300/20 dark:bg-slate-700/20" />
      </div>
    </div>
  );
}
