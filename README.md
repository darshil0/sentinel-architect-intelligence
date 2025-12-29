# 🏗️ QA Career Intelligence: Architect Command Center

A high-integrity, automated system designed for **Senior SDETs** and **Test Architects** to orchestrate career growth through verified job signal discovery and zero-hallucination resume optimization.

## 🌟 Core Philosophy: "The Lead Architect Standard"
- **Integrity Lock**: Career artifacts are strictly generated as a semantic subset of the Master Source. We do not fabricate; we re-architect.
- **Signal Legitimacy**: Direct ingestion from Tier 1 (Greenhouse/Lever) syncs ensure that 100% of pursued opportunities are verified active.
- **Precision Engineering**: Leverages **Gemini 3 Pro** with a 32k thinking budget to ensure structural alignment and logic verification.

## 🚀 Key System Modules
1. **Ranked Signal Feed**: Real-time discovery across 4 tiers of legitimacy, with automated "Ghost Job" de-prioritization.
2. **Resume Optimizer (FastAPI Node)**: A high-precision endpoint enforcing strict token intersection between Job Descriptions and your Master Inventory.
3. **Compliance Hub**: Mandatory safety guardrails (PII Audit, Hallucination Lock) that must be cleared before artifact release.
4. **Scraper Lab**: A sandbox environment for auditing and simulating the Playwright-driven discovery agents.
5. **Architect Blueprints**: Direct access to the underlying Python source code and system master blueprints.

## 🛠️ Technical Stack
- **Frontend**: React 19, Tailwind CSS, TypeScript.
- **Intelligence**: Google Gemini 3 Pro (Principal Tier) @ Temperature 0.2.
- **Infrastructure Blueprint**: FastAPI (Python), Pydantic v2, PostgreSQL, Playwright.
- **Deployment**: Optimized for Railway (Backend) and Vercel (Frontend).

## 📄 System Documentation
- [System Architecture](SYSTEM_ARCHITECTURE.md) - Pipeline & Class definitions.
- [UI Specifications](UI_SPECIFICATIONS.md) - Visual language & UX patterns.
- [Deployment Guide](DEPLOYMENT_GUIDE.md) - Production scaling instructions.
- [Recruiter Strategy](RECRUITER_STRATEGY.md) - Persona-based engagement.
- [Test Cases](TEST_CASES.md) - System validation scenarios.

---

## 📝 Versioning and Changelog

### Version 1.1.0 (Latest)

- **Dependencies & Tooling:**
  - Updated all outdated dependencies to their latest stable versions.
  - Added `lint` and `test` scripts to `package.json` to enforce code quality and enable testing.
  - Configured ESLint with a new `eslint.config.js` file and added recommended rule sets.

- **Bug Fixes & Performance:**
  - Fixed React `key` prop warnings by adding unique and stable keys to all lists of elements.
  - Resolved various linter-flagged issues, including unused variables and `any` type casting.

- **Refactoring & Maintainability:**
  - Extracted the "Inject Signal" modal into its own reusable component (`InjectSignalModal.tsx`).
  - Replaced the `alert()` call in the `ComplianceFooter` component with a more user-friendly notification system.
  - Enhanced form handling in the "Inject Signal" modal by creating a reusable `useForm` hook.

- **Observability:**
  - Implemented a structured, client-side logging system using `pino-js` to provide detailed insight into application behavior, API calls, and state changes.

---
*Authorized for Lead Architect use only. All artifacts are compliance-locked and AI-verified.*
