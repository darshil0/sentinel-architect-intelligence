# 🧪 TEST_CASES.md
## QA Career Intelligence: System Validation Scenarios

### Case 1: The "Hallucination Lock" (High Priority)
- **Input**: Master Resume (Python expert), JD (Requires Ruby on Rails).
- **Process**: Run `handleOptimize`.
- **Expected Result**: System identifies "Ruby" as a gap. If the model attempts to include "Ruby" in the tailored summary, the `DiffViewer` must highlight it in **Rose-500**.
- **Pass Criteria**: `ResumeOptimizer` method `validate_no_hallucinations` returns a non-empty list.

### Case 2: Ghost Job Signal Filtering
- **Input**: LinkedIn posting with keywords "Urgent Rockstar Ninja" and age "Posted 45 days ago".
- **Expected Result**: `DiscoveryOrchestrator` assigns legitimacy score < 0.4.
- **Visual**: JobCard is filtered out from the default "Active Signals" view.

### Case 3: Blueprint Sync
- **Action**: Modify `MASTER_RESUME_JSON` in the Blueprints tab.
- **Expected Result**: Inventory count in header updates immediately. Dashboard tailoring reflects the updated inventory.

### Case 4: Scraper Lab Simulation
- **Action**: Run the "Ghost Detector" agent in the Scraper Lab.
- **Expected Result**: Console logs show a negative penalty for "rockstar" buzzwords and signal age. Final status: "Quarantined."

---
*Test Status: 100% Automated Coverage Recommended.*