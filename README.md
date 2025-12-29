# QA Career Intelligence: Architect Command Center

This project is a sophisticated tool designed to help QA professionals manage their careers by optimizing resumes, tracking job applications, and leveraging AI to gain a competitive edge.

## Core Features

- **Resume-Job Description Diffing**: Visually compare your master resume against a job description to identify gaps and areas for improvement.
- **AI-Powered Optimization**: Utilize the Gemini API to generate optimized resume artifacts tailored to specific job requirements.
- **Job Application Tracking**: Manage your job application pipeline with a Kanban board, tracking your progress from discovery to offer.
- **Signal Injection**: Easily add new job opportunities (signals) to your dashboard for tracking and optimization.

## Technical Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express
- **AI Integration**: Google Gemini API
- **Linting**: ESLint
- **Testing**: Vitest (to be implemented)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Google Gemini API key

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add your Gemini API key and the API URL:

    ```
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

## Known Issues

- **Missing Tests**: The project currently lacks a comprehensive test suite. Adding unit, integration, and end-to-end tests is a high priority.
- **Error Handling**: While some error handling is in place, it can be improved to provide more granular feedback to the user.
- **Incomplete CI/CD**: The project lacks a continuous integration and deployment pipeline, which is essential for maintaining code quality and automating releases.
- **No Versioning and Changelog**: A formal versioning system and changelog are needed to track fixes, new features, and breaking changes.
- **Absence of a Logger**: There is no structured logger to record important events and errors, which makes debugging and monitoring more difficult.

## Contributing

Contributions are welcome! If you'd like to help improve the Architect Command Center, please feel free to fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
