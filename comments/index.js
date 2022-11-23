const express = require('express');
const { randomBytes } = require('crypto');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000'] }));

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
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
  comments.push({ id: commentId, content, status: 'pending' });

  // Assign comments array back to given post
  commentsByPostId[postId] = comments;

  // Emit comment creation to event bus
  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: { id: commentId, content, postId, status: 'pending' },
  });

  // Return res/comments to user
  res.status(201).json(comments);
});

// Receive events from EB
app.post('/events', async (req, res) => {
  // Grab event from request
  const { type, data } = req.body;

  if (type === 'CommentModerated') {
    // Grab moderated comment from incoming event data
    const { id, postId, status, content } = data;

    // Get existing version of comment
    const comments = commentsByPostId[postId];

    // Iterate and find comment
    const comment = comments.find((comment) => comment.id === id);

    // Update comment status
    comment.status = status;

    // Tell other services (via event bus) this update occured
    await axios.post('http://localhost:4005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        postId,
        status,
        content,
      },
    });
  }

  res.send({});
});

app.listen(4001, () => console.log('comments server listening on 4001'));
