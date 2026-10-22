import React, { useState } from 'react';
import { RoleRecommendation } from '../types';
import { Briefcase, Check, AlertCircle, ArrowUpRight, Compass, ChevronDown, ChevronUp } from 'lucide-react';

interface RoleRecommendationsProps {
  roles: RoleRecommendation[];
  onSelectTargetRole?: (roleTitle: string) => void;
}

export const RoleRecommendations: React.FC<RoleRecommendationsProps> = ({
  roles,
  onSelectTargetRole,
}) => {
  const [expandedRole, setExpandedRole] = useState<string | null>(roles[0]?.roleTitle || null);

  const toggleExpand = (title: string) => {
    setExpandedRole(expandedRole === title ? null : title);
  };

  return (
    <div className="card-3d p-6 border-white/10 shadow-xl">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.3)]">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-black text-white tracking-tight">Best-Fit Job Roles & Career Paths</h3>
            <p className="text-xs text-slate-400 font-medium">
              Ranked by your verified technical depth, project evidence, and architectural scope
            </p>
          </div>
        </div>
        <span className="text-xs font-bold text-indigo-300 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-500/40 shadow-xs">
          {roles.length} Roles Matched
        </span>
      </div>

      <div className="space-y-4">
        {roles.map((role) => {
          const isExpanded = expandedRole === role.roleTitle;
          const score = role.suitabilityScore;

          let scoreBadge = 'bg-indigo-950/80 text-indigo-300 border-indigo-500/40';
          let progressGrad = 'from-indigo-500 to-violet-500';

          if (score >= 90) {
            scoreBadge = 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.25)]';
            progressGrad = 'from-emerald-400 to-teal-500';
          } else if (score >= 80) {
            scoreBadge = 'bg-indigo-950/80 text-indigo-300 border-indigo-500/40 shadow-[0_0_12px_rgba(99,102,241,0.25)]';
            progressGrad = 'from-indigo-400 to-purple-500';
          } else if (score >= 70) {
            scoreBadge = 'bg-purple-950/80 text-purple-300 border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.25)]';
            progressGrad = 'from-purple-400 to-pink-500';
          } else {
            scoreBadge = 'bg-amber-950/80 text-amber-300 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.25)]';
            progressGrad = 'from-amber-400 to-orange-500';
          }

          return (
            <div
              key={role.roleTitle}
              className={`border rounded-2xl p-4 sm:p-5 transition-all shadow-md ${
                isExpanded
                  ? 'border-indigo-500/50 bg-slate-900/90 ring-1 ring-indigo-500/30'
                  : 'border-white/10 bg-slate-900/50 hover:border-indigo-500/40 hover:bg-slate-900/80'
              }`}
            >
              <div
                className="flex items-center justify-between cursor-pointer select-none gap-3"
                onClick={() => toggleExpand(role.roleTitle)}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-md font-bold">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">{role.roleTitle}</h4>
                    <p className="text-xs text-slate-400 font-medium line-clamp-1">{role.explanation}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className={`px-3 py-1 rounded-full text-xs font-black border shadow-xs ${scoreBadge}`}>
                    {score}% Match
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </div>

              {/* 3D Progress Bar */}
              <div className="w-full bg-slate-950/80 h-2 rounded-full overflow-hidden p-0.5 mt-3.5 shadow-inner border border-white/5">
                <div
                  className={`bg-gradient-to-r ${progressGrad} h-full rounded-full transition-all duration-700 shadow-xs`}
                  style={{ width: `${score}%` }}
                />
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-white/10 space-y-4 text-xs animate-in fade-in duration-200">
                  <div>
                    <h5 className="font-bold text-white mb-1">Role Alignment Analysis:</h5>
                    <p className="text-slate-300 leading-relaxed font-medium">{role.explanation}</p>
                  </div>

                  {/* Matching Skills */}
                  <div>
                    <h5 className="font-bold text-emerald-400 flex items-center gap-1.5 mb-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      Matching Technical Strengths:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {role.matchingSkills.map((sk) => (
                        <span key={sk} className="px-2.5 py-1 rounded-lg bg-emerald-950/80 text-emerald-300 text-xs font-bold border border-emerald-500/40 shadow-xs">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Skill Gaps */}
                  {role.missingSkills && role.missingSkills.length > 0 && (
                    <div>
                      <h5 className="font-bold text-amber-400 flex items-center gap-1.5 mb-2">
                        <AlertCircle className="w-4 h-4 text-amber-400" />
                        Skill Gaps to Bridge for this Role:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {role.missingSkills.map((sk) => (
                          <span key={sk} className="px-2.5 py-1 rounded-lg bg-amber-950/80 text-amber-300 text-xs font-bold border border-amber-500/40 shadow-xs">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Next Steps */}
                  {role.nextSteps && role.nextSteps.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/10 space-y-1.5">
                      <h5 className="font-bold text-indigo-300">Recommended Action Steps:</h5>
                      <ul className="space-y-1 text-slate-300 pl-4 list-disc font-medium">
                        {role.nextSteps.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Set as target role button */}
                  {onSelectTargetRole && (
                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectTargetRole(role.roleTitle);
                        }}
                        className="btn-3d inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold"
                      >
                        <span>Optimize Resume for {role.roleTitle}</span>
                        <ArrowUpRight className="w-4 h-4 text-indigo-200" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
