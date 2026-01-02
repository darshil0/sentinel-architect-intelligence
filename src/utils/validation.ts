import { z } from 'zod';
import { JobMatch } from '@/types';

// Job injection validation schema
export const JobInjectionSchema = z.object({
  company: z.string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must not exceed 100 characters')
    .trim(),
  
  title: z.string()
    .min(3, 'Job title must be at least 3 characters')
    .max(150, 'Job title must not exceed 150 characters')
    .trim(),
  
  location: z.string()
    .min(2, 'Location must be at least 2 characters')
    .max(100, 'Location must not exceed 100 characters')
    .trim(),
  
  highlights: z.array(z.string()
    .min(2, 'Each skill must be at least 2 characters')
    .max(50, 'Each skill must not exceed 50 characters')
    .trim())
    .min(1, 'At least one skill/requirement is required')
    .max(20, 'Maximum 20 skills allowed'),
  
  salary: z.number()
    .min(30000, 'Salary must be at least $30,000')
    .max(500000, 'Salary must not exceed $500,000')
    .optional(),
  
  link: z.string()
    .url('Invalid job posting URL')
    .optional()
    .or(z.literal('')),
});

export type JobInjectionInput = z.infer<typeof JobInjectionSchema>;

// Resume parsing validation
export const MasterResumeSchema = z.object({
  personalInfo: z.object({
    name: z.string().min(2),
    role: z.string().min(3),
    location: z.string().min(2),
  }),
  summary: z.string().min(10).max(1000),
  coreCompetencies: z.array(z.string().min(2)).min(1),
  experience: z.array(z.object({
    company: z.string(),
    role: z.string(),
    period: z.string(),
    achievements: z.array(z.string()),
  })),
  education: z.string().min(5),
});

// Validation helper function
export const validateJobInjection = (data: unknown) => {
  try {
    const result = JobInjectionSchema.parse(data);
    return { success: true, data: result, errors: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        data: null,
        errors: error.flatten().fieldErrors,
      };
    }
    throw error;
  }
};

export const validateMasterResume = (data: unknown) => {
  try {
    const result = MasterResumeSchema.parse(data);
    return { success: true, data: result, errors: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        data: null,
        errors: error.flatten().fieldErrors,
      };
    }
    throw error;
  }
};
