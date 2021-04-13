import express from 'express';
import { Socket } from 'socket.io';
// import socketIO from 'socket.io';
const socketIO = require('socket.io');
const { httpServer } = require('../utils');

const router = express.Router();
const io = socketIO(httpServer);

let onlineByRoom: Record<string, number> = {};

io.on('connection', (socket: Socket) => {
  const roomName = socket.handshake.query.roomName as string;

  let roomOnline = onlineByRoom[roomName];

  if (!roomOnline) {
    roomOnline = 1;
  } else {
    roomOnline++;
  }

  onlineByRoom[roomName] = roomOnline;
  socket.emit('update-online', roomOnline);

  socket.join(roomName);

  socket.on('message-to-room', (msg: any) => {
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

export const chatRouter = router;
