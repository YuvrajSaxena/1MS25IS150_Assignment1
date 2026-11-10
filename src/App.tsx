/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav';
import { PaperInputArea } from './components/PaperInputArea';
import { CoreHypothesisCard } from './components/CoreHypothesisCard';
import { MethodologyMetricsCard } from './components/MethodologyMetricsCard';
import { CriticalLimitationsCard } from './components/CriticalLimitationsCard';
import { ExecutiveDigestCard } from './components/ExecutiveDigestCard';
import { InquirySection } from './components/InquirySection';
import { SAMPLE_PAPERS } from './samplePapers';
import { PaperAnalysisResult, SamplePaper } from './types';
import {
  FileText,
  Search,
  CheckCircle,
  Clock,
  BookOpen,
  Share2,
  FileDown,
  History,
  RotateCcw,
  Sparkles,
  ExternalLink,
  SlidersHorizontal,
} from 'lucide-react';

export default function App() {
  const [paperText, setPaperText] = useState<string>(SAMPLE_PAPERS[0].fullExcerpt);
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>('transformers');
  const [analysisFocus, setAnalysisFocus] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<PaperAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [history, setHistory] = useState<PaperAnalysisResult[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [loadingStep, setLoadingStep] = useState<string>('');

  // Sync theme with document element
  useEffect(() => {
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = isDark ? 'dark' : 'light';
    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Load saved history if any
    try {
      const saved = localStorage.getItem('paper_deconstruct_history');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSelectSample = (sample: SamplePaper) => {
    setSelectedSampleId(sample.id);
    setPaperText(sample.fullExcerpt);
  };

  const handleAnalyze = async () => {
    if (!paperText.trim() || isLoading) return;

    setError(null);
    setIsLoading(true);

    // Realistic analytical phases feedback
    const steps = [
      'Extracting paper topology & theoretical foundations...',
      'Deconstructing methodology & quantitative benchmarks...',
      'Conducting critical adversarial peer audit...',
      'Synthesizing executive briefing digest...',
    ];

    let currentStepIdx = 0;
    setLoadingStep(steps[0]);
    const stepInterval = setInterval(() => {
      currentStepIdx = (currentStepIdx + 1) % steps.length;
      setLoadingStep(steps[currentStepIdx]);
    }, 1800);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paperText,
          analysisFocus,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server returned error (${response.status})`);
      }

      const result: PaperAnalysisResult = await response.json();
      result.id = `paper_${Date.now()}`;
      result.timestamp = Date.now();
      result.rawPaperText = paperText;

      setAnalysis(result);

      // Save to history
      const updatedHistory = [result, ...history.filter(h => h.paperMetadata.title !== result.paperMetadata.title)].slice(0, 8);
      setHistory(updatedHistory);
      try {
        localStorage.setItem('paper_deconstruct_history', JSON.stringify(updatedHistory));
      } catch {
        // ignore
      }

      // Smooth scroll to output cards
      setTimeout(() => {
        const el = document.getElementById('core-hypothesis');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.message || 'Failed to complete paper deconstruction. Please verify the input.');
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  const handleExportDossier = () => {
    if (!analysis) return;

    const mdContent = `# Academic Research Paper Deconstruction Dossier
**Title:** ${analysis.paperMetadata.title}
**Authors & Year:** ${analysis.paperMetadata.authorsYear}
**Scientific Domain:** ${analysis.paperMetadata.domain}
**Deep Read Estimate:** ${analysis.paperMetadata.readingTimeEstimate}
**Generated Date:** ${new Date(analysis.timestamp || Date.now()).toLocaleDateString()}

---

## 1. Executive Digest Summary
**TL;DR:** ${analysis.executiveDigest.tlDr}

**Key Consequential Finding:**
${analysis.executiveDigest.keyTakeaway}

**Practical & Industry Translation:**
${analysis.executiveDigest.practicalApplication}

**Novelty Assessment:**
${analysis.executiveDigest.noveltyAssessment}

---

## 2. Core Hypothesis & Scope
**Primary Hypothesis:**
${analysis.coreHypothesisAndScope.primaryHypothesis}

**Identified Research Gap:**
${analysis.coreHypothesisAndScope.researchGap}

**Theoretical & Algorithmic Grounding:**
${analysis.coreHypothesisAndScope.theoreticalGrounding}

**Scope Boundaries & Assumptions:**
${analysis.coreHypothesisAndScope.scopeAndAssumptions.map(s => `- ${s}`).join('\n')}

---

## 3. Methodology & Metrics
**Experimental Pipeline & Architecture:**
${analysis.methodologyAndMetrics.architectureOrDesign}

**Dataset & Sample Size:**
${analysis.methodologyAndMetrics.datasetOrSample}

**Key Empirical Benchmarks:**
| Metric / Benchmark | Value / Claim | Baseline / Delta |
|---|---|---|
${analysis.methodologyAndMetrics.keyMetrics.map(m => `| ${m.metricName} | ${m.valueOrClaim} | ${m.comparisonBaseline || '—'} |`).join('\n')}

**Validation Strategy:**
${analysis.methodologyAndMetrics.validationApproach}

**Reproducibility Rating:**
${analysis.methodologyAndMetrics.reproducibilityRating}

---

## 4. Critical Limitations & Vulnerabilities
**Author-Acknowledged Constraints:**
${analysis.criticalLimitations.acknowledgedByAuthors.map(a => `- ${a}`).join('\n')}

**Unaddressed Vulnerabilities & Confounders:**
${analysis.criticalLimitations.unaddressedVulnerabilities.map(v => `- ${v}`).join('\n')}

**Threats to Internal & External Validity:**
${analysis.criticalLimitations.threatToValidity}

**Open Research Questions:**
${analysis.criticalLimitations.openResearchQuestions.map(q => `- ${q}`).join('\n')}
`;

    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${analysis.paperMetadata.title.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 40)}_Deconstruction.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setPaperText(SAMPLE_PAPERS[0].fullExcerpt);
    setSelectedSampleId('transformers');
    setAnalysis(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter cards by search query
  const matchesSearch = (text: string) => {
    if (!searchQuery.trim()) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase().trim());
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-slate-900 selection:text-white dark:selection:bg-slate-100 dark:selection:text-slate-900">
      {/* Top Bar following Top Bar Contract */}
      <TopNav
        onExport={handleExportDossier}
        hasAnalysis={Boolean(analysis)}
        theme={theme}
        onToggleTheme={toggleTheme}
        onReset={handleReset}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        {/* Hero & Overview Section */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2 font-mono">
            <span>Peer Review Agent</span>
            <span aria-hidden="true">·</span>
            <span>Gemini 3.8 Flash Engine</span>
            <span aria-hidden="true">·</span>
            <span>4-Dimensional Deconstruction</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 text-balance">
            Academic Research Paper Deconstruction Agent
          </h1>
          <p className="mt-2.5 text-base text-slate-600 dark:text-slate-400 leading-relaxed text-pretty">
            Dissect complex research papers into crystal-clear empirical dimensions: Core Hypotheses, Methodology Benchmarks, Critical Limitations, and Executive Digests.
          </p>
        </div>

        {/* Paper Input Workspace */}
        <section id="input-section" aria-label="Paper Input Area">
          <PaperInputArea
            paperText={paperText}
            setPaperText={(txt) => {
              setPaperText(txt);
              setSelectedSampleId(null);
            }}
            analysisFocus={analysisFocus}
            setAnalysisFocus={setAnalysisFocus}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
            onSelectSample={handleSelectSample}
            selectedSampleId={selectedSampleId}
          />
        </section>

        {/* Loading Progress State */}
        {isLoading && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center shadow-xs">
            <div className="w-8 h-8 border-3 border-slate-300 dark:border-slate-700 border-t-slate-900 dark:border-t-slate-100 rounded-full animate-spin mx-auto mb-4" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Deconstructing Academic Paper
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm font-mono text-cyan-700 dark:text-cyan-400">
              {loadingStep || 'Executing multi-dimensional scientific analysis...'}
            </p>
            <div className="max-w-md mx-auto mt-4 bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
              <div className="bg-slate-900 dark:bg-slate-100 h-full w-2/3 animate-pulse" />
            </div>
          </div>
        )}

        {/* Error Notification */}
        {error && !isLoading && (
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-start gap-3 text-sm text-rose-800 dark:text-rose-200">
            <div className="p-1 rounded bg-rose-100 dark:bg-rose-900 text-rose-600 dark:text-rose-300 shrink-0 mt-0.5">
              !
            </div>
            <div className="flex-1">
              <strong className="font-semibold block mb-0.5">Analysis Interrupted</strong>
              <p>{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-xs text-rose-600 dark:text-rose-400 hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Deconstructed Results Section */}
        {analysis && !isLoading && (
          <div className="space-y-6">
            {/* Paper Metadata Ribbon & Controls Bar */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Clean unboxed metadata with separators (zero-pill rule) */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <span>{analysis.paperMetadata.domain}</span>
                    <span aria-hidden="true">·</span>
                    <span>{analysis.paperMetadata.authorsYear}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 font-mono tabular-nums">
                      <Clock className="w-3 h-3" />
                      {analysis.paperMetadata.readingTimeEstimate} read
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                    {analysis.paperMetadata.title}
                  </h2>
                </div>

                {/* Search in analysis & quick export actions */}
                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Filter findings..."
                      className="text-xs pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-400 placeholder:text-slate-400 w-40 sm:w-48"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleExportDossier}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>Download .md</span>
                  </button>

                  {history.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setShowHistory(!showHistory)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <History className="w-3.5 h-3.5" />
                      <span>History ({history.length})</span>
                    </button>
                  )}
                </div>
              </div>

              {/* History dropdown drawer if toggled */}
              {showHistory && history.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs uppercase font-mono text-slate-400 block mb-2">Previous Analyses:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {history.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setAnalysis(item);
                          if (item.rawPaperText) setPaperText(item.rawPaperText);
                          setShowHistory(false);
                        }}
                        className={`text-left p-2.5 rounded-lg border text-xs transition-colors ${
                          item.paperMetadata.title === analysis.paperMetadata.title
                            ? 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-medium'
                            : 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <p className="font-semibold truncate">{item.paperMetadata.title}</p>
                        <p className="text-slate-500 truncate text-[11px] mt-0.5">{item.paperMetadata.domain}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* The 4 Core Required Output Cards in a responsive, balanced 2x2 grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Card 1: Core Hypothesis & Scope */}
              <div id="core-hypothesis">
                <CoreHypothesisCard data={analysis.coreHypothesisAndScope} />
              </div>

              {/* Card 2: Methodology & Metrics */}
              <div id="methodology-metrics">
                <MethodologyMetricsCard data={analysis.methodologyAndMetrics} />
              </div>

              {/* Card 3: Critical Limitations */}
              <div id="critical-limitations">
                <CriticalLimitationsCard data={analysis.criticalLimitations} />
              </div>

              {/* Card 4: Executive Digest summary */}
              <div id="executive-digest">
                <ExecutiveDigestCard data={analysis.executiveDigest} />
              </div>
            </div>

            {/* Interactive Researcher Inquiry Section */}
            <div className="pt-2">
              <InquirySection
                paperTitle={analysis.paperMetadata.title}
                paperText={analysis.rawPaperText || paperText}
              />
            </div>
          </div>
        )}

        {/* Empty state / initial guidance if no analysis performed yet */}
        {!analysis && !isLoading && (
          <div className="border border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-8 sm:p-10 text-center bg-white/40 dark:bg-slate-900/40">
            <div className="max-w-md mx-auto space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Ready to Deconstruct
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Click <strong>Deconstruct & Analyze</strong> above to generate the 4 analytical dimensions, or choose a preset paper (Transformers, CRISPR-Cas9, ResNet-152, LIGO Gravitational Waves).
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer conforming to anti-slop rules: quiet copyright & site links only */}
      <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 py-8 bg-white dark:bg-slate-900 text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800 dark:text-slate-200">PaperDeconstruct</span>
            <span aria-hidden="true">·</span>
            <span>Academic Research Peer Agent</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#input-section" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
              Input Section
            </a>
            <span aria-hidden="true">·</span>
            <a href="#core-hypothesis" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
              Hypothesis & Scope
            </a>
            <span aria-hidden="true">·</span>
            <a href="#methodology-metrics" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
              Methodology & Metrics
            </a>
            <span aria-hidden="true">·</span>
            <a href="#critical-limitations" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
              Critical Limitations
            </a>
            <span aria-hidden="true">·</span>
            <a href="#executive-digest" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
              Executive Digest
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
