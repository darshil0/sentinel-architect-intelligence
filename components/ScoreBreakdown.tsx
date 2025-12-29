import React, { useMemo } from 'react';

interface ScoreBreakdownProps {
  jobScore: number;
}

const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ jobScore }) => {
  const displayScore = jobScore;

  const metrics = useMemo(
    () => [
      {
        label: 'Keyword Vector',
        weight: 0.25,
        max: 2.5,
        color: 'bg-emerald-500',
        shadow: 'shadow-emerald-500/30',
      },
      {
        label: 'Experience Depth',
        weight: 0.3,
        max: 3.0,
        color: 'bg-blue-500',
        shadow: 'shadow-blue-500/30',
      },
      {
        label: 'Infrastructure Fit',
        weight: 0.25,
        max: 2.5,
        color: 'bg-orange-500',
        shadow: 'shadow-orange-500/30',
      },
      {
        label: 'Domain Mastery',
        weight: 0.2,
        max: 2.0,
        color: 'bg-indigo-500',
        shadow: 'shadow-indigo-500/30',
      },
    ],
    []
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-7 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <svg
            className="w-20 h-20 text-emerald-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
        </div>

        <div className="flex justify-between items-start mb-10 relative z-10">
          <div>
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mb-2">
              Semantic Integrity Index
            </h3>
            <p className="text-3xl font-black text-white tabular-nums tracking-tighter">
              {displayScore.toFixed(1)}{' '}
              <span className="text-slate-600 text-xs font-bold">/ 10.0</span>
            </p>
          </div>
          <div className="bg-emerald-500/10 text-emerald-400 text-[8px] font-black px-2.5 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest">
            STABLE_SYNC
          </div>
        </div>

        <div className="space-y-7 relative z-10">
          {metrics.map((m) => {
            const current = displayScore * m.weight;
            const percentage = Math.max(
              0,
              Math.min(100, (current / m.max) * 100)
            );
            return (
              <div key={m.label} className="group">
                <div className="flex justify-between items-end mb-2.5">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-200 transition-colors">
                    {m.label}
                  </span>
                  <div className="text-right">
                    <span className="text-sm font-black font-mono text-white">
                      {current.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/50">
                  <div
                    className={`h-full ${m.color} ${m.shadow} rounded-full transition-all duration-1000 ease-out shadow-lg`}
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