const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000'] }));

// In memory store for now
const posts = {};

app.get('/posts', (_, res) => {
  return res.status(200).json(posts);
});

// Receives events from EB
app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, titile } = data;

    // Insert into post store
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;

    // Find post from store
    const post = posts[postId];

    // Add comment to associated post
    post.comments.push({ id, content });
  }

  res.status(201).json({ status: 'Success' });
});

app.listen(4002, () => console.log('Listening on port 4002'));
