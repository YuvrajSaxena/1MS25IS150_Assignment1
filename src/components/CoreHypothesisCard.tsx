import React, { useState } from 'react';
import { CoreHypothesisAndScope } from '../types';
import { Compass, CheckCircle2, Copy, Check } from 'lucide-react';

interface Props {
  data: CoreHypothesisAndScope;
}

export const CoreHypothesisCard: React.FC<Props> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `## Core Hypothesis & Scope\n\n**Primary Hypothesis:**\n${data.primaryHypothesis}\n\n**Research Gap:**\n${data.researchGap}\n\n**Theoretical Grounding:**\n${data.theoreticalGrounding}\n\n**Scope & Assumptions:**\n${data.scopeAndAssumptions.map(s => `- ${s}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 transition-all duration-200">
      {/* Card Header */}
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Dimension 01</span>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Core Hypothesis & Scope</h2>
          </div>
        </div>
        <button
          onClick={handleCopy}
          aria-label="Copy section markdown"
          className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Copy Core Hypothesis markdown"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Card Body */}
      <div className="mt-5 space-y-5">
        {/* Primary Hypothesis */}
        <div>
          <h3 className="text-xs uppercase font-mono text-slate-500 tracking-wide mb-1.5">Primary Hypothesis & Central Proposition</h3>
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100 leading-relaxed bg-slate-50 dark:bg-slate-950/40 p-3.5 rounded-lg border border-slate-100 dark:border-slate-800/80">
            {data.primaryHypothesis}
          </p>
        </div>

        {/* Research Gap */}
        <div>
          <h3 className="text-xs uppercase font-mono text-slate-500 tracking-wide mb-1.5">Identified Research Gap</h3>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {data.researchGap}
          </p>
        </div>

        {/* Theoretical Grounding */}
        <div>
          <h3 className="text-xs uppercase font-mono text-slate-500 tracking-wide mb-1.5">Theoretical & Algorithmic Grounding</h3>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {data.theoreticalGrounding}
          </p>
        </div>

        {/* Scope and Assumptions */}
        <div>
          <h3 className="text-xs uppercase font-mono text-slate-500 tracking-wide mb-2">Scope Boundaries & Operational Assumptions</h3>
          <ul className="space-y-2">
            {data.scopeAndAssumptions.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
