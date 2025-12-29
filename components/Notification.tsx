import React, { useEffect } from 'react';

interface NotificationProps {
  message: string | null;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-8 right-8 bg-emerald-500 text-slate-950 px-6 py-3 rounded-xl shadow-lg animate-in fade-in slide-in-from-bottom duration-300 z-50">
      <p className="text-sm font-bold">{message}</p>
    </div>
  );
};

export default Notification;
