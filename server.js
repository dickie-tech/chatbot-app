const express= require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.post('/api', (req, res) => {
  const { message } = req.body;

  res.json({ repky: `You said: "${message}". I'll get right into business` });
});

app.listen(PORT , () =>{
  console.log(`Server is running on http://localhost:${PORT}`);
});
