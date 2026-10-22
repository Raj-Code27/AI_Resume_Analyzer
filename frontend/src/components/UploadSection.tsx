import React, { useState, useRef } from 'react';
import { Upload, FileUp, X, Check, AlertCircle, FileText, Briefcase, FileCode2, ChevronDown, ChevronUp, Loader2, Sparkles } from 'lucide-react';
import { SAMPLE_RESUMES, SampleResume } from '../data/sampleResumes';

interface UploadSectionProps {
  onAnalyze: (file: File | null, resumeText: string | null, filename: string, targetRole?: string, jobDescription?: string) => Promise<void>;
  isLoading: boolean;
  uploadProgress: number;
  loadingStepText: string;
}

export const UploadSection: React.FC<UploadSectionProps> = ({
  onAnalyze,
  isLoading,
  uploadProgress,
  loadingStepText,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [selectedSample, setSelectedSample] = useState<SampleResume | null>(null);
  const [targetRole, setTargetRole] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedExtensions = ['.pdf', '.docx', '.png', '.jpg', '.jpeg'];
  const maxSizeBytes = 10 * 1024 * 1024; // 10MB

  const validateAndSetFile = (uploadedFile: File) => {
    setErrorMessage(null);
    const extension = '.' + uploadedFile.name.split('.').pop()?.toLowerCase();
    if (!allowedExtensions.includes(extension)) {
      setErrorMessage(`Unsupported format (${extension}). Please upload PDF, DOCX, PNG, or JPG/JPEG.`);
      return;
    }
    if (uploadedFile.size > maxSizeBytes) {
      setErrorMessage(`File is too large (${(uploadedFile.size / (1024 * 1024)).toFixed(1)}MB). Max allowed size is 10MB.`);
      return;
    }

    setFile(uploadedFile);
    setSelectedSample(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleSelectSample = (sample: SampleResume) => {
    setSelectedSample(sample);
    setFile(null);
    setErrorMessage(null);
    setTargetRole(sample.targetRole || '');
    if (sample.jobDescription) {
      setJobDescription(sample.jobDescription);
      setShowOptionalFields(true);
    }
  };

  const handleClear = () => {
    setFile(null);
    setSelectedSample(null);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file && !selectedSample) {
      setErrorMessage('Please select or upload a resume file first, or choose one of our sample resumes.');
      return;
    }

    if (file) {
      await onAnalyze(file, null, file.name, targetRole.trim() || undefined, jobDescription.trim() || undefined);
    } else if (selectedSample) {
      await onAnalyze(null, selectedSample.content, selectedSample.filename, targetRole.trim() || undefined, jobDescription.trim() || undefined);
    }
  };

  return (
    <section id="upload-section" className="py-14 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="card-3d p-6 sm:p-10 border-white/15 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Upload Your Resume</h2>
            <p className="text-sm text-slate-400 mt-1 font-medium">
              Accepts PDF, DOCX, and scanned documents (PNG/JPG with automated OCR)
            </p>
          </div>

          {/* Sample Resumes Shortcuts with glowing dark pills */}
          <div className="mb-8 p-4 rounded-2xl bg-slate-900/90 border border-white/10 shadow-inner">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-indigo-300">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Quick 1-Click Test Resumes (No Upload Needed)
              </span>
              <span className="text-[11px] text-indigo-300 font-bold bg-indigo-950/80 px-2.5 py-0.5 rounded-full border border-indigo-500/40">
                Instant Scan
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SAMPLE_RESUMES.map((sample, idx) => {
                const isSelected = selectedSample?.id === sample.id;
                const colors = [
                  { iconBg: 'bg-indigo-600 text-white', activeBorder: 'border-indigo-500 ring-2 ring-indigo-500/40 bg-indigo-950/60' },
                  { iconBg: 'bg-emerald-600 text-white', activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/40 bg-emerald-950/60' },
                  { iconBg: 'bg-purple-600 text-white', activeBorder: 'border-purple-500 ring-2 ring-purple-500/40 bg-purple-950/60' },
                ][idx % 3];

                return (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleSelectSample(sample)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-left text-xs transition-all shadow-xs ${
                      isSelected
                        ? `${colors.activeBorder} font-bold scale-[1.02] shadow-[0_0_15px_rgba(99,102,241,0.3)]`
                        : 'border-white/10 bg-slate-800/60 hover:border-indigo-400/50 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg ${colors.iconBg} flex items-center justify-center shrink-0 shadow-sm font-black text-xs`}>
                      <FileCode2 className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="font-bold text-white truncate">{sample.title}</div>
                      <div className="text-[10px] text-slate-400 truncate">{sample.filename}</div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-indigo-400 ml-auto shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3D Drag & Drop Zone */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
                isDragOver
                  ? 'border-indigo-400 bg-indigo-950/60 scale-[0.99] shadow-[0_0_30px_rgba(99,102,241,0.3)]'
                  : file || selectedSample
                  ? 'border-indigo-500/70 bg-indigo-950/30'
                  : 'border-white/15 bg-slate-950/60 hover:border-indigo-400/70 hover:bg-indigo-950/20'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.docx,.png,.jpg,.jpeg"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    validateAndSetFile(e.target.files[0]);
                  }
                }}
              />

              {file || selectedSample ? (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-900/90 rounded-xl border border-indigo-500/40 shadow-lg">
                  <div className="flex items-center gap-3.5 truncate text-left">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-bold text-white truncate">
                        {file ? file.name : selectedSample?.filename}
                      </p>
                      <p className="text-xs text-slate-400 font-medium">
                        {file ? `${(file.size / 1024).toFixed(1)} KB` : 'Pre-loaded sample text resume'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 font-bold border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                      Ready to Analyze
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClear();
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                      title="Remove file"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-950/80 border border-indigo-500/40 mx-auto flex items-center justify-center text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.25)] transition-transform hover:scale-110">
                    <Upload className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-white">
                      Drag & drop your resume file here, or <span className="text-indigo-400 underline font-extrabold">browse file</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1 font-medium">
                      PDF, DOCX, PNG, JPG (up to 10MB)
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="flex items-center gap-2 p-3.5 rounded-xl border border-rose-500/40 bg-rose-950/80 text-rose-300 text-xs font-bold shadow-md">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Optional Job Matching Fields Toggle */}
            <div className="border border-white/10 rounded-xl p-4 bg-slate-900/70 shadow-sm">
              <button
                type="button"
                onClick={() => setShowOptionalFields(!showOptionalFields)}
                className="w-full flex items-center justify-between text-xs font-bold text-slate-200 hover:text-indigo-300 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-indigo-400" />
                  <span>Match Against Specific Job Role or Description (Optional)</span>
                </div>
                {showOptionalFields ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showOptionalFields && (
                <div className="mt-4 space-y-4 pt-4 border-t border-white/10">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Target Job Title / Role
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Senior Backend Engineer, Full-Stack Developer, AI Engineer"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-950/80 border border-white/15 rounded-lg text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder:text-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Job Description Text
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Paste the job description or role requirements here to get targeted keyword alignment and role-specific scoring..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="w-full text-xs p-3 bg-slate-950/80 border border-white/15 rounded-lg text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder:text-slate-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Loading / Progress State */}
            {isLoading && (
              <div className="space-y-2.5 p-4 rounded-xl border border-indigo-500/40 bg-indigo-950/60 shadow-lg">
                <div className="flex items-center justify-between text-xs text-indigo-200 font-bold">
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                    {loadingStepText || 'Processing resume document...'}
                  </span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* 3D Tactile Submit Button */}
            <button
              type="submit"
              disabled={isLoading || (!file && !selectedSample)}
              className={`w-full flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold rounded-xl transition-all shadow-md ${
                isLoading || (!file && !selectedSample)
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
                  : 'btn-3d'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Evaluating ATS & Analyzing Resume...</span>
                </>
              ) : (
                <>
                  <FileUp className="w-4 h-4 text-indigo-200" />
                  <span>Evaluate Resume & Generate 3D ATS Breakdown</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
