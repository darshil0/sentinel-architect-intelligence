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
    <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-2xl border-t border-slate-200/80 p-6 z-[100] flex items-center justify-between px-16 shadow-[0_-20px_50px_rgba(6,182,212,0.08)]">
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
                  ? 'bg-cyan-500 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.18)]'
                  : 'border-slate-300 bg-white group-hover:border-cyan-300'
              }`}
            >
              {checks[id] && (
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <div className="flex flex-col">
              <span
                className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${
                  checks[id] ? 'text-cyan-700' : 'text-slate-500 group-hover:text-cyan-600'
                }`}
              >
                {label}
              </span>
              <div className={`h-[1px] mt-1 bg-cyan-400 transition-all duration-500 ${checks[id] ? 'w-full opacity-50' : 'w-0 opacity-0'}`} />
            </div>
          </label>
        ))}
      </div>

      <div className="flex items-center gap-12">
        {!allChecked && (
          <div className="flex items-center gap-3 bg-red-100/60 px-4 py-2 rounded-xl border border-red-200/40">
            <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.3)]" />
            <span className="text-[10px] font-bold text-red-600 uppercase tracking-[0.2em]">Guardrails Engaged</span>
          </div>
        )}

        <button
          type="button"
          disabled={!allChecked || !isReady}
          onClick={onApprove}
          className={`relative px-14 py-3.5 rounded-2xl font-bold text-[12px] uppercase tracking-[0.3em] transition-all overflow-hidden border ${
            allChecked && isReady
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400 shadow-[0_10px_30px_-5px_rgba(6,182,212,0.18)] hover:translate-y-[-2px] active:translate-y-[0px] hover:shadow-cyan-500/40'
              : 'bg-white/60 text-slate-400 border-slate-200/60 opacity-40 cursor-not-allowed'
          }`}
        >
          <span className="relative z-10">{isReady ? 'Approve & Release Signal' : 'Sync Pending...'}</span>
          {allChecked && isReady && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
          )}
        </button>
      </div>
    </footer>
  );
};

export default ComplianceFooter;