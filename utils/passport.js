const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { User } = require('../models');
const { decryptPassword } = require('./bcrypt');

/**
 * @param {String} username
 * @param {String} password
 * @param {Function} done
 */
const verifyUser = async (username, pwd, done) => {
  try {
    const user = await User.findOne({ username }).select('-__v').lean();

    if (!user) {
      return done(null, false);
    }

    const { password, ...userData } = user;

    console.log('verifyUser', user);

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

passport.use('local', new LocalStrategy(passportOptions, verifyUser));

passport.serializeUser(function (user, cb) {
  console.log({ user });
  cb(null, user._id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findById(id).select('-__v').lean();
    console.log('dbUser', user);
    cb(null, user);
  } catch (err) {
    return cb(err);
  }
});
