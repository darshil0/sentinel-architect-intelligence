# Changelog

All notable changes to this project will be documented in this file.

## [0.5.0] - 2026-01-02

### 🚀 Major Release: Enterprise-Grade Stability & Security

This release focuses on production-readiness with comprehensive error handling, input validation, and security hardening. Test coverage increased to 70%+ with new test suites for critical components.

### Added
- **Error Boundary Component** (`src/components/ErrorBoundary.tsx`)
  - Gracefully handles React component crashes
  - Prevents full application failures
  - Beautiful recovery UI with system status information
  - Automatic error logging for debugging

- **Input Validation System** (`src/utils/validation.ts`)
  - Zod-based schema validation for job injections
  - Resume parsing validation with detailed error messages
  - Runtime type checking for data integrity
  - Field-level constraint enforcement (min/max length, URL format, salary ranges)

- **Custom Hooks Suite** (`src/hooks/useCustom.ts`)
  - `useLocalStorage<T>` - Type-safe persistent storage with optional expiration
  - `useDebounce<T>` - Debounced values for search and filter operations (default 500ms)
  - `useFetch<T>` - Fetch wrapper with automatic retry logic (configurable retries/delay), abort control
  - `useAsync<T, E>` - Generic async operation management with status tracking
  - `usePrevious<T>` - Track previous component values for change detection

- **Extended Test Coverage** (70%+)
  - `src/tests/DiffViewer.test.tsx` - 6 test cases covering hallucination detection, scroll sync, empty content
  - `src/tests/geminiService.test.ts` - 7 test cases for API error handling, retry logic, response parsing
  - `src/tests/ScraperEngine.test.tsx` - 9 test cases for agent simulation, tab switching, scheduler
  - Total: 22 new test cases across critical components

- **Server Health Monitoring**
  - New `GET /health` endpoint in `server/server.js`
  - Returns: status, timestamp, version, uptime, environment
  - Essential for deployment monitoring and load balancer integration

- **Enhanced Environment Configuration** (`.env.example`)
  - Detailed documentation for each variable
  - Security warnings for API key handling
  - Feature flags for analytics and offline mode
  - Log level configuration (debug|info|warn|error)

### Changed
- **Security Hardening - API Key Protection** ⚡ CRITICAL
  - Removed `GEMINI_API_KEY` and `API_KEY` from `vite.config.ts`
  - API key now exclusively server-side only
  - Client cannot access sensitive credentials
  - Prevents accidental credential leakage in bundles

- **Server Proxy Configuration**
  - Added Vite dev server proxy for `/api` routes
  - All API requests routed through backend proxy at `VITE_API_URL`
  - Centralized API endpoint management
  - Enables future authentication middleware integration

- **Index Entry Point** (`src/index.tsx`)
  - Wrapped `<App />` with `<ErrorBoundary>` at root level
  - Ensures all component errors are caught and handled gracefully

- **Package Dependencies**
  - Added `zod` ^3.22.4 for runtime schema validation and type inference
  - Enables type-safe validation with minimal runtime overhead

### Security
- ✅ Moved all API key handling to server-side only
- ✅ Client-side code never exposes credentials
- ✅ All requests proxied through backend for credential safety
- ✅ Input validation enforces constraints on all user data
- ✅ Error boundaries prevent information leakage in error messages

### Performance
- Error boundaries prevent full app crashes and restarts
- Debounce hook optimizes rapid search/filter operations
- Retry logic with exponential backoff for resilient API calls
- LocalStorage caching with optional expiration for reduced API calls

### Files Modified/Created
**New Files:**
- `src/components/ErrorBoundary.tsx` (95 lines)
- `src/hooks/useCustom.ts` (180 lines)
- `src/utils/validation.ts` (85 lines)
- `src/tests/DiffViewer.test.tsx` (75 lines)
- `src/tests/geminiService.test.ts` (120 lines)
- `src/tests/ScraperEngine.test.tsx` (110 lines)

**Modified Files:**
- `vite.config.ts` - Removed API key exports, added proxy config
- `src/index.tsx` - Added ErrorBoundary wrapper
- `server/server.js` - Added /health endpoint
- `package.json` - Added zod dependency, bumped to v0.5.0
- `.env.example` - Enhanced documentation
- `README.md` - Updated with v0.5.0 features and architecture

### Breaking Changes
- None - fully backward compatible

### Deprecations
- None

### Known Issues
- None reported

### Commit
- Hash: `b007216`
- Push Range: `e6fe3e7..b007216` → `origin/main`

---

## [0.4.1] - 2026-01-02

### Fixed
- **Type System Integrity**: Removed duplicate `EngineId` type definition in `ScraperEngine.tsx`. The type is now consistently imported from the centralized `@/types` module.
- **Docker Process Management**: Enhanced `Dockerfile` CMD configuration with proper background process handling (`& wait`).

### Technical Details
- Commit: `f28f4da` - "fix: resolve type imports and docker configuration"

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
- Added missing `JobStatus` type in `App.tsx`.
- Fixed missing `JobStatus` import in `App.tsx`.
