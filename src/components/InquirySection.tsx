import React, { useState } from 'react';
import { Send, HelpCircle, Bot, User, CornerDownRight } from 'lucide-react';

interface Props {
  paperTitle: string;
  paperText: string;
}

interface Message {
  role: 'user' | 'agent';
  content: string;
}

export const InquirySection: React.FC<Props> = ({ paperTitle, paperText }) => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  const suggestedQuestions = [
    'What are the primary hyperparameter choices and compute requirements?',
    'How does this approach compare to prior baselines under domain shift?',
    'Are there potential confounding variables in the experimental dataset?',
  ];

  const handleSend = async (qToSend?: string) => {
    const query = qToSend || question;
    if (!query.trim() || loading) return;

    setError(null);
    const userMsg: Message = { role: 'user', content: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!qToSend) setQuestion('');
    setLoading(true);

    try {
      const res = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paperTitle,
          paperText,
          question: query,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to process inquiry');
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'agent', content: data.answer }]);
    } catch (err: any) {
      setError(err.message || 'An error occurred while answering your inquiry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Agent Inquiry: Ask Specific Questions on "{paperTitle || 'This Paper'}"
            </h2>
            <p className="text-xs text-slate-500">
              Interrogate methodology nuances, baseline comparisons, or mathematical derivations.
            </p>
          </div>
        </div>
      </div>

      {/* Suggested quick queries */}
      {messages.length === 0 && (
        <div className="mt-4">
          <span className="text-xs uppercase font-mono text-slate-400 block mb-2">Suggested Inquiries:</span>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q)}
                disabled={loading}
                className="text-xs text-left px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 dark:text-slate-300 transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <CornerDownRight className="w-3 h-3 text-slate-400" />
                  <span>{q}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Conversation Thread */}
      {messages.length > 0 && (
        <div className="mt-4 space-y-4 max-h-96 overflow-y-auto pr-1">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3.5 rounded-lg text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 ml-4'
                  : 'bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 mr-4'
              }`}
            >
              <div className="flex items-center gap-2 mb-1 text-xs font-mono text-slate-500">
                {msg.role === 'user' ? (
                  <>
                    <User className="w-3.5 h-3.5" />
                    <span>Researcher</span>
                  </>
                ) : (
                  <>
                    <Bot className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>Academic Agent</span>
                  </>
                )}
              </div>
              <p className="whitespace-pre-line text-xs sm:text-sm">{msg.content}</p>
            </div>
          ))}

          {loading && (
            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 mr-4 text-xs font-mono text-slate-500 flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-slate-400 border-t-slate-800 dark:border-t-slate-200 rounded-full animate-spin" />
              <span>Analyzing paper context and formulating response...</span>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-3 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-700 dark:text-rose-300">
          {error}
        </div>
      )}

      {/* Input box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="mt-4 flex items-center gap-2"
      >
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a specific peer-review or methodological question..."
          disabled={loading}
          className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-400"
        />
        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
        >
          <Send className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Submit Inquiry</span>
        </button>
      </form>
    </div>
  );
};
