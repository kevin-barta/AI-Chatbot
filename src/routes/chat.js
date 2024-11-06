import express from 'express';
import { openai } from '../services/openai.js';

const router = express.Router();

router.post('/message', async (req, res) => {
  try {
    const { message } = req.body;
    
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "gpt-3.5-turbo", 
      max_tokens: 1000
    });

    const response = completion.choices[0].message.content;
    res.json({ response });
  } catch (error) {
    console.error('OpenAI API Error:', error.message);
    res.status(500).json({ 
      message: 'Error processing your message.',
      details: error.message 
    });
  }
});

export default router;