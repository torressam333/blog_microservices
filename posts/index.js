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

  // Emit event to event bus
  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: { id, title },
  });

  res.status(201).json(posts[id]);
});

app.listen(4000, () => console.log('posts server listening on 4000'));
