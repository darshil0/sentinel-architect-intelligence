import React, { useMemo } from 'react';
import { JobMatch } from '../types';

interface JobCardProps {
  job: JobMatch;
  isActive?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, isActive = false }) => {
  const isHighMatch = job.score >= 9.0;

  const isStale = useMemo(() => {
    if (job.status !== 'submitted' || !job.submissionDate) return false;
    const submissionDate = new Date(job.submissionDate);
    if (Number.isNaN(submissionDate.getTime())) return false;
    const diffTime = Math.abs(Date.now() - submissionDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 7;
  }, [job.status, job.submissionDate]);

  const baseBorderColor = isHighMatch ? 'border-emerald-500' : 'border-slate-700';
  const stateClasses = isActive
    ? 'bg-slate-800/50 border-emerald-500/70'
    : isStale
      ? 'bg-amber-500/5 border-amber-500/50 hover:bg-amber-500/10'
      : 'bg-slate-900 border-slate-800 hover:border-emerald-500/30';

  return (
    <div
      className={`p-4 transition-all cursor-pointer group shadow-sm relative overflow-hidden rounded-2xl border-l-4 ${baseBorderColor} ${stateClasses}`}
    >
      {isStale && (
        <div className="absolute top-0 right-0">
          <div className="bg-amber-500 text-slate-950 text-[7px] font-black px-2 py-0.5 uppercase tracking-widest rounded-bl-lg shadow-lg animate-pulse">
            Stale Signal
          </div>
        </div>
      )}

      <div className="flex justify-between items-start mb-2">
        <div className="flex flex-col">
          <span
            className={`text-[10px] font-black uppercase tracking-widest ${
              isStale ? 'text-amber-400' : 'text-emerald-400'
            }`}
          >
            {job.company}
          </span>
          <h4 className="text-sm font-bold text-slate-100 group-hover:text-white truncate max-w-[150px]">
            {job.title}
          </h4>
        </div>
        <div className="text-right">
          <div className="text-[11px] font-black text-slate-400 font-mono tracking-tighter">
            {job.score.toFixed(1)}
          </div>
          <div className="text-[8px] text-slate-600 uppercase font-black tracking-tight">
            {job.sourceTier}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {job.highlights.slice(0, 3).map((h, i) => (
          <span
            key={`${h}-${i}`}
            className={`text-[8px] px-1.5 py-0.5 rounded border uppercase font-black ${
              isStale
                ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                : 'bg-slate-950 text-slate-500 border-slate-800'
            }`}
          >
            {h}
          </span>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-slate-800/50 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[9px] text-slate-600 font-bold uppercase italic">
            {job.postedDate}
          </span>
          {job.submissionDate && (
            <span
              className={`text-[8px] font-black uppercase tracking-tighter ${
                isStale ? 'text-amber-500/70' : 'text-slate-500'
              }`}
            >
              Sub:{' '}
              {new Date(job.submissionDate).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          )}
        </div>

        {job.legitimacy > 0.9 && !isStale && (
          <div className="relative group/legit">
            <span className="text-[8px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20 font-black uppercase tracking-widest">
              Verified
            </span>
            <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-slate-950 border border-slate-800 text-[9px] text-slate-400 invisible group-hover/legit:visible rounded shadow-2xl z-[100] font-medium leading-relaxed">
              Legitimacy Score: {(job.legitimacy * 10).toFixed(1)}/10. {job.proof}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;