# 🛡️ QA Career Intelligence: Architect Command Center

A high-integrity Career Intelligence System designed for Senior QA professionals. Featuring a multi-tier discovery orchestrator and zero-hallucination resume optimization powered by Gemini AI.

![Premium Design](https://img.shields.io/badge/Design-Architect--Tier-emerald)
![AI Model](https://img.shields.io/badge/AI-Gemini--2.0--Flash-blue)
![Quality](https://img.shields.io/badge/Quality-Enforced-success)

- **Resume-Job Description Diffing**: Visually compare your master resume against a job description to identify gaps and areas for improvement.
- **AI-Powered Optimization**: Utilize the Gemini API to generate optimized resume artifacts tailored to specific job requirements.
- **Job Application Tracking**: Manage your job application pipeline with a Kanban board, tracking your progress from discovery to offer.
- **Signal Injection**: Easily add new job opportunities (signals) to your dashboard for tracking and optimization.
- **Automated Agent Scheduling**: Schedule and automate job scraper agents to run at specific intervals, ensuring a continuous flow of new opportunities.

- **💎 High-Integrity Diffing**: Direct comparison between your Master Profile and target Job Descriptions with real-time gap analysis.
- **⚡ Zero-Hallucination Optimization**: Tailor your resume using the Architect-Tier optimizer that enforces a strict token-intersection guardrail.
- **📥 Master Source Ingestion**: Integrated module to upload PDFs or paste raw resume text for automated Gemini-driven structural parsing.
- **📊 Intelligence Kanban**: Manage your career pipeline through a specialized command board (Discovery → Offer).
- **📡 Stale Signal Recovery**: AI-driven follow-up orchestration for applications that have exceeded the 7-day response threshold.
- **💾 Local Persistence**: High-integrity synchronization with browser storage ensuring your signals and profile data persist across sessions.
- **🧬 Signal Injection**: Manual entry for high-value job signals with automated legitimacy auditing.
- **🧪 Scraper Lab**: Sandbox environment for simulating and managing job discovery agents.

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express
- **AI Integration**: Google Gemini API
- **Linting**: ESLint
- **Testing**: Playwright

- **Frontend**: React 19 + TypeScript + Tailwind CSS 4.0 (Custom Glassmorphism Design System)
- **Backend**: Node.js v20 (ES Modules) + Express 5.0
- **Brain**: Google Gemini AI (1.5 Pro & 2.0 Flash)
- **Monitoring**: Structured Architect-Tier Logger
- **Quality**: Vitest (Unit) + Playwright (E2E)
- **Pipeline**: GitHub Actions CI

## 🏁 Deployment Protocol

### Prerequisites

- **Node.js**: v20.x or higher
- **API Key**: A valid Google Gemini API Key

### Installation

1.  **Clone the Command Center:**
    ```bash
    git clone https://github.com/darshil0/sentinel-architect-intelligence.git
    cd sentinel-architect-intelligence
    ```

2.  **Initialize Environment:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file:
    ```env
    GEMINI_API_KEY=your_key_here
    VITE_API_URL=http://localhost:3001
    ```

4.  **Launch Systems:**
    Terminal 1 (Backend):
    ```bash
    npm run server
    ```
    Terminal 2 (Frontend):
    ```bash
    npm run dev
    ```

## 🏗️ Project Architecture

The Architect Command Center follows a production-grade decoupled architecture:

- `src/`: Core frontend implementation including React components, custom hooks, and types.
  - `components/`: Modular UI units (Glassmorphism design system).
  - `hooks/`: Centralized state and form logic (`useAppState`, `useForm`).
  - `services/`: AI and logging orchestrators.
- `server/`: Express.js backend for secure AI model communication and rate limiting.
- `e2e/`: End-to-end verification suite powered by Playwright.
- `src/tests/`: High-integrity unit and component audit suite.

This structure leverages **Absolute Path Aliasing** (`@/`) for scalable and maintainable module resolution.

## 🧪 Quality Audit

- **Error Handling**: While some error handling is in place, it can be improved to provide more granular feedback to the user.
- **Incomplete CI/CD**: The project lacks a continuous integration and deployment pipeline, which is essential for maintaining code quality and automating releases.
- **No Versioning and Changelog**: A formal versioning system and changelog are needed to track fixes, new features, and breaking changes.
- **Absence of a Logger**: There is no structured logger to record important events and errors, which makes debugging and monitoring more difficult.

## 📜 Archives

- **Changelog**: See [CHANGELOG.md](./CHANGELOG.md) for the Architect’s record of updates.
- **Components**: UI powered by custom glass panels and emerald-core gradients.

## ⚖️ License

Architect Command Center is distributed under the MIT License.
