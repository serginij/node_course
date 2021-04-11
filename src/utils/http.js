const http = require('http');

const app = require('./express');

const server = http.Server(app);

module.exports = server;
