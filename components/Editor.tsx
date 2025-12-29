import React from 'react';

interface EditorProps {
  label: string;
  value: string;
  onChange?: (val: string) => void;
  readOnly?: boolean;
}

const Editor: React.FC<EditorProps> = ({
  label,
  value,
  onChange,
  readOnly = false,
}) => {
  const isInteractive = !!onChange && !readOnly;

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-700 rounded-lg overflow-hidden shadow-xl">
      <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {label}
        </span>
        {readOnly && (
          <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded">
            READ ONLY
          </span>
        )}
      </div>
      <textarea
        aria-label={label}
        className={`flex-grow p-4 code-font text-sm bg-transparent outline-none resize-none text-emerald-400 placeholder-slate-600 ${
          isInteractive
            ? 'focus:ring-1 focus:ring-emerald-500'
            : 'cursor-default'
        }`}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        readOnly={!onChange || readOnly}
        spellCheck={false}
      />
    </div>
  );
};

export default Editor;