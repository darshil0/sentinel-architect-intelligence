
import React, { useEffect } from 'react';

interface NotificationProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type = 'success',
  onClose,
  duration = 4000,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const styles = {
    success: 'border-emerald-500/50 bg-slate-900/90 text-emerald-400',
    error: 'border-rose-500/50 bg-slate-900/90 text-rose-400',
    info: 'border-blue-500/50 bg-slate-900/90 text-blue-400',
  };

  return (
    <div className="fixed top-20 right-8 z-[300] animate-in slide-in-from-right-8 fade-in duration-300">
      <div className={`flex items-center gap-4 px-6 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl ${styles[type]}`}>
        <div className={`w-2 h-2 rounded-full animate-pulse ${type === 'success' ? 'bg-emerald-500' : type === 'error' ? 'bg-rose-500' : 'bg-blue-500'}`} />
        <span className="text-[11px] font-black uppercase tracking-[0.2em]">
          {message}
        </span>
        <button 
          onClick={onClose}
          className="ml-4 text-slate-500 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Notification;
