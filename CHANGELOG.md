# Changelog

All notable changes to this project will be documented in this file.

## [0.4.0] - 2025-12-30

### Added
- **Architectural Reorganization**: Migrated all frontend source code to `src/` for better isolation.
- **Backend Decoupling**: Moved server logic to `server/` directory.
- **E2E Isolation**: Dedicated `e2e/` directory for Playwright test suites.
- **Path Aliasing**: Configured `@/` as the primary absolute path alias for cleaner, maintainable imports.
- **ESM Node Compliance**: Implemented static `__dirname` resolution in `vite.config.ts` for native ES modules.
- **Resilient AI Ingestion**: Added structural sanity checks and markdown cleaning logic for Gemini AI responses.
- **Portability Protocol**: Integrated `.env.example` template for standardized environment configuration.
- **Component Audit Suite**: Added component-level tests for `JobCard` to verify stale signal logic and UI state.
- **Developer Tooling**: Configured VS Code settings for seamless Tailwind CSS integration and linting.
- **Premium UX Polish**: Implemented fluid tab transitions and micro-interactions in `JobCard`.

### Changed
- Refactored all internal imports to leverage the new `@/` path alias system.
- Updated `package.json` scripts to reflect the new directory hierarchy.
- Optimized `tsconfig.json` with explicit inclusion/exclusion rules for better IDE performance.
- Fixed internal import references in services and hooks to match the new `src/` hierarchy.
- Incremented package version to `0.4.0`.

## [0.3.0] - 2025-12-30

### Added
- **Persistence Layer**: Implemented `localStorage` sync in `useAppState` for jobs and master profile.
- **Master Source Ingestion**: Integrated `ResumeParser` for PDF upload and raw text parsing via Gemini.
- **Security & Stability**: Added `express-rate-limit` to the backend to protect API budget.
- **Containerization**: Added `Dockerfile` and `docker-compose.yml` for simplified deployment.
- **Fluid UI**: Integrated `framer-motion` for animated tab transitions and improved UX.
- **Verification Suite**: Added unit tests for the architectural state machine (`useAppState`).

### Changed
- Increased server payload limits to 10MB to support high-fidelity resume parsing.
- Refined `App.tsx` layout to accommodate the new ingestion module.

## [0.2.0] - 2025-12-30

### Added
- Created `hooks/useAppState.ts` for centralized state management.
- Added global CSS design tokens and premium utility classes (glassmorphism, animations).
- Implemented `vite-env.d.ts` for better environment type support.

### Changed
- **UI Revamp**: Comprehensive overhaul of `App.tsx`, `JobCard.tsx`, `DiffViewer.tsx`, and `ScoreBreakdown.tsx` with a premium, high-integrity "Architect" aesthetic.
- **Codebase Refactoring**: Extracted complex business logic from components into custom hooks.
- Updated `README.md` to reflect the new feature set and architecture.

### Removed
- Removed redundant documentation files (`SYSTEM_ARCHITECTURE.md`, `TEST_CASES.md`, etc.) to clean up the repository.
- Removed unused `metadata.json`.

## [0.1.0] - 2025-12-30

### Added
- Initial fix for `server.js` (ES modules conversion).
- Implemented structured logging in `services/logger.ts`.
- Integrated `Vitest` for unit testing.
- Added GitHub Actions CI workflow.
 type in `App.tsx`.
- Fixed missing `JobStatus` import in `App.tsx`.
