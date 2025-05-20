const express= require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;
app.use(cors()); 
app.use(bodyParser.json());


const getReply = (message) => {
  const msg = message.toLowerCase();

  if(msg.includes('hello') || msg.includes('hi')) {
    return 'Hello! How can I assist you today?';
  } else if(msg.includes('how are you')) {
    return "I'm doing great thank you! How about you?";
  } else if (msg.includes("time")) {
    return `Current time is ${new Date().toLocaleTimeString()}`;
  } else if (msg.includes("date")) {
    return `Today's date is ${new Date().toLocaleDateString()}`;
  } else {
    return "Sorry, I don't understand that yet.";
  }
};

app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  const reply = getReply(message);
  res.json({ reply });
});

app.listen(PORT , () =>{
  console.log(`Server is running on http://localhost:${PORT}`);
});
