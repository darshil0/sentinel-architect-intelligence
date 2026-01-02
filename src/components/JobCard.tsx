import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { JobMatch } from '@/types';

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
    ? 'bg-white border-cyan-400 shadow-[0_4px_20px_rgba(6,182,212,0.15)]'
    : isStale
      ? 'bg-white/70 border-amber-300/50 hover:bg-white hover:border-amber-400'
      : 'bg-white/80 border-slate-200/60 hover:border-cyan-300/80 hover:bg-white';

  return (
    <motion.div
      whileHover={{ scale: 1.02, translateY: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`p-5 transition-all duration-300 cursor-pointer group relative overflow-hidden rounded-[24px] border backdrop-blur-sm ${stateClasses}`}
    >
      {isHighMatch && !isStale && (
        <div className="absolute -right-8 -top-8 w-16 h-16 bg-cyan-500/10 rotate-45 blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500" />
      )}

      {isStale && (
        <div className="absolute top-0 right-0">
          <div className="bg-amber-500 text-white text-[8px] font-bold px-3 py-1 uppercase tracking-[0.2em] rounded-bl-xl shadow-lg animate-pulse">
            Stale Signal
          </div>
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col gap-1">
          <span
            className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isStale ? 'text-amber-600' : 'text-cyan-600'
              }`}
          >
            {job.company}
          </span>
          <h4 className="text-base font-bold text-slate-900 group-hover:text-slate-950 transition-colors truncate max-w-[180px]">
            {job.title}
          </h4>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-lg font-bold text-slate-900 font-mono leading-none tracking-tighter">
            {job.score.toFixed(1)}
          </div>
          <div className="text-[9px] text-slate-600 uppercase font-semibold tracking-widest mt-1">
            Match
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {job.highlights.slice(0, 3).map((h, i) => (
          <span
            key={`${h}-${i}`}
            className={`text-[9px] px-2.5 py-1 rounded-lg border uppercase font-semibold tracking-wider transition-all ${isStale
                ? 'bg-amber-100/60 text-amber-700 border-amber-200'
                : 'bg-slate-100/60 text-slate-700 border-slate-200 group-hover:border-cyan-300'
              }`}
          >
            {h}
          </span>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-slate-200/60 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-slate-600 font-semibold uppercase tracking-tight">
              {job.postedDate}
            </span>
            {job.submissionDate && (
              <span
                className={`text-[9px] font-bold uppercase tracking-tighter ${isStale ? 'text-amber-600/80' : 'text-slate-600'
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
            <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-100/60 border border-blue-200 rounded-lg">
              <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[9px] text-blue-700 font-bold uppercase tracking-widest">
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
            className="w-full py-2.5 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-amber-600 transition-all shadow-[0_4px_12px_rgba(245,158,11,0.2)] active:scale-[0.98]"
          >
            Draft Follow-up
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default JobCard;