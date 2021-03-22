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

// router.post('/login', (req, res) => {
//   res.status(200).json({ user: 'test' });
// });

router.post('/signup', async (req, res) => {
  try {
    const { password, ...userData } = req.body;
    console.log(encryptPassword);
    const encryptedPassword = await encryptPassword(password);
    console.log(req.body, { encryptedPassword });
    const user = new User({ ...userData, password: encryptedPassword });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    res.status(500).json({ message: 'something went wrong' });
  }
});

// router.get('/logout', (req, res) => {
//   res.status(200).json({ ok: true });
// });

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/user/login',
  }),
  (req, res) => {
    console.log('req.user: ', req.user);
    res.redirect('/me');
  },
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get(
  '/profile',
  // (req, res, next) => {
  //   if (!req.isAuthenticated || !req.isAuthenticated()) {
  //     if (req.session) {
  //       req.session.returnTo = req.originalUrl || req.url;
  //     }
  //     return res.redirect('/login');
  //   }
  //   next();
  // },
  (req, res) => {
    res.render('profile', { user: req.user });
  },
);

module.exports = router;
