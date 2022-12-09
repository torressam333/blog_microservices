const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Parse json
app.use(express.json());

// Cors whitelist
app.use(cors({ origin: ['http://localhost:3000'] }));

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  // Add all incoming events in temp DS
  events.push(event);

  // Post service (k8s service cluster ip)
  axios
    .post('http://posts-clusterip-srv:4000/events', event)
    .catch((err) => console.error(err));

  // Comments service
  axios
    .post('http://localhost:4001/events', event)
    .catch((err) => console.error(err));

  // Query service
  axios
    .post('http://localhost:4002/events', event)
    .catch((err) => console.error(err));

  // Moderation service
  axios
    .post('http://localhost:4003/events', event)
    .catch((err) => console.error(err));

  res.send({ status: 'OK' });
});

// Endpoint for synchronizing events
app.get('/events', (_, res) => res.send(events));

app.listen(4005, () => console.log('Listening on port 4005'));
