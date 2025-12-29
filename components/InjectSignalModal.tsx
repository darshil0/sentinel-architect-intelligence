import React, { useEffect } from 'react';
import { JobMatch } from '../types';
import { useForm } from '../hooks/useForm';

interface InjectSignalModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingJob: JobMatch | null;
  onSave: (jobData: JobMatch) => void;
}

const InjectSignalModal: React.FC<InjectSignalModalProps> = ({ isOpen, onClose, editingJob, onSave }) => {
  const initialFormState = {
    company: '',
    title: '',
    location: '',
    highlights: '',
  };
  
  const { formData, handleChange, setFormData } = useForm(initialFormState);

  useEffect(() => {
    if (editingJob) {
      setFormData({
        company: editingJob.company,
        title: editingJob.title,
        location: editingJob.location,
        highlights: editingJob.highlights.join(', '),
      });
    } else {
      setFormData(initialFormState);
    }
  }, [editingJob, isOpen]);

  if (!isOpen) return null;

  const handleSaveJob = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const highlights = formData.highlights.split(',').map(s => s.trim()).filter(Boolean);

    const jobData: JobMatch = {
      id: editingJob?.id || `job-${Date.now()}`,
      title: formData.title,
      company: formData.company,
      location: formData.location,
      score: editingJob?.score || 8.0,
      legitimacy: editingJob?.legitimacy || 1.0,
      highlights: highlights,
      isRemote: formData.location.toLowerCase().includes('remote') || false,
      postedDate: editingJob?.postedDate || 'Just now',
      isVerified: (editingJob?.legitimacy || 1.0) >= 0.9,
      sourceTier: editingJob?.sourceTier || 'Tier 1 - Direct',
      status: editingJob?.status || 'discovery',
      proof: editingJob?.proof || "Manual entry",
    };

    onSave(jobData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0f172a]/95 backdrop-blur-xl p-4 animate-in fade-in duration-300">
      <div className="bg-[#1e293b] border border-slate-700/80 w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden p-10">
        <h2 className="text-2xl font-black uppercase text-white mb-2">{editingJob ? 'Update Signal' : 'Inject Signal'}</h2>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-8">Architect Review Mandatory Following Injection</p>
        <form onSubmit={handleSaveJob} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <input name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} required className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-600" />
            <input name="title" placeholder="Position Title" value={formData.title} onChange={handleChange} required className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-600" />
          </div>
          <input name="location" placeholder="Location (e.g., SF / Remote)" value={formData.location} onChange={handleChange} required className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-600" />
          <textarea name="highlights" placeholder="Semantic Requirements (Comma Separated Tokens)" value={formData.highlights} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-600 h-32 resize-none" />
          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 bg-slate-800 text-slate-400 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-700 transition-all">Abort</button>
            <button type="submit" className="flex-1 py-4 bg-emerald-500 text-slate-950 rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10">Commit Signal</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InjectSignalModal;
