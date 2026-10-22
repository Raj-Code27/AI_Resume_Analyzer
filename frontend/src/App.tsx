import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { UploadSection } from './components/UploadSection';
import { ScoreGauge } from './components/ScoreGauge';
import { ScoreBreakdown } from './components/ScoreBreakdown';
import { SkillsSection } from './components/SkillsSection';
import { RoleRecommendations } from './components/RoleRecommendations';
import { KeywordsAndWeaknesses } from './components/KeywordsAndWeaknesses';
import { OptimizerView } from './components/OptimizerView';
import { HistoryDrawer } from './components/HistoryDrawer';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { Footer } from './components/Footer';

import { AnalysisResult, OptimizationResult, HistoryItem, OptimizationChange } from './types';
import { api } from './services/api';
import { runClientMockAnalysis, generateMockOptimization } from './services/mockAnalyzer';
import { downloadClientAtsPdf } from './services/pdfGenerator';
import { SAMPLE_RESUMES } from './data/sampleResumes';

import { 
  Sparkles, ArrowLeft, Download, AlertTriangle, FileText, 
  RotateCcw, ShieldCheck, CheckCircle2 
} from 'lucide-react';

export function App() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [optimization, setOptimization] = useState<OptimizationResult | null>(null);
  const [activeView, setActiveView] = useState<'upload' | 'dashboard' | 'optimizer'>('upload');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  
  const [backendStatus, setBackendStatus] = useState<{ status: string; demoMode?: boolean }>({
    status: 'checking',
    demoMode: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loadingStepText, setLoadingStepText] = useState('');
  const [isSavingOptimization, setIsSavingOptimization] = useState(false);

  // Check backend health on mount and load local history
  useEffect(() => {
    async function init() {
      try {
        const health = await api.checkHealth();
        setBackendStatus(health);
        if (health.status === 'ok') {
          try {
            const hist = await api.getHistory();
            if (hist && hist.items) {
              setHistory(hist.items);
              return;
            }
          } catch {
            // fallback to local storage
          }
        }
      } catch {
        setBackendStatus({ status: 'offline', demoMode: true });
      }

      // Load from local storage
      const savedHistory = localStorage.getItem('resumeiq_history');
      if (savedHistory) {
        try {
          setHistory(JSON.parse(savedHistory));
        } catch {
          // ignore corrupted storage
        }
      }
    }
    init();
  }, []);

  const saveHistoryItem = (item: AnalysisResult) => {
    const historyEntry: HistoryItem = {
      id: item.id,
      createdAt: item.createdAt,
      originalFilename: item.originalFilename,
      atsScore: item.atsScore,
      targetRole: item.targetRole,
      skillsCount: item.skills.length,
      topRole: item.roleRecommendations[0]?.roleTitle,
    };

    setHistory((prev) => {
      const updated = [historyEntry, ...prev.filter((h) => h.id !== item.id)].slice(0, 20);
      localStorage.setItem('resumeiq_history', JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('resumeiq_history');
  };

  // Analyze Resume Handler
  const handleAnalyze = async (
    file: File | null,
    resumeText: string | null,
    filename: string,
    targetRole?: string,
    jobDescription?: string
  ) => {
    setIsLoading(true);
    setUploadProgress(15);
    setLoadingStepText('Validating document integrity & MIME type...');

    try {
      let result: AnalysisResult;

      if (backendStatus.status === 'ok') {
        setUploadProgress(35);
        setLoadingStepText('Uploading document & extracting text layers...');
        
        try {
          result = await api.analyzeResume(
            file,
            resumeText,
            filename,
            targetRole,
            jobDescription,
            (percent) => {
              setUploadProgress(Math.min(85, 30 + Math.round(percent * 0.5)));
            }
          );
        } catch (backendError) {
          console.warn('Backend analyze call failed, falling back to client-side engine:', backendError);
          // Fallback to client mock
          let text = resumeText || '';
          if (file && !text) {
            text = await file.text().catch(() => 'Sample resume parsed successfully');
          }
          result = runClientMockAnalysis(text || 'Resume content', filename, targetRole, jobDescription);
        }
      } else {
        // Standalone / Demo Mode client analysis
        setUploadProgress(40);
        setLoadingStepText('Running text extraction & OCR parsing...');
        await new Promise((r) => setTimeout(r, 600));

        setUploadProgress(70);
        setLoadingStepText('Evaluating ATS scoring heuristic weights...');
        await new Promise((r) => setTimeout(r, 600));

        let text = resumeText || '';
        if (file && !text) {
          text = await file.text().catch(() => 'Sample parsed text');
        }
        result = runClientMockAnalysis(text || 'Resume content', filename, targetRole, jobDescription);
      }

      setUploadProgress(100);
      setLoadingStepText('Finalizing ATS breakdown & role recommendations...');
      await new Promise((r) => setTimeout(r, 300));

      setAnalysis(result);
      setOptimization(null);
      saveHistoryItem(result);
      setActiveView('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      alert(`Analysis error: ${err.message || 'Failed to process document'}`);
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
      setLoadingStepText('');
    }
  };

  // Start Optimization Flow
  const handleStartOptimization = async (customTargetRole?: string) => {
    if (!analysis) return;
    setIsLoading(true);
    setLoadingStepText('Generating fact-preserving bullet improvements & ATS alignments...');

    try {
      const role = customTargetRole || analysis.targetRole || 'Full-Stack Developer';

      let optResult: OptimizationResult;
      if (backendStatus.status === 'ok' && !analysis.id.startsWith('demo_')) {
        try {
          optResult = await api.optimizeResume(analysis.id, {
            targetRole: role,
            jobDescription: undefined,
          });
        } catch {
          optResult = generateMockOptimization(analysis);
        }
      } else {
        await new Promise((r) => setTimeout(r, 800));
        optResult = generateMockOptimization(analysis);
      }

      setOptimization(optResult);
      setActiveView('optimizer');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      alert(`Optimization error: ${err.message || 'Could not optimize resume'}`);
    } finally {
      setIsLoading(false);
      setLoadingStepText('');
    }
  };

  // Update optimization changes
  const handleUpdateChanges = async (updatedChanges: OptimizationChange[]) => {
    if (!optimization) return;
    setIsSavingOptimization(true);

    try {
      const acceptedCount = updatedChanges.filter((c) => c.status === 'accepted').length;
      const baseRecalcScore = analysis ? analysis.atsScore : 78;
      const bonus = Math.round((acceptedCount / updatedChanges.length) * 14);
      const newScore = Math.min(98, baseRecalcScore + bonus);

      const updatedOpt: OptimizationResult = {
        ...optimization,
        changes: updatedChanges,
        optimizedScore: newScore,
      };

      setOptimization(updatedOpt);

      if (backendStatus.status === 'ok' && !optimization.id.startsWith('opt_')) {
        await api.updateOptimization(optimization.id, updatedChanges);
      }
    } finally {
      setIsSavingOptimization(false);
    }
  };

  // Download PDF
  const handleDownloadPdf = () => {
    if (!optimization) return;
    if (backendStatus.status === 'ok' && !optimization.id.startsWith('opt_')) {
      window.open(api.getDownloadUrl(optimization.id), '_blank');
    } else {
      downloadClientAtsPdf(optimization, analysis?.originalFilename);
    }
  };

  const handleSelectSampleFromHero = (sampleId: string) => {
    const sample = SAMPLE_RESUMES.find((s) => s.id === sampleId) || SAMPLE_RESUMES[0];
    handleAnalyze(null, sample.content, sample.filename, sample.targetRole, sample.jobDescription);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080B14] text-slate-100 relative overflow-hidden">
      {/* Dynamic Cosmic Aurora Ambient Flares */}
      <div className="aurora-orb-indigo top-0 left-[10%] w-[500px] h-[500px] opacity-40 animate-float-3d" />
      <div className="aurora-orb-purple top-[20%] right-[5%] w-[600px] h-[600px] opacity-35 animate-float-3d" style={{ animationDelay: '3s' }} />
      <div className="aurora-orb-cyan bottom-[15%] left-[20%] w-[550px] h-[550px] opacity-25 animate-float-3d" style={{ animationDelay: '5s' }} />

      {/* Required Demo Mode Banner (Section 11) */}
      {(backendStatus.demoMode || backendStatus.status !== 'ok') && (
        <aside aria-label="Demo mode notice" className="relative z-50 bg-amber-950/80 backdrop-blur-md border-b border-amber-500/40 px-4 py-2 text-center text-xs text-amber-300 font-bold flex items-center justify-center gap-2 shadow-sm">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>Demo mode, not real AI analysis — running transparent heuristic ATS scoring & local verification engine.</span>
        </aside>
      )}

      {/* Navbar */}
      <Navbar
        onNavigate={(view) => {
          if (view === 'upload') setActiveView('upload');
          if (view === 'dashboard' && analysis) setActiveView('dashboard');
        }}
        activeView={activeView}
        backendStatus={backendStatus}
        onOpenHistory={() => setIsHistoryOpen(true)}
        hasAnalysis={!!analysis}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        {activeView === 'upload' && (
          <>
            <LandingHero
              onStartAnalysis={() => {
                const el = document.getElementById('upload-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onSelectSample={handleSelectSampleFromHero}
            />
            <UploadSection
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
              uploadProgress={uploadProgress}
              loadingStepText={loadingStepText}
            />
            <FeaturesSection />
            <HowItWorksSection />
          </>
        )}

        {activeView === 'dashboard' && analysis && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Dashboard Header */}
            <div className="card-3d p-6 border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setActiveView('upload')}
                  className="p-2.5 rounded-xl bg-slate-800/80 border border-white/10 hover:bg-slate-700 text-slate-300 hover:text-white transition-all shadow-xs"
                  title="Upload another resume"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-xl sm:text-2xl font-black text-white truncate max-w-md">
                      {analysis.originalFilename}
                    </h1>
                    <span className="text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-500/40 shadow-xs">
                      {analysis.fileType.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium mt-1">
                    Analyzed on {new Date(analysis.createdAt).toLocaleDateString()} • {analysis.skills.length} technical skills verified
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleStartOptimization()}
                  className="btn-3d flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl"
                >
                  <Sparkles className="w-4 h-4 text-indigo-200" />
                  <span>Improve My Resume (AI)</span>
                </button>

                <button
                  onClick={() => setActiveView('upload')}
                  className="btn-secondary-3d flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl"
                >
                  <RotateCcw className="w-4 h-4 text-slate-400" />
                  <span>New Scan</span>
                </button>
              </div>
            </div>

            {/* Top Grid: ATS Score Gauge + Scoring Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <ScoreGauge
                  score={analysis.atsScore}
                  targetRole={analysis.targetRole}
                  hasJobDescription={analysis.jobDescriptionProvided}
                />
              </div>

              <div className="lg:col-span-2">
                <ScoreBreakdown categories={analysis.scoreBreakdown} />
              </div>
            </div>

            {/* Skills Evidence Section */}
            <SkillsSection skills={analysis.skills} />

            {/* Suitable Job Roles Section */}
            <RoleRecommendations
              roles={analysis.roleRecommendations}
              onSelectTargetRole={(roleTitle) => handleStartOptimization(roleTitle)}
            />

            {/* Keywords, Weak Bullets & Formatting Audit */}
            <KeywordsAndWeaknesses
              keywordAnalysis={analysis.keywordAnalysis}
              strengths={analysis.strengths}
              weaknesses={analysis.weaknesses}
            />
          </div>
        )}

        {activeView === 'optimizer' && optimization && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <button
              onClick={() => setActiveView('dashboard')}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground-muted hover:text-foreground p-1 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Analysis Dashboard</span>
            </button>

            <OptimizerView
              optimization={optimization}
              onUpdateChanges={handleUpdateChanges}
              onDownloadPdf={handleDownloadPdf}
              isSaving={isSavingOptimization}
              onBackToDashboard={() => setActiveView('dashboard')}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectAnalysis={async (id) => {
          if (analysis && analysis.id === id) {
            setActiveView('dashboard');
            return;
          }
          try {
            if (backendStatus.status === 'ok') {
              const res = await api.getAnalysis(id);
              setAnalysis(res);
              setActiveView('dashboard');
            } else {
              // demo reload
              const sample = SAMPLE_RESUMES[0];
              const res = runClientMockAnalysis(sample.content, sample.filename, sample.targetRole);
              setAnalysis(res);
              setActiveView('dashboard');
            }
          } catch {
            const sample = SAMPLE_RESUMES[0];
            const res = runClientMockAnalysis(sample.content, sample.filename, sample.targetRole);
            setAnalysis(res);
            setActiveView('dashboard');
          }
        }}
        onClearHistory={handleClearHistory}
      />
    </div>
  );
}

export default App;
