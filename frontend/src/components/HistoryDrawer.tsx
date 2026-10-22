import React from 'react';
import { HistoryItem } from '../types';
import { X, Clock, FileText, ArrowRight, Trash2 } from 'lucide-react';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onSelectAnalysis: (id: string) => void;
  onClearHistory: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelectAnalysis,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />

      <div className="relative w-full max-w-md bg-[#0B0F19]/95 backdrop-blur-2xl h-full shadow-2xl border-l border-white/10 flex flex-col z-10 text-slate-100">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="text-base font-black text-white">Analysis History</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {history.length === 0 ? (
            <div className="text-center py-20 text-slate-400 space-y-2.5">
              <FileText className="w-12 h-12 mx-auto text-slate-600" />
              <p className="text-sm font-bold text-white">No previous scans found</p>
              <p className="text-xs text-slate-400">Your completed resume evaluations will appear here for easy instant recall.</p>
            </div>
          ) : (
            history.map((item) => {
              const formattedDate = new Date(item.createdAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectAnalysis(item.id);
                    onClose();
                  }}
                  className="group p-4 rounded-xl border border-white/10 bg-slate-900/70 hover:border-indigo-500/50 hover:bg-slate-900 transition-all cursor-pointer shadow-md"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white truncate max-w-[200px]">
                      {item.originalFilename}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-950 text-indigo-300 border border-indigo-500/40 shadow-xs">
                      {item.atsScore} / 100
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                    <span>{formattedDate}</span>
                    {item.targetRole && (
                      <span className="text-indigo-400 font-bold truncate max-w-[150px]">
                        {item.targetRole}
                      </span>
                    )}
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-indigo-300">
                    <span>{item.skillsCount} skills detected</span>
                    <span className="inline-flex items-center gap-1 font-bold">
                      View Report <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="p-4 border-t border-white/10 bg-slate-950/80 flex justify-between items-center">
            <span className="text-xs text-slate-400 font-medium">{history.length} saved scans</span>
            <button
              onClick={onClearHistory}
              className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-bold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
