import express from 'express';
import passport from 'passport';

import {
  renderLogin,
  renderProfile,
  renderSignup,
  getProfile,
  logoutUser,
  redirectOnLogin,
  signupUser,
} from './user.service';

const router = express.Router();

router.get('/login', renderLogin);

router.get('/signup', renderSignup);

router.get('/me', getProfile);

router.post('/signup', signupUser);

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/user/login',
  }),
  redirectOnLogin,
);

router.get('/logout', logoutUser);

router.get('/profile', renderProfile);

export const userRouter = router;
