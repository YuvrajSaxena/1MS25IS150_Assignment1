import React from 'react';
import { Download, Sun, Moon } from 'lucide-react';

interface Props {
  onExport: () => void;
  hasAnalysis: boolean;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onReset: () => void;
}

export const TopNav: React.FC<Props> = ({
  onExport,
  hasAnalysis,
  theme,
  onToggleTheme,
  onReset,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={onReset}
            className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap shrink-0 flex items-center gap-2 hover:opacity-85 transition-opacity"
          >
            <span>PaperDeconstruct</span>
          </button>

          {/* Zone 2: Single-line concise nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            <a href="#input-section" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
              Paper Input
            </a>
            <a href="#core-hypothesis" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
              Hypothesis & Scope
            </a>
            <a href="#methodology-metrics" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
              Methodology & Metrics
            </a>
            <a href="#critical-limitations" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
              Critical Limitations
            </a>
            <a href="#executive-digest" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
              Executive Digest
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action + theme toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle visual theme"
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {hasAnalysis ? (
              <button
                type="button"
                onClick={onExport}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors whitespace-nowrap shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Dossier</span>
              </button>
            ) : (
              <a
                href="#input-section"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors whitespace-nowrap shrink-0"
              >
                <span>Analyze Paper</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
