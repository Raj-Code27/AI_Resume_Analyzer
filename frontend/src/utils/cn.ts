import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getScoreInterpretation(score: number): {
  label: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  strokeColor: string;
  glowColor: string;
  gradientFrom: string;
  gradientTo: string;
} {
  if (score >= 85) {
    return {
      label: 'Strong Compatibility',
      textColor: 'text-emerald-300',
      bgColor: 'bg-emerald-950/80',
      borderColor: 'border-emerald-500/40',
      strokeColor: '#10B981',
      glowColor: 'rgba(16, 185, 129, 0.4)',
      gradientFrom: '#34D399',
      gradientTo: '#059669',
    };
  }
  if (score >= 70) {
    return {
      label: 'Good Compatibility',
      textColor: 'text-indigo-300',
      bgColor: 'bg-indigo-950/80',
      borderColor: 'border-indigo-500/40',
      strokeColor: '#6366F1',
      glowColor: 'rgba(99, 102, 241, 0.4)',
      gradientFrom: '#818CF8',
      gradientTo: '#4F46E5',
    };
  }
  if (score >= 50) {
    return {
      label: 'Moderate Compatibility',
      textColor: 'text-amber-300',
      bgColor: 'bg-amber-950/80',
      borderColor: 'border-amber-500/40',
      strokeColor: '#F59E0B',
      glowColor: 'rgba(245, 158, 11, 0.4)',
      gradientFrom: '#FCD34D',
      gradientTo: '#D97706',
    };
  }
  return {
    label: 'Needs Significant Improvement',
    textColor: 'text-rose-300',
    bgColor: 'bg-rose-950/80',
    borderColor: 'border-rose-500/40',
    strokeColor: '#F43F5E',
    glowColor: 'rgba(244, 63, 94, 0.4)',
    gradientFrom: '#FDA4AF',
    gradientTo: '#E11D48',
  };
}
