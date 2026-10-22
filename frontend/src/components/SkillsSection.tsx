import React, { useState } from 'react';
import { SkillItem } from '../types';
import { CheckCircle2, AlertTriangle, HelpCircle, Search, Sparkles } from 'lucide-react';

interface SkillsSectionProps {
  skills: SkillItem[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Skills' },
    { id: 'languages', label: 'Languages' },
    { id: 'frameworks', label: 'Frameworks' },
    { id: 'databases', label: 'Databases' },
    { id: 'cloud_devops', label: 'Cloud & DevOps' },
    { id: 'ai_ml', label: 'AI & ML' },
    { id: 'tools', label: 'Tools' },
    { id: 'professional', label: 'Professional' },
  ];

  const filteredSkills = skills.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const verifiedCount = skills.filter((s) => s.status === 'verified').length;
  const unverifiedCount = skills.filter((s) => s.status === 'unverified').length;
  const missingCount = skills.filter((s) => s.status === 'missing').length;

  return (
    <div className="card-3d p-6 border-white/10 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.3)]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-black text-white tracking-tight">Technical Skills & Evidence Verification</h3>
            <p className="text-xs text-slate-400 font-medium">
              Separates validated hands-on capabilities from unproven mentions and role gaps
            </p>
          </div>
        </div>

        {/* Legend counts with glowing dark badges */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 font-bold border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{verifiedCount} Verified with Context</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 text-amber-300 font-bold border border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>{unverifiedCount} Mentioned Only</span>
          </span>
          {missingCount > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 text-purple-300 font-bold border border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
              <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
              <span>{missingCount} Target Gaps</span>
            </span>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-2.5 mb-5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search detected skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 text-xs bg-slate-950/80 border border-white/10 rounded-xl text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder:text-slate-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs rounded-xl whitespace-nowrap transition-all font-bold ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] border border-indigo-400/50'
                  : 'bg-slate-900/80 text-slate-300 border border-white/10 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Badges Grid with Vibrant 3D Glow */}
      {filteredSkills.length === 0 ? (
        <div className="text-center py-8 text-xs text-slate-400 border border-dashed border-white/10 rounded-xl font-medium">
          No skills match the selected filter or search term.
        </div>
      ) : (
        <div className="flex flex-wrap gap-2.5">
          {filteredSkills.map((item, index) => {
            let badgeStyle = 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40 hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]';
            let icon = <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
            let tooltipText = item.evidenceCount 
              ? `Supported by ${item.evidenceCount} resume project/work mention(s)` 
              : 'Demonstrated with work evidence';

            if (item.status === 'unverified') {
              badgeStyle = 'bg-amber-950/80 text-amber-300 border-amber-500/40 hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]';
              icon = <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
              tooltipText = 'Mentioned in skills list, but lacking measurable project context';
            } else if (item.status === 'missing') {
              badgeStyle = 'bg-purple-950/80 text-purple-300 border-purple-500/40 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]';
              icon = <HelpCircle className="w-3.5 h-3.5 text-purple-400 shrink-0" />;
              tooltipText = 'Relevant for target role, but currently missing from resume';
            }

            return (
              <div
                key={`${item.name}-${index}`}
                title={tooltipText}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-sm hover:scale-105 hover:-translate-y-0.5 cursor-help ${badgeStyle}`}
              >
                {icon}
                <span>{item.name}</span>
                {item.evidenceCount ? (
                  <span className="text-[10px] bg-white/10 px-1.5 py-0.2 rounded font-mono font-black border border-white/10 text-white">
                    {item.evidenceCount}x
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
