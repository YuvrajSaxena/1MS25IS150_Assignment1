import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '15mb' }));

  // Initialize Gemini SDK with User-Agent as required by Gemini API guidelines
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      hasApiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString(),
    });
  });

  // Main Deconstruct & Analyze Endpoint
  app.post('/api/analyze', async (req, res) => {
    try {
      const { paperText, analysisFocus } = req.body;

      if (!paperText || typeof paperText !== 'string' || paperText.trim().length < 20) {
        return res.status(400).json({
          error: 'Please paste a valid academic paper abstract or excerpt (at least 20 characters).',
        });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          error: 'GEMINI_API_KEY is not configured on the server. Please ensure an API key is selected in the Settings > Secrets panel.',
        });
      }

      const focusInstruction = analysisFocus 
        ? `Special Analysis Lens: Focus specifically on ${analysisFocus}.` 
        : 'Comprehensive balanced academic deconstruction.';

      const prompt = `You are a world-class Academic Research Paper Agent and Peer Reviewer.
Your mission is to perform a rigorous, objective, and intellectually honest deconstruction of the provided academic paper or abstract.
${focusInstruction}

Deconstruct the paper text into these 4 core analytical dimensions, plus academic paper metadata:

1. Paper Metadata:
   - title: Detected or accurately inferred paper title
   - authorsYear: Stated/inferred authors & publication year (e.g. "Vaswani et al. (2017)" or "Unspecified Authors")
   - domain: Scientific domain/subfield (e.g., Deep Learning / NLP, Synthetic Biology, Quantum Optics, Behavioral Finance)
   - readingTimeEstimate: Realistic time to read the full original paper

2. Core Hypothesis & Scope:
   - primaryHypothesis: The exact central proposition, thesis, or claim the authors set out to test or prove.
   - researchGap: The specific deficiency, benchmark plateau, or open dilemma in existing scientific literature addressed by this paper.
   - theoreticalGrounding: Key foundational theoretical frameworks, earlier algorithms, or domain paradigms on which this paper builds.
   - scopeAndAssumptions: 3-5 explicit boundaries, preconditions, operational assumptions, or constraints defined by the authors.

3. Methodology & Metrics:
   - architectureOrDesign: The experimental architecture, mathematical formulation, algorithm, or empirical procedure used.
   - datasetOrSample: Data sources, benchmark corpora, cohort size, synthetic vs real data, or experimental apparatus.
   - keyMetrics: 3-6 quantifiable metrics, empirical claims, equations, or comparative results (including metric name, reported value/claim, and baseline comparison).
   - reproducibilityRating: Strict assessment of technical reproducibility (e.g., "High - Full algorithmic pseudocode & hyperparameter tables provided", "Moderate - High-level equations given but preprocessing specifics missing", "Low - Proprietary data or vague implementation details").
   - validationApproach: Validation strategy (e.g., ablation study, cross-validation, double-blind randomized control, synthetic perturbation testing).

4. Critical Limitations:
   - acknowledgedByAuthors: Weaknesses or scope limitations explicitly conceded by the authors.
   - unaddressedVulnerabilities: 3-5 latent blindspots, edge cases, overfitting risks, compute bottlenecks, or confounding variables overlooked by the work.
   - threatToValidity: Synthesis of internal validity (biases, leakage) vs external validity (generalization across real-world distributions).
   - openResearchQuestions: 2-4 critical follow-up questions that future academic research must answer.

5. Executive Digest:
   - tlDr: Ultra-dense 2-3 sentence executive synopsis suitable for a Principal Investigator or Research Director.
   - keyTakeaway: The single most consequential breakthrough or empirical finding.
   - practicalApplication: How an engineering team, laboratory, or industry practitioner can immediately apply these results.
   - noveltyAssessment: Objective assessment of novelty (Incremental iteration, Architectural reframing, Foundational paradigm shift, or Negative empirical confirmation).

Paper Input:
"""
${paperText.slice(0, 50000)}
"""`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              paperMetadata: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  authorsYear: { type: Type.STRING },
                  domain: { type: Type.STRING },
                  readingTimeEstimate: { type: Type.STRING },
                },
                required: ['title', 'authorsYear', 'domain', 'readingTimeEstimate'],
              },
              coreHypothesisAndScope: {
                type: Type.OBJECT,
                properties: {
                  primaryHypothesis: { type: Type.STRING },
                  researchGap: { type: Type.STRING },
                  theoreticalGrounding: { type: Type.STRING },
                  scopeAndAssumptions: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                required: ['primaryHypothesis', 'researchGap', 'theoreticalGrounding', 'scopeAndAssumptions'],
              },
              methodologyAndMetrics: {
                type: Type.OBJECT,
                properties: {
                  architectureOrDesign: { type: Type.STRING },
                  datasetOrSample: { type: Type.STRING },
                  keyMetrics: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        metricName: { type: Type.STRING },
                        valueOrClaim: { type: Type.STRING },
                        comparisonBaseline: { type: Type.STRING },
                      },
                      required: ['metricName', 'valueOrClaim'],
                    },
                  },
                  reproducibilityRating: { type: Type.STRING },
                  validationApproach: { type: Type.STRING },
                },
                required: [
                  'architectureOrDesign',
                  'datasetOrSample',
                  'keyMetrics',
                  'reproducibilityRating',
                  'validationApproach',
                ],
              },
              criticalLimitations: {
                type: Type.OBJECT,
                properties: {
                  acknowledgedByAuthors: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  unaddressedVulnerabilities: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  threatToValidity: { type: Type.STRING },
                  openResearchQuestions: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                required: [
                  'acknowledgedByAuthors',
                  'unaddressedVulnerabilities',
                  'threatToValidity',
                  'openResearchQuestions',
                ],
              },
              executiveDigest: {
                type: Type.OBJECT,
                properties: {
                  tlDr: { type: Type.STRING },
                  keyTakeaway: { type: Type.STRING },
                  practicalApplication: { type: Type.STRING },
                  noveltyAssessment: { type: Type.STRING },
                },
                required: ['tlDr', 'keyTakeaway', 'practicalApplication', 'noveltyAssessment'],
              },
            },
            required: [
              'paperMetadata',
              'coreHypothesisAndScope',
              'methodologyAndMetrics',
              'criticalLimitations',
              'executiveDigest',
            ],
          },
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error('Empty response received from analysis model.');
      }

      const parsed = JSON.parse(responseText);
      res.json(parsed);
    } catch (error: any) {
      console.error('Paper analysis error:', error);
      res.status(500).json({
        error: error.message || 'An error occurred during paper analysis. Please check your text and try again.',
      });
    }
  });

  // Follow-up inquiry on the deconstructed paper
  app.post('/api/inquire', async (req, res) => {
    try {
      const { paperText, paperTitle, question } = req.body;

      if (!question || typeof question !== 'string') {
        return res.status(400).json({ error: 'Please provide a valid question.' });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: 'GEMINI_API_KEY is not configured.' });
      }

      const prompt = `You are the Academic Research Paper Agent reviewing "${paperTitle || 'the paper'}".
The researcher has asked a specific follow-up question regarding the methodology, mathematical foundations, or empirical claims:

Question: ${question}

Paper Context / Excerpt:
"""
${(paperText || '').slice(0, 30000)}
"""

Provide an exacting, technically rigorous answer cite-checking against the paper excerpt, highlighting assumptions, trade-offs, and empirical validity.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      res.json({ answer: response.text || 'No response generated.' });
    } catch (error: any) {
      console.error('Paper inquiry error:', error);
      res.status(500).json({
        error: error.message || 'Failed to process academic inquiry.',
      });
    }
  });

  // Serve static assets in production or Vite middleware in dev
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Academic Research Agent server listening at http://localhost:${port}`);
  });
}

startServer();
