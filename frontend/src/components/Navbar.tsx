import React from 'react';
import { FileText, Sparkles, History, CheckCircle2, AlertTriangle } from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: 'upload' | 'dashboard' | 'history' | 'features') => void;
  activeView: string;
  backendStatus: { status: string; demoMode?: boolean };
  onOpenHistory: () => void;
  hasAnalysis: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  activeView,
  backendStatus,
  onOpenHistory,
  hasAnalysis,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#080B14]/85 backdrop-blur-xl shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={() => onNavigate('upload')} 
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)] group-hover:scale-105 transition-transform">
            <FileText className="w-5 h-5 text-indigo-100" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-white">
                Resume<span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">IQ</span>
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-500/40 shadow-xs">
                AI + ATS
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">Intelligent Resume Analyzer</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5">
          <button
            onClick={() => onNavigate('upload')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
              activeView === 'upload'
                ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 shadow-[0_0_10px_rgba(99,102,241,0.2)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Analyze Resume
          </button>

          {hasAnalysis && (
            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                activeView === 'dashboard'
                  ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 shadow-[0_0_10px_rgba(99,102,241,0.2)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Dashboard
            </button>
          )}

          <button
            onClick={() => {
              const el = document.getElementById('features-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else onNavigate('features');
            }}
            className="px-3.5 py-1.5 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all"
          >
            Features
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('how-it-works');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-3.5 py-1.5 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all"
          >
            How It Works
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Status Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border border-white/10 bg-slate-900/80 shadow-xs">
            {backendStatus.status === 'ok' ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-300 font-bold">Backend Ready</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-amber-300 font-bold">Demo AI Mode</span>
              </>
            )}
          </div>

          {/* History Button */}
          <button
            onClick={onOpenHistory}
            className="btn-secondary-3d flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl"
            title="View Analysis History"
          >
            <History className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline">History</span>
          </button>

          {/* 3D Call to action button */}
          <button
            onClick={() => onNavigate('upload')}
            className="btn-3d flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
            <span>New Scan</span>
          </button>
        </div>
      </div>
    </header>
  );
};
