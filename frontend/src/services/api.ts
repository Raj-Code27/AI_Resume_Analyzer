import axios from 'axios';
import { AnalysisResult, OptimizationResult, HistoryItem } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 45000,
});

export const api = {
  async checkHealth(): Promise<{ status: string; database: string; aiProvider?: string; demoMode?: boolean }> {
    try {
      const res = await apiClient.get('/health');
      return res.data;
    } catch {
      return { status: 'offline', database: 'disconnected', demoMode: true };
    }
  },

  async analyzeResume(
    file: File | null,
    resumeText: string | null,
    filename: string,
    targetRole?: string,
    jobDescription?: string,
    onProgress?: (percent: number) => void
  ): Promise<AnalysisResult> {
    const formData = new FormData();
    if (file) {
      formData.append('resume', file);
    } else if (resumeText) {
      const blob = new Blob([resumeText], { type: 'text/plain' });
      formData.append('resume', blob, filename || 'sample_resume.txt');
    }
    if (targetRole) formData.append('targetRole', targetRole);
    if (jobDescription) formData.append('jobDescription', jobDescription);

    const res = await apiClient.post<AnalysisResult>('/resumes/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        }
      },
    });

    return res.data;
  },

  async getAnalysis(analysisId: string): Promise<AnalysisResult> {
    const res = await apiClient.get<AnalysisResult>(`/analysis/${analysisId}`);
    return res.data;
  },

  async optimizeResume(
    analysisId: string,
    payload: {
      targetRole?: string;
      jobDescription?: string;
      sectionsToImprove?: string[];
      tone?: string;
    }
  ): Promise<OptimizationResult> {
    const res = await apiClient.post<OptimizationResult>(`/analysis/${analysisId}/optimize`, payload);
    return res.data;
  },

  async updateOptimization(
    optimizationId: string,
    changes: OptimizationResult['changes']
  ): Promise<OptimizationResult> {
    const res = await apiClient.patch<OptimizationResult>(`/optimization/${optimizationId}`, { changes });
    return res.data;
  },

  async getHistory(): Promise<{ items: HistoryItem[]; total: number }> {
    const res = await apiClient.get<{ items: HistoryItem[]; total: number }>('/history');
    return res.data;
  },

  getDownloadUrl(optimizationId: string): string {
    return `${API_BASE_URL}/optimization/${optimizationId}/download`;
  },
};
