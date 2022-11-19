const express = require('express');
const { randomBytes } = require('crypto');
const app = express();

app.use(express.json());

app.get('/post/:id/comments', (req, res) => {});

app.post('/post/:id/comments', (req, res) => {});

app.listen(4001, () => console.log('comments server listening on 4001'));
