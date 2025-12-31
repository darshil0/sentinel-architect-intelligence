import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

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
    res.json(JSON.parse(text));
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

