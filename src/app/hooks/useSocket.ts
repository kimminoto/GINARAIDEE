'use client';

import { Socket } from 'dgram';
import { useState, useEffect } from 'react';


// Define a module-level variable for the socket instance
let socket: Socket | null = null;

export function useSocket() {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    // Initialize socket connection lazily
    if (!socket) {
      const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 
        (typeof window !== 'undefined' ? window.location.origin : '');
      
      socket = io(socketUrl);
    }

    // Set up event listeners
    const onConnect = () => {
      setIsConnected(true);
      console.log('Socket connected');
    };

    const onDisconnect = () => {
      setIsConnected(false);
      console.log('Socket disconnected');
    };

    const onError = (err: Error) => {
      console.error('Socket error:', err);
    };

    // Add event listeners
    socket?.on('connect', onConnect);
    socket?.on('disconnect', onDisconnect);
    socket?.on('error', onError);

    // Check if socket is already connected
    if (socket?.connect) {
      setIsConnected(true);
    }

    // Clean up listeners on component unmount
    return () => {
      if (socket) {
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
        socket.off('error', onError);
      }
    };
  }, []);

  // Return socket instance and connection status
  return { 
    socket, 
    isConnected,
    // Add utility functions
    emit: (event: string, data?: any) => socket?.emit(event, data),
    on: (event: string, callback: (...args: any[]) => void) => {
      socket?.on(event, callback);
      // Return function to remove the listener
      return () => socket?.off(event, callback);
    }
  };
}

function io(socketUrl: string): Socket | null {
  throw new Error('Function not implemented.');
}
