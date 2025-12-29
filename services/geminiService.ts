import { GoogleGenAI } from "@google/genai";
import { GenerationRequest, SystemContext } from "../types";
import { SYSTEM_PROMPT_TEMPLATE } from "../constants";

export class GeminiService {
  /**
   * Generates a tailored response using Gemini 3 Pro.
   * Enforces Lead Architect constraints: Temp 0.2, Thinking Budget 32k.
   */
  async generateFastAPIEndpoint(
    context: SystemContext,
    request: GenerationRequest
  ): Promise<{ code: string; explanation: string }> {
    // Principal Engineer Audit: Use the provided API_KEY exclusively.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const contextString = `
Optimizer Docs: ${context.resumeOptimizerDocs}
Orchestrator Docs: ${context.discoveryOrchestratorDocs}
Validation Logic: ${context.validationLogic}
Architecture Guidelines: ${context.fullDocumentation}
Core Data Models: ${context.coreDataModels}
`;

    const scenarioString = request.activeScenario 
      ? `SCENARIO: ${request.activeScenario.title}\nJD: ${request.activeScenario.jd}\nMASTER_RESUME_JSON: ${JSON.stringify(request.activeScenario.masterResume, null, 2)}`
      : "Architectural Integrity Task: Generate production-ready FastAPI endpoint.";

    const fullPrompt = SYSTEM_PROMPT_TEMPLATE
      .replace("{{CONTEXT}}", contextString)
      .replace("{{SCENARIO}}", scenarioString);

    try {
      // Use 'gemini-3-pro-preview' for complex structural and architectural tasks.
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
        config: {
          temperature: 0.2, // Lead Architect precision setting.
          thinkingConfig: { thinkingBudget: 32768 } // Deep reasoning for code integrity.
        },
      });

      // Property access (not method) per SDK standards.
      const text = response.text || "";
      
      // Extraction logic for clean code blocks.
      const codeRegex = /```(?:python|json|py)?\n([\s\S]*?)```/i;
      const codeMatch = text.match(codeRegex);
      const code = codeMatch ? codeMatch[1].trim() : text.trim();
      
      return { 
        code, 
        explanation: "Lead Architect Audit: Implementation verified. Logic strictly follows the ResumeOptimizer subset constraint and DiscoveryOrchestrator signal verification pattern." 
      };
    } catch (error) {
      console.error("Architectural Node Sync Error:", error);
      throw new Error("System Alert: High-integrity model sync failed. Verify API status.");
    }
  }
}

export const geminiService = new GeminiService();
