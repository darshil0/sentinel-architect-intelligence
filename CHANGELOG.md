# Changelog

All notable changes to this project will be documented in this file.

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
