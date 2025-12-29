# 🏗️ SYSTEM_ARCHITECTURE.md
## QA Career Intelligence: Architectural Specifications

### 1. Data Ingestion & Signal Processing
The system employs a multi-tiered ingestion strategy to eliminate market noise.

- **DiscoveryOrchestrator (Class)**:
    - **Tier 1 (Direct)**: Native Greenhouse/Lever API sync. Guaranteed high-intent signals.
    - **Tier 2 (Partner)**: Niche community feeds and referral-only boards.
    - **Tier 3 (Aggregator)**: LinkedIn/Dice streams with secondary AI legitimacy filtering.
    - **Tier 4 (Organic)**: Automated discovery via Playwright-driven ATS scrapers.
- **Signal Legitimacy Auditor**: Every job is assigned a score (0.0 - 1.0). Signals below 0.7 are quarantined.

### 2. The ResumeOptimizer Node
A Python-based FastAPI service that acts as the primary tailoring engine.

- **The Subset Constraint**: Enforces `Tailored_Artifact ⊆ Master_Inventory`. 
- **validate_no_hallucinations (Method)**:
    - Normalizes Master Resume into a semantic token set (Tools, Skills, Achievements).
    - Tokenizes AI output and audits for any token NOT present in the master set.
    - Triggers a 422 Integrity Breach if fabrication is detected.
- **Semantic Mapping**: Uses Gemini 3 Pro to prioritize existing proof points that match the Job Description requirements without adding new ones.

### 3. Pipeline Flow
1. **Ingest**: `DiscoveryOrchestrator` fetches and validates signals.
2. **Select**: User selects a verified "Active Signal" from the dashboard.
3. **Optimize**: `ResumeOptimizer` generates a diff-view artifact.
4. **Audit**: System runs a real-time "Hallucination Lock" scan.
5. **Approve**: User clears compliance checks in the `ComplianceHub`.
6. **Release**: Artifact is released for submission.

---
*Blueprint Version: 2025.2.0-STABLE*