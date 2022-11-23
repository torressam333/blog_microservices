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
    const { id, title } = data;

    // Insert into post store
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;

    // Find post from store
    const post = posts[postId];

    // Add comment to associated post
    post.comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;

    // Find post from store
    const post = posts[postId];

    // Grab the posts comment
    const comment = post.comments.find((comment) => comment.id === id);

    // Update any potentially changed values in the comment object
    comment.staus = status;
    comment.content = content;
  }

  res.status(201).json({ status: 'Success' });
});

app.listen(4002, () => console.log('query service listening on port 4002'));
