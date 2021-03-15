const express = require('express');

const router = express.Router();

router.post('/login', (req, res) => {
  res.status(201).json({ user: 'test' });
});

module.exports = router;
