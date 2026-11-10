import React from 'react';
import { SAMPLE_PAPERS } from '../samplePapers';
import { SamplePaper } from '../types';
import { Play, Sparkles, Trash2, BookOpen, Layers } from 'lucide-react';

interface Props {
  paperText: string;
  setPaperText: (text: string) => void;
  analysisFocus: string;
  setAnalysisFocus: (focus: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  onSelectSample: (sample: SamplePaper) => void;
  selectedSampleId: string | null;
}

export const PaperInputArea: React.FC<Props> = ({
  paperText,
  setPaperText,
  analysisFocus,
  setAnalysisFocus,
  onAnalyze,
  isLoading,
  onSelectSample,
  selectedSampleId,
}) => {
  const wordCount = paperText.trim() ? paperText.trim().split(/\s+/).length : 0;
  const charCount = paperText.length;

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs">
      {/* Sample paper selector strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Preset Research Papers:</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {SAMPLE_PAPERS.map((sample) => {
            const isSelected = selectedSampleId === sample.id;
            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => onSelectSample(sample)}
                className={`text-xs px-2.5 py-1 rounded-md transition-colors whitespace-nowrap font-medium ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {sample.id === 'transformers' && 'Transformers (2017)'}
                {sample.id === 'crispr' && 'CRISPR-Cas9 (2012)'}
                {sample.id === 'resnet' && 'ResNet-152 (2015)'}
                {sample.id === 'ligo' && 'LIGO Gravity (2016)'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Textarea */}
      <div className="relative">
        <label htmlFor="paper-input" className="sr-only">
          Paste academic paper text, abstract, or excerpt
        </label>
        <textarea
          id="paper-input"
          value={paperText}
          onChange={(e) => setPaperText(e.target.value)}
          placeholder="Paste academic paper abstract, introduction, methodology section, or full paper text here... (arXiv, IEEE, Nature, bioRxiv, ACM, etc.)"
          rows={9}
          className="w-full text-sm leading-relaxed p-4 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-400 focus:border-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 resize-y"
          disabled={isLoading}
        />

        {/* Counter and Clear row */}
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono tabular-nums mt-2 px-1">
          <div className="flex items-center gap-3">
            <span>{wordCount} words</span>
            <span aria-hidden="true">·</span>
            <span>{charCount} characters</span>
            {charCount > 35000 && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-amber-600 dark:text-amber-400">Large paper excerpt</span>
              </>
            )}
          </div>
          {paperText.length > 0 && (
            <button
              type="button"
              onClick={() => setPaperText('')}
              disabled={isLoading}
              className="flex items-center gap-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear text</span>
            </button>
          )}
        </div>
      </div>

      {/* Analytical Controls & Action Row */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Analysis Focus Filter Tabs */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 uppercase tracking-wider shrink-0">
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Analysis Focus:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1 p-0.5 bg-slate-100 dark:bg-slate-800/80 rounded-lg">
            {[
              { id: '', label: 'Comprehensive' },
              { id: 'Methodological Rigor & Data Integrity', label: 'Methodology' },
              { id: 'Theoretical Foundations & Core Thesis', label: 'Hypothesis' },
              { id: 'Adversarial Critique & Limitation Audit', label: 'Limitations' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setAnalysisFocus(f.id)}
                className={`text-xs px-2.5 py-1 rounded-md transition-colors font-medium whitespace-nowrap ${
                  analysisFocus === f.id
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          type="button"
          onClick={onAnalyze}
          disabled={isLoading || !paperText.trim()}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 dark:border-slate-900/30 border-t-white dark:border-t-slate-900 rounded-full animate-spin" />
              <span>Deconstructing Paper...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Deconstruct & Analyze</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
};
