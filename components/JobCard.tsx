import React, { useMemo } from 'react';
import { JobMatch } from '../types';

interface JobCardProps {
  job: JobMatch;
  isActive?: boolean;
  onFollowUp?: (job: JobMatch) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, isActive = false, onFollowUp }) => {
  const isHighMatch = job.score >= 9.0;

  const isStale = useMemo(() => {
    if (job.status !== 'submitted' || !job.submissionDate) return false;
    const submissionDate = new Date(job.submissionDate);
    if (Number.isNaN(submissionDate.getTime())) return false;
    const diffTime = Math.abs(Date.now() - submissionDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 7;
  }, [job.status, job.submissionDate]);

  const stateClasses = isActive
    ? 'bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
    : isStale
      ? 'bg-amber-500/5 border-amber-500/30 hover:bg-amber-500/10'
      : 'bg-slate-900/40 border-slate-800/60 hover:border-slate-700 hover:bg-slate-800/40';

  return (
    <div
      className={`p-5 transition-all duration-300 cursor-pointer group relative overflow-hidden rounded-[24px] border backdrop-blur-sm ${stateClasses}`}
    >
      {isHighMatch && !isStale && (
        <div className="absolute -right-8 -top-8 w-16 h-16 bg-emerald-500/10 rotate-45 blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500" />
      )}

      {isStale && (
        <div className="absolute top-0 right-0">
          <div className="bg-amber-500 text-slate-950 text-[8px] font-black px-3 py-1 uppercase tracking-[0.2em] rounded-bl-xl shadow-lg animate-pulse">
            Stale Signal
          </div>
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col gap-1">
          <span
            className={`text-[10px] font-black uppercase tracking-[0.2em] ${isStale ? 'text-amber-400' : 'text-emerald-400'
              }`}
          >
            {job.company}
          </span>
          <h4 className="text-base font-bold text-slate-100 group-hover:text-white transition-colors truncate max-w-[180px]">
            {job.title}
          </h4>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-lg font-black text-white font-mono leading-none tracking-tighter">
            {job.score.toFixed(1)}
          </div>
          <div className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mt-1">
            Match
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {job.highlights.slice(0, 3).map((h, i) => (
          <span
            key={`${h}-${i}`}
            className={`text-[9px] px-2.5 py-1 rounded-lg border uppercase font-bold tracking-wider transition-all ${isStale
                ? 'bg-amber-500/5 text-amber-500 border-amber-500/20'
                : 'bg-slate-950/50 text-slate-400 border-slate-800 group-hover:border-slate-700'
              }`}
          >
            {h}
          </span>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-slate-800/50 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">
              {job.postedDate}
            </span>
            {job.submissionDate && (
              <span
                className={`text-[9px] font-black uppercase tracking-tighter ${isStale ? 'text-amber-500/70' : 'text-slate-600'
                  }`}
              >
                Submitted:{' '}
                {new Date(job.submissionDate).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            )}
          </div>

          {job.legitimacy > 0.9 && !isStale && (
            <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-500/5 border border-blue-500/20 rounded-lg">
              <div className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[9px] text-blue-400 font-black uppercase tracking-widest">
                Verified
              </span>
            </div>
          )}
        </div>

        {isStale && job.status === 'submitted' && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFollowUp?.(job);
            }}
            className="w-full py-2.5 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/10 active:scale-[0.98]"
          >
            Draft Follow-up
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;