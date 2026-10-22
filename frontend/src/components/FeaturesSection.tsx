import React from 'react';
import { 
  BarChart2, Compass, Sparkles, FileCheck, Search, Download 
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <BarChart2 className="w-5 h-5 text-indigo-400" />,
      title: '7-Dimension ATS Scoring',
      desc: 'Deterministic heuristics combined with semantic evaluation across skills, projects, keywords, formatting, and readability.',
      borderGlow: 'hover:border-indigo-500/50',
    },
    {
      icon: <Compass className="w-5 h-5 text-pink-400" />,
      title: '5–10 Job Role Matches',
      desc: 'Discover suitable career paths matched to your technical depth, with tailored next steps and missing skill gap analysis.',
      borderGlow: 'hover:border-pink-500/50',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-purple-400" />,
      title: 'Fact-Preserving AI Rewriter',
      desc: 'Transform passive bullet points into high-impact, quantified achievement statements without fabricating fake experiences.',
      borderGlow: 'hover:border-purple-500/50',
    },
    {
      icon: <FileCheck className="w-5 h-5 text-emerald-400" />,
      title: 'Multi-Format Parser & OCR',
      desc: 'Processes standard PDFs, Microsoft Word DOCX, and scanned documents or screenshots via Tesseract OCR engine.',
      borderGlow: 'hover:border-emerald-500/50',
    },
    {
      icon: <Search className="w-5 h-5 text-sky-400" />,
      title: 'High-Intent Keyword Audit',
      desc: 'Identify present vs missing ATS keywords tailored to your specific target job description or industry benchmark.',
      borderGlow: 'hover:border-sky-500/50',
    },
    {
      icon: <Download className="w-5 h-5 text-amber-400" />,
      title: 'Clean ATS PDF Generator',
      desc: 'Export a single-column, cleanly formatted PDF optimized for modern Applicant Tracking Systems.',
      borderGlow: 'hover:border-amber-500/50',
    },
  ];

  return (
    <section id="features-section" className="py-20 border-b border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-950/80 text-indigo-300 border border-indigo-500/40 mb-3 shadow-[0_0_12px_rgba(99,102,241,0.2)]">
            Built for Serious Job Seekers
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Engineered for Transparency and Impact
          </h2>
          <p className="text-sm text-slate-400 mt-2 font-medium">
            Every score is explained with concrete evidence from your resume text—no black box guesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className={`card-3d p-6 border-white/10 shadow-lg ${f.borderGlow} transition-all group`}
            >
              <div className="w-12 h-12 rounded-xl bg-slate-950/90 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                {f.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
