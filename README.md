# 🛡️ QA Career Intelligence: Architect Hub

A high-integrity Career Intelligence System designed for Senior QA professionals. Featuring a multi-tier discovery orchestrator and zero-hallucination resume optimization powered by Gemini AI.

![Premium Design](https://img.shields.io/badge/Design-Modern--Minimalist-cyan)
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
- **Styling**: Tailwind CSS 4.0 (Modern Glassmorphism Design Language)
- **Backend**: Node.js v20 (ES Modules) + Express 5.0 (Resilience Layer)
- **Brain**: Google Gemini AI (1.5 Pro & 2.0 Flash)
- **Quality**: Vitest (Unit & Component) + Playwright (E2E) with 70%+ coverage
- **Security**: Zero-exposure API key architecture with server-side proxy
- **Validation**: Zod-powered runtime schema validation
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
  - `hooks/`: Centralized state and form logic (`useAppState`, `useForm`, custom hooks suite).
  - `services/`: AI orchestrators and structural loggers with error handling.
  - `utils/`: Validation schemas (Zod) and utility functions.
  - `tests/`: Comprehensive unit and integration tests with 70%+ coverage.
- `server/`: Express.js backend with built-in AI resilience, rate limiting, and health checks.
- `e2e/`: End-to-end verification suite powered by Playwright.

This structure leverages **Absolute Path Aliasing** (`@/`) for scalable and maintainable module resolution.

## 🔒 Security Architecture (v0.5.0+)

- **API Key Protection**: `GEMINI_API_KEY` is server-side only - never exposed to client
- **Proxy Architecture**: All API requests routed through backend for credential safety
- **Input Validation**: Zod schemas enforce data integrity on job injections and resumes
- **Error Boundaries**: Graceful component failure handling prevents full app crashes
- **Rate Limiting**: Built-in express-rate-limit protects API budget from abuse

## 🧪 Quality Audit

Execute the full verification suite (Architect tier):
```bash
npm test
```

Test coverage includes:
- **Unit Tests**: Core services and utilities (geminiService, validation, hooks)
- **Component Tests**: UI components with user interactions (JobCard, DiffViewer, ScraperEngine)
- **Integration Tests**: Full workflow scenarios and state management
- **E2E Tests**: Cross-browser testing with Playwright

**Current Coverage**: 70%+ of core logic

## 🔁 Continuous Integration

This repository includes a GitHub Actions workflow that runs unit and E2E tests on push/PR to `main`.

- Workflow: `.github/workflows/ci.yml` — installs dependencies, runs `vitest` unit tests, installs Playwright browsers, runs Playwright E2E tests, then builds the app.
- The workflow triggers automatically on pushes and pull requests to `main`.

To run the verification suite locally:
```bash
npm install
npm run test        # runs Vitest unit tests
npx playwright install --with-deps
npm run test:e2e    # runs Playwright E2E tests
```

New edge-case tests were added to harden behavior against malformed AI responses, corrupted localStorage entries, rapid user interactions, and rendering edge conditions. See `src/tests/` for `*.edgecases.test.*` files or apply the provided patch `add-edgecase-tests.patch`.

## 🏥 Health Monitoring

The backend exposes a health check endpoint for deployment verification:
```bash
curl http://localhost:3001/health
```

Response includes:
- System status (healthy/degraded)
- Uptime and version information
- Environment configuration

## 📜 Archives

- **Changelog**: See [CHANGELOG.md](./CHANGELOG.md) for the detailed record of architectural iterations.
- **Design System**: UI powered by custom glass panels, emerald-core gradients, and fluid motion.

## ✨ Latest Features (v0.6.0)

- **Modern Minimalist UI**: Complete redesign with light theme, glassmorphism effects, and cyan/blue color palette
- **Enhanced Spacing & Responsiveness**: Improved margin, padding, and mobile-first responsive design
- **Glassmorphism Design Language**: Premium backdrop-blur effects and translucent panels throughout
- **Error Boundary Component**: Gracefully handles component crashes with recovery UI
- **Custom Hooks Suite**: `useLocalStorage`, `useDebounce`, `useFetch`, `useAsync`, `usePrevious`
- **Input Validation**: Zod-powered schemas for job injections and resume validation
- **Extended Tests**: DiffViewer, GeminiService, and ScraperEngine comprehensive test suites
- **Health Check Endpoint**: `/health` for monitoring and deployment verification
- **Security Hardened**: API key moved to server-side only with proxy architecture

## 📋 Recent Fixes (v0.4.1)

- **Type System Integrity**: Resolved duplicate `EngineId` type definition in `ScraperEngine.tsx`
- **Docker Containerization**: Enhanced `Dockerfile` with proper background process management

## ⚖️ License

Architect Command Center is distributed under the MIT License.
