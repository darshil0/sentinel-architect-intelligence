import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import ScraperEngine from '@/components/ScraperEngine';

describe('ScraperEngine', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders the scraper engine with tabs', () => {
    render(<ScraperEngine />);

    expect(screen.getByText(/Scraper Lab/i)).toBeDefined();
    expect(screen.getByText('linkedin')).toBeDefined();
    expect(screen.getByText('dice')).toBeDefined();
    expect(screen.getByText('ghost')).toBeDefined();
  });

  it('switches between agent tabs', async () => {
    render(<ScraperEngine />);

    const diceTab = screen.getByRole('button', { name: /dice/i });
    fireEvent.click(diceTab);

    // The active tab should have the emerald background
    const activeTab = screen.getByRole('button', { name: /dice/i });
    expect(activeTab.className).toContain('bg-emerald-500');
  });

  it('displays different code for each engine', async () => {
    const { rerender } = render(<ScraperEngine />);

    // Check for LinkedIn code
    const linkedinCode = screen.getByText(/sync_playwright/i);
    expect(linkedinCode).toBeDefined();

    // Switch to Dice
    const diceTab = screen.getByRole('button', { name: /dice/i });
    fireEvent.click(diceTab);

    await waitFor(() => {
      expect(screen.getByText(/DiceDiscoveryAgent/i)).toBeDefined();
    });
  });

  it('runs simulation and displays logs', async () => {
    vi.useFakeTimers();
    render(<ScraperEngine />);

    const deployButton = screen.getByRole('button', { name: /Deploy linkedin Agent/i });
    fireEvent.click(deployButton);

    expect(screen.getByText(/Initializing linkedin Agent/i)).toBeDefined();

    vi.advanceTimersByTime(5000);

    expect(screen.getByText(/Batch Ingest Complete/i)).toBeDefined();

    vi.useRealTimers();
  });

  it('prevents multiple simulations running simultaneously', () => {
    render(<ScraperEngine />);

    const deployButton = screen.getByRole('button', { name: /Deploy linkedin Agent/i });

    fireEvent.click(deployButton);
    expect(deployButton).toBeDisabled();
  });

  it('manages scheduler with cron entries', async () => {
    render(<ScraperEngine />);

    // The scheduler should be rendered
    expect(screen.getByText(/Scheduler Matrix/i)).toBeDefined();
  });

  it('allows switching engines from scheduler', async () => {
    render(<ScraperEngine />);

    const ghostTab = screen.getByRole('button', { name: /ghost/i });
    fireEvent.click(ghostTab);

    await waitFor(() => {
      expect(screen.getByText(/ghost_job_detector/i)).toBeDefined();
    });
  });

  it('displays system compliance status', () => {
    render(<ScraperEngine />);

    expect(screen.getByText(/Lead Architect Agent Sandbox/i)).toBeDefined();
  });

  it('handles rapid tab switches', async () => {
    render(<ScraperEngine />);

    const tabs = [
      screen.getByRole('button', { name: /linkedin/i }),
      screen.getByRole('button', { name: /dice/i }),
      screen.getByRole('button', { name: /ghost/i }),
    ];

    // Rapidly click tabs
    tabs.forEach(tab => fireEvent.click(tab));

    // Should still be functional
    expect(screen.getByText(/Scraper Lab/i)).toBeDefined();
  });
});
