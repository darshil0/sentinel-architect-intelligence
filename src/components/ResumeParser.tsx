import React, { useState, useRef } from 'react';
import { geminiService } from '@/services/geminiService';
import { MasterResume } from '@/types';

interface ResumeParserProps {
  onParsed: (resume: MasterResume) => void;
}

const ResumeParser: React.FC<ResumeParserProps> = ({ onParsed }) => {
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsParsing(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Data = e.target?.result?.toString().split(',')[1];
        if (!base64Data) throw new Error("File read failure.");

        try {
          const parsed = await geminiService.parseResume({
            data: base64Data,
            mimeType: file.type
          });
          onParsed(parsed);
        } catch (err) {
          setError("Architectural Sync Error: Structural parsing failed.");
        } finally {
          setIsParsing(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError("System failure: File ingestion aborted.");
      setIsParsing(false);
    }
  };

  const handlePasteText = async () => {
    const text = prompt("Paste raw resume text for architectural ingestion:");
    if (!text) return;

    setIsParsing(true);
    setError(null);

    try {
      const parsed = await geminiService.parseResume(text);
      onParsed(parsed);
    } catch (err) {
      setError("Architectural Sync Error: Text mapping failed.");
    } finally {
      setIsParsing(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-xl relative overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Master Source Ingestion</h3>
        {isParsing && (
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[8px] font-black text-emerald-400 uppercase">Analyzing Semantic Structure...</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isParsing}
          className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-800 rounded-2xl hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group disabled:opacity-50"
        >
          <svg className="w-6 h-6 text-slate-500 group-hover:text-emerald-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-slate-200">Upload PDF</span>
        </button>

        <button
          onClick={handlePasteText}
          disabled={isParsing}
          className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-800 rounded-2xl hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group disabled:opacity-50"
        >
          <svg className="w-6 h-6 text-slate-500 group-hover:text-emerald-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-slate-200">Paste Source</span>
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".pdf"
        className="hidden"
      />

      {error && (
        <div className="mt-4 p-3 bg-rose-500/5 border border-rose-500/20 rounded-xl">
          <p className="text-[9px] font-black text-rose-400 uppercase text-center">{error}</p>
        </div>
      )}

      {isParsing && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-10 rounded-3xl">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
            <p className="text-[10px] font-black text-white uppercase tracking-widest animate-pulse">Running Architectural Audit</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeParser;