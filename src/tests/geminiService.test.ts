import { describe, it, expect, vi, beforeEach } from 'vitest';
import { geminiService } from '@/services/geminiService';
import { MasterResume, JobMatch } from '@/types';

const mockMasterResume: MasterResume = {
  personalInfo: {
    name: 'Test User',
    role: 'Senior SDET',
    location: 'Remote',
  },
  summary: 'Expert in test automation',
  coreCompetencies: ['Python', 'Pytest', 'FastAPI'],
  experience: [
    {
      company: 'Tech Corp',
      role: 'SDET',
      period: '2020-2023',
      achievements: ['Automated testing framework'],
    },
  ],
  education: 'BS Computer Science',
};

const mockJob: JobMatch = {
  id: 'job-1',
  title: 'Senior SDET',
  company: 'TestCorp',
  location: 'Remote',
  score: 9.5,
  legitimacy: 0.95,
  highlights: ['Python', 'FastAPI'],
  isRemote: true,
  postedDate: '2d ago',
  isVerified: true,
  sourceTier: 'Tier 1 - Direct',
  status: 'discovery',
};

describe('GeminiService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should be initialized correctly', () => {
    expect(geminiService).toBeDefined();
    expect(geminiService.generateFastAPIEndpoint).toBeDefined();
    expect(geminiService.generateFollowUpEmail).toBeDefined();
    expect(geminiService.parseResume).toBeDefined();
  });

  it('should handle API errors gracefully', async () => {
    vi.global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));

    try {
      await geminiService.generateFastAPIEndpoint(
        {
          resumeOptimizerDocs: '',
          discoveryOrchestratorDocs: '',
          notificationServiceDocs: '',
          loggingServiceDocs: '',
          validationLogic: '',
          fullDocumentation: '',
          coreDataModels: '',
        },
        {
          targetEndpoint: 'POST /test',
          requirements: [],
          temperature: 0.2,
        }
      );
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error instanceof Error).toBe(true);
    }
  });

  it('should extract code from markdown code blocks', async () => {
    const mockResponse = {
      candidates: [
        {
          content: {
            parts: [
              {
                text: '```python\ndef hello():\n    print("world")\n```',
              },
            ],
          },
        },
      ],
    };

    vi.global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await geminiService.generateFastAPIEndpoint(
      {
        resumeOptimizerDocs: '',
        discoveryOrchestratorDocs: '',
        notificationServiceDocs: '',
        loggingServiceDocs: '',
        validationLogic: '',
        fullDocumentation: '',
        coreDataModels: '',
      },
      {
        targetEndpoint: 'POST /test',
        requirements: [],
        temperature: 0.2,
      }
    );

    expect(result.code).toContain('def hello()');
  });

  it('should generate follow-up emails with context', async () => {
    const mockResponse = {
      candidates: [
        {
          content: {
            parts: [
              {
                text: 'Dear Hiring Manager,\nI remain very interested...',
              },
            ],
          },
        },
      ],
    };

    vi.global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const email = await geminiService.generateFollowUpEmail(mockMasterResume, mockJob);

    expect(email).toBeDefined();
    expect(email.length).toBeGreaterThan(0);
    expect(email).not.toContain('Drafting failed');
  });

  it('should handle resume parsing from text', async () => {
    const mockResponse = mockMasterResume;

    vi.global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const parsed = await geminiService.parseResume('Sample resume text');

    expect(parsed).toBeDefined();
    expect(parsed.personalInfo).toBeDefined();
    expect(parsed.coreCompetencies).toBeDefined();
  });

  it('should handle resume parsing from file data', async () => {
    const mockResponse = mockMasterResume;

    vi.global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const parsed = await geminiService.parseResume({
      data: 'base64EncodedPdfData',
      mimeType: 'application/pdf',
    });

    expect(parsed).toBeDefined();
    expect(parsed.experience).toBeDefined();
  });

  it('should throw error when API call fails', async () => {
    vi.global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    try {
      await geminiService.parseResume('Sample text');
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
