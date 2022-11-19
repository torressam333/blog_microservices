const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000'] }));

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  // Generate random comment id
  const commentId = randomBytes(4).toString('hex');

  // Pull content from body
  const { content } = req.body;

  // Return error if no content
  if (!content || content === '')
    return res.status(400).json({ error: 'Content cannot be empty' });

  // Grab post id passed in param
  const postId = req.params.id;

  // Assign array containing a posts comments OR empty arr
  const comments = commentsByPostId[postId] || [];

  // Add new posts comment to array (relational)
  comments.push({ id: commentId, content });

  // Assign comments array back to given post
  commentsByPostId[postId] = comments;

  // Return res/comments to user
  res.status(201).json(comments);
});

app.listen(4001, () => console.log('comments server listening on 4001'));
