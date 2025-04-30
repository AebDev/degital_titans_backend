const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

app.post('/test', (req, res) => {
  console.log('Received body:', req.body);
  res.json({ received: req.body });
});

app.listen(4000, () => console.log('Test server running on port 4000'));
