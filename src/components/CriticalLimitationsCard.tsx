import React, { useState } from 'react';
import { CriticalLimitations } from '../types';
import { AlertTriangle, Copy, Check, ShieldAlert, HelpCircle, FileWarning } from 'lucide-react';

interface Props {
  data: CriticalLimitations;
}

export const CriticalLimitationsCard: React.FC<Props> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `## Critical Limitations\n\n**Author-Acknowledged Weaknesses:**\n${data.acknowledgedByAuthors.map(a => `- ${a}`).join('\n')}\n\n**Unaddressed Vulnerabilities & Confounders:**\n${data.unaddressedVulnerabilities.map(v => `- ${v}`).join('\n')}\n\n**Threats to Validity:**\n${data.threatToValidity}\n\n**Open Research Questions:**\n${data.openResearchQuestions.map(q => `- ${q}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 transition-all duration-200">
      {/* Card Header */}
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Dimension 03</span>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Critical Limitations</h2>
          </div>
        </div>
        <button
          onClick={handleCopy}
          aria-label="Copy section markdown"
          className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Copy Limitations markdown"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Card Body */}
      <div className="mt-5 space-y-5">
        {/* Acknowledged by Authors */}
        <div>
          <div className="flex items-center gap-1.5 text-xs uppercase font-mono text-slate-500 tracking-wide mb-2">
            <FileWarning className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Author-Acknowledged Weaknesses & Constraints</span>
          </div>
          <ul className="space-y-2">
            {data.acknowledgedByAuthors.map((lim, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                <span className="text-amber-500 font-mono text-xs mt-1 shrink-0">·</span>
                <span className="leading-relaxed">{lim}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Unaddressed Vulnerabilities & Blindspots */}
        <div>
          <div className="flex items-center gap-1.5 text-xs uppercase font-mono text-slate-500 tracking-wide mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
            <span>Unaddressed Vulnerabilities & Latent Assumptions</span>
          </div>
          <ul className="space-y-2">
            {data.unaddressedVulnerabilities.map((vuln, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                <span className="text-rose-500 font-mono text-xs mt-1 shrink-0">·</span>
                <span className="leading-relaxed">{vuln}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Threat to Validity */}
        <div className="p-3.5 rounded-lg bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
          <span className="text-xs uppercase font-mono text-amber-800 dark:text-amber-300 block mb-1 font-semibold">
            Synthesis: Threats to Internal & External Validity
          </span>
          <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
            {data.threatToValidity}
          </p>
        </div>

        {/* Open Research Questions */}
        <div>
          <div className="flex items-center gap-1.5 text-xs uppercase font-mono text-slate-500 tracking-wide mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            <span>Open Empirical & Theoretical Questions</span>
          </div>
          <ul className="space-y-1.5">
            {data.openResearchQuestions.map((q, idx) => (
              <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 pl-3 border-l border-slate-200 dark:border-slate-800 py-0.5">
                {q}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
