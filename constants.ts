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
  }
];

export const INTERVIEW_BRIEFS: Record<string, string[]> = {
  Anthropic: ["Bias Detection Evals", "Non-deterministic Testing", "Safety-First CI/CD"],
  Stripe: ["Idempotency Testing", "Financial Schema Evolution", "Scale & Latency Metrics"],
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
];

export const DEFAULT_SYSTEM_CONTEXT = {
  resumeOptimizerDocs: "Strict subset logic. No hallucination allowed.",
  discoveryOrchestratorDocs: "Direct API ingestion from T1 sources.",
  notificationServiceDocs: "Alerts for high-legitimacy signals.",
  loggingServiceDocs: "Audit trail for all modifications.",
  validationLogic: "Zero-Hallucination Lock (Subset check).",
  fullDocumentation: "Lead Architect System Specs 2025.",
  coreDataModels: "Pydantic based validation.",
};

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
`;

export const GHOST_JOB_DETECTOR_SOURCE = `
import requests
import re
from datetime import datetime, timedelta

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
`;

export const ARCHITECT_OPTIMIZER_ENDPOINT = `
import re
import logging
from typing import List, Dict, Any, Set, Optional
from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel, Field

# --- LEAD ARCHITECT ARCHITECTURE ---
# Documentation Reference: ResumeOptimizer & DiscoveryOrchestrator Modules

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("LeadArchitect.Optimizer")

app = FastAPI(
    title="Sentinel Architect: Recruitment Intelligence Node",
    description="High-integrity resume optimization node with zero-hallucination enforcement."
)

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
    hallucination_audit_passed: bool = True

class ResumeOptimizer:
    """
    Lead Architect implementation of the ResumeOptimizer class.
    Ensures that any generated content is a strict semantic subset of the Master Resume.
    """
    def __init__(self, master: MasterResume):
        self.master = master
        self.inventory = self._build_semantic_inventory()

    def _build_semantic_inventory(self) -> Set[str]:
        """Flatten master resume into a searchable token set for integrity checks."""
        source_text = [
            self.master.summary,
            " ".join(self.master.coreCompetencies),
            " ".join([exp.role for exp in self.master.experience]),
            " ".join([" ".join(exp.achievements) for exp in self.master.experience])
        ]
        # Regex to capture technical tokens including +, #, .
        tokens = re.findall(r'\\b[\\w\\d\\.\\-\\+#]{2,}\\b', " ".join(source_text).lower())
        return set(tokens)

    def validate_no_hallucinations(self, tailored_text: str) -> List[str]:
        """
        STRICT COMPLIANCE CHECK:
        Validates that every word in the tailored output exists in the master inventory.
        """
        tailored_tokens = set(re.findall(r'\\b[\\w\\d\\.\\-\\+#]{2,}\\b', tailored_text.lower()))
        # Filter out common stop words or prepositions if necessary, 
        # but for Lead Architect precision, we audit everything > 2 chars.
        violations = [t for t in tailored_tokens if t not in self.inventory]
        return violations

@app.post("/optimize-resume", response_model=DiffView)
async def optimize_resume(
    master: MasterResume = Body(..., description="The source of truth for all career tokens."),
    jd: JobDescription = Body(..., description="Target signal from DiscoveryOrchestrator.")
):
    """
    Principal Architect Endpoint: Generates a DiffView artifact.
    Orchestrates the intersection between JD requirements and Master Inventory.
    """
    logger.info(f"Initiating optimization for signal: {jd.id} ({jd.company})")
    
    optimizer = ResumeOptimizer(master)
    
    # 1. Identify Direct Token Intersection
    matches = [req for req in jd.requirements if req.lower() in optimizer.inventory]
    
    # 2. Architect the Tailored Summary (Simulated LLM call with strict subset rules)
    # In production, this prompt is sent to Gemini 3 Pro with Temp 0.2
    tailored_summary = (
        f"Senior Test Architect with verified mastery in {', '.join(matches[:5])}. "
        f"Extensive history in {master.experience[0].company} implementing quality gates."
    )
    
    # 3. Mandatory Hallucination Audit
    violations = optimizer.validate_no_hallucinations(tailored_summary)
    
    if violations:
        logger.error(f"Integrity Breach! Hallucination detected: {violations}")
        raise HTTPException(
            status_code=422, 
            detail={
                "error": "Semantic Integrity Breach", 
                "message": "AI attempted to inject unverified tokens into artifact.",
                "violating_tokens": violations
            }
        )
    
    # 4. Return the DiffView Object
    return DiffView(
        original_summary=master.summary,
        tailored_summary=tailored_summary,
        rationale=f"Successfully mapped {len(matches)} competencies from Master Source.",
        gaps_detected=[r for r in jd.requirements if r.lower() not in optimizer.inventory],
        hallucination_audit_passed=True
    )

# Reference: DiscoveryOrchestrator Class
# Usage in pipeline: ingest_signal -> audit_legitimacy -> optimize_resume -> release_artifact
`;
