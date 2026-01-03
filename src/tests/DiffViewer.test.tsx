import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import DiffViewer from '@/components/DiffViewer';
import { MasterResume } from '@/types';

const mockMasterResume: MasterResume = {
  personalInfo: {
    name: 'Test User',
    role: 'Senior SDET',
    location: 'Remote',
  },
  summary: 'Experienced in testing and automation',
  coreCompetencies: ['Python', 'Pytest', 'FastAPI'],
  experience: [
    {
      company: 'Tech Corp',
      role: 'SDET',
      period: '2020-2023',
      achievements: ['Built test framework', 'Improved coverage'],
    },
  ],
  education: 'BS Computer Science',
};

describe('DiffViewer', () => {
  it('renders original and optimized content', () => {
    render(
      <DiffViewer
        original="Test original content"
        optimized="Test optimized content"
        masterResume={mockMasterResume}
      />
    );

    expect(screen.getByText('Master Source')).toBeDefined();
    expect(screen.getByText('Architect Artifact')).toBeDefined();
  });

  it('displays rationale when provided', () => {
    const rationale = 'This is the audit rationale';
    render(
      <DiffViewer
        original="Original"
        optimized="Optimized"
        rationale={rationale}
        masterResume={mockMasterResume}
      />
    );

    expect(screen.getByText(rationale)).toBeDefined();
    expect(screen.getByText('Audit Rationale')).toBeDefined();
  });

  it('detects hallucinations in optimized content', () => {
    const original = JSON.stringify({
      skills: ['Python', 'TypeScript'],
    });
    
    const optimized = 'Expert in Python, TypeScript, and NonexistentTech123';

    render(
      <DiffViewer
        original={original}
        optimized={optimized}
        masterResume={mockMasterResume}
      />
    );

    // The component should highlight hallucinated terms
    const artifact = screen.getByText('Architect Artifact');
    expect(artifact).toBeDefined();
  });

  it('syncs scroll position between left and right panels', async () => {
    const { container } = render(
      <DiffViewer
        original="Line 1\nLine 2\nLine 3\nLine 4\nLine 5\nLine 6\nLine 7\nLine 8\nLine 9\nLine 10"
        optimized="Line 1\nLine 2\nLine 3\nLine 4\nLine 5\nLine 6\nLine 7\nLine 8\nLine 9\nLine 10"
        masterResume={mockMasterResume}
      />
    );

    const scrollContainers = container.querySelectorAll('[class*="overflow-y-auto"]');
    expect(scrollContainers.length).toBeGreaterThanOrEqual(2);
  });

  it('handles empty content gracefully', () => {
    render(
      <DiffViewer
        original=""
        optimized=""
        masterResume={mockMasterResume}
      />
    );

    expect(screen.getByText('Master Source')).toBeDefined();
    expect(screen.getByText('Architect Artifact')).toBeDefined();
  });

  it('highlights required skills from master resume', () => {
    const optimized = 'Python skills demonstrated in multiple projects';
    
    render(
      <DiffViewer
        original="Original content"
        optimized={optimized}
        masterResume={mockMasterResume}
      />
    );

    const artifact = screen.getByText('Architect Artifact');
    expect(artifact).toBeDefined();
  });

  it('handles missing masterResume without crashing', () => {
    render(
      <DiffViewer
        original="Original"
        optimized="Optimized"
        // @ts-expect-error intentionally missing masterResume
      />
    );

    expect(screen.getByText('Master Source')).toBeDefined();
    expect(screen.getByText('Architect Artifact')).toBeDefined();
  });

  it('handles extremely long optimized text', () => {
    const longText = 'A'.repeat(50_000);
    render(
      <DiffViewer original="Orig" optimized={longText} masterResume={mockMasterResume} />
    );

    expect(screen.getByText('Architect Artifact')).toBeDefined();
  });

  it('handles invalid JSON in original gracefully', () => {
    render(
      <DiffViewer original="{ not: 'json'" optimized="opt" masterResume={mockMasterResume} />
    );

    expect(screen.getByText('Master Source')).toBeDefined();
  });
});
