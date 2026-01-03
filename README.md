# 🛡️ QA Career Intelligence: Architect Hub

> **System Status**: v0.7.0 (Stable) | Production Ready
> **Core Principle**: Zero-Hallucination Career Orchestration via Gemini 2.0 Flash.

A high-integrity Career Intelligence System designed for Senior QA professionals. Featuring a multi-tier discovery orchestrator, high-fidelity resume parsing, and an Architect-Tier optimizer that enforces reasonable token-intersection guardrails.

![Verdict](https://img.shields.io/badge/Verdict-Architect--Approved-emerald)
![Security](https://img.shields.io/badge/Security-Enforced-blue)
![Coverage](https://img.shields.io/badge/Coverage-70%25-success)

## 🚀 Core Intelligence Modules

- **💎 High-Integrity Diffing**: Direct comparison between Master Profile and Job Description with real-time gap analysis.
- **⚡ Zero-Hallucination Optimization**: Tailor resumes using an optimizer that adheres to strict truth constraints.
- **📤 Resilient Master Ingest**: Automated PDF parsing and markdown cleaning of raw resume data.
- **📡 Stale Signal Recovery**: AI-driven outreach orchestration for non-responsive applications (>7 days).
- **🧬 Signal Injection**: Manual entry protocol for high-value job signals with automated auditing.
- **🧪 Scraper Lab**: Sandbox environment for managing discovery agents (LinkedIn, Dice, Ghost Job Detector).

## 🛠️ Technical Arsenal

- **Frontend**: React 19, TypeScript, Framer Motion, Tailwind CSS 4.0.
- **Backend**: Node.js v20 (ESM), Express 5.0 (Resilience Layer).
- **Intelligence**: Google Gemini AI (1.5 Pro & 2.0 Flash).
- **Security**: Server-Side Secret Management (Proxy Architecture).
- **Quality**: Vitest (Unit), Playwright (E2E), Zod Validation.

## 🏗️ Project Architecture

The Architect Command Center follows a modular, domain-driven structure:

- `src/`: Core application logic using Absolute Path Aliasing (`@/`).
  - `components/`: Specialized UI units (`JobCard`, `ScraperEngine`, `DiffViewer`).
  - `hooks/`: Centralized state (`useAppState`) and custom logic (`useFetch`, `useLocalStorage`).
  - `services/`: AI orchestrators (`geminiService`) and structural loggers.
  - `types/`: Domain definitions and interfaces.
  - `constants/`: System-wide configuration and prompts.
  - `utils/`: Zod validation schemas and helpers.
  - `tests/`: Comprehensive verification suite.
- `server/`: Express backend with rate limiting and health checks.
- `e2e/`: Full-system verification scenarios.

## 🔒 Security Architecture (v0.7.0)

- **Secret Isolation**: `GEMINI_API_KEY` is strictly managed server-side. Zero client exposure.
- **Proxy Pattern**: All AI traffic routes through `/api` to mask credentials and enforce rate limits.
- **Runtime Safety**: Zod schemas validate all IO boundaries prevents injection or data corruption.
- **Crash Resilience**: Error Boundaries contain component failures to preserve system state.

## 🏁 Protocol: Deployment

1.  **Clone & Install**:
    ```bash
    git clone https://github.com/darshil0/sentinel-architect-intelligence.git
    cd sentinel-architect-intelligence
    npm install
    ```

2.  **Configure Environment**:
    ```bash
    cp .env.example .env
    # Set your GEMINI_API_KEY in .env (Server-side only)
    ```

3.  **Initiate Systems**:
    ```bash
    # Terminal 1: Backend Intelligence
    npm run server

    # Terminal 2: Architect Interface
    npm run dev
    ```

4.  **Verify Integrity**:
    ```bash
    npm test          # Run Unit/Integration Suite
    npm run test:e2e  # Run End-to-End Scenarios
    ```

## 📜 Version History

- **v0.7.0**: Security Hardening & Architecture Clean-up.
- **v0.6.0**: Modern Minimalist UI Redesign (Glassmorphism).
- **v0.5.0**: Enterprise Stability (Error Boundaries, Validation).

*See [CHANGELOG.md](./CHANGELOG.md) for detailed audit logs.*

## ⚖️ License

Distributed under the MIT License. architect-certified.
