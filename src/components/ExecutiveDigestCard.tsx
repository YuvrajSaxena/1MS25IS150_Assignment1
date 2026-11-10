import React, { useState } from 'react';
import { ExecutiveDigest } from '../types';
import { Sparkles, Copy, Check, Lightbulb, Zap, Award } from 'lucide-react';

interface Props {
  data: ExecutiveDigest;
}

export const ExecutiveDigestCard: React.FC<Props> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `## Executive Digest Summary\n\n**TL;DR:**\n${data.tlDr}\n\n**Key Takeaway:**\n${data.keyTakeaway}\n\n**Practical Application:**\n${data.practicalApplication}\n\n**Novelty Assessment:**\n${data.noveltyAssessment}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 transition-all duration-200">
      {/* Card Header */}
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Dimension 04</span>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Executive Digest Summary</h2>
          </div>
        </div>
        <button
          onClick={handleCopy}
          aria-label="Copy section markdown"
          className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Copy Executive Digest markdown"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Card Body */}
      <div className="mt-5 space-y-5">
        {/* TL;DR Executive Synopsis */}
        <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800">
          <span className="text-xs uppercase font-mono text-slate-500 block mb-1.5 font-semibold">
            Executive TL;DR Synopsis
          </span>
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
            {data.tlDr}
          </p>
        </div>

        {/* Key Takeaway */}
        <div>
          <div className="flex items-center gap-1.5 text-xs uppercase font-mono text-slate-500 tracking-wide mb-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Primary Consequential Finding</span>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {data.keyTakeaway}
          </p>
        </div>

        {/* Practical Application */}
        <div>
          <div className="flex items-center gap-1.5 text-xs uppercase font-mono text-slate-500 tracking-wide mb-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Practical & Industry Translation</span>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {data.practicalApplication}
          </p>
        </div>

        {/* Novelty Assessment */}
        <div className="p-3.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40">
          <div className="flex items-center gap-1.5 text-xs uppercase font-mono text-emerald-800 dark:text-emerald-300 mb-1 font-semibold">
            <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Novelty & Contribution Horizon</span>
          </div>
          <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
            {data.noveltyAssessment}
          </p>
        </div>
      </div>
    </div>
  );
};
