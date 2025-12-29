import { JobMatch, OutreachTemplate, MasterResume } from "./types";

export const MASTER_RESUME_JSON: MasterResume = {
  personalInfo: {
    name: "Alex Architect",
    role: "Senior SDET & Test Architect",
    location: "San Francisco, CA",
  },
  summary:
    "Senior Software Development Engineer in Test with 10+ years of experience building self-healing automation frameworks and AI-driven quality gates. Specialized in Python, FastAPI, and LLM evaluation benchmarks.",
  coreCompetencies: [
    "Python", "FastAPI", "Microservices", "Pytest", "LLM Evaluation", "BLEU", "ROUGE", "BERTScore", "Constitutional AI", "CI/CD", "GitHub Actions", "Jenkins", "AWS", "Kubernetes", "Locust", "Playwright", "Cypress",
  ],
  experience: [
    {
      company: "Frontier AI Systems",
      role: "Lead Test Architect",
      period: "2021 - Present",
      achievements: [
        "Architected an automated LLM evaluation pipeline reducing manual audit time by 75%.",
        "Developed custom Pytest plugins for non-deterministic output validation.",
        "Implemented strict semantic integrity checks for RAG-based systems.",
      ],
    },
    {
      company: "InfraScale Tech",
      role: "Senior SDET",
      period: "2017 - 2021",
      achievements: [
        "Reduced flaky test incidence by 40% through custom retry-logic.",
        "Scaled API testing suite to handle 10k+ requests per second.",
      ],
    },
  ],
  education: "M.S. in Computer Science, Stanford University",
};

export const MOCK_JOBS: JobMatch[] = [
  {
    id: "v10-001",
    title: "Senior SDET (AI Safety)",
    company: "Anthropic",
    location: "SF / Remote",
    score: 9.4,
    legitimacy: 0.98,
    highlights: ["Python", "LLM Evaluation", "Pytest"],
    isRemote: true,
    postedDate: "2d ago",
    isVerified: true,
    sourceTier: "Tier 1 - Direct",
    status: "discovery",
    personaHint: "frontier",
    proof: "Verified via Greenhouse API sync.",
    baseSalary: 210000,
  },
  {
    id: "v10-002",
    title: "QA Automation Lead",
    company: "Stripe",
    location: "Remote",
    score: 9.2,
    legitimacy: 0.99,
    highlights: ["Python", "FastAPI", "Playwright"],
    isRemote: true,
    postedDate: "1d ago",
    isVerified: true,
    sourceTier: "Tier 1 - Direct",
    status: "offer",
    personaHint: "infrastructure",
    proof: "Verified via Lever API sync.",
    baseSalary: 220000,
  },
  {
    id: "v10-003",
    title: "SDET II",
    company: "OpenAI",
    location: "SF",
    score: 8.8,
    legitimacy: 0.95,
    highlights: ["Python", "CI/CD", "Kubernetes"],
    isRemote: false,
    postedDate: "3d ago",
    isVerified: true,
    sourceTier: "Tier 1 - Direct",
    status: "tailoring",
    personaHint: "frontier",
    proof: "Verified via OpenAI Greenhouse instance.",
    baseSalary: 195000,
  }
];

export const INTERVIEW_BRIEFS: Record<string, string[]> = {
  Anthropic: ["Bias Detection Evals", "Non-deterministic Testing", "Safety-First CI/CD"],
  Stripe: ["Idempotency Testing", "Financial Schema Evolution", "Scale & Latency Metrics"],
  OpenAI: ["LLM Guardrails", "Evaluation Frameworks", "RAG Validation"],
  Default: ["Testing Framework Architecture", "Quality Guardrails", "Automation ROI"],
};

export const OUTREACH_TEMPLATES: OutreachTemplate[] = [
  {
    id: "follow-up-stale",
    title: "Signal Recovery",
    target: "Recruiter",
    persona: "standard",
    content: "Hi [Name], Following up on my [Job Title] application. I am still highly interested in [Company]'s mission...",
  },
  {
    id: "intro-new",
    title: "Targeted Introduction", 
    target: "Recruiter",
    persona: "frontier",
    content: "Hi [Name], Your [Job Title] role at [Company] caught my attention. I've architected LLM evaluation pipelines at Frontier AI...",
  }
];

