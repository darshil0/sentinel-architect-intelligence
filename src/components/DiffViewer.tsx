import React, { useRef, useMemo } from 'react';
import { MasterResume } from '@/types';

interface DiffViewerProps {
  original: string;
  optimized: string;
  rationale?: string;
  masterResume: MasterResume;
}

const DiffViewer: React.FC<DiffViewerProps> = ({
  original,
  optimized,
  rationale,
  masterResume,
}) => {
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const isSyncing = useRef(false);

  const handleScroll = (source: 'left' | 'right') => {
    if (isSyncing.current) return;
    isSyncing.current = true;

    const sourceEl = source === 'left' ? leftRef.current : rightRef.current;
    const targetEl = source === 'left' ? rightRef.current : leftRef.current;

    if (sourceEl && targetEl) {
      targetEl.scrollTop = sourceEl.scrollTop;
    }

    window.setTimeout(() => {
      isSyncing.current = false;
    }, 50);
  };

  const masterSkillsInventory = useMemo(() => {
    const skills = new Set<string>();
    if (!masterResume) return skills;

    masterResume.coreCompetencies?.forEach(s => skills.add(s.toLowerCase()));
    masterResume.experience?.forEach(exp => {
      exp.achievements?.forEach(ach => {
        ach.split(/[\s,.\(\)]+/).forEach(word => {
          if (word.length > 2) skills.add(word.toLowerCase());
        });
      });
    });
    return skills;
  }, [masterResume]);

  const renderOptimizedWithAudit = () => {
    if (!optimized) return null;

    return optimized.split('\n').map((line, i) => {
      const parts = line.split(/(\b[\w\.+#-]+\b)/g);
      return (
        <div key={i} className="min-h-[1.5em] flex flex-wrap">
          {parts.map((part, pi) => {
            const isWord = /^[\w\.+#-]+$/.test(part);
            const isMissing = isWord && part.length > 2 && !masterSkillsInventory.has(part.toLowerCase());

            return (
              <span
                key={pi}
                className={isMissing ? 'text-red-600 font-bold bg-red-100/50 px-0.5 rounded border-b border-red-300' : ''}
                title={isMissing ? "Hallucination Risk: Token not found in Master Inventory" : undefined}
              >
                {part}
              </span>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col h-full gap-6 animate-in fade-in duration-700">
      <div className="flex-grow flex bg-white/70 rounded-[32px] overflow-hidden border border-slate-200/60 shadow-[0_8px_32px_rgba(6,182,212,0.1)] backdrop-blur-sm">
        <div className="flex-1 flex flex-col border-r border-slate-200/40">
          <div className="px-8 py-5 border-b border-slate-200/40 flex justify-between items-center bg-white/40">
            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-[0.3em]">Master Source</span>
            <span className="text-[9px] text-slate-600 font-mono tracking-widest uppercase">READ_ONLY</span>
          </div>
          <div
            ref={leftRef}
            onScroll={() => handleScroll('left')}
            className="p-8 flex-grow overflow-y-auto custom-scrollbar font-mono text-[12px] text-slate-600 leading-relaxed scroll-smooth"
          >
            <pre className="whitespace-pre-wrap">{original}</pre>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="px-8 py-5 border-b border-slate-200/40 flex justify-between items-center bg-white/40">
            <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-[0.3em]">Architect Artifact</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-[9px] text-cyan-600 font-bold uppercase tracking-widest">AI_OPTIMIZED</span>
            </div>
          </div>
          <div
            ref={rightRef}
            onScroll={() => handleScroll('right')}
            className="p-8 flex-grow overflow-y-auto custom-scrollbar font-mono text-[12px] text-cyan-900/90 leading-relaxed scroll-smooth"
          >
            {renderOptimizedWithAudit()}
          </div>
        </div>
      </div>

      {rationale && (
        <div className="glass-panel p-6 flex gap-6 items-start animate-in slide-in-from-bottom-2 duration-500">
          <div className="w-12 h-12 rounded-2xl bg-cyan-100/60 border border-cyan-200/60 flex items-center justify-center text-cyan-600 shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="space-y-1.5">
            <h5 className="text-[10px] font-bold text-slate-700 uppercase tracking-[0.4em]">Audit Rationale</h5>
            <p className="text-[12px] text-slate-600 leading-relaxed italic">
              {rationale}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiffViewer;

