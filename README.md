# QA Career Intelligence: Architect Command Center

This project is a sophisticated tool designed to help QA professionals manage their careers by optimizing resumes, tracking job applications, and leveraging AI to gain a competitive edge.

## Core Features

- **Resume-Job Description Diffing**: Visually compare your master resume against a job description to identify gaps and areas for improvement.
- **AI-Powered Optimization**: Utilize the Gemini API to generate optimized resume artifacts tailored to specific job requirements with zero-hallucination guardrails.
- **Job Application Tracking**: Manage your job application pipeline with a full-lifecycle Kanban board (Discovery, Tailoring, Submitted, Screening, Interview, Offer).
- **Stale Signal Recovery**: Automatically detect stale applications (7+ days since submission) and generate high-signal AI follow-up drafts.
- **Signal Injection**: Easily add new job opportunities (signals) to your dashboard for tracking and optimization.
- **Scraper Lab**: A sandbox environment for simulating and managing job discovery agents (LinkedIn, Dice, Ghost Detector).

## Technical Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express (ES Modules)
- **AI Integration**: Google Gemini API (Pro and Flash models)
- **Logging**: Custom structured Logger with level-based filtering and context support.
- **Testing**: Vitest, React Testing Library, Playwright
- **CI/CD**: GitHub Actions for automated build and test verification.

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- A Google Gemini API key

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/darshil0/sentinel-architect-intelligence.git
    cd sentinel-architect-intelligence
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add your Gemini API key and the API URL:

    ```env
    GEMINI_API_KEY=your_gemini_api_key
    VITE_API_URL=http://localhost:3001
    ```

4.  **Run the application:**

    In one terminal, start the backend server:

    ```bash
    node server.js
    ```

    In another terminal, start the frontend development server:

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:3000`.

## Testing

Run the unit test suite using Vitest:

```bash
npm test
```

## Maintenance

- **Changelog**: See [CHANGELOG.md](./CHANGELOG.md) for a detailed history of changes.
- **Architecture**: Refer to [SYSTEM_ARCHITECTURE.md](./SYSTEM_ARCHITECTURE.md) for deep-dive technical specs.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

