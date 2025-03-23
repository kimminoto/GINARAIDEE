'use client';

import { useSearchParams } from 'next/navigation';
import RoomLobby from '@/app/components/room/RoomLobby';
import { useState } from 'react';

export default function RoomPage({ params }: { params: { roomId: string } }) {
    const searchParams = useSearchParams();
    const roomId = params.roomId;
    const nickname = searchParams.get('nickname') || 'Guest';

    // รับค่า maxMembers และ foodOptions จาก URL
    const maxMembers = parseInt(searchParams.get('maxMembers') || '5', 10);
    const foodOptions = parseInt(searchParams.get('foodOptions') || '3', 10);

    // สร้าง state สำหรับเก็บรายชื่อผู้เข้าร่วม
    const [participants] = useState([
        { userId: '1', username: nickname, isHost: true, ready: false }
    ]);

    // ไม่ต้องมี state showRoomCode และ useEffect สำหรับการซ่อนรหัสห้องอีกต่อไป

    // ฟังก์ชันสำหรับคัดลอกรหัสห้อง
    const copyRoomCode = () => {
        navigator.clipboard.writeText(roomId);
        alert('คัดลอกรหัสห้องแล้ว!');
    };

    // ฟังก์ชันสำหรับเริ่มสุ่มอาหาร
    const handleStartGame = () => {
        // โค้ดสำหรับการเริ่มเกม/สุ่มอาหาร
        console.log('เริ่มการสุ่มอาหารด้วยตัวเลือก:', foodOptions);
        // onNext(); - สำหรับเรียกใช้เมื่อพร้อมที่จะไปหน้าถัดไป
    };

    return (
        <div className="min-h-screen bg-amber-50">
            {/* แสดงรหัสห้องที่ด้านบนตลอดเวลา โดยไม่มีเงื่อนไข showRoomCode */}
            <div className="fixed top-4 left-0 right-0 mx-auto w-full max-w-md z-50">
                <div className="bg-white rounded-lg shadow-lg p-4 mx-4 border border-amber-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-amber-600 mb-1">รหัสห้องของคุณ:</p>
                            <p className="text-xl font-bold tracking-wider text-amber-700">{roomId}</p>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={copyRoomCode}
                                className="bg-amber-100 p-2 rounded-lg text-amber-600 hover:bg-amber-200 transition"
                                title="คัดลอกรหัสห้อง"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                </svg>
                            </button>
                            {/* ลบปุ่มปิดการแสดงรหัสห้อง */}
                        </div>
                    </div>
                </div>
            </div>

            {/* ส่งค่าที่จำเป็นทั้งหมดไปยัง RoomLobby */}
            <RoomLobby
                participants={participants}
                roomId={roomId}
                isHost={true}
                maxMembers={maxMembers}
                foodOptions={foodOptions}
                onNext={handleStartGame}
            />
        </div>
    );
}