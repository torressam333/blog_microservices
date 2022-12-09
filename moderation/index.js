const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.post('/events', async (req, res) => {
  // Grab incoming event
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const { id, postId, content } = data;

    // Determine status based on arbitrary word (for now)
    const status = content.toLowerCase().includes('orange')
      ? 'rejected'
      : 'approved';

    // emit comment back to EB
    await axios
      .post('http://event-bus-srv:4005/events', {
        type: 'CommentModerated',
        data: {
          id,
          postId,
          status,
          content,
        },
      })
      .catch((err) => console.error(err));
  }

  // Return response
  res.send({});
});

app.listen(4003, () => console.log('moderator listening on port 4003'));
