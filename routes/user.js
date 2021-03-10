const express = require('express');

// const store = require('../store');

const router = express.Router();

router.post('/login', (req, res) => {
  // const { userStore } = store;
  // const data = userStore.login();

  res.status(201).json({ user: 'test' });
});

module.exports = router;
