'use client';

import { useState, useEffect } from 'react';
import { useSocket } from './useSocket'; // แก้ไขการ import จาก useRoom เป็น useSocket

interface RoomUser {
  id: string;
  name: string;
}

interface Room {
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

interface UseRoomReturn {
  room: Room | null;
  loading: boolean;
  error: string | null;
}

export function useRoom(roomId: string): UseRoomReturn {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { socket } = useSocket();

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
      
      // แก้ไขตรงนี้ - เพิ่มการตรวจสอบ socket ก่อนเรียก off และ emit
      
      return () => {
        if (socket) {
          socket.off('room-updated');
          socket.off('user-joined');
          socket.off('user-left');
          socket.emit('leave-room', roomId);
        }
      };
    }
  }, [roomId, socket]);

  return { room, loading, error };
}