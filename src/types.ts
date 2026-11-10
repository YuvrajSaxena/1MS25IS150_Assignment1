export interface PaperMetadata {
  title: string;
  authorsYear: string;
  domain: string;
  readingTimeEstimate: string;
}

export interface KeyMetric {
  metricName: string;
  valueOrClaim: string;
  comparisonBaseline?: string;
}

export interface CoreHypothesisAndScope {
  primaryHypothesis: string;
  researchGap: string;
  theoreticalGrounding: string;
  scopeAndAssumptions: string[];
}

export interface MethodologyAndMetrics {
  architectureOrDesign: string;
  datasetOrSample: string;
  keyMetrics: KeyMetric[];
  reproducibilityRating: string;
  validationApproach: string;
}

export interface CriticalLimitations {
  acknowledgedByAuthors: string[];
  unaddressedVulnerabilities: string[];
  threatToValidity: string;
  openResearchQuestions: string[];
}

export interface ExecutiveDigest {
  tlDr: string;
  keyTakeaway: string;
  practicalApplication: string;
  noveltyAssessment: string;
}

export interface PaperAnalysisResult {
  id?: string;
  timestamp?: number;
  rawPaperText?: string;
  paperMetadata: PaperMetadata;
  coreHypothesisAndScope: CoreHypothesisAndScope;
  methodologyAndMetrics: MethodologyAndMetrics;
  criticalLimitations: CriticalLimitations;
  executiveDigest: ExecutiveDigest;
}

export interface SamplePaper {
  id: string;
  title: string;
  authorsYear: string;
  domain: string;
  abstract: string;
  fullExcerpt: string;
}
