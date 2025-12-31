# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Proper structured logger in `services/logger.ts`.
- Vitest for unit testing.
- Unit tests for the logger.
- GitHub Actions CI workflow.
- Missing `screening` status to the kanban board.

### Fixed
- `server.js` now uses ES modules to match `package.json`'s `"type": "module"`.
- Improved error handling in `server.js`.
- Fixed invalid package name in `package.json`.
- Removed shadowing `JobStatus` type in `App.tsx`.
- Fixed missing `JobStatus` import in `App.tsx`.
