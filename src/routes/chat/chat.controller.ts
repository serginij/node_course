import express from 'express';
import { Socket } from 'socket.io';

const socketIO = require('socket.io');

import { httpServer } from '../../utils';
import {
  getOnlineByRoom,
  handleRoomMessage,
  handleUserDisconnect,
  incrRoomOnline,
} from './chat.service';

const router = express.Router();
const io = socketIO(httpServer);

io.on('connection', (socket: Socket) => {
  const roomName = socket.handshake.query.roomName as string;

  incrRoomOnline(roomName);

  socket.emit('update-online', getOnlineByRoom(roomName));

  socket.join(roomName);

  socket.on('message-to-room', handleRoomMessage(socket, roomName));

  socket.on('disconnect', handleUserDisconnect(socket, roomName));
});

export const chatRouter = router;
