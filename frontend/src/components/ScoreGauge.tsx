import React from 'react';
import { getScoreInterpretation } from '../utils/cn';
import { CheckCircle2, AlertTriangle, AlertOctagon, Info, Sparkles } from 'lucide-react';

interface ScoreGaugeProps {
  score: number;
  targetRole?: string;
  hasJobDescription: boolean;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  targetRole,
  hasJobDescription,
}) => {
  const interp = getScoreInterpretation(score);

  // SVG Gauge calculations
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const renderIcon = () => {
    if (score >= 85) return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
    if (score >= 70) return <CheckCircle2 className="w-4 h-4 text-indigo-400" />;
    if (score >= 50) return <AlertTriangle className="w-4 h-4 text-amber-400" />;
    return <AlertOctagon className="w-4 h-4 text-rose-400" />;
  };

  return (
    <div className="card-3d p-6 relative overflow-hidden flex flex-col justify-between border-white/10 shadow-xl">
      {/* Background 3D subtle ambient glow */}
      <div 
        className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: interp.strokeColor }}
      />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.3)]">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-base font-black text-white tracking-tight">ATS Compatibility</h3>
          </div>
          <span className="text-[11px] font-black uppercase tracking-wider text-indigo-300 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-500/40 shadow-xs">
            {hasJobDescription ? 'Targeted' : 'Standard ATS'}
          </span>
        </div>

        {/* 3D Radial Gauge with Neon Glow */}
        <div className="relative flex items-center justify-center my-6 gauge-3d-glow">
          <svg className="w-48 h-48 -rotate-90 transform" viewBox="0 0 170 170">
            <defs>
              <linearGradient id="scoreGaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={interp.gradientFrom} />
                <stop offset="100%" stopColor={interp.gradientTo} />
              </linearGradient>
              <filter id="gaugeShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor={interp.strokeColor} floodOpacity="0.8" />
              </filter>
            </defs>

            {/* Inner 3D background plate */}
            <circle
              cx="85"
              cy="85"
              r="60"
              fill="#0F172A"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1.5"
            />

            {/* Background Track */}
            <circle
              cx="85"
              cy="85"
              r={radius}
              stroke="#1E293B"
              strokeWidth="13"
              fill="transparent"
            />

            {/* Animated Score Ring */}
            <circle
              cx="85"
              cy="85"
              r={radius}
              stroke="url(#scoreGaugeGrad)"
              strokeWidth="13"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              filter="url(#gaugeShadow)"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Center 3D Floating Score Badge */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
            <span className="text-5xl font-black text-white tracking-tight drop-shadow-[0_4px_12px_rgba(255,255,255,0.25)]">
              {score}
            </span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">out of 100</span>
          </div>
        </div>

        {/* Interpretation Badge */}
        <div className="flex items-center justify-center mt-2">
          <div 
            style={{ boxShadow: `0 0 20px ${interp.glowColor}` }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black border transition-transform hover:scale-105 ${interp.bgColor} ${interp.textColor} ${interp.borderColor}`}
          >
            {renderIcon()}
            <span>{interp.label}</span>
          </div>
        </div>

        {targetRole && (
          <div className="mt-4 p-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-center">
            <span className="text-[11px] text-slate-400 font-medium">Target Role Alignment:</span>
            <p className="text-xs font-bold text-indigo-300 truncate mt-0.5">{targetRole}</p>
          </div>
        )}
      </div>

      {/* Required Disclaimer */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-start gap-2 text-[11px] text-slate-400 leading-tight">
        <Info className="w-3.5 h-3.5 shrink-0 text-slate-500 mt-0.5" />
        <p>
          Score is an explainable heuristic estimate generated by ResumeIQ's multi-layered scoring engine.
        </p>
      </div>
    </div>
  );
};
