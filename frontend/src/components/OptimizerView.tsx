import React, { useState } from 'react';
import { OptimizationResult, OptimizationChange } from '../types';
import { 
  Sparkles, Check, Edit3, Download, ArrowRight, ShieldCheck, 
  TrendingUp, Loader2, CheckCircle2, XCircle
} from 'lucide-react';

interface OptimizerViewProps {
  optimization: OptimizationResult;
  onUpdateChanges: (changes: OptimizationChange[]) => Promise<void>;
  onDownloadPdf: () => void;
  isSaving: boolean;
  onBackToDashboard: () => void;
}

export const OptimizerView: React.FC<OptimizerViewProps> = ({
  optimization,
  onUpdateChanges,
  onDownloadPdf,
  isSaving,
  onBackToDashboard,
}) => {
  const [changes, setChanges] = useState<OptimizationChange[]>(optimization.changes);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [filterSection, setFilterSection] = useState<string>('all');

  const handleStatusChange = async (index: number, newStatus: 'accepted' | 'rejected') => {
    const updated = [...changes];
    updated[index] = { ...updated[index], status: newStatus };
    setChanges(updated);
    await onUpdateChanges(updated);
  };

  const handleStartEdit = (index: number, currentText: string) => {
    setEditingIndex(index);
    setEditText(currentText);
  };

  const handleSaveEdit = async (index: number) => {
    const updated = [...changes];
    updated[index] = {
      ...updated[index],
      revised: editText,
      status: 'accepted',
    };
    setChanges(updated);
    setEditingIndex(null);
    await onUpdateChanges(updated);
  };

  const handleAcceptAll = async () => {
    const updated = changes.map((c) => ({ ...c, status: 'accepted' as const }));
    setChanges(updated);
    await onUpdateChanges(updated);
  };

  const scoreDiff = optimization.optimizedScore - optimization.originalScore;

  const sections = ['all', ...Array.from(new Set(changes.map((c) => c.section)))];
  const filteredChanges = filterSection === 'all' 
    ? changes 
    : changes.filter((c) => c.section === filterSection);

  const acceptedCount = changes.filter((c) => c.status === 'accepted').length;

  return (
    <div className="space-y-6">
      {/* 3D Elevated Score & Safeguard Card */}
      <div className="card-3d p-6 md:p-8 border-white/10 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md">
                <Sparkles className="w-5 h-5 text-indigo-100" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">AI Resume Optimizer & Rewriter</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
              Side-by-side diff review of high-impact action verbs and ATS keyword alignments
            </p>
          </div>

          {/* 3D Before & After Score Comparison Badge */}
          <div className="flex items-center gap-4 bg-slate-900/90 p-3 rounded-2xl border border-white/10 shadow-md">
            <div className="text-center px-4 border-r border-white/10">
              <span className="text-[10px] uppercase font-black text-slate-400 block">Original</span>
              <span className="text-xl font-black text-white">{optimization.originalScore}</span>
            </div>
            <div className="flex items-center gap-1.5 text-indigo-400">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </div>
            <div className="text-center px-4">
              <span className="text-[10px] uppercase font-black text-emerald-400 block">Optimized</span>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black text-white">{optimization.optimizedScore}</span>
                <span className="text-xs font-black px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                  +{scoreDiff} pts
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Fact-Preservation Safeguard Notice */}
        <div className="mt-6 p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/60 flex items-start gap-3 text-xs text-slate-200 shadow-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-black text-emerald-300 text-xs">Strict Fact-Preservation Active: </span>
            <span className="font-medium text-slate-300">
              ResumeIQ does not fabricate fake companies, degrees, unearned dates, or made-up statistics. It restructures your genuine accomplishments with strong action verbs and verified ATS clarity.
            </span>
          </div>
        </div>

        {/* Controls Toolbar */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Section filter */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-slate-400 font-bold">Filter Section:</span>
            {sections.map((sec) => (
              <button
                key={sec}
                onClick={() => setFilterSection(sec)}
                className={`px-3 py-1.5 rounded-xl capitalize font-bold transition-all ${
                  filterSection === sec
                    ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] border border-indigo-400/50'
                    : 'bg-slate-800 text-slate-300 border border-white/10 hover:bg-slate-700'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleAcceptAll}
              className="btn-secondary-3d px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Accept All ({changes.length})</span>
            </button>

            <button
              onClick={onDownloadPdf}
              className="btn-3d px-5 py-2 rounded-xl font-bold flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download ATS PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 font-bold px-2">
          <span>
            Showing {filteredChanges.length} proposed improvement(s) • {acceptedCount} of {changes.length} approved
          </span>
          {isSaving && (
            <span className="flex items-center gap-1.5 text-indigo-400 font-bold">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Recalculating ATS score...</span>
            </span>
          )}
        </div>

        {filteredChanges.map((change, index) => {
          const isEditing = editingIndex === index;

          return (
            <div
              key={index}
              className={`card-3d p-5 sm:p-6 transition-all ${
                change.status === 'accepted'
                  ? 'border-emerald-500/50 bg-slate-900/90 ring-1 ring-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                  : change.status === 'rejected'
                  ? 'border-rose-500/30 bg-slate-950/60 opacity-60'
                  : 'border-white/10 bg-slate-900/70'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-indigo-950 text-indigo-300 border border-indigo-500/40">
                    {change.section}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {change.type === 'bullet' ? 'Experience Bullet' : 'Professional Summary'}
                  </span>
                </div>

                {/* Status indicator with high contrast */}
                <div className="flex items-center gap-1.5">
                  {change.status === 'accepted' && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/40 shadow-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Approved
                    </span>
                  )}
                  {change.status === 'rejected' && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-black text-rose-300 bg-rose-950/80 px-3 py-1 rounded-full border border-rose-500/40 shadow-xs">
                      <XCircle className="w-4 h-4 text-rose-400" /> Rejected
                    </span>
                  )}
                  {change.status === 'pending' && (
                    <span className="text-xs font-bold text-amber-300 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-500/40 shadow-xs">
                      Pending Review
                    </span>
                  )}
                </div>
              </div>

              {/* Side-by-Side Diff Content with Vibrant Separation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Original content (Removed / Before) */}
                <div className="rounded-xl border border-rose-500/40 bg-rose-950/40 p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-rose-400 font-black text-[11px] uppercase tracking-wider">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Original Version</span>
                  </div>
                  <p className="text-slate-200 font-mono text-[11px] leading-relaxed font-semibold">
                    {change.original}
                  </p>
                </div>

                {/* Revised content (Added / Suggested) */}
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/50 p-4 space-y-2 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-emerald-300 font-black text-[11px] uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>AI Optimized Version</span>
                    </div>

                    {!isEditing && (
                      <button
                        onClick={() => handleStartEdit(index, change.revised)}
                        className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-bold underline"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-2.5 mt-2">
                      <textarea
                        rows={3}
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full text-xs p-3 bg-slate-950 border border-indigo-400 rounded-lg text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingIndex(null)}
                          className="px-3 py-1.5 text-xs font-bold rounded-lg border border-white/10 text-slate-300 hover:bg-slate-800"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveEdit(index)}
                          className="btn-3d px-3.5 py-1.5 text-xs font-bold rounded-lg"
                        >
                          Save & Approve
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-emerald-200 font-bold leading-relaxed text-xs">
                      {change.revised}
                    </p>
                  )}
                </div>
              </div>

              {/* Rationale and Actions */}
              <div className="mt-4 pt-3.5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <p className="text-slate-400 text-xs font-medium">
                  <strong className="text-indigo-300 font-bold">Why this boosts score:</strong> {change.reason}
                </p>

                <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
                  <button
                    onClick={() => handleStatusChange(index, 'rejected')}
                    className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                      change.status === 'rejected'
                        ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                        : 'border-white/10 bg-slate-800 text-slate-300 hover:text-rose-400 hover:bg-rose-950/60'
                    }`}
                  >
                    Keep Original
                  </button>

                  <button
                    onClick={() => handleStatusChange(index, 'accepted')}
                    className={`px-4 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                      change.status === 'accepted'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'border-emerald-500/40 bg-emerald-950/80 text-emerald-300 hover:bg-emerald-600 hover:text-white'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    Approve Suggestion
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Download Banner */}
      <div className="sticky bottom-4 z-30 card-3d p-4 bg-slate-900/95 backdrop-blur-xl border-indigo-500/40 shadow-2xl flex items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-black text-white">Ready with your optimized resume?</h4>
          <p className="text-xs text-slate-400 font-medium">
            Export a clean, single-column ATS compliant PDF formatted for maximum parsing accuracy.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDashboard}
            className="btn-secondary-3d px-4 py-2 text-xs font-bold rounded-xl"
          >
            Back to Dashboard
          </button>

          <button
            onClick={onDownloadPdf}
            className="btn-3d flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-xl"
          >
            <Download className="w-4 h-4" />
            <span>Download Revised PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
