import express from 'express';
import { IUserRequest } from '../types';
const passport = require('passport');

import { User } from '../models';
const { encryptPassword } = require('../utils');

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('user/login');
});

router.get('/signup', (req, res) => {
  res.render('user/signup');
});

router.get('/me', (req, res) => {
  res.render('user/profile', { user: (req as IUserRequest).user });
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
    res.redirect((req as IUserRequest).session.returnTo || '/user/me');
  },
);

router.get('/logout', (req, res) => {
  (req as IUserRequest).logout();
  res.redirect('/');
});

router.get('/profile', (req, res) => {
  res.render('profile', { user: (req as IUserRequest).user });
});

export const userRouter = router;
