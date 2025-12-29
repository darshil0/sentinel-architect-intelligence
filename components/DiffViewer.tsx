import React, { useRef, useMemo } from 'react';
import { MasterResume } from '../types';

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
    masterResume.coreCompetencies.forEach(s => skills.add(s.toLowerCase()));
    
    // Add words from achievements to inventory to be more flexible but still subset-driven
    masterResume.experience.forEach(exp => {
      exp.achievements.forEach(ach => {
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
      const parts = line.split(/(\b[\w\.+#-]+\b)/g); // Keep common tech chars
      return (
        <div key={i} className="min-h-[1.5em]">
          {parts.map((part, pi) => {
            const isWord = /^[\w\.+#-]+$/.test(part);
            const isMissing =
              isWord &&
              part.length > 2 &&
              !masterSkillsInventory.has(part.toLowerCase());
            
            return (
              <span
                key={pi}
                className={
                  isMissing
                    ? 'text-rose-500 font-black bg-rose-500/10 px-0.5 rounded border-b border-rose-500/50'
                    : ''
                }
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
    <div className="flex flex-col h-full gap-4 animate-in fade-in duration-500 overflow-hidden">
      <div className="flex-grow flex gap-px bg-slate-800/50 rounded-[32px] overflow-hidden border border-slate-800 shadow-2xl">
        <div className="flex-1 flex flex-col bg-[#0b1120]">
          <div className="px-6 py-4 border-b border-slate-800/60 flex justify-between items-center bg-slate-900/40">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Master Source</span>
            <span className="text-[9px] text-slate-700 font-mono tracking-widest uppercase">Immutable_Core</span>
          </div>
          <div
            ref={leftRef}
            onScroll={() => handleScroll('left')}
            className="p-8 flex-grow overflow-y-auto custom-scrollbar font-mono text-[13px] text-slate-500 leading-relaxed scroll-smooth"
          >
            <pre className="whitespace-pre-wrap">{original}</pre>
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-[#0b1120]">
          <div className="px-6 py-4 border-b border-slate-800/60 flex justify-between items-center bg-slate-900/40">
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Architect Artifact</span>
            <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-lg font-black border border-emerald-500/20 uppercase tracking-tighter">AI_VERIFIED_T1</span>
          </div>
          <div
            ref={rightRef}
            onScroll={() => handleScroll('right')}
            className="p-8 flex-grow overflow-y-auto custom-scrollbar font-mono text-[13px] text-emerald-300 leading-relaxed scroll-smooth"
          >
            {renderOptimizedWithAudit()}
          </div>
        </div>
      </div>

      {rationale && (
        <div className="bg-slate-900 border border-slate-800/80 rounded-[32px] p-6 flex gap-6 items-start shadow-xl backdrop-blur-md">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="space-y-2">
            <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Audit Rationale</h5>
            <p className="text-[13px] text-slate-300 leading-relaxed font-medium italic opacity-90">
              "{rationale}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiffViewer;
