import { io } from 'socket.io-client';

// Use same host or fallback
const SOCKET_URL = window.location.origin;

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000
});

export function connectSocket(user) {
  if (!socket.connected) {
    socket.connect();
  }

  if (user) {
    if (user.role === 'doctor' && user.doctorId) {
      socket.emit('join:doctor', user.doctorId);
    } else if (user.role === 'patient') {
      socket.emit('join:patient', user.id);
    } else if (user.role === 'admin') {
      socket.emit('join:admin');
    }
  }
}

export function disconnectSocket() {
  if (socket.connected) {
    socket.disconnect();
  }
}
