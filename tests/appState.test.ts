import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAppState } from '../hooks/useAppState';
import { MOCK_JOBS, MASTER_RESUME_JSON } from '../constants';

// Mock localStorage
const localStorageMock = (() => {
    let store: { [key: string]: string } = {};
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => { store[key] = value.toString(); },
        clear: () => { store = {}; },
        removeItem: (key: string) => { delete store[key]; }
    };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('useAppState', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    it('should initialize with provided values', () => {
        const { result } = renderHook(() => useAppState(MOCK_JOBS as any, MASTER_RESUME_JSON));
        expect(result.current.jobs).toEqual(MOCK_JOBS);
        expect(result.current.masterResume).toEqual(MASTER_RESUME_JSON);
    });

    it('should filter jobs based on legitimacy', () => {
        const jobs = [
            { id: '1', legitimacy: 0.8, company: 'A', title: 'T' },
            { id: '2', legitimacy: 0.5, company: 'B', title: 'T' }
        ];
        const { result } = renderHook(() => useAppState(jobs as any, MASTER_RESUME_JSON));
        expect(result.current.filteredJobs).toHaveLength(1);
        expect(result.current.filteredJobs[0].id).toBe('1');
    });

    it('should update jobs and persist to localStorage', () => {
        const { result } = renderHook(() => useAppState(MOCK_JOBS as any, MASTER_RESUME_JSON));
        const newJob = { id: 'new', legitimacy: 0.9, company: 'New', title: 'Dev', status: 'discovery' };

        act(() => {
            result.current.handleSaveJob(newJob as any);
        });

        expect(result.current.jobs).toContainEqual(newJob);
        expect(JSON.parse(localStorage.getItem('architect_jobs') || '[]')).toContainEqual(newJob);
    });

    it('should update masterResume and persist to localStorage', () => {
        const { result } = renderHook(() => useAppState(MOCK_JOBS as any, MASTER_RESUME_JSON));
        const updatedResume = { ...MASTER_RESUME_JSON, summary: 'Updated summary' };

        act(() => {
            result.current.setMasterResume(updatedResume);
        });

        expect(result.current.masterResume.summary).toBe('Updated summary');
        expect(JSON.parse(localStorage.getItem('architect_resume') || '{}').summary).toBe('Updated summary');
    });

    it('should handle tab switches', () => {
        const { result } = renderHook(() => useAppState(MOCK_JOBS as any, MASTER_RESUME_JSON));
        act(() => {
            result.current.setActiveTab('kanban');
        });
        expect(result.current.activeTab).toBe('kanban');
    });
});
