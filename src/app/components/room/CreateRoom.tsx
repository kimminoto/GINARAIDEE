'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { Card } from '@/app/components/ui/Card';

export const CreateRoom: React.FC = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error state
    setError('');
    
    // Validate input
    if (!name.trim()) {
      setError('กรุณาใส่ชื่อของคุณ');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Call API to create room
      const response = await fetch('/api/rooms/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'ไม่สามารถสร้างห้องได้');
      }
      
      // If successful, redirect to room page
      router.push(`/room/${data.roomId}`);
      
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">สร้างห้องใหม่</h2>
      
      <form onSubmit={handleCreateRoom}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              ชื่อของคุณ
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="กรอกชื่อของคุณ"
              className="w-full"
            />
          </div>
          
          {error && (
            <div className="text-red-500 text-sm py-2">{error}</div>
          )}
          
          <Button
            type="submit"
            className="w-full py-2"
            disabled={isLoading}
          >
            {isLoading ? 'กำลังสร้างห้อง...' : 'สร้างห้อง'}
          </Button>
        </div>
      </form>
    </Card>
  );
};