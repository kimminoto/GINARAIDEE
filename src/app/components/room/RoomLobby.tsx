'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface Participant {
  userId: string;
  username: string;
  isHost: boolean;
  ready: boolean;
}

interface RoomLobbyProps {
  participants: Participant[];
  roomId: string;
  isHost: boolean;
  onNext: () => void;
  showStartButton?: boolean;
}

const RoomLobby: React.FC<RoomLobbyProps> = ({
  participants,
  roomId,
  isHost,
  onNext,
  showStartButton = false
}) => {
  const [copySuccess, setCopySuccess] = useState<string>('');

  // ฟังก์ชันสำหรับคัดลอกรหัสห้อง
  const handleCopyRoomCode = (): void => {
    navigator.clipboard.writeText(roomId)
      .then(() => {
        setCopySuccess('คัดลอกรหัสห้องแล้ว!');
        setTimeout(() => setCopySuccess(''), 2000);
      })
      .catch(err => {
        console.error('ไม่สามารถคัดลอกข้อความได้: ', err);
      });
  };

  return (
    <Card className="p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">ผู้เข้าร่วมห้อง</h3>
        <div className="flex space-x-2 items-center">
          <div className="relative">
            <Button onClick={handleCopyRoomCode} className="bg-blue-500 text-white">
              คัดลอกรหัสห้อง
            </Button>
            {copySuccess && (
              <div className="absolute right-0 mt-2 bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                {copySuccess}
              </div>
            )}
          </div>
          {showStartButton && (
            <Button onClick={onNext} className="bg-green-500 text-white">
              เริ่มการสุ่ม
            </Button>
          )}
          {!showStartButton && isHost && participants.length >= 2 && (
            <Button onClick={onNext} className="bg-blue-500 text-white">
              ต่อไป
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {participants.map((participant) => (
          <div
            key={participant.userId}
            className={`p-3 rounded-lg border flex items-center ${
              participant.ready ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className={`w-3 h-3 rounded-full mr-3 ${
              participant.ready ? 'bg-green-500' : 'bg-gray-400'
            }`}></div>
            <div className="flex-grow">
              <p className="font-medium">{participant.username}</p>
              <p className="text-sm text-gray-500">
                {participant.isHost ? 'เจ้าของห้อง' : 'ผู้เข้าร่วม'}
              </p>
            </div>
            <div className="text-sm">
              {participant.ready ? 'พร้อมแล้ว' : 'ยังไม่พร้อม'}
            </div>
          </div>
        ))}

        {/* แสดงช่องว่างสำหรับผู้เข้าร่วมที่ยังไม่มี */}
        {Array(Math.max(0, 6 - participants.length)).fill(0).map((_, i) => (
          <div key={`empty-${i}`} className="p-3 rounded-lg border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center h-20">
            <p className="text-gray-400">รอผู้เข้าร่วม...</p>
          </div>
        ))}
      </div>

      {/* ข้อความแนะนำ */}
      <div className="mt-6 bg-blue-50 p-3 rounded border border-blue-100">
        <p className="text-blue-700 text-sm">
          <strong>คำแนะนำ:</strong> ส่งรหัสห้อง "{roomId}" ให้เพื่อนของคุณเพื่อเชิญเข้าร่วมห้อง
        </p>
      </div>
    </Card>
  );
};

export default RoomLobby;