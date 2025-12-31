import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Architect System Security: Rate limiting to prevent API budget depletion
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { error: 'Architectural System Alert: Too many requests from this endpoint. Please wait for the sync window to reset.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Support larger resume base64 payloads

// Middleware to check for API key
app.use((req, res, next) => {
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
  }
  next();
});

app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Generation Error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to generate content',
      details: error.response?.data?.error?.message || error.message
    });
  }
});

app.post('/api/parse', async (req, res) => {
  try {
    const { parts } = req.body;
    if (!parts || !Array.isArray(parts)) {
      return res.status(400).json({ error: 'Parts array is required' });
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts }],
        generationConfig: {
          response_mime_type: 'application/json',
        },
      }
    );

    const text = response.data.candidates[0].content.parts[0].text;

    // Architect Resilience: Clean and parse the response
    try {
      // Remove potential markdown code blocks if the model ignored instructions
      const cleanJSON = text.replace(/```json\n?|```/g, '').trim();
      res.json(JSON.parse(cleanJSON));
    } catch (parseError) {
      console.error('Architectural Sync Error: Malformed JSON from model:', text);
      res.status(500).json({
        error: 'System Integrity Breach: Malformed data received from AI model.',
        details: 'The structural mapping failed due to non-standard response format.'
      });
    }
  } catch (error) {
    console.error('Parsing Error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to parse resume',
      details: error.response?.data?.error?.message || error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

