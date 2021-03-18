const { User } = require('../models');

/**
 * @param {String} username
 * @param {String} password
 * @param {Function} done
 */
module.exports = async (username, pwd, done) => {
  try {
    const user = await User.find({ username }).select('-__v');

    if (!user) {
      return done(null, false);
    }

    //TODO: add bcrypt
    const { password, ...userData } = user;

    if (!password !== pwd) {
      return done(null, false);
    }

    // `user` будет сохранен в `req.user`
    return done(null, userData);
  } catch (err) {
    return done(err);
  }
};
