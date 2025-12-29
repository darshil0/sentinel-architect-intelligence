import React, { useEffect, useCallback } from 'react';

interface NotificationProps {
  message: string | null;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(handleClose, 4000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [message, handleClose]);

  const handleDismiss = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    handleClose();
  }, [handleClose]);

  if (!message) return null;

  return (
    <div 
      className="fixed bottom-8 right-8 bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-900 px-6 py-4 rounded-2xl shadow-2xl shadow-emerald-500/25 border border-emerald-400/30 animate-in slide-in-from-bottom-4 duration-300 z-[1000] max-w-sm"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-white/80 rounded-full animate-ping"></div>
          <p className="text-sm font-bold leading-tight tracking-wide">{message}</p>
        </div>
        <button
          onClick={handleDismiss}
          className="text-slate-900/80 hover:text-slate-900 hover:bg-white/20 p-1.5 rounded-lg transition-all group focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-emerald-500/20"
          aria-label="Dismiss notification"
        >
          <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Notification;
