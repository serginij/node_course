const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT_ROUNDS;

const encryptPassword = (password) => bcrypt.hash(password, +saltRounds);

const decryptPassword = (hash, password) => bcrypt.compare(password, hash);

module.exports = {
  encryptPassword,
  decryptPassword,
};
