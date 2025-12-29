
import React, { useEffect } from 'react';
import { JobMatch, SourceTier } from '../types';
import { useForm } from '../hooks/useForm';

interface InjectSignalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (job: JobMatch) => void;
  editingJob: JobMatch | null;
}

const InjectSignalModal: React.FC<InjectSignalModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingJob,
}) => {
  // Fix: useForm expects an object with initialValues and onSubmit properties as per hooks/useForm.ts
  const { values, setValues, handleChange, handleSubmit, resetForm } = useForm({
    initialValues: {
      title: '',
      company: '',
      location: '',
      highlights: '',
      sourceTier: 'Tier 1 - Direct' as SourceTier,
      legitimacy: 1.0,
      score: 8.5,
    },
    onSubmit: (formValues) => {
      const highlights = formValues.highlights
        .split(',')
        .map((s: string) => s.trim())
        .filter(Boolean);

      const jobData: JobMatch = {
        id: editingJob?.id || `job-${Date.now()}`,
        title: formValues.title,
        company: formValues.company,
        location: formValues.location,
        score: formValues.score,
        legitimacy: formValues.legitimacy,
        highlights: highlights,
        isRemote: formValues.location.toLowerCase().includes('remote'),
        postedDate: editingJob?.postedDate || 'Just now',
        isVerified: formValues.legitimacy >= 0.9,
        sourceTier: formValues.sourceTier,
        status: editingJob?.status || 'discovery',
        proof: editingJob?.proof || "Architect manual injection",
      };

      onSave(jobData);
    }
  });

  useEffect(() => {
    if (editingJob) {
      setValues({
        title: editingJob.title,
        company: editingJob.company,
        location: editingJob.location,
        highlights: editingJob.highlights.join(', '),
        sourceTier: editingJob.sourceTier,
        legitimacy: editingJob.legitimacy,
        score: editingJob.score,
      });
    } else {
      resetForm();
    }
  }, [editingJob, isOpen, setValues, resetForm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center bg-[#0f172a]/95 backdrop-blur-xl p-4 animate-in fade-in duration-300">
      <div className="bg-[#1e293b] border border-slate-700/80 w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden p-10">
        <h2 className="text-2xl font-black uppercase text-white mb-2">
          {editingJob ? 'Update Signal' : 'Inject Signal'}
        </h2>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-8">
          Architect Review Mandatory Following Injection
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-500 uppercase ml-2">Company</label>
              <input 
                name="company" 
                value={values.company}
                onChange={handleChange}
                placeholder="Target Company" 
                required 
                className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-700" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-500 uppercase ml-2">Role</label>
              <input 
                name="title" 
                value={values.title}
                onChange={handleChange}
                placeholder="Architect Title" 
                required 
                className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-700" 
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-500 uppercase ml-2">Location</label>
            <input 
              name="location" 
              value={values.location}
              onChange={handleChange}
              placeholder="e.g. San Francisco, CA / Remote" 
              required 
              className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-700" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-500 uppercase ml-2">Requirements (CSV)</label>
            <textarea 
              name="highlights" 
              value={values.highlights}
              onChange={handleChange}
              placeholder="Python, FastAPI, LLM Evals, Playwright..." 
              className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-700 h-24 resize-none" 
            />
          </div>
          <div className="flex gap-4 pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 py-4 bg-slate-800 text-slate-400 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-700 transition-all"
            >
              Abort
            </button>
            <button 
              type="submit" 
              className="flex-1 py-4 bg-emerald-500 text-slate-950 rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10"
            >
              Commit Signal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InjectSignalModal;
