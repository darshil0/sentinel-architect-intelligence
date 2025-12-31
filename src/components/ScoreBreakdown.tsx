import React, { useMemo } from 'react';

interface ScoreBreakdownProps {
  jobScore: number;
}

const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ jobScore }) => {
  const displayScore = jobScore;

  const metrics = useMemo(
    () => [
      {
        label: 'Keyword Match',
        weight: 0.25,
        max: 2.5,
        color: 'from-emerald-400 to-emerald-600',
        glow: 'shadow-emerald-500/20',
      },
      {
        label: 'Experience Fit',
        weight: 0.3,
        max: 3.0,
        color: 'from-blue-400 to-blue-600',
        glow: 'shadow-blue-500/20',
      },
      {
        label: 'Platform Mastery',
        weight: 0.25,
        max: 2.5,
        color: 'from-amber-400 to-amber-600',
        glow: 'shadow-amber-500/20',
      },
      {
        label: 'Domain Context',
        weight: 0.2,
        max: 2.0,
        color: 'from-violet-400 to-violet-600',
        glow: 'shadow-violet-500/20',
      },
    ],
    []
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="glass-panel p-8 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl" />

        <div className="flex justify-between items-start mb-10 relative z-10">
          <div>
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-3">
              Integrity Index
            </h3>
            <p className="text-4xl font-black text-white tabular-nums tracking-tighter flex items-baseline gap-2">
              {displayScore.toFixed(1)}
              <span className="text-slate-600 text-sm font-bold tracking-normal transition-colors group-hover:text-slate-500">
                / 10.0
              </span>
            </p>
          </div>
          <div className="bg-emerald-500/10 text-emerald-400 text-[9px] font-black px-3 py-1.5 rounded-xl border border-emerald-500/20 uppercase tracking-widest whitespace-nowrap">
            SYNC_STABLE
          </div>
        </div>

        <div className="space-y-8 relative z-10">
          {metrics.map((m) => {
            const current = displayScore * m.weight;
            const percentage = Math.max(0, Math.min(100, (current / m.max) * 100));

            return (
              <div key={m.label} className="group">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-200 transition-colors">
                    {m.label}
                  </span>
                  <span className="text-xs font-black font-mono text-white">
                    {current.toFixed(1)}
                  </span>
                </div>
                <div className="h-2.5 w-full bg-slate-950/50 rounded-full overflow-hidden border border-slate-800/50 p-0.5">
                  <div
                    className={`h-full bg-gradient-to-r ${m.color} rounded-full transition-all duration-1000 ease-out shadow-lg ${m.glow}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScoreBreakdown;