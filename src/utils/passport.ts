import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { User } from '../models';
import { decryptPassword } from './bcrypt';

const verifyUser = async (
  username: string,
  pwd: string,
  done: (...args: any) => void,
) => {
  try {
    const user = await User.findOne({ username }).select('-__v').lean();

    if (!user) {
      return done(null, false);
    }
    const { password, ...userData } = user;

    if (!(await decryptPassword(password, pwd))) {
      return done(null, false);
    }

    return done(null, userData);
  } catch (err) {
    return done(err);
  }
};

const passportOptions = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: false,
};

passport.use('local', new LocalStrategy(passportOptions as any, verifyUser));

passport.serializeUser(function (user, cb) {
  cb(null, (user as any)._id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findById(id).select('-__v').lean();
    cb(null, user);
  } catch (err) {
    return cb(err);
  }
});

export default passport;
