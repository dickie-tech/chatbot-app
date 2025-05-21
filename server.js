require('dotenv').config(); // Load environment variables

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getGeminiResponse } = require('./services/gemini');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Fallback for simple responses
const getReply = (message) => {
  const msg = message.toLowerCase();

  if (msg.includes('hello') || msg.includes('hi')) {
    return 'Hello! How can I assist you today?';
  } else if (msg.includes('how are you')) {
    return "I'm doing great, thank you! How about you?";
  } else if (msg.includes('time')) {
    return `Current time is ${new Date().toLocaleTimeString()}`;
  } else if (msg.includes('date')) {
    return `Today's date is ${new Date().toLocaleDateString()}`;
  } else {
    return "I'm not sure how to respond to that.";
  }
};

// Chat route
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const geminiReply = await getGeminiResponse(message);
    const finalReply = geminiReply || getReply(message);
    res.json({ reply: finalReply });
  } catch (err) {
    console.error('Gemini API error:', err.message);
    res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
