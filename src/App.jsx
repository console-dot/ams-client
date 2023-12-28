import { io } from 'socket.io-client';
import { General } from './router';
import { useEffect } from 'react';
import { WS_URL } from './api/config';
export const socket = io(WS_URL);

export default function App() {
  useEffect(() => {
    socket.on('connection', () => {
      console.log('first');
    });
  }, []);
  return <General />;
}