export const DEFAULT_SYSTEM_CONTEXT = {
  resumeOptimizerDocs: "Strict subset logic. No hallucination allowed.",
  discoveryOrchestratorDocs: "Direct API ingestion from T1 sources.",
  notificationServiceDocs: "Alerts for high-legitimacy signals.",
  loggingServiceDocs: "Audit trail for all modifications.",
  validationLogic: "Zero-Hallucination Lock (Subset check).",
  fullDocumentation: "Lead Architect System Specs 2025.",
  coreDataModels: "Pydantic based validation.",
} as const;

export const SYSTEM_PROMPT_TEMPLATE = `
Act as the Lead Architect. Generate the production-ready FastAPI logic for the optimization endpoint.
CONSTRAINTS: 
- Use Temperature 0.2.
- Enforce validate_no_hallucinations (Tailored content MUST be a subset of the Master Resume inventory).

JD: {{SCENARIO}}
MASTER_RESUME: {{CONTEXT}}
`;

export const ARCHITECT_MASTER_BLUEPRINT = `
# LEAD ARCHITECT - SYSTEM MASTER BLUEPRINT 2025
# CORE: Zero-Hallucination SDET Recruitment Optimization
# AUTH: AI-VERIFIED TIER 1
` as const;

export const GHOST_JOB_DETECTOR_SOURCE = `
import requests
import re
from datetime import datetime, timedelta
from typing import Dict, Any

def audit_signal_integrity(description: str, posted_date: str) -> float:
    """
    Lead Architect Audit: Ghost Job Detection Logic.
    
    CRITERIA:
    1. Signal Age: Posts > 30 days are flagged.
    2. Buzzword Density: Overuse of "rockstar", "ninja", "family".
    3. Structural Depth: < 500 characters implies low-intent signal.
    """
    score = 1.0
    
    buzzwords = ['rockstar', 'ninja', 'superhero', 'guru', 'family']
    for word in buzzwords:
        if word in description.lower():
            score -= 0.15
            
    if len(description) < 500:
        score -= 0.3
        
    if 'month' in posted_date.lower() or '30+' in posted_date:
        score -= 0.5
        
    return max(0.0, score)
` as const;

export const ARCHITECT_OPTIMIZER_ENDPOINT = `
import re
import logging
from typing import List, Dict, Any, Set
from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel, Field

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("LeadArchitect")

app = FastAPI(title="QA Career Intelligence Optimizer", version="1.0.0")

class ExperienceEntry(BaseModel):
    company: str
    role: str
    period: str
    achievements: List[str]

class MasterResume(BaseModel):
    personalInfo: Dict[str, str]
    summary: str
    coreCompetencies: List[str]
    experience: List[ExperienceEntry]
    education: str

class JobDescription(BaseModel):
    id: str
    title: str
    company: str
    requirements: List[str]
    description: str

class DiffView(BaseModel):
    original_summary: str
    tailored_summary: str
    rationale: str
    gaps_detected: List[str]
    integrity_verified: bool = True

class ResumeOptimizer:
    def __init__(self, master: MasterResume):
        self.master = master
        self.inventory = self._build_inventory()

    def _build_inventory(self) -> Set[str]:
        components = [
            self.master.summary,
            " ".join(self.master.coreCompetencies),
            " ".join([exp.role for exp in self.master.experience]),
            " ".join([" ".join(exp.achievements) for exp in self.master.experience])
        ]
        full_text = " ".join(components).lower()
        return set(re.findall(r'\\b[\\w\\d\\.\\-\\+#]{3,}\\b', full_text))

    def validate_no_hallucinations(self, tailored_text: str) -> List[str]:
        tailored_tokens = set(re.findall(r'\\b[\\w\\d\\.\\-\\+#]{3,}\\b', tailored_text.lower()))
        return [t for t in tailored_tokens if t not in self.inventory]

@app.post("/optimize", response_model=DiffView)
async def optimize_resume(master: MasterResume = Body(..., embed=True), jd: JobDescription = Body(..., embed=True)):
    optimizer = ResumeOptimizer(master)
    matches = [req for req in jd.requirements if any(term in req.lower() for term in optimizer.inventory)]
    tailored = f"Architect with expertise in {', '.join(matches[:4])}. " + master.summary
    hallucinations = optimizer.validate_no_hallucinations(tailored)
    if hallucinations:
        raise HTTPException(status_code=422, detail={"error": "Hallucination Detected", "tokens": hallucinations})
    return DiffView(
        original_summary=master.summary,
        tailored_summary=tailed,
        rationale=f"Matched {len(matches)} competencies.",
        gaps_detected=[r for r in jd.requirements if not any(term in r.lower() for term in optimizer.inventory)],
        integrity_verified=len(hallucinations) == 0
    )
` as const;
