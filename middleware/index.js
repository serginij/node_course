const notFoundMiddleware = require('./notFound');
const fileMiddleware = require('./file');
const authMiddleware = require('./auth');

module.exports = {
  notFoundMiddleware,
  fileMiddleware,
  authMiddleware,
};
