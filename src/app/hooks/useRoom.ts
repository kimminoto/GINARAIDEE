'use client';

import { useState, useEffect } from 'react';
import { useSocket } from './useSocket';

export interface RoomUser {
  id: string;
  name: string;
  ready?: boolean;
  categories?: string[];
}

export interface Room {
  id: string;
  name: string;
  owner: string;
  users: RoomUser[];
  settings?: {
    categories?: string[];
    priceRange?: string;
    dietary?: string[];
  };
}

export interface UseRoomReturn {
  room: Room | null;
  loading: boolean;
  error: string | null;
  updateUserStatus: (userId: string, ready: boolean, categories?: string[]) => void;
}

export function useRoom(roomId: string): UseRoomReturn {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { socket } = useSocket();

  // Convert RoomUser[] to Participant[] format for RoomLobby
  const mapUsersToParticipants = (users: RoomUser[], ownerId: string) => {
    return users.map(user => ({
      userId: user.id,
      username: user.name,
      isHost: user.id === ownerId,
      ready: user.ready || false
    }));
  };

  // Update user status (ready state and categories)
  const updateUserStatus = (userId: string, ready: boolean, categories?: string[]) => {
    if (socket) {
      socket.emit('update-user-status', { roomId, userId, ready, categories });
    }

    // Optimistic update
    setRoom(prevRoom => {
      if (!prevRoom) return null;

      return {
        ...prevRoom,
        users: prevRoom.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              ready,
              categories: categories || user.categories
            };
          }
          return user;
        })
      };
    });
  };

  useEffect(() => {
    if (!roomId) return;

    const fetchRoom = async () => {
      try {
        const response = await fetch(`/api/rooms/${roomId}`);

        if (!response.ok) {
          throw new Error('ไม่พบห้องหรือเกิดข้อผิดพลาด');
        }

        const data = await response.json();
        setRoom(data);
      } catch (err: any) {
        setError(err.message || 'เกิดข้อผิดพลาดในการโหลดข้อมูลห้อง');
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();

    // Set up socket listeners
    if (socket) {
      socket.emit('join-room', roomId);

      socket.on('room-updated', (updatedRoom: Room) => {
        setRoom(updatedRoom);
      });

      socket.on('user-joined', (user: RoomUser) => {
        setRoom((prevRoom) => {
          if (!prevRoom) return null;
          return {
            ...prevRoom,
            users: [...prevRoom.users, user]
          };
        });
      });

      socket.on('user-left', (userId: string) => {
        setRoom((prevRoom) => {
          if (!prevRoom) return null;
          return {
            ...prevRoom,
            users: prevRoom.users.filter(user => user.id !== userId)
          };
        });
      });

      socket.on('user-status-updated', ({ userId, ready, categories }) => {
        setRoom(prevRoom => {
          if (!prevRoom) return null;

          return {
            ...prevRoom,
            users: prevRoom.users.map(user => {
              if (user.id === userId) {
                return {
                  ...user,
                  ready,
                  categories: categories || user.categories
                };
              }
              return user;
            })
          };
        });
      });

      return () => {
        if (socket) {
          socket.off('room-updated');
          socket.off('user-joined');
          socket.off('user-left');
          socket.off('user-status-updated');
          socket.emit('leave-room', roomId);
        }
      };
    }
  }, [roomId, socket]);

  return { room, loading, error, updateUserStatus };
}