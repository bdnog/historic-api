const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const authUsername = process.env.AUTH_USERNAME;
const authPassword = process.env.AUTH_PASSWORD;
const appSecret = process.env.APP_SECRET;

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password || username != authUsername || password != authPassword) {
    res.status(401).send({
      error: 'Invalid username/password'
    });

  } else {
    const token = jwt.sign({ username }, appSecret, { expiresIn: 86400 });
    res.status(201).send({ token });
  }
});

module.exports = app => app.use('/auth', router);
