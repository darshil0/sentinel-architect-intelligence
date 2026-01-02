import React, { useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MOCK_JOBS, MASTER_RESUME_JSON, ARCHITECT_OPTIMIZER_ENDPOINT } from '@/constants';
import { JobMatch, MasterResume } from '@/types';
import { useAppState, Tab } from '@/hooks/useAppState';

import JobCard from '@/components/JobCard';
import DiffViewer from '@/components/DiffViewer';
import ScoreBreakdown from '@/components/ScoreBreakdown';
import ComplianceFooter from '@/components/ComplianceFooter';
import Editor from '@/components/Editor';
import ScraperEngine from '@/components/ScraperEngine';
import InjectSignalModal from '@/components/InjectSignalModal';
import Notification from '@/components/Notification';
import ResumeParser from '@/components/ResumeParser';

const App: React.FC = () => {
  const {
    activeTab, setActiveTab,
    filteredJobs,
    selectedJob,
    selectedJobId, setSelectedJobId,
    masterResume, setMasterResume,
    isLoading,
    generatedCode,
    explanation,
    isModalOpen, setIsModalOpen,
    editingJob, setEditingJob,
    notification, setNotification,
    isComplianceApproved, setIsComplianceApproved,
    handleOptimize,
    handleSaveJob,
    handleFollowUp
  } = useAppState(MOCK_JOBS as JobMatch[], MASTER_RESUME_JSON);

  const TABS: Tab[] = ['dashboard', 'kanban', 'scrapers', 'blueprints'];
  const STATUSES = ['discovery', 'tailoring', 'submitted', 'screening', 'interview', 'offer'] as const;

  const handleJobCardKeyDown = useCallback((jobId: string) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedJobId(jobId);
    }
  }, [setSelectedJobId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 text-slate-700 flex flex-col selection:bg-cyan-400/20 overflow-hidden font-inter">
      {/* Modern Header */}
      <header className="h-20 border-b border-slate-200/40 px-10 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-2xl z-[100] shadow-sm">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 group cursor-default">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center font-black text-white shadow-[0_4px_20px_rgba(6,182,212,0.3)] group-hover:scale-110 transition-transform duration-500">
              SA
            </div>
            <div>
              <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-900 leading-none">
                Architect <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Hub</span>
              </h1>
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {masterResume.coreCompetencies.length} Active Tokens
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/60 p-1 rounded-2xl border border-slate-200/60 backdrop-blur-sm font-mono">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-[10px] font-semibold uppercase tracking-wide transition-all duration-300 ${activeTab === tab
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_4px_12px_rgba(6,182,212,0.2)]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button
          onClick={() => { setEditingJob(null); setIsModalOpen(true); }}
          className="btn-primary flex items-center gap-2 text-[10px]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Inject Signal
        </button>
      </header>

      <main className="flex-grow flex p-8 gap-8 h-[calc(100vh-80px)] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex-grow flex gap-8 overflow-hidden"
          >
            {activeTab === 'dashboard' && selectedJob && (
              <>
                {/* Sidebar Feed */}
                <aside className="w-85 flex flex-col gap-6 shrink-0 overflow-hidden">
                  <div className="flex justify-between items-center px-2">
                    <h2 className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">
                      Live Signals
                    </h2>
                    <span className="text-[10px] font-semibold text-cyan-700 bg-cyan-100 px-2 py-0.5 rounded-md border border-cyan-200">
                      {filteredJobs.length} ARCHITECT_TIER
                    </span>
                  </div>
                  <div className="flex-grow overflow-y-auto custom-scrollbar space-y-4 pr-3 pb-12">
                    {[...filteredJobs]
                      .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
                      .map((job) => (
                        <div
                          key={job.id}
                          onClick={() => setSelectedJobId(job.id)}
                          onKeyDown={handleJobCardKeyDown(job.id)}
                          role="button"
                          tabIndex={0}
                          className="focus:outline-none"
                        >
                          <JobCard job={job} isActive={selectedJobId === job.id} onFollowUp={handleFollowUp} />
                        </div>
                      ))}
                  </div>
                </aside>

                {/* Central Analysis */}
                <section className="flex-grow flex flex-col gap-6 overflow-hidden glass-panel p-1">
                  <div className="px-8 py-6 border-b border-slate-200/40 flex justify-between items-center bg-white/40">
                    <div className="flex items-center gap-4">
                      <div className="px-3 py-1 bg-cyan-100/60 border border-cyan-200/60 rounded-lg">
                        <span className="text-[10px] font-bold text-cyan-700 uppercase tracking-widest font-mono">
                          SYNC_VECTOR: {selectedJob.id}
                        </span>
                      </div>
                      <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                        {selectedJob.company} // <span className="text-slate-500">{selectedJob.title}</span>
                      </h2>
                    </div>
                    <button
                      onClick={handleOptimize}
                      disabled={isLoading}
                      className="btn-primary"
                    >
                      {isLoading ? 'Running Audit...' : 'Sync Optimized Artifact'}
                    </button>
                  </div>
                  <div className="flex-grow overflow-hidden px-4 pb-4">
                    <DiffViewer
                      original={JSON.stringify(masterResume, null, 2)}
                      optimized={generatedCode || '# Awaiting optimization sync...'}
                      rationale={explanation}
                      masterResume={masterResume}
                    />
                  </div>
                </section>

                {/* Intel Sidepanel */}
                <aside className="w-96 flex flex-col gap-8 overflow-y-auto custom-scrollbar pr-2 pb-12">
                  <ScoreBreakdown jobScore={selectedJob.score ?? 0} />

                  <div className="glass-panel p-8">
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">
                        Intelligence
                      </h3>
                      <button
                        onClick={() => { setEditingJob(selectedJob); setIsModalOpen(true); }}
                        className="text-[10px] font-bold text-cyan-600 hover:text-cyan-700 transition-colors"
                      >
                        Edit Signal
                      </button>
                    </div>
                    <div className="space-y-8">
                      <div>
                        <p className="text-[10px] font-bold text-slate-600 uppercase mb-4 tracking-widest">
                          Key Requirements
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {(selectedJob.highlights ?? []).map((h) => (
                            <span key={h} className="text-[10px] font-semibold text-slate-700 bg-slate-100/60 px-3 py-1.5 rounded-xl border border-slate-200">
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-600 uppercase mb-3 tracking-widest">
                          Audit Trail
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed italic bg-slate-50/60 p-4 rounded-2xl border border-slate-200/50">
                          "{selectedJob.proof || 'Direct verification pending from source orchestrator.'}"
                        </p>
                      </div>
                    </div>
                  </div>
                </aside>
              </>
            )}

            {activeTab === 'kanban' && (
              <div className="flex-grow flex gap-6 overflow-x-auto custom-scrollbar pb-12">
                {STATUSES.map((status) => (
                  <div key={status} className="min-w-[360px] glass-panel flex flex-col overflow-hidden">
                    <div className="p-6 border-b border-slate-200/40 bg-white/40 flex justify-between items-center">
                      <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.3em]">
                        {status}
                      </h3>
                      <span className="text-[10px] font-bold text-cyan-700 bg-cyan-100/60 px-3 py-1 rounded-full border border-cyan-200/60">
                        {filteredJobs.filter((j) => j.status === status).length}
                      </span>
                    </div>
                    <div className="flex-grow p-5 space-y-4 overflow-y-auto custom-scrollbar">
                      {filteredJobs.filter((j) => j.status === status).map((job) => (
                        <div key={job.id} onClick={() => setSelectedJobId(job.id)} className="cursor-pointer">
                          <JobCard job={job} isActive={selectedJobId === job.id} onFollowUp={handleFollowUp} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'scrapers' && <ScraperEngine />}

            {activeTab === 'blueprints' && (
              <div className="flex-grow grid grid-cols-2 gap-8 overflow-hidden">
                <div className="flex flex-col gap-8 overflow-hidden">
                  <ResumeParser onParsed={(res) => {
                    setMasterResume(res);
                    setNotification('Master Source Ingested Successfully.');
                  }} />
                  <div className="glass-panel flex-grow overflow-hidden flex flex-col">
                    <Editor
                      label="Master Profile (JSON)"
                      value={JSON.stringify(masterResume, null, 2)}
                      onChange={(v) => {
                        try {
                          const res = JSON.parse(v);
                          if (res.coreCompetencies) setMasterResume(res);
                        } catch { }
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-8">
                  <div className="glass-panel flex-grow overflow-hidden">
                    <Editor
                      label="Architect Blueprint"
                      value={ARCHITECT_OPTIMIZER_ENDPOINT}
                      readOnly
                    />
                  </div>
                  <div className="glass-panel p-8">
                    <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-[0.4em] mb-6">
                      Guardrails
                    </h4>
                    <div className="space-y-4 font-mono text-[11px]">
                      <div className="flex items-center gap-3 text-emerald-600">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                        <span>[SYSTEM] Hallucination Lock: ACTIVE</span>
                      </div>
                      <div className="flex items-center gap-3 text-emerald-600">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                        <span>[SYSTEM] Token Intersection: ENFORCED</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600 italic">
                        <div className="w-2 h-2 rounded-full bg-slate-400" />
                        <span>[LOG] Profile Integrity: 100% Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <InjectSignalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingJob={editingJob}
        onSave={handleSaveJob}
      />

      {notification && (
        <Notification message={notification} onClose={() => setNotification(null)} />
      )}

      <ComplianceFooter
        onApprove={() => setNotification('Artifact released for deployment.')}
        isReady={!!generatedCode && isComplianceApproved}
        onComplianceChange={setIsComplianceApproved}
      />
    </div>
  );
};

export default App;

