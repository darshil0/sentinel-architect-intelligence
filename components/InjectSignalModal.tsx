import React, { useEffect, useCallback } from 'react';
import { JobMatch } from '../types';
import { useForm } from '../hooks/useForm';

interface InjectSignalModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingJob: JobMatch | null;
  onSave: (jobData: JobMatch) => void;
}

interface FormData {
  company: string;
  title: string;
  location: string;
  highlights: string;
}

const InjectSignalModal: React.FC<InjectSignalModalProps> = ({ 
  isOpen, 
  onClose, 
  editingJob, 
  onSave 
}) => {
  const initialFormState: FormData = {
    company: '',
    title: '',
    location: '',
    highlights: '',
  };
  
  const { formData, handleChange, setFormData, resetForm } = useForm<FormData>(initialFormState);

  // Reset form when modal opens/closes or editingJob changes
  useEffect(() => {
    if (!isOpen) {
      resetForm();
      return;
    }
    
    if (editingJob) {
      setFormData({
        company: editingJob.company,
        title: editingJob.title,
        location: editingJob.location || '',
        highlights: editingJob.highlights.join(', '),
      });
    } else {
      setFormData(initialFormState);
    }
  }, [editingJob, isOpen, setFormData, resetForm]);

  const handleSaveJob = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.company.trim() || !formData.title.trim() || !formData.location.trim()) {
      return;
    }

    const highlights = formData.highlights
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    if (highlights.length === 0) {
      return; // Require at least one highlight
    }

    const jobData: JobMatch = {
      id: editingJob?.id || `job-${Date.now()}`,
      title: formData.title.trim(),
      company: formData.company.trim(),
      location: formData.location.trim(),
      score: editingJob?.score ?? 8.0,
      legitimacy: editingJob?.legitimacy ?? 0.95,
      highlights,
      isRemote: formData.location.toLowerCase().includes('remote'),
      postedDate: editingJob?.postedDate ?? 'Just now',
      isVerified: (editingJob?.legitimacy ?? 0.95) >= 0.9,
      sourceTier: editingJob?.sourceTier ?? 'Tier 2 - Manual',
      status: editingJob?.status ?? 'discovery',
      personaHint: editingJob?.personaHint ?? 'manual',
      proof: editingJob?.proof ?? 'Manual Architect Entry',
      baseSalary: editingJob?.baseSalary ?? 180000,
    };

    onSave(jobData);
    onClose();
  }, [formData, editingJob, onSave, onClose]);

  const handleClose = useCallback(() => {
    onClose();
    resetForm();
  }, [onClose, resetForm]);

  const isSubmitDisabled = !formData.company.trim() || 
                          !formData.title.trim() || 
                          !formData.location.trim() || 
                          !formData.highlights.trim();

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0f172a]/95 backdrop-blur-xl p-4 animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-[#1e293b] border border-slate-700/80 w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden p-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 id="modal-title" className="text-2xl font-black uppercase text-white mb-1">
              {editingJob ? 'Update Signal' : 'Inject Signal'}
            </h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Architect Review Mandatory Following Injection
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-500 hover:text-slate-300 text-xl font-black p-2 -m-2 rounded-lg hover:bg-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-slate-500/50"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSaveJob} className="space-y-6" noValidate>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="company" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Company
              </label>
              <input 
                id="company"
                name="company" 
                placeholder="e.g., Anthropic" 
                value={formData.company} 
                onChange={handleChange} 
                required 
                className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-slate-600 invalid:border-red-500" 
              />
            </div>
            <div>
              <label htmlFor="title" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Title
              </label>
              <input 
                id="title"
                name="title" 
                placeholder="e.g., Senior SDET" 
                value={formData.title} 
                onChange={handleChange} 
                required 
                className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-slate-600 invalid:border-red-500" 
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="location" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Location
            </label>
            <input 
              id="location"
              name="location" 
              placeholder="e.g., SF / Remote" 
              value={formData.location} 
              onChange={handleChange} 
              required 
              className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-slate-600 invalid:border-red-500" 
            />
          </div>
          
          <div>
            <label htmlFor="highlights" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Requirements (Comma Separated)
            </label>
            <textarea 
              id="highlights"
              name="highlights" 
              placeholder="Python, LLM Evaluation, Pytest, FastAPI" 
              value={formData.highlights} 
              onChange={handleChange} 
              rows={4}
              className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-slate-600 resize-vertical invalid:border-red-500" 
            />
          </div>
          
          <div className="flex gap-4 pt-4">
            <button 
              type="button" 
              onClick={handleClose}
              className="flex-1 py-4 bg-slate-800 text-slate-400 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500/50 transition-all"
            >
              Abort
            </button>
            <button 
              type="submit"
              disabled={isSubmitDisabled}
              className="flex-1 py-4 bg-emerald-500 text-slate-950 rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-emerald-600/50"
            >
              {editingJob ? 'Update Signal' : 'Commit Signal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InjectSignalModal;
