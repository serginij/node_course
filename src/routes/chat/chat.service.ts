import { Socket } from 'socket.io';
import { IMessage } from '../../types';

let onlineByRoom: Record<string, number> = {};

export const getOnlineByRoom = (roomName: string) => onlineByRoom[roomName];

export const incrRoomOnline = (roomName: string) => {
  let roomOnline = getOnlineByRoom(roomName);

  if (!roomOnline) {
    roomOnline = 1;
  } else {
    roomOnline++;
  }

  onlineByRoom[roomName] = roomOnline;

  return roomOnline;
};

export const decrRoomOnline = (roomName: string) => {
  let roomOnline = getOnlineByRoom(roomName);

  onlineByRoom[roomName] = roomOnline > 1 ? roomOnline - 1 : 0;

  return roomOnline;
};

export const handleUserDisconnect = (
  socket: Socket,
  roomName: string,
) => () => {
  const onlineCount = decrRoomOnline(roomName);

  socket.emit('update-online', onlineCount);
};

export const handleRoomMessage = (socket: Socket, roomName: string) => (
  msg: IMessage,
) => {
  msg.type = `channel: ${roomName}`;
  socket.to(roomName).emit('message-to-room', msg);
  socket.emit('message-to-room', msg);
};
