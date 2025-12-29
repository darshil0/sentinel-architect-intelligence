import { Scenario, JobMatch, OutreachTemplate, MasterResume } from "./types";

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
    status: "submitted",
    submissionDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
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
- Enforce the Zero-Hallucination Lock: The tailored artifact MUST be a strict semantic subset of the Master Resume inventory.
- Reference the DiscoveryOrchestrator for signal validation and the ResumeOptimizer for tailoring.

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
from typing import List, Dict, Set, Optional, Any
from fastapi import FastAPI, HTTPException, Body, status
from pydantic import BaseModel, Field

# --- LEAD ARCHITECT ARCHITECTURE ---
# Documentation Reference: Sentinel-QA-Architect-v1
# Logic: Zero-Hallucination Resume Optimization (Subset Enforcement)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("LeadArchitect.Optimizer")

app = FastAPI(
    title="QA Career Intelligence: Optimization Node",
    description="Principal endpoint for high-integrity SDET resume tailoring."
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

class DiscoveryOrchestrator:
    """
    Handles signal ingestion and validates recruitment intent.
    """
    @staticmethod
    def audit_signal(jd: JobDescription) -> float:
        """Assigns a legitimacy score based on technical depth and source."""
        if len(jd.requirements) < 3:
            return 0.4
        return 0.95

class ResumeOptimizer:
    """
    Principal Architect implementation for zero-hallucination tailoring.
    """
    def __init__(self, master: MasterResume):
        self.master = master
        self.inventory = self._build_semantic_inventory()

    def _build_semantic_inventory(self) -> Set[str]:
        """Flatten master resume into a searchable token set for integrity audit."""
        source_data = [
            self.master.summary,
            " ".join(self.master.coreCompetencies),
            " ".join([exp.role for exp in self.master.experience]),
            " ".join([" ".join(exp.achievements) for exp in self.master.experience])
        ]
        # Precise extraction of technical tokens including C++, .NET, FastAPI, etc.
        text_stream = " ".join(source_data).lower()
        return set(re.findall(r'\\b[\\w\\d\\.\\-\\+#]{2,}\\b', text_stream))

    def validate_no_hallucinations(self, tailored_text: str) -> List[str]:
        """
        STRICT COMPLIANCE CHECK:
        Returns all tokens in tailored_text that do NOT exist in the master inventory.
        """
        tailored_tokens = set(re.findall(r'\\b[\\w\\d\\.\\-\\+#]{2,}\\b', tailored_text.lower()))
        violations = [t for t in tailored_tokens if t not in self.inventory]
        return violations

@app.post("/optimize", response_model=DiffView, status_code=status.HTTP_200_OK)
async def optimize_endpoint(
    master: MasterResume = Body(..., description="The verified Master Source of Truth."),
    jd: JobDescription = Body(..., description="High-legitimacy job signal.")
):
    """
    Lead Architect Implementation: Generates a tailored artifact with subset enforcement.
    """
    logger.info(f"Initiating Architect Sync for {jd.company} | Signal: {jd.id}")
    
    # 1. Orchestration Phase: Signal Legitimacy Audit
    if DiscoveryOrchestrator.audit_signal(jd) < 0.7:
        raise HTTPException(status_code=400, detail="Low-integrity signal. Tailoring aborted.")

    optimizer = ResumeOptimizer(master)
    
    # 2. Optimization Phase: Token Intersection Analysis
    # Identify which JD requirements are verified in our Master Inventory
    intersection = [req for req in jd.requirements if req.lower() in optimizer.inventory]
    gaps = [req for req in jd.requirements if req.lower() not in optimizer.inventory]
    
    # 3. Tailoring Phase: Constructing the Subset Artifact
    # (In a real system, this logic is augmented by Gemini 3 Pro @ Temp 0.2)
    tailored_summary = (
        f"Senior SDET with verified mastery in {', '.join(intersection[:5])}. "
        f"Built high-scale automation at {master.experience[0].company} using a toolset derived "
        f"from your core requirements."
    )
    
    # 4. Mandatory Integrity Audit: Hallucination Lock
    violations = optimizer.validate_no_hallucinations(tailored_summary)
    if violations:
        logger.error(f"INTEGRITY BREACH: Model attempted fabrication. Violations: {violations}")
        raise HTTPException(
            status_code=422,
            detail={
                "error": "Semantic Integrity Breach",
                "violating_tokens": violations,
                "resolution": "Artifact regeneration required with stricter subset constraints."
            }
        )

    return DiffView(
        original_summary=master.summary,
        tailored_summary=tailored_summary,
        rationale=f"Successfully mapped {len(intersection)} competencies from Master Source.",
        gaps_detected=gaps,
        hallucination_audit_passed=True
    )
`;