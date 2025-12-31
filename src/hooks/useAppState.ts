import { useState, useMemo, useEffect, useCallback } from 'react';
import { JobMatch, MasterResume, JobStatus } from '@/types';
import { geminiService } from '@/services/geminiService';
import { DEFAULT_SYSTEM_CONTEXT } from '@/constants';
import logger from '@/services/logger';

export type Tab = 'dashboard' | 'kanban' | 'scrapers' | 'blueprints';

const STORAGE_KEYS = {
    JOBS: 'architect_jobs',
    RESUME: 'architect_resume',
};

export function useAppState(initialJobs: JobMatch[], initialResume: MasterResume) {
    // Load from localStorage or use initial values
    const [jobs, setJobs] = useState<JobMatch[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.JOBS);
        return saved ? JSON.parse(saved) : initialJobs;
    });

    const [masterResume, setMasterResume] = useState<MasterResume>(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.RESUME);
        return saved ? JSON.parse(saved) : initialResume;
    });

    const [activeTab, setActiveTab] = useState<Tab>('dashboard');
    const [selectedJobId, setSelectedJobId] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedCode, setGeneratedCode] = useState('');
    const [explanation, setExplanation] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<JobMatch | null>(null);
    const [notification, setNotification] = useState<string | null>(null);
    const [isComplianceApproved, setIsComplianceApproved] = useState(false);

    // Sync to localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
    }, [jobs]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.RESUME, JSON.stringify(masterResume));
    }, [masterResume]);

    const filteredJobs = useMemo(
        () => jobs.filter((j) => (j.legitimacy ?? 0) >= 0.7),
        [jobs]
    );

    useEffect(() => {
        if (filteredJobs.length === 0) {
            if (selectedJobId !== '') setSelectedJobId('');
            return;
        }
        if (!selectedJobId || !filteredJobs.some((j) => j.id === selectedJobId)) {
            setSelectedJobId(filteredJobs[0].id);
        }
    }, [filteredJobs, selectedJobId]);

    const selectedJob = useMemo(() => {
        return filteredJobs.find((j) => j.id === selectedJobId) || filteredJobs[0] || null;
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
                        jd: `Requires: ${(selectedJob.highlights ?? []).join(', ')}. ${selectedJob.company} infrastructure.`,
                        resumeSummary: masterResume.summary,
                        masterResume,
                        expectedGaps: [],
                    },
                }
            );

            setGeneratedCode(result.code ?? '');
            setExplanation(result.explanation ?? '');
        } catch (error: any) {
            logger.error({ error }, 'Optimization failed');
            setExplanation(`Architect System Failure: ${error.message || 'Unknown error'}`);
        } finally {
            setIsLoading(false);
        }
    }, [selectedJob, masterResume]);

    const handleSaveJob = useCallback((jobData: JobMatch) => {
        setJobs((prev) => {
            const exists = prev.some(j => j.id === jobData.id);
            if (exists) {
                return prev.map(j => j.id === jobData.id ? jobData : j);
            }
            return [jobData, ...prev];
        });
        setSelectedJobId(jobData.id);
        setIsModalOpen(false);
        setEditingJob(null);
        setNotification('Signal injected successfully.');
    }, []);

    const handleFollowUp = useCallback(async (job: JobMatch) => {
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
    }, [masterResume]);

    return {
        activeTab, setActiveTab,
        jobs, setJobs,
        filteredJobs,
        selectedJob,
        selectedJobId, setSelectedJobId,
        masterResume, setMasterResume,
        isLoading,
        generatedCode,
        explanation, setExplanation,
        isModalOpen, setIsModalOpen,
        editingJob, setEditingJob,
        notification, setNotification,
        isComplianceApproved, setIsComplianceApproved,
        handleOptimize,
        handleSaveJob,
        handleFollowUp
    };
}
