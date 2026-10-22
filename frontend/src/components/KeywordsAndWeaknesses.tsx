import React, { useState } from 'react';
import { KeywordAnalysis } from '../types';
import { AlertTriangle, CheckCircle, TrendingUp, Sparkles, FileWarning, XCircle } from 'lucide-react';

interface KeywordsAndWeaknessesProps {
  keywordAnalysis: KeywordAnalysis;
  strengths: string[];
  weaknesses: string[];
}

export const KeywordsAndWeaknesses: React.FC<KeywordsAndWeaknessesProps> = ({
  keywordAnalysis,
  strengths,
  weaknesses,
}) => {
  const [activeTab, setActiveTab] = useState<'keywords' | 'bullets' | 'format'>('keywords');

  return (
    <div className="card-3d p-6 border-white/10 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.3)]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-black text-white tracking-tight">Keywords, Bullets & Format Audit</h3>
            <p className="text-xs text-slate-400 font-medium">
              ATS parsers scan high-intent industry terms and rank quantified impact statements
            </p>
          </div>
        </div>

        {/* Tab switchers with 3D dark glass feel */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-white/10 text-xs font-bold">
          <button
            onClick={() => setActiveTab('keywords')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'keywords' 
                ? 'bg-indigo-600 text-white shadow-xs' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Keywords
          </button>
          <button
            onClick={() => setActiveTab('bullets')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'bullets' 
                ? 'bg-indigo-600 text-white shadow-xs' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Weak Bullets ({keywordAnalysis.weakBulletPoints.length})
          </button>
          <button
            onClick={() => setActiveTab('format')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'format' 
                ? 'bg-indigo-600 text-white shadow-xs' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Structure & Format
          </button>
        </div>
      </div>

      {/* Tab 1: Keywords */}
      {activeTab === 'keywords' && (
        <div className="space-y-6">
          {/* Keywords Found */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-bold text-emerald-400">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Present ATS Keywords Detected ({keywordAnalysis.foundKeywords.length})</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {keywordAnalysis.foundKeywords.map((kw) => (
                <span
                  key={kw}
                  className="px-3 py-1.5 rounded-xl bg-emerald-950/80 text-emerald-300 text-xs font-bold border border-emerald-500/40 shadow-xs hover:scale-105 transition-transform"
                >
                  ✓ {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Keywords */}
          {keywordAnalysis.missingKeywords.length > 0 && (
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 mb-3 text-xs font-bold text-amber-400">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>High-Value Missing Keywords for Domain ({keywordAnalysis.missingKeywords.length})</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {keywordAnalysis.missingKeywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-3 py-1.5 rounded-xl bg-amber-950/80 text-amber-300 text-xs font-bold border border-amber-500/40 shadow-xs hover:scale-105 transition-transform"
                  >
                    + {kw}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-2.5 font-medium">
                Tip: Seamlessly integrate these terms into your project architectures and responsibilities where genuinely accurate.
              </p>
            </div>
          )}

          {/* High level strengths */}
          {strengths && strengths.length > 0 && (
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-indigo-300">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Identified Resume Strengths</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 pl-4 list-disc font-medium">
                {strengths.map((str, idx) => (
                  <li key={idx} className="leading-relaxed">{str}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Weak Bullet Points */}
      {activeTab === 'bullets' && (
        <div className="space-y-4">
          {keywordAnalysis.weakBulletPoints.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400 border border-dashed border-white/10 rounded-xl font-medium">
              No overtly weak or unquantified bullet points detected. Excellent work!
            </div>
          ) : (
            keywordAnalysis.weakBulletPoints.map((item, idx) => (
              <div key={idx} className="border border-white/10 rounded-2xl p-4 sm:p-5 bg-slate-900/60 shadow-md space-y-3 text-xs">
                {/* Original weak bullet */}
                <div className="rounded-xl border border-rose-500/40 bg-rose-950/40 p-3.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-rose-400 font-bold text-[10px] uppercase tracking-wider">
                    <XCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Current Resume Bullet:</span>
                  </div>
                  <p className="text-slate-200 font-mono text-[11px] leading-relaxed font-semibold">
                    "{item.original}"
                  </p>
                </div>

                <div className="flex items-start gap-1.5 text-amber-300 font-bold text-xs bg-amber-950/60 p-2.5 rounded-lg border border-amber-500/40">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Issue: {item.reason}</span>
                </div>

                {/* AI suggested rewrite */}
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/50 p-3.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[10px] uppercase tracking-wider">
                    <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>AI Suggested Action-Verb & Metric Improvement:</span>
                  </div>
                  <p className="text-emerald-300 font-bold text-xs leading-relaxed">
                    "{item.suggestion}"
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Structure & Formatting */}
      {activeTab === 'format' && (
        <div className="space-y-5 text-xs">
          <div>
            <div className="flex items-center gap-2 mb-2 font-bold text-white">
              <FileWarning className="w-4 h-4 text-indigo-400" />
              <span>ATS Parser Readability & Header Hierarchy</span>
            </div>
            {keywordAnalysis.formattingIssues.length === 0 ? (
              <p className="text-emerald-300 font-bold p-3 bg-emerald-950/80 rounded-xl border border-emerald-500/40">
                ✓ No layout or font hierarchy red flags found. Linear section reading order is clean.
              </p>
            ) : (
              <ul className="space-y-2 pl-4 list-disc text-slate-300 font-medium">
                {keywordAnalysis.formattingIssues.map((issue, idx) => (
                  <li key={idx} className="leading-relaxed">{issue}</li>
                ))}
              </ul>
            )}
          </div>

          {keywordAnalysis.missingAchievements && keywordAnalysis.missingAchievements.length > 0 && (
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 mb-2 font-bold text-white">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                <span>Measurable Achievement Opportunities</span>
              </div>
              <ul className="space-y-2 pl-4 list-disc text-slate-300 font-medium">
                {keywordAnalysis.missingAchievements.map((ach, idx) => (
                  <li key={idx} className="leading-relaxed">{ach}</li>
                ))}
              </ul>
            </div>
          )}

          {weaknesses && weaknesses.length > 0 && (
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 mb-2 font-bold text-rose-400">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Identified Areas for Improvement</span>
              </div>
              <ul className="space-y-2 pl-4 list-disc text-slate-300 font-medium">
                {weaknesses.map((w, idx) => (
                  <li key={idx} className="leading-relaxed">{w}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
