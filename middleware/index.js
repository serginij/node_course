const notFoundMiddleware = require('./notFound');
const fileMiddleware = require('./file');
const verifyUserMiddleware = require('./verifyUser');

module.exports = {
  notFoundMiddleware,
  fileMiddleware,
  verifyUserMiddleware,
};
