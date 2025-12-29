const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

app.post('/api/parse', async (req, res) => {
  try {
    const { parts } = req.body;
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts }],
        generationConfig: {
          response_mime_type: 'application/json',
        },
      }
    );
    res.json(JSON.parse(response.data.candidates[0].content.parts[0].text));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to parse resume' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
