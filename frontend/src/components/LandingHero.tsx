import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Target, Sparkles, FileSearch, Star, TrendingUp } from 'lucide-react';

interface LandingHeroProps {
  onStartAnalysis: () => void;
  onSelectSample: (sampleId: string) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartAnalysis,
  onSelectSample,
}) => {
  return (
    <section className="relative overflow-hidden pt-14 pb-20 md:pt-20 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* 3D Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/60 backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.25)] transition-transform hover:scale-105">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold text-indigo-200 tracking-wide uppercase">
              Next-Gen AI Resume & ATS Intelligence
            </span>
          </div>

          {/* Main Headline with luminous gradient and crisp 3D shadow */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
            Understand Your Resume. <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_4px_25px_rgba(168,85,247,0.4)]">
              Discover Your Potential.
            </span>
          </h1>

          {/* Subtitle with high contrast */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-medium">
            Get an explainable 7-dimension ATS compatibility breakdown, discover 5–10 ideal job roles, pinpoint missing keywords, and rewrite weak bullet points with zero fabricated claims.
          </p>

          {/* 3D Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onStartAnalysis}
              className="btn-3d w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-bold rounded-xl"
            >
              <FileSearch className="w-5 h-5 text-indigo-200" />
              <span>Analyze My Resume</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => onSelectSample('fullstack-senior')}
              className="btn-secondary-3d w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 text-sm font-bold rounded-xl"
            >
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Try Live Senior Dev Sample</span>
            </button>
          </div>

          {/* Trust points with luminous dark glass badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 text-left max-w-3xl mx-auto">
            <div className="flex items-center gap-2.5 text-xs text-slate-300 bg-slate-900/80 backdrop-blur-md p-3.5 rounded-xl border border-white/10 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>Deterministic & Semantic:</strong> 7-dimension scoring</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-300 bg-slate-900/80 backdrop-blur-md p-3.5 rounded-xl border border-white/10 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
              <span><strong>Strict Fact-Preservation:</strong> zero unearned claims</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-300 bg-slate-900/80 backdrop-blur-md p-3.5 rounded-xl border border-white/10 shadow-sm">
              <Target className="w-4 h-4 text-purple-400 shrink-0" />
              <span><strong>Role Suitability:</strong> 10+ target tech archetypes</span>
            </div>
          </div>
        </div>

        {/* 3D Perspective Floating Dashboard Mockup */}
        <div className="perspective-container mt-16 max-w-4xl mx-auto">
          <div className="hero-mockup-3d rounded-2xl border border-white/15 p-6 md:p-8 cursor-pointer" onClick={onStartAnalysis}>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                <span className="text-xs font-bold text-slate-400 ml-2">ResumeIQ Live Intelligence Dashboard Preview</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                Live Interactive Scan
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Mini 3D Score card */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/90 to-purple-950/90 border border-indigo-500/40 flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(99,102,241,0.25)]">
                <span className="text-[10px] uppercase font-black text-indigo-300 tracking-wider">ATS Score</span>
                <span className="text-4xl font-black text-white mt-1 drop-shadow-sm">88<span className="text-xs font-semibold text-slate-400">/100</span></span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 mt-2 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                  <TrendingUp className="w-3 h-3 text-emerald-400" /> Strong Match
                </span>
              </div>

              {/* Mini Skills Card */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-200 block">Verified Tech Depth</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">React (3)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-950/80 text-indigo-300 border border-indigo-500/40">Node.js (4)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-950/80 text-purple-300 border border-purple-500/40">TypeScript (2)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-950/80 text-sky-300 border border-sky-500/40">PostgreSQL</span>
                </div>
              </div>

              {/* Mini Best Fit Role Card */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-200 block">Top Role Fit</span>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white">Senior Full-Stack Dev</span>
                  <span className="text-xs font-bold text-emerald-400">94%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: '94%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
