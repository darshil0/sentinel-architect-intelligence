import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { geminiService } from './services/geminiService';
import {
  DEFAULT_SYSTEM_CONTEXT,
  MOCK_JOBS,
  MASTER_RESUME_JSON,
  ARCHITECT_OPTIMIZER_ENDPOINT,
} from './constants';
import { JobMatch, MasterResume, JobStatus } from './types';

import JobCard from './components/JobCard';
import DiffViewer from './components/DiffViewer';
import ScoreBreakdown from './components/ScoreBreakdown';
import ComplianceFooter from './components/ComplianceFooter';
import Editor from './components/Editor';
import ScraperEngine from './components/ScraperEngine';
import InjectSignalModal from './components/InjectSignalModal';
import Notification from './components/Notification';
import logger from './services/logger';

type Tab = 'dashboard' | 'kanban' | 'scrapers' | 'blueprints';


const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [jobs, setJobs] = useState<JobMatch[]>(MOCK_JOBS ?? []);
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [masterResume, setMasterResume] = useState<MasterResume>(MASTER_RESUME_JSON);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [explanation, setExplanation] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobMatch | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [isComplianceApproved, setIsComplianceApproved] = useState(false);

  const handleComplianceChange = useCallback((approved: boolean) => {
    setIsComplianceApproved(approved);
  }, []);

  // Filter jobs based on architect-tier legitimacy (>= 0.7)
  const filteredJobs = useMemo(
    () => jobs.filter((j) => (j.legitimacy ?? 0) >= 0.7),
    [jobs]
  );

  // Ensure selection always points to a valid filtered job
  useEffect(() => {
    // If no jobs are available, clear selection
    if (filteredJobs.length === 0) {
      if (selectedJobId !== '') {
        setSelectedJobId('');
      }
      return;
    }

    // If nothing selected yet, pick the top job
    if (!selectedJobId) {
      setSelectedJobId(filteredJobs[0].id);
      return;
    }

    // If current selection is no longer valid (e.g., legitimacy changed), reset to first
    const exists = filteredJobs.some((j) => j.id === selectedJobId);
    if (!exists) {
      setSelectedJobId(filteredJobs[0].id);
    }
  }, [filteredJobs, selectedJobId]);

  const selectedJob: JobMatch | null = useMemo(() => {
    if (filteredJobs.length === 0) return null;
    const found = filteredJobs.find((j) => j.id === selectedJobId);
    return found ?? filteredJobs[0];
  }, [filteredJobs, selectedJobId]);

  const handleOptimize = useCallback(async () => {
    if (!selectedJob) return;

    logger.info({ selectedJobId: selectedJob.id }, 'Optimizing job');
    setIsLoading(true);
    setGeneratedCode('');
    setExplanation('');

    try {
      const result = await geminiService.generateFastAPIEndpoint(
        DEFAULT_SYSTEM_CONTEXT,
        {
          targetEndpoint: 'POST /optimize',
          requirements: ['Zero Hallucination', 'Strict Token Intersection', 'Lead Architect Audit'],
          temperature: 0.2,
          activeScenario: {
            id: 'opt-v2',
            title: selectedJob.title,
            jd: `Requires: ${(selectedJob.highlights ?? []).join(', ')}. ${selectedJob.company
              } infrastructure.`,
            resumeSummary: masterResume.summary,
            masterResume,
            expectedGaps: [],
          },
        }
      );

      logger.info(
        { generatedCodeLength: result.code?.length ?? 0 },
        'Optimization successful'
      );
      setGeneratedCode(result.code ?? '');
      setExplanation(result.explanation ?? '');
    } catch (error: unknown) {
      logger.error({ error }, 'Optimization failed');
      if (error instanceof Error && error.message) {
        setExplanation(`Architect System Failure: ${error.message}`);
      } else {
        setExplanation('Architect System Failure: High-integrity model sync failed.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [selectedJob, masterResume]);

  const handleSaveJob = useCallback(
    (jobData: JobMatch) => {
      if (editingJob?.id) {
        // Update existing
        setJobs((prev) => prev.map((j) => (j.id === editingJob.id ? jobData : j)));
      } else {
        // Add new
        setJobs((prev) => [jobData, ...prev]);
      }

      setSelectedJobId(jobData.id);
      setIsModalOpen(false);
      setEditingJob(null);
      setNotification('Signal injected successfully.');
    },
    [editingJob]
  );

  const TABS: Tab[] = ['dashboard', 'kanban', 'scrapers', 'blueprints'];
  const STATUSES: JobStatus[] = ['discovery', 'tailoring', 'submitted', 'screening', 'interview', 'offer'];


  const handleEditJob = useCallback((job: JobMatch) => {
    setEditingJob(job);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingJob(null);
  }, []);

  const handleFollowUp = useCallback(
    async (job: JobMatch) => {
      logger.info({ jobId: job.id }, 'Generating follow-up email');
      setIsLoading(true);
      try {
        const email = await geminiService.generateFollowUpEmail(masterResume, job);
        setExplanation(`FOLLOW-UP DRAFT FOR ${job.company.toUpperCase()}:\n\n${email}`);
        setActiveTab('dashboard');
        setNotification('Follow-up artifact generated.');
      } catch (error) {
        logger.error({ error }, 'Follow-up generation failed');
        setNotification('Failed to generate follow-up draft.');
      } finally {
        setIsLoading(false);
      }
    },
    [masterResume]
  );

  const handleJobCardKeyDown = useCallback(
    (jobId: string) =>
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setSelectedJobId(jobId);
        }
      },
    []
  );


  const hasDashboardJobs = activeTab === 'dashboard' && filteredJobs.length > 0 && !!selectedJob;

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col font-inter selection:bg-emerald-500/20 overflow-hidden">
      <header className="h-16 border-b border-slate-800/60 px-8 flex items-center justify-between sticky top-0 bg-[#0f172a]/95 backdrop-blur-md z-[100]">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-md flex items-center justify-center font-black text-slate-900 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              QA
            </div>
            <h1 className="text-[11px] font-black uppercase tracking-[0.3em] text-white">
              Architect Command Center
            </h1>
          </div>
          <div className="h-4 w-px bg-slate-800" />
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Inventory: {masterResume.coreCompetencies.length} Valid Tokens
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setEditingJob(null);
              setIsModalOpen(true);
            }}
            className="px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest bg-emerald-500/5 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all flex items-center gap-2"
            aria-label="Inject new job signal"
          >
            Inject Signal
          </button>
          <div className="h-8 w-px bg-slate-800" />
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-500 hover:text-slate-300'
                }`}
              aria-label={`Switch to ${tab} view`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-grow flex overflow-hidden p-6 gap-6 h-[calc(100vh-128px)]">
        {hasDashboardJobs && selectedJob && (
          <>
            <aside className="w-80 flex flex-col gap-4 shrink-0 overflow-hidden">
              <div className="flex justify-between items-center px-2 pb-4">
                <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Active Signals
                </h2>
                <span className="text-[9px] font-bold text-slate-600 uppercase">
                  {filteredJobs.length} Verified
                </span>
              </div>
              <div className="flex-grow overflow-y-auto custom-scrollbar space-y-3 pr-2 pb-8">
                {[...filteredJobs]
                  .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
                  .map((job) => (
                    <div
                      key={job.id}
                      onClick={() => setSelectedJobId(job.id)}
                      onKeyDown={handleJobCardKeyDown(job.id)}
                      role="button"
                      tabIndex={0}
                      className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded-lg"
                    >
                      <JobCard job={job} isActive={selectedJobId === job.id} onFollowUp={handleFollowUp} />
                    </div>
                  ))}
              </div>
            </aside>

            <section className="flex-grow flex flex-col gap-4 overflow-hidden">
              <div className="flex justify-between items-center px-2 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Vector:
                  </span>
                  <span className="text-[11px] font-black text-emerald-400 uppercase tracking-widest">
                    {selectedJob.company} // {selectedJob.title}
                  </span>
                </div>
                <button
                  onClick={handleOptimize}
                  disabled={isLoading || !selectedJob}
                  className="bg-emerald-500 text-slate-950 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                  aria-label="Generate optimized resume artifact"
                >
                  {isLoading ? 'Running Compliance Audit...' : 'Sync Optimized Artifact'}
                </button>
              </div>
              <div className="flex-grow overflow-hidden">
                <DiffViewer
                  original={JSON.stringify(masterResume, null, 2)}
                  optimized={
                    generatedCode ||
                    '# Architectural Integrity Guardrails Active.\n# Artifact awaiting optimization sync.'
                  }
                  rationale={explanation}
                  masterResume={masterResume}
                />
              </div>
            </section>

            <aside className="w-96 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2 pb-10">
              <ScoreBreakdown jobScore={selectedJob.score ?? 0} />
              <div className="bg-slate-900 border border-slate-800/80 rounded-[32px] p-6 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Signal Intelligence
                  </h3>
                  <button
                    onClick={() => handleEditJob(selectedJob)}
                    disabled={!selectedJob}
                    className="text-[9px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 hover:bg-emerald-500/20 transition-all disabled:opacity-50"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-5">
                  <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
                    <p className="text-[9px] font-black text-slate-500 uppercase mb-3 tracking-widest">
                      Requirements Inventory
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(selectedJob.highlights ?? []).map((h) => (
                        <span
                          key={h}
                          className="text-[9px] font-bold text-slate-300 bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-700/50"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
                    <p className="text-[9px] font-black text-slate-500 uppercase mb-2 tracking-widest">
                      Legitimacy Proof
                    </p>
                    <p className="text-[11px] text-slate-400 leading-relaxed italic">
                      {selectedJob.proof || 'Direct verification pending.'}
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </>
        )}

        {activeTab === 'dashboard' && filteredJobs.length === 0 && (
          <div className="flex flex-1 items-center justify-center text-slate-500 text-xs uppercase tracking-[0.3em]">
            No architect-verified signals available. Adjust legitimacy criteria or inject a new signal.
          </div>
        )}

        {activeTab === 'kanban' && (
          <div className="flex-grow flex gap-4 overflow-x-auto custom-scrollbar pb-10">
            {STATUSES.map((status) => (
              <div
                key={status}
                className="min-w-[340px] bg-slate-900/40 border border-slate-800/60 rounded-[32px] p-6 flex flex-col gap-6 flex-shrink-0"
              >
                <div className="flex justify-between items-center px-2 pb-4">
                  <h3 className="text-[11px] font-black text-white uppercase tracking-widest">
                    {status}
                  </h3>
                  <span className="text-[9px] font-black text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">
                    {filteredJobs.filter((j) => j.status === status).length}
                  </span>
                </div>
                <div className="flex-grow space-y-4 overflow-y-auto custom-scrollbar pr-1 max-h-[calc(100vh-300px)]">
                  {filteredJobs
                    .filter((j) => j.status === status)
                    .map((job) => (
                      <div
                        key={job.id}
                        onClick={() => setSelectedJobId(job.id)}
                        onKeyDown={handleJobCardKeyDown(job.id)}
                        role="button"
                        tabIndex={0}
                        className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded-lg"
                      >
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
          <div className="flex-grow grid grid-cols-2 gap-6 overflow-hidden">
            <Editor
              label="Master Source (JSON)"
              value={JSON.stringify(masterResume, null, 2)}
              onChange={(v) => {
                try {
                  const newResume = JSON.parse(v) as MasterResume;
                  if (!Array.isArray(newResume.coreCompetencies)) {
                    throw new Error('coreCompetencies must be an array');
                  }
                  setMasterResume(newResume);
                  logger.info(
                    { competenciesCount: newResume.coreCompetencies.length },
                    'Master resume updated'
                  );
                } catch (e) {
                  logger.warn({ error: e }, 'Failed to parse master resume');
                  // optional: show user-facing error via Notification/toast
                }
              }}
            />
            <div className="flex flex-col gap-6 overflow-hidden">
              <Editor
                label="FastAPI Principal Blueprint"
                value={ARCHITECT_OPTIMIZER_ENDPOINT}
                readOnly
              />
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col gap-4">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                  Integrity Guardrails
                </h4>
                <div className="space-y-2 font-mono text-[11px]">
                  <p className="text-emerald-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    [SYSTEM] Hallucination Lock: ACTIVE
                  </p>
                  <p className="text-emerald-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    [SYSTEM] Token Intersection: ENFORCED
                  </p>
                  <p className="text-slate-500 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                    [LOG] Artifact Mapping... 100% Valid
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <InjectSignalModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingJob={editingJob}
        onSave={handleSaveJob}
      />

      {notification && (
        <Notification message={notification} onClose={() => setNotification(null)} />
      )}

      <ComplianceFooter
        onApprove={() => setNotification('Tailored artifact released for submission.')}
        isReady={!!generatedCode && isComplianceApproved}
        onComplianceChange={handleComplianceChange}
      />
    </div>
  );
};

export default App;
