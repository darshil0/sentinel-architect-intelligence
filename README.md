# 🛡️ QA Career Intelligence: Architect Command Center

A high-integrity Career Intelligence System designed for Senior QA professionals. Featuring a multi-tier discovery orchestrator and zero-hallucination resume optimization powered by Gemini AI.

![Premium Design](https://img.shields.io/badge/Design-Architect--Tier-emerald)
![AI Model](https://img.shields.io/badge/AI-Gemini--2.0--Flash-blue)
![Quality](https://img.shields.io/badge/Quality-Enforced-success)

## 🚀 Core Intelligence Modules

- **💎 High-Integrity Diffing**: Direct comparison between your Master Profile and target Job Descriptions with real-time gap analysis.
- **⚡ Zero-Hallucination Optimization**: Tailor your resume using the Architect-Tier optimizer that enforces a strict token-intersection guardrail.
- **📤 Resilient Master Ingest**: Integrated module to upload PDFs with automated structural parsing and AI-driven cleaning.
- **📊 Intelligence Kanban**: Manage your career pipeline through a specialized command board with automated stale-signal detection.
- **📡 Stale Signal Recovery**: AI-driven follow-up orchestration for applications that have exceeded the 7-day response threshold.
- **💾 Local Persistence**: High-integrity synchronization with browser storage ensuring your signals and profile data persist across sessions.
- **🧬 Signal Injection**: Manual entry for high-value job signals with automated legitimacy auditing.
- **🧪 Scraper Lab**: Sandbox environment for simulating and managing job discovery agents.
- **✨ Fluid User Experience**: Premium motion-integrated interface with glassmorphic transitions and micro-interactions.

## 🛠️ Technical Arsenal

- **Frontend**: React 19 + TypeScript + Framer Motion (Premium Motion System)
- **Styling**: Tailwind CSS 4.0 (Custom Glassmorphism Design Language)
- **Backend**: Node.js v20 (ES Modules) + Express 5.0 (Resilience Layer)
- **Brain**: Google Gemini AI (1.5 Pro & 2.0 Flash)
- **Quality**: Vitest (Unit & Component) + Playwright (E2E)
- **DevEx**: Standardized Environment (.env.example) + VS Code Intelligence Suite

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
    ```bash
    cp .env.example .env
    # Edit .env with your GEMINI_API_KEY
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
  - `components/`: Modular UI units including specialized `JobCard` and `DiffViewer`.
  - `hooks/`: Centralized state and form logic (`useAppState`, `useForm`).
  - `services/`: AI orchestrators and structural loggers.
- `server/`: Express.js backend with built-in AI resilience and rate limiting.
- `e2e/`: End-to-end verification suite powered by Playwright.
- `src/tests/`: High-integrity unit and component audit suite (Target 100% core logic coverage).

This structure leverages **Absolute Path Aliasing** (`@/`) for scalable and maintainable module resolution.

## 🧪 Quality Audit

Execute the full verification suite (Architect tier):
```bash
npm test
```

## 📜 Archives

- **Changelog**: See [CHANGELOG.md](./CHANGELOG.md) for the detailed record of architectural iterations.
- **Design System**: UI powered by custom glass panels, emerald-core gradients, and fluid motion.

## ⚖️ License

Architect Command Center is distributed under the MIT License.
