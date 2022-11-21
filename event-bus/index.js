const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Parse json
app.use(express.json());

// Cors whitelist
app.use(cors({ origin: ['http://localhost:3000'] }));

app.post('/events', (req, res) => {
  const event = req.body;

  // Send request to all services
  axios.post('http://localhost:4000/events', event);
  axios.post('http://localhost:4001/events', event);
  // axios.post('http://localhost:4002/events', event);

  res.send({ status: 'OK' });
});

app.listen(4005, () => console.log('Listening on port 4005'));
