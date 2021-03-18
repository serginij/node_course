const express = require('express');

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('user/login');
});

router.get('/signup', (req, res) => {
  res.render('user/signup');
});

router.get('/me', (req, res) => {
  res.render('user/profile', {
    user: {
      _id: 'test',
      username: 'user',
      displayName: 'qwerty',
      email: 'test@mail.com',
    },
  });
});

router.post('/login', (req, res) => {
  res.status(200).json({ user: 'test' });
});

router.post('/signup', (req, res) => {
  res.status(201).json({ user: 'test' });
});

router.get('/logout', (req, res) => {
  res.status(200).json({ ok: true });
});

module.exports = router;
