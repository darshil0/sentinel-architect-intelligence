import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import JobCard from '@/components/JobCard';
import { JobMatch } from '@/types';

const mockJob: JobMatch = {
    id: 'test-id',
    title: 'Senior SDET',
    company: 'Mock Corp',
    location: 'Remote',
    score: 9.5,
    legitimacy: 0.95,
    highlights: ['Python', 'Playwright'],
    status: 'discovery',
    postedDate: '2d ago',
    isVerified: true,
    isRemote: true,
    sourceTier: 'Tier 1 - Direct'
};

describe('JobCard', () => {
    it('renders job title and company', () => {
        render(<JobCard job={mockJob} />);
        expect(screen.getByText('Senior SDET')).toBeDefined();
        expect(screen.getByText('Mock Corp')).toBeDefined();
    });

    it('displays the match score', () => {
        render(<JobCard job={mockJob} />);
        expect(screen.getByText('9.5')).toBeDefined();
    });

    it('shows stale badge for old submitted jobs', () => {
        const staleJob: JobMatch = {
            ...mockJob,
            status: 'submitted',
            submissionDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString() // 8 days ago
        };
        render(<JobCard job={staleJob} />);
        expect(screen.getByText('Stale Signal')).toBeDefined();
    });

    it('calls onFollowUp when follow-up button is clicked', () => {
        const onFollowUp = vi.fn();
        const staleJob: JobMatch = {
            ...mockJob,
            status: 'submitted',
            submissionDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
        };
        render(<JobCard job={staleJob} onFollowUp={onFollowUp} />);

        const button = screen.getByText('Draft Follow-up');
        fireEvent.click(button);
        expect(onFollowUp).toHaveBeenCalledWith(staleJob);
    });
});

describe('JobCard edge cases', () => {
    it('renders correctly without optional callbacks', () => {
        const jobNoCallbacks: JobMatch = { ...mockJob };
        render(<JobCard job={jobNoCallbacks} />);
        expect(screen.getByText('Senior SDET')).toBeDefined();
    });

    it('handles missing score gracefully', () => {
        const noScore: any = { ...mockJob };
        delete noScore.score;
        render(<JobCard job={noScore} />);
        expect(screen.getByText('Mock Corp')).toBeDefined();
    });
});
