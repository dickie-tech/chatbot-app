const axios = require('axios');

const API_KEY = process.env.GENERATIVE_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/text-bison-001:generateText';

async function getGeminiResponse(userMessage) {
  try {
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        prompt: {
          text: userMessage
        },
        temperature: 0.4,
        maxOutputTokens: 500,
        topP: 1,
        topK: 40
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    const reply = response.data?.candidates?.[0]?.output || "Sorry, I couldn't generate a response.";
    return reply;
  } catch (error) {
    console.error('Error calling Generative API:', error.response?.data || error.message);
    throw new Error('Failed to get response from Generative API');
  }
}

module.exports = { getGeminiResponse };
