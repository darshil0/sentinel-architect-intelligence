# Changelog

All notable changes to this project will be documented in this file.

## [0.7.0] - 2026-01-02

### 🛡️ Major Release: Production Architecture & Security

A comprehensive stabilization release focusing on security hardening, type integrity, and codebase organization. This release consolidates recent patches into a unified production-ready standard.

### Security & Architecture
- **Secret Isolation**: Enforced strict server-side management of `GEMINI_API_KEY`. Removed misleading client-side type definitions to ensure zero credential leakage.
- **Modular Organization**: Refactored core definitions into dedicated `src/types` and `src/constants` modules.
- **Project Hygiene**: Removed redundant root directories and transient patch artifacts to align with clean scaffolding standards.

### Reliability & Quality
- **Test Hardening**: Expanded test suite to cover edge cases (malformed AI responses, storage corruption) and fixed mocking infrastructure (`vi.global` -> `global`).
- **Runtime Guardrails**: Implemented defensive null-checks in `GeminiService` preventing crashes from empty or malformed model candidates.
- **Type Integrity**: Enforced strict TypeScript Enums across UI components (`InjectSignalModal`, `JobCard`) for deterministic state management.

## [0.6.0] - 2026-01-02

### 🚀 Major Release: Modern Minimalist UI Redesign

Complete visual overhaul featuring a modern, minimalist design language with glassmorphism effects and mobile-first responsiveness.

### Added
- **Glassmorphism Design System**: Custom backdrop-blur utilities, translucent panels, and refined spacing.
- **Light Theme Transformation**: Transitioned from dark mode to a professional Cyan/Blue/White palette.
- **Mobile responsiveness**: Adaptive layouts for `JobCard`, `ScraperEngine`, and navigation.

### Changed
- **Component Styling**: Updated all core components (`JobCard`, `DiffViewer`, `ScoreBreakdown`) to align with the new light theme.
- **Animation Suite**: Integrated `framer-motion` for fluid tab and modal transitions.

## [0.5.0] - 2026-01-02

### 🚀 Major Release: Enterprise Stability

Focus on error handling, input validation, and system resilience.

### Added
- **Error Boundaries**: Graceful React component failure handling.
- **Zod Validation**: Runtime schema enforcement for all data inputs.
- **Custom Hooks**: `useLocalStorage`, `useDebounce`, `useFetch` for robust logic reuse.
- **Health Check**: `/health` endpoint for deployment monitoring.

### Changed
- **Proxy Architecture**: Centralized all API requests through Vite proxy to protecting backend endpoints.

---

*For older changes, please refer to the git commit history.*
