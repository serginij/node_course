const express = require('express');
const socketIO = require('socket.io');
const { httpServer } = require('../utils');

const router = express.Router();
const io = socketIO(httpServer);

let onlineByRoom = {};

io.on('connection', (socket) => {
  const { roomName } = socket.handshake.query;

  let roomOnline = onlineByRoom[roomName];

  if (!roomOnline) {
    roomOnline = 1;
  } else {
    roomOnline++;
  }

  onlineByRoom[roomName] = roomOnline;
  socket.emit('update-online', roomOnline);

  socket.join(roomName);

  socket.on('message-to-room', (msg) => {
    msg.type = `channel: ${roomName}`;
    socket.to(roomName).emit('message-to-room', msg);
    socket.emit('message-to-room', msg);
  });

  socket.on('disconnect', () => {
    roomOnline--;
    onlineByRoom[roomName] = roomOnline;

    socket.emit('update-online', roomOnline);
  });
});

module.exports = router;
