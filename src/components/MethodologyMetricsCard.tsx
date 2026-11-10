import React, { useState } from 'react';
import { MethodologyAndMetrics } from '../types';
import { Microscope, Copy, Check, BarChart3, Database, ShieldCheck } from 'lucide-react';

interface Props {
  data: MethodologyAndMetrics;
}

export const MethodologyMetricsCard: React.FC<Props> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const metricsStr = data.keyMetrics
      .map(m => `- ${m.metricName}: ${m.valueOrClaim}${m.comparisonBaseline ? ` (vs ${m.comparisonBaseline})` : ''}`)
      .join('\n');
    const text = `## Methodology & Metrics\n\n**Architecture & Design:**\n${data.architectureOrDesign}\n\n**Dataset & Sample:**\n${data.datasetOrSample}\n\n**Key Metrics:**\n${metricsStr}\n\n**Validation Approach:**\n${data.validationApproach}\n\n**Reproducibility Rating:**\n${data.reproducibilityRating}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 transition-all duration-200">
      {/* Card Header */}
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400">
            <Microscope className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Dimension 02</span>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Methodology & Metrics</h2>
          </div>
        </div>
        <button
          onClick={handleCopy}
          aria-label="Copy section markdown"
          className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Copy Methodology markdown"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Card Body */}
      <div className="mt-5 space-y-5">
        {/* Architecture / Design */}
        <div>
          <h3 className="text-xs uppercase font-mono text-slate-500 tracking-wide mb-1.5">Experimental Pipeline & Architecture</h3>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {data.architectureOrDesign}
          </p>
        </div>

        {/* Dataset & Sample */}
        <div>
          <div className="flex items-center gap-1.5 text-xs uppercase font-mono text-slate-500 tracking-wide mb-1.5">
            <Database className="w-3.5 h-3.5" />
            <span>Dataset, Sample Size & Benchmark Corpora</span>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {data.datasetOrSample}
          </p>
        </div>

        {/* Key Metrics Table */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs uppercase font-mono text-slate-500 tracking-wide">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Key Empirical Benchmarks & Quantitative Claims</span>
            </div>
            <span className="text-xs font-mono text-slate-400">tabular-nums</span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-mono uppercase">
                <tr>
                  <th className="py-2.5 px-3 font-medium">Metric / Benchmark</th>
                  <th className="py-2.5 px-3 font-medium">Observed Value / Claim</th>
                  <th className="py-2.5 px-3 font-medium">Baseline / Delta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono tabular-nums">
                {data.keyMetrics.map((metric, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-slate-100 whitespace-nowrap">
                      {metric.metricName}
                    </td>
                    <td className="py-2.5 px-3 text-cyan-600 dark:text-cyan-400 font-semibold">
                      {metric.valueOrClaim}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400">
                      {metric.comparisonBaseline || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Validation & Reproducibility Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800">
            <span className="text-xs uppercase font-mono text-slate-500 block mb-1">Validation Strategy</span>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {data.validationApproach}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-xs uppercase font-mono text-slate-500 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span>Reproducibility Assessment</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {data.reproducibilityRating}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
