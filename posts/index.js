const express = require('express');
const axios = require('axios');
const { randomBytes } = require('crypto');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000'] }));

// Only use in memory storage for now
const posts = {};

app.get('/posts', (req, res) => {
  res.json(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  if (!req.body.title)
    return res.status(400).json({ error: 'Post body cannot be empty' });

  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  // Emit event to event bus (k8s service cluster ip)
  await axios
    .post('http://event-bus-srv:4005/events', {
      type: 'PostCreated',
      data: { id, title },
    })
    .catch((err) => console.error(err));

  res.status(201).json(posts[id]);
});

// Receive events from EB
app.post('/events', (req, res) => {
  console.log('Received event', req.body.type);

  res.send({});
});

app.listen(4000, () => console.log('Posts service is listening on 4000'));
