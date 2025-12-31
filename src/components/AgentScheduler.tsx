import React, { useState } from 'react';
import { EngineId, Schedule } from '@/types';

interface AgentSchedulerProps {
  schedules: Schedule[];
  onAddSchedule: (agentId: EngineId, cron: string) => void;
  onRemoveSchedule: (id: string) => void;
}

const AgentIcon: React.FC<{ agentId: EngineId }> = ({ agentId }) => {
  const baseClass = "w-2 h-2 rounded-full";
  switch (agentId) {
    case 'linkedin':
      return <div className={`${baseClass} bg-sky-400`} title="LinkedIn Agent" />;
    case 'dice':
      return <div className={`${baseClass} bg-rose-500`} title="Dice Agent" />;
    case 'ghost':
      return <div className={`${baseClass} bg-slate-500`} title="Ghost Detector" />;
    default:
      return <div className={`${baseClass} bg-slate-700`} />;
  }
};

const AgentScheduler: React.FC<AgentSchedulerProps> = ({
  schedules,
  onAddSchedule,
  onRemoveSchedule,
}) => {
  const [selectedAgent, setSelectedAgent] = useState<EngineId>('linkedin');
  const [cronValue, setCronValue] = useState('* * * * *');

  const handleAdd = () => {
    // Basic validation for cron pattern
    if (cronValue.split(' ').length === 5) {
      onAddSchedule(selectedAgent, cronValue);
      setCronValue('* * * * *');
    } else {
      // Here you could add more robust error handling, like a toast notification
      console.warn("Invalid cron string format.");
    }
  };

  return (
    <div className="bg-[#0b1120] border border-slate-800 rounded-[32px] flex flex-col shadow-inner overflow-hidden h-full">
      <div className="px-6 py-4 border-b border-slate-800/60 bg-slate-900/40">
        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
          Scheduler Matrix
        </h4>
      </div>

      <div className="flex-grow p-6 space-y-3 overflow-y-auto custom-scrollbar">
        {schedules.length > 0 ? (
          schedules.map((schedule) => (
            <div
              key={schedule.id}
              className="flex justify-between items-center bg-slate-900/50 p-3 rounded-lg animate-in fade-in duration-300"
            >
              <div className="flex items-center gap-3">
                <AgentIcon agentId={schedule.agentId} />
                <span className="text-xs font-bold text-slate-300 capitalize">
                  {schedule.agentId}
                </span>
              </div>
              <span className="text-xs text-slate-500 font-mono">{schedule.cron}</span>
              <button
                onClick={() => onRemoveSchedule(schedule.id)}
                className="text-slate-600 hover:text-rose-500 transition-colors"
                aria-label="Remove schedule"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-xs text-slate-600 italic">Scheduler matrix is clear. System idle.</p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-800/60 bg-slate-900/20 flex items-center gap-2">
        <select
          value={selectedAgent}
          onChange={(e) => setSelectedAgent(e.target.value as EngineId)}
          className="flex-shrink-0 bg-slate-800 border border-slate-700 rounded-lg pl-3 pr-8 py-2 text-xs text-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 appearance-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%2364748b\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
        >
          <option value="linkedin">LinkedIn</option>
          <option value="dice">Dice</option>
          <option value="ghost">Ghost</option>
        </select>
        <input
          type="text"
          value={cronValue}
          onChange={(e) => setCronValue(e.target.value)}
          placeholder="* * * * *"
          className="flex-grow w-full bg-slate-950/50 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 font-mono focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
        />
        <button
          onClick={handleAdd}
          className="flex-shrink-0 w-9 h-9 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg flex items-center justify-center hover:bg-emerald-500/30 transition-all"
          aria-label="Add schedule"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
      </div>
    </div>
  );
};

export default AgentScheduler;
