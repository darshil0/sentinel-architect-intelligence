# 🎨 UI_SPECIFICATIONS.md
## Architect Command Center: Interface & UX Guidelines

### 1. Visual Language: "Obsidian Depths"
- **Background**: `#0f172a` (Primary), `#0b1120` (Card/Inlay).
- **Accents**: 
    - **Emerald-500**: "Stable Sync" / Valid signals.
    - **Blue-400**: "Verified Data" / API Sync status.
    - **Rose-500**: "Hallucination Alert" / Critical Integrity Breach.
- **Typography**: Inter (UI), Fira Code (Data/Monospace).

### 2. Layout Architecture
- **Fixed-Terminal Feel**: The dashboard is a non-scrolling viewport with internal scroll areas for a professional "Mission Control" aesthetic.
- **3-Column Grid**:
    - **Column 1 (Signals)**: Ranked feed with Tiered badges and mono-spaced scores.
    - **Column 2 (Editor)**: Split-pane DiffViewer with synchronous scrolling.
    - **Column 3 (Intelligence)**: Semantic integrity scores and signal metadata.

### 3. Interactive UX Patterns
- **Hallucination Highlighting**: Words in the tailored output that fail the Master Inventory intersection check are highlighted in `rose-500` with a hoverable risk tooltip.
- **Compliance Lock**: The "Release Artifact" button remains in a disabled state until 3 mandatory safety checkboxes are toggled, ensuring human-in-the-loop validation.
- **Tab Transitions**: Fast, declarative tab switching between Dashboard, Kanban, and the Scraper Lab.

### 4. Components
- **JobCard**: High-density metadata including legitimacy proof and source tiers.
- **ScoreBreakdown**: Visualization of keyword vector and infrastructure fit.
- **TerminalConsole**: Real-time logging of scraper simulations in the Scraper Lab.

---
*Aesthetics Priority: High-Density Information, Low Visual Clutter.*