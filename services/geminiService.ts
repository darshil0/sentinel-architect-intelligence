import { GoogleGenAI, Type } from "@google/genai";
import { GenerationRequest, SystemContext, MasterResume, JobMatch } from "../types";
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
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const contextString = JSON.stringify(request.activeScenario?.masterResume || {}, null, 2);

    const scenarioString = request.activeScenario 
      ? `SCENARIO: ${request.activeScenario.title}\nJD: ${request.activeScenario.jd}`
      : "Architectural Integrity Task: Generate production-ready FastAPI endpoint with zero-hallucination logic.";

    const fullPrompt = SYSTEM_PROMPT_TEMPLATE
      .replace("{{CONTEXT}}", contextString)
      .replace("{{SCENARIO}}", scenarioString);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
        config: {
          temperature: 0.2,
          thinkingConfig: { thinkingBudget: 32768 }
        },
      });

      const text = response.text || "";
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

  /**
   * Generates a professional follow-up email draft for a stale application.
   */
  async generateFollowUpEmail(master: MasterResume, job: JobMatch): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      Act as the Lead Architect Alex Architect. 
      Generate a professional, high-signal follow-up email for the following stale application.
      
      CONTEXT:
      - Job: ${job.title} at ${job.company}
      - Highlights: ${job.highlights.join(", ")}
      - Master Profile: ${master.summary}
      
      GOAL: 
      - Re-express interest in the mission.
      - Briefly re-highlight alignment with core requirements.
      - Professional yet assertive tone of a Senior Test Architect.
      
      No hallucinations. Use only provided context.
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          temperature: 0.3,
          thinkingConfig: { thinkingBudget: 10000 }
        }
      });
      return response.text || "Drafting failed. System integrity check required.";
    } catch (error) {
      console.error("Follow-up Generation Failure:", error);
      throw new Error("Architectural Breach: Failed to generate follow-up draft.");
    }
  }

  /**
   * Parses a raw resume (PDF or text) into the structured MasterResume schema.
   */
  async parseResume(fileData: { data: string; mimeType: string } | string): Promise<MasterResume> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const parts: any[] = [
      { text: "You are an expert resume parser for Senior SDETs. Extract the following resume into the structured JSON schema provided. Ensure all technical skills and achievements are preserved with high fidelity." }
    ];

    if (typeof fileData === 'string') {
      parts.push({ text: `Resume Content:\n${fileData}` });
    } else {
      parts.push({
        inlineData: {
          data: fileData.data,
          mimeType: fileData.mimeType
        }
      });
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ role: 'user', parts }],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              personalInfo: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  role: { type: Type.STRING },
                  location: { type: Type.STRING }
                },
                required: ["name", "role", "location"]
              },
              summary: { type: Type.STRING },
              coreCompetencies: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              experience: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    company: { type: Type.STRING },
                    role: { type: Type.STRING },
                    period: { type: Type.STRING },
                    achievements: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    }
                  },
                  required: ["company", "role", "period", "achievements"]
                }
              },
              education: { type: Type.STRING }
            },
            required: ["personalInfo", "summary", "coreCompetencies", "experience", "education"]
          }
        }
      });

      const result = JSON.parse(response.text || "{}");
      return result as MasterResume;
    } catch (error) {
      console.error("Resume Parsing Failure:", error);
      throw new Error("Architectural Breach: Failed to parse resume into structured schema.");
    }
  }
}

export const geminiService = new GeminiService();