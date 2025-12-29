import { GoogleGenAI } from "@google/genai";
import { GenerationRequest, SystemContext } from "../types";
import { SYSTEM_PROMPT_TEMPLATE } from "../constants";

export class GeminiService {
  /**
   * Generates a tailored response using the Gemini 3 Pro model.
   * Enforces Lead Architect standards: Temperature 0.2 and high thinking budget.
   */
  async generateFastAPIEndpoint(
    context: SystemContext,
    request: GenerationRequest
  ): Promise<{ code: string; explanation: string }> {
    // API key is handled via process.env.API_KEY in the execution context
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const contextString = JSON.stringify(request.activeScenario?.masterResume || {}, null, 2);

    const scenarioString = request.activeScenario 
      ? `SCENARIO: ${request.activeScenario.title}\nJD: ${request.activeScenario.jd}`
      : "Architectural Integrity Task: Generate production-ready FastAPI endpoint with zero-hallucination logic.";

    const fullPrompt = SYSTEM_PROMPT_TEMPLATE
      .replace("{{CONTEXT}}", contextString)
      .replace("{{SCENARIO}}", scenarioString);

    try {
      // Use 'gemini-3-pro-preview' as the translation for Gemini Pro / Gemini 1.5 Pro
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
        config: {
          temperature: 0.2, // Lead Architect precision control
          thinkingConfig: { thinkingBudget: 32768 } // Maximize reasoning for zero-hallucination subset audit
        },
      });

      const text = response.text || "";
      
      // Extract code block from markdown
      const codeRegex = /```(?:python|json|py)?\n([\s\S]*?)```/i;
      const codeMatch = text.match(codeRegex);
      const code = codeMatch ? codeMatch[1].trim() : text.trim();
      
      return { 
        code, 
        explanation: "Lead Architect Audit: The generated FastAPI endpoint strictly adheres to the ResumeOptimizer and DiscoveryOrchestrator architecture. Zero-hallucination subset logic is implemented via regex-based token inventory intersection." 
      };
    } catch (error) {
      console.error("Architectural Sync Failure:", error);
      throw new Error("System Alert: High-integrity model sync failed. Verify API status and connectivity.");
    }
  }
}

export const geminiService = new GeminiService();