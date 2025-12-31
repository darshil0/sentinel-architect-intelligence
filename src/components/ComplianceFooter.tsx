import React, { useState, useEffect } from 'react';

interface ComplianceFooterProps {
  onApprove: () => void;
  onComplianceChange: (approved: boolean) => void;
  isReady: boolean;
}

const CHECK_ITEMS = {
  hallucination: 'Zero-Hallucination Verified',
  pii: 'PII Sanity Audit',
  integrity: 'Semantic Integrity Locked',
} as const;

type CheckId = keyof typeof CHECK_ITEMS;

const ComplianceFooter: React.FC<ComplianceFooterProps> = ({
  onApprove,
  onComplianceChange,
  isReady,
}) => {
  const [checks, setChecks] = useState<Record<CheckId, boolean>>({
    hallucination: false,
    pii: false,
    integrity: false,
  });

  const allChecked = Object.values(checks).every(Boolean);

  useEffect(() => {
    onComplianceChange(allChecked);
  }, [allChecked, onComplianceChange]);

  const toggleCheck = (id: CheckId) => {
    setChecks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#0f172a]/95 backdrop-blur-2xl border-t border-slate-800/80 p-6 z-[100] flex items-center justify-between px-16 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      <div className="flex gap-16">
        {(Object.entries(CHECK_ITEMS) as [CheckId, string][]).map(([id, label]) => (
          <label
            key={id}
            className="flex items-center gap-4 cursor-pointer group select-none relative"
          >
            <input
              type="checkbox"
              className="absolute opacity-0 pointer-events-none"
              checked={checks[id]}
              onChange={() => toggleCheck(id)}
            />
            <div
              className={`w-5 h-5 rounded-md border-2 transition-all duration-300 flex items-center justify-center ${
                checks[id]
                  ? 'bg-emerald-500 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'border-slate-700 bg-slate-900 group-hover:border-slate-600'
              }`}
            >
              {checks[id] && (
                <svg className="w-3.5 h-3.5 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <div className="flex flex-col">
              <span
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
                  checks[id] ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-400'
                }`}
              >
                {label}
              </span>
              <div className={`h-[1px] mt-1 bg-emerald-500 transition-all duration-500 ${checks[id] ? 'w-full opacity-50' : 'w-0 opacity-0'}`} />
            </div>
          </label>
        ))}
      </div>

      <div className="flex items-center gap-12">
        {!allChecked && (
          <div className="flex items-center gap-3 bg-rose-500/5 px-4 py-2 rounded-xl border border-rose-500/10">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
            <span className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em]">Guardrails Engaged</span>
          </div>
        )}

        <button
          type="button"
          disabled={!allChecked || !isReady}
          onClick={onApprove}
          className={`relative px-14 py-3.5 rounded-2xl font-black text-[12px] uppercase tracking-[0.3em] transition-all overflow-hidden border ${
            allChecked && isReady
              ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-[0_10px_30px_-5px_rgba(16,185,129,0.3)] hover:translate-y-[-2px] active:translate-y-[0px] hover:shadow-emerald-500/40'
              : 'bg-slate-900/50 text-slate-700 border-slate-800/50 opacity-40 cursor-not-allowed'
          }`}
        >
          <span className="relative z-10">{isReady ? 'Approve & Release Signal' : 'Sync Pending...'}</span>
          {allChecked && isReady && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
          )}
        </button>
      </div>
    </footer>
  );
};

export default ComplianceFooter;