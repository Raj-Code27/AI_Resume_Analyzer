import React from 'react';
import { FileText } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#06080F] py-12 text-xs text-slate-400 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-md">
              <FileText className="w-5 h-5 text-indigo-100" />
            </div>
            <div>
              <span className="text-sm font-black text-white">ResumeIQ</span>
              <p className="text-[11px] text-slate-400 font-medium">AI-Powered Resume Analyzer & ATS Optimizer</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-semibold">
            <a href="#upload-section" className="hover:text-white transition-colors">Analyze Resume</a>
            <a href="#features-section" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <span className="text-white/20">|</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-[11px] text-indigo-300">
              Cosmic Aurora Theme
            </span>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© {new Date().getFullYear()} ResumeIQ. All rights reserved. Heuristic scoring estimates do not guarantee ATS pass rates.</p>
          <div className="flex items-center gap-2 text-slate-400 font-medium">
            <span>Built with Node.js, Express, MongoDB & React</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
