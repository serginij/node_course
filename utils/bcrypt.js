const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT_ROUNDS;

const encryptPassword = (password) => {
  console.log('encryptPassword');
  return bcrypt.hash(password, saltRounds);
};

const decryptPassword = (hash, password) => bcrypt.compare(password, hash);

module.exports = {
  encryptPassword,
  decryptPassword,
};
