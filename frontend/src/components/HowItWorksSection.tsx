import React from 'react';
import { UploadCloud, Cpu, Award, ShieldCheck } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Upload Document',
      desc: 'Drop in your PDF, Word DOCX, or scanned image. ResumeIQ runs OCR extraction and validates document integrity.',
      icon: <UploadCloud className="w-6 h-6 text-indigo-400" />,
    },
    {
      num: '02',
      title: 'Analyze & Score',
      desc: 'Our engine computes ATS compatibility across 7 categories, verifies skills with evidence, and recommends top job roles.',
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
    },
    {
      num: '03',
      title: 'Optimize & Export',
      desc: 'Review side-by-side bullet point improvements, approve revisions, recalculate your score, and download a polished PDF.',
      icon: <Award className="w-6 h-6 text-emerald-400" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 border-b border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Simple 3-Step Process</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
            How ResumeIQ Works
          </h2>
          <p className="text-sm text-slate-400 mt-2 font-medium">
            From raw document parsing to verified role alignment in under 15 seconds
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="card-3d relative flex flex-col items-center text-center p-8 border-white/10 shadow-lg">
              <span className="text-5xl font-black text-white/10 mb-2 font-mono">{step.num}</span>
              <div className="w-14 h-14 rounded-2xl bg-slate-950/80 border border-white/15 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.25)] mb-4">
                {step.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Privacy Callout Banner */}
        <div className="mt-14 p-5 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col sm:flex-row items-center gap-4 max-w-3xl mx-auto shadow-md">
          <div className="w-12 h-12 rounded-xl bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0 shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="text-xs text-slate-300 leading-relaxed text-center sm:text-left">
            <span className="font-bold text-white">Privacy by Design: </span>
            <span className="font-medium">
              Your uploaded resumes are processed in temporary memory buffers and never sold or used for public AI model training. Sensitive personally identifiable information is safeguarded.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
