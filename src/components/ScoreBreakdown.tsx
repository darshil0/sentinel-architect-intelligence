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
        color: 'from-cyan-500 to-blue-600',
        glow: 'shadow-cyan-500/20',
      },
      {
        label: 'Experience Fit',
        weight: 0.3,
        max: 3.0,
        color: 'from-blue-500 to-blue-700',
        glow: 'shadow-blue-500/20',
      },
      {
        label: 'Platform Mastery',
        weight: 0.25,
        max: 2.5,
        color: 'from-purple-500 to-purple-700',
        glow: 'shadow-purple-500/20',
      },
      {
        label: 'Domain Context',
        weight: 0.2,
        max: 2.0,
        color: 'from-cyan-500 to-purple-600',
        glow: 'shadow-cyan-500/20',
      },
    ],
    []
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="glass-panel p-8 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl" />

        <div className="flex justify-between items-start mb-10 relative z-10">
          <div>
            <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em] mb-3">
              Integrity Index
            </h3>
            <p className="text-4xl font-bold text-slate-900 tabular-nums tracking-tighter flex items-baseline gap-2">
              {displayScore.toFixed(1)}
              <span className="text-slate-500 text-sm font-semibold tracking-normal transition-colors group-hover:text-slate-600">
                / 10.0
              </span>
            </p>
          </div>
          <div className="bg-cyan-100/60 text-cyan-700 text-[9px] font-bold px-3 py-1.5 rounded-xl border border-cyan-200/60 uppercase tracking-widest whitespace-nowrap">
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
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest group-hover:text-slate-900 transition-colors">
                    {m.label}
                  </span>
                  <span className="text-xs font-bold font-mono text-slate-900">
                    {current.toFixed(1)}
                  </span>
                </div>
                <div className="h-2.5 w-full bg-slate-200/60 rounded-full overflow-hidden border border-slate-300/40 p-0.5">
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