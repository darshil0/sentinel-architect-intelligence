
export type JobStatus = 'discovery' | 'tailoring' | 'submitted' | 'screening' | 'interview' | 'offer';
export type OutreachPersona = 'standard' | 'frontier' | 'infrastructure';
export type EquityType = 'RSUs' | 'Options' | 'Performance-RSUs';
export type SourceTier = 'Tier 1 - Direct' | 'Tier 2 - Partner' | 'Tier 3 - Aggregator' | 'Tier 4 - Organic';

export interface MasterResume {
  personalInfo: {
    name: string;
    role: string;
    location: string;
  };
  summary: string;
  coreCompetencies: string[];
  experience: {
    company: string;
    role: string;
    period: string;
    achievements: string[];
  }[];
  education: string;
}

export interface SystemContext {
  resumeOptimizerDocs: string;
  discoveryOrchestratorDocs: string;
  notificationServiceDocs: string;
  loggingServiceDocs: string;
  validationLogic: string;
  fullDocumentation: string;
  coreDataModels: string;
}

export interface Scenario {
  id: string;
  title: string;
  jd: string;
  resumeSummary: string; // Keep for backward compatibility or simple views
  masterResume: MasterResume;
  expectedGaps: string[];
}

export interface GenerationRequest {
  targetEndpoint: string;
  requirements: string[];
  temperature: number;
  activeScenario?: Scenario;
}

export interface JobMatch {
  id: string;
  title: string;
  company: string;
  location: string;
  score: number;
  legitimacy: number; 
  highlights: string[];
  isRemote: boolean;
  postedDate: string;
  isVerified: boolean;
  sourceTier: SourceTier;
  sourcePlatform?: string;
  salaryRange?: string;
  status: JobStatus;
  submissionDate?: string;
  recruiterName?: string;
  recruiterTitle?: string;
  personaHint?: OutreachPersona;
  proof?: string;
  // Compensation
  baseSalary?: number;
  equityAmount?: number;
  equityType?: EquityType;
  signOnBonus?: number;
}

export interface OutreachTemplate {
  id: string;
  title: string;
  content: string;
  target: string;
  persona: OutreachPersona;
}
