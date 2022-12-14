const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000'] }));

// In memory store for now
const posts = {};

const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;

    console.log('heree');

    // Insert into post store
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;

    // Find post from store
    const post = posts[postId];

    console.log(post.comments);

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
    comment.status = status;
    comment.content = content;
  }
};

app.get('/posts', (_, res) => {
  return res.status(200).json(posts);
});

// Receives events from EB
app.post('/events', (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.status(201).json({ status: 'Success' });
});

app.listen(4002, async () => {
  console.log('query service listening on port 4002');

  try {
    // Make request to EB and get list of all emitted events up to this point in time
    const res = await axios.get('http://event-bus-srv:4005/events');

    for (let event of res.data) {
      const { type, data } = event;
      console.log('Processing event:', event.type);

      //Handle event
      handleEvent(type, data);
    }
  } catch (error) {
    console.error(error);
  }
});
