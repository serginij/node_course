const express = require('express');
const passport = require('passport');

const { User } = require('../models');
const { encryptPassword } = require('../utils');

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('user/login');
});

router.get('/signup', (req, res) => {
  res.render('user/signup');
});

router.get('/me', (req, res) => {
  res.render('user/profile', { user: req.user });
});

router.post('/signup', async (req, res) => {
  try {
    const { password, ...userData } = req.body;
    const encryptedPassword = await encryptPassword(password);

    const user = new User({ ...userData, password: encryptedPassword });
    await user.save();

    res.redirect('/user/login');
  } catch (err) {
    res.status(500).json({ message: 'something went wrong' });
  }
});

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/user/login',
  }),
  (req, res) => {
    res.redirect('/user/me');
  },
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/profile', (req, res) => {
  res.render('profile', { user: req.user });
});

module.exports = router;
