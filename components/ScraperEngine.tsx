import React, { useState, useEffect } from 'react';
import { GHOST_JOB_DETECTOR_SOURCE, ARCHITECT_MASTER_BLUEPRINT } from '../constants';
import AgentScheduler from './AgentScheduler';
import { Schedule } from '../types';

type EngineId = 'linkedin' | 'dice' | 'ghost';

const ScraperEngine: React.FC = () => {
  const [activeEngine, setActiveEngine] = useState<EngineId>('linkedin');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    const storedSchedules = localStorage.getItem('agentSchedules');
    if (storedSchedules) {
      setSchedules(JSON.parse(storedSchedules));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('agentSchedules', JSON.stringify(schedules));
  }, [schedules]);

  useEffect(() => {
    const cronMatch = (cron: string, date: Date) => {
      const cronParts = cron.split(' ');
      const [minute, hour, dayOfMonth, month, dayOfWeek] = cronParts;

      const match = (value: number, part: string) => {
        if (part === '*') return true;
        if (part.includes(',')) {
          return part.split(',').some((p) => match(value, p));
        }
        if (part.includes('/')) {
          const [base, step] = part.split('/').map(Number);
          return value % step === (base || 0);
        }
        if (part.includes('-')) {
          const [start, end] = part.split('-').map(Number);
          return value >= start && value <= end;
        }
        return value === Number(part);
      };

      return (
        match(date.getMinutes(), minute) &&
        match(date.getHours(), hour) &&
        match(date.getDate(), dayOfMonth) &&
        match(date.getMonth() + 1, month) &&
        match(date.getDay(), dayOfWeek)
      );
    };

    const interval = setInterval(() => {
      const now = new Date();
      schedules.forEach((schedule) => {
        if (cronMatch(schedule.cron, now)) {
          runSimulation(schedule.agentId);
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [schedules]);

  const handleAddSchedule = (agentId: EngineId, cron: string) => {
    const newSchedule: Schedule = {
      id: crypto.randomUUID(),
      agentId,
      cron,
    };
    setSchedules((prev) => [...prev, newSchedule]);
  };

  const handleRemoveSchedule = (id: string) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
  };

  const linkedinCode = `
from playwright.sync_api import sync_playwright
import time
import random

def scrape_linkedin_qa_roles(keywords="QA Automation"):
    """
    LEAD ARCHITECT IMPLEMENTATION: Production-grade LinkedIn Scraper
    TIER: 1 (Primary Source)
    """
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 QA-Discovery-Bot/1.0",
            viewport={'width': 1920, 'height': 1080}
        )
        page = context.new_page()
        page.goto(f"https://www.linkedin.com/jobs/search/?keywords={keywords}")
        # Human-like interaction pause
        time.sleep(random.uniform(5.2, 7.8))
        # Logic to parse job cards...
        return []
`;

  const diceCode = `
import requests

class DiceDiscoveryAgent:
    """
    DICE API FETCHER
    SIGNAL: Tier 2 (Aggregator/Platform mix)
    """
    def __init__(self):
        self.base_url = "https://www.dice.com/api/search/jobs"
        self.headers = {
            "User-Agent": "QAJobDiscoveryBot/1.0",
            "Accept": "application/json"
        }

    def fetch_qa_jobs(self, keywords="QA Automation"):
        params = {"q": keywords, "location": "Remote, USA"}
        response = requests.get(self.base_url, params=params, headers=self.headers)
        if response.status_code == 200:
            return response.json().get('resultItemList', [])
        return []
`;

  const handleSetEngine = (engine: EngineId) => {
    setActiveEngine(engine);
    setSimLogs([]);
  };

  const runSimulation = (agentId?: EngineId) => {
    const engineToRun = agentId || activeEngine;
    if (isSimulating) return;

    setIsSimulating(true);
    setSimLogs([
      `[SYSTEM] Initializing ${engineToRun.toUpperCase()} Agent...`,
      `[SYSTEM] Compliance Check: ARCHITECT_CERTIFIED`,
      `[SYSTEM] Target Protocol: ${engineToRun === 'dice' ? 'REST_API' : 'HEADLESS_BROWSER'}`
    ]);

    const messages: Record<EngineId, string[]> = {
      linkedin: [
        '[ENGINE] Launching Chromium (Headless)...',
        '[ENGINE] Setting user-agent: QA-Discovery-Bot/1.0',
        '[ENGINE] Navigating to T1 Signal Source...',
        '[ENGINE] Detected 12 high-integrity signals.',
        '[PARSER] Extracting metadata for Anthropic, Stripe, OpenAI...',
        '[SYSTEM] Batch Ingest Complete. Forwarding to Orchestrator.',
      ],
      dice: [
        '[ENGINE] Dispatching REST request to Dice API...',
        '[ENGINE] Headers: User-Agent, Bearer Auth verified.',
        '[ENGINE] Status 200 OK - Payload received.',
        '[PARSER] Mapping 45 job records to internal schema.',
        '[SYSTEM] Syncing with PostgreSQL instance.',
      ],
      ghost: [
        "[AUDIT] Analyzing job signal integrity for 'SDET Rockstar'...",
        "[AUDIT] Keyword Scan: Found 'rockstar' (-0.3 penalty)",
        '[AUDIT] Age Check: 65 days since posting (-0.7 penalty)',
        '[ALERT] GHOST_JOB detected (Legitimacy: 0.0)',
        '[SYSTEM] Moving to unverified quarantine.',
      ],
    };

    messages[engineToRun].forEach((msg, i) => {
      window.setTimeout(() => {
        setSimLogs((prev) => [...prev, msg]);
        if (i === messages[engineToRun].length - 1) {
          setIsSimulating(false);
        }
      }, (i + 1) * 800);
    });
  };

  const activeCode =
    activeEngine === 'linkedin'
      ? linkedinCode
      : activeEngine === 'dice'
      ? diceCode
      : GHOST_JOB_DETECTOR_SOURCE || '# GHOST_JOB_DETECTOR_SOURCE not configured';

  return (
    <div className="flex flex-col h-full gap-6 animate-in fade-in duration-500 overflow-hidden">
      <div className="flex justify-between items-end px-2">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tighter">
            Scraper <span className="text-emerald-400">Lab</span>
          </h1>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-[0.3em] font-bold">
            Lead Architect Agent Sandbox
          </p>
        </div>
        <div className="flex bg-slate-800/30 p-1.5 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
          {['linkedin', 'dice', 'ghost'].map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => handleSetEngine(id as EngineId)}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeEngine === id
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-grow grid grid-cols-12 gap-6 overflow-hidden">
        <div className="col-span-8 flex flex-col bg-[#0b1120] border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl">
          <div className="px-6 py-4 bg-slate-900/40 border-b border-slate-800/60 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
              </div>
              <span className="ml-3 text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">
                {activeEngine}_discovery_agent.py
              </span>
            </div>
            <span className="text-[9px] font-mono text-emerald-500 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              STABLE_BLUEPRINT
            </span>
          </div>
          <div className="flex-grow overflow-auto custom-scrollbar p-8">
            <pre className="font-mono text-[13px] text-emerald-300/80 leading-relaxed whitespace-pre-wrap selection:bg-emerald-500/20">
              {activeCode}
            </pre>
          </div>
        </div>

        <div className="col-span-4 flex flex-col gap-6 overflow-hidden">
          <div className="bg-[#0b1120] border border-slate-800 rounded-[32px] flex flex-col shadow-inner overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800/60 bg-slate-900/40 flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Agent Terminal
              </span>
              <div className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-emerald-500 animate-pulse' : 'bg-slate-700'}`} />
            </div>
            <div className="p-6 overflow-y-auto custom-scrollbar flex-grow font-mono text-[11px] space-y-2 leading-relaxed">
              {simLogs.length === 0 ? (
                <p className="text-slate-700 italic">Console idle. Awaiting instruction...</p>
              ) : (
                simLogs.map((log, i) => (
                  <div key={`${log}-${i}`} className={log.includes('[ALERT]') ? 'text-rose-500' : log.includes('[SYSTEM]') ? 'text-slate-500' : 'text-slate-300'}>
                    <span className="text-slate-800 mr-2">{'>'}</span>{log}
                  </div>
                ))
              )}
              {isSimulating && <div className="text-emerald-500 animate-pulse">_</div>}
            </div>
            <div className="p-6 border-t border-slate-800/60 bg-slate-900/20">
              <button
                type="button"
                disabled={isSimulating}
                onClick={runSimulation}
                className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  isSimulating
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-[0_10px_30px_-5px_rgba(16,185,129,0.3)]'
                }`}
              >
                {isSimulating ? 'Executing Simulation...' : `Deploy ${activeEngine.toUpperCase()} Agent`}
              </button>
            </div>
          </div>
          <div className="flex-grow flex flex-col gap-6 overflow-hidden">
            <AgentScheduler
              schedules={schedules}
              onAddSchedule={handleAddSchedule}
              onRemoveSchedule={handleRemoveSchedule}
            />
            <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-6">
              <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">
                Master Audit Log
              </h5>
              <div className="text-[10px] text-slate-500 font-mono leading-relaxed italic">
                "{ARCHITECT_MASTER_BLUEPRINT.split('\n')[1].trim()}"
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScraperEngine;