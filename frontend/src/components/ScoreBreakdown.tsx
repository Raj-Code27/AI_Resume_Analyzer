import React, { useState } from 'react';
import { ScoreCategory } from '../types';
import { ChevronDown, ChevronUp, Check, Layers, BarChart3, ListFilter } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

interface ScoreBreakdownProps {
  categories: ScoreCategory[];
}

export const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ categories }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'chart'>('list');

  const getCategoryTheme = (name: string, percentage: number) => {
    if (name.includes('Skills')) {
      return {
        gradient: 'from-emerald-400 to-teal-500',
        barColor: '#10B981',
        badgeBg: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
      };
    }
    if (name.includes('Experience')) {
      return {
        gradient: 'from-indigo-400 to-purple-500',
        barColor: '#6366F1',
        badgeBg: 'bg-indigo-950/80 text-indigo-300 border-indigo-500/40',
      };
    }
    if (name.includes('Project')) {
      return {
        gradient: 'from-blue-400 to-cyan-500',
        barColor: '#3B82F6',
        badgeBg: 'bg-blue-950/80 text-blue-300 border-blue-500/40',
      };
    }
    if (name.includes('Keyword')) {
      return {
        gradient: 'from-purple-400 to-pink-500',
        barColor: '#A855F7',
        badgeBg: 'bg-purple-950/80 text-purple-300 border-purple-500/40',
      };
    }
    if (name.includes('Structure')) {
      return {
        gradient: 'from-amber-400 to-orange-500',
        barColor: '#F59E0B',
        badgeBg: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
      };
    }
    if (name.includes('Education')) {
      return {
        gradient: 'from-sky-400 to-indigo-500',
        barColor: '#0EA5E9',
        badgeBg: 'bg-sky-950/80 text-sky-300 border-sky-500/40',
      };
    }
    return {
      gradient: 'from-teal-400 to-emerald-500',
      barColor: '#14B8A6',
      badgeBg: 'bg-teal-950/80 text-teal-300 border-teal-500/40',
    };
  };

  const chartData = categories.map((cat) => {
    const percentage = Math.round((cat.score / cat.maxScore) * 100);
    const theme = getCategoryTheme(cat.name, percentage);
    return {
      name: cat.name.split(' ')[0],
      fullName: cat.name,
      score: cat.score,
      maxScore: cat.maxScore,
      percentage,
      color: theme.barColor,
    };
  });

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="card-3d p-6 border-white/10 shadow-xl">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.3)]">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-black text-white tracking-tight">7-Dimension Scoring Breakdown</h3>
            <p className="text-xs text-slate-400 font-medium">
              Clear explainable metrics with supporting resume evidence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-white/10 text-xs font-bold">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'list' 
                ? 'bg-indigo-600 text-white shadow-xs' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>List</span>
          </button>
          <button
            onClick={() => setViewMode('chart')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'chart' 
                ? 'bg-indigo-600 text-white shadow-xs' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Chart</span>
          </button>
        </div>
      </div>

      {viewMode === 'chart' ? (
        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} fontWeight={600} />
              <YAxis domain={[0, 100]} stroke="#94A3B8" fontSize={11} tickLine={false} unit="%" />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 border border-white/15 text-white p-3 rounded-xl shadow-2xl text-xs space-y-1">
                        <div className="font-bold text-indigo-300">{data.fullName}</div>
                        <div className="text-white font-medium">
                          Score: {data.score} / {data.maxScore} ({data.percentage}%)
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="percentage" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="space-y-3">
          {categories.map((cat, idx) => {
            const percentage = Math.round((cat.score / cat.maxScore) * 100);
            const isExpanded = expandedIndex === idx;
            const theme = getCategoryTheme(cat.name, percentage);

            return (
              <div
                key={cat.name}
                className="border border-white/10 rounded-xl p-3.5 bg-slate-900/60 hover:bg-slate-900/90 transition-all hover:border-indigo-500/40 hover:shadow-md"
              >
                <div
                  className="cursor-pointer select-none"
                  onClick={() => toggleExpand(idx)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{cat.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${theme.badgeBg}`}>
                        Weight: {cat.weight}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-white">
                        {cat.score} <span className="text-slate-400 font-medium text-[11px]">/ {cat.maxScore}</span>
                      </span>
                      <span className="text-[11px] font-bold text-slate-400">
                        ({percentage}%)
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* 3D Glossy Progress bar with dark track */}
                  <div className="w-full bg-slate-950/80 h-2.5 rounded-full overflow-hidden p-0.5 shadow-inner border border-white/5">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${theme.gradient} shadow-xs transition-all duration-700`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-white/10 text-xs space-y-2.5 animate-in fade-in duration-200">
                    <p className="text-slate-300 leading-relaxed font-medium">{cat.explanation}</p>

                    {cat.evidence && cat.evidence.length > 0 && (
                      <div className="p-3 rounded-lg bg-slate-950/80 border border-white/10">
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1.5">
                          Supporting Evidence Found in Document:
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {cat.evidence.map((ev, i) => (
                            <li key={i} className="flex items-center gap-1.5 text-slate-300 text-[11px] font-medium">
                              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span className="truncate">{ev}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
