'use client';
// pages/create.tsx
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

interface RoomSettings {
  maxMembers: number;
  foodOptions: number;
  nickname: string;
}

export default function CreateRoom() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [roomCode, setRoomCode] = useState<string>('');
  const [isRoomCreated, setIsRoomCreated] = useState<boolean>(false);
  const [roomSettings, setRoomSettings] = useState<RoomSettings>({
    maxMembers: 5,
    foodOptions: 3,
    nickname: '',
  });

  // สร้างรหัสห้องตั้งแต่เริ่มต้น เพื่อให้มีรหัสพร้อมใช้งาน
  useEffect(() => {
    // สร้างรหัสห้องแบบสุ่ม - ปรับให้สั้นลงและอ่านง่ายขึ้น
    const generatedCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(generatedCode);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRoomSettings({
      ...roomSettings,
      [name]: name === 'maxMembers' || name === 'foodOptions' ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // ตรวจสอบว่ากรอกชื่อเล่นหรือไม่
    if (!roomSettings.nickname.trim()) {
      alert('กรุณาใส่ชื่อที่ใช้ในห้อง');
      setIsLoading(false);
      return;
    }

    // แสดงรหัสห้องก่อนที่จะเข้าสู่ห้อง
    setIsRoomCreated(true);

    // จำลองการโหลด (สามารถลบออกได้ถ้าไม่ต้องการ)
    setTimeout(() => {
      // พาไปที่ RoomLobby พร้อมข้อมูล
      router.push(
          `/room/${roomCode}?nickname=${encodeURIComponent(roomSettings.nickname)}&maxMembers=${roomSettings.maxMembers}&foodOptions=${roomSettings.foodOptions}`
      );
    }, 3000); // รอ 3 วินาทีก่อนจะเปลี่ยนหน้า เพื่อให้ผู้ใช้มีเวลาเห็นรหัสห้อง
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    alert('คัดลอกรหัสห้องแล้ว!');
  };

  return (
      <div
          className="fixed inset-0 flex items-center justify-center"
          style={{
            backgroundImage: `url("https://i.pinimg.com/1200x/13/75/0d/13750d8970141cab1ab2a703d950fb75.jpg")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#f8f7ff',
            overflow: 'hidden'
          }}
      >
        <Head>
          <title>สร้างห้องใหม่ | Food Randomizer</title>
        </Head>

        <div className="container mx-auto px-4">
          {isRoomCreated ? (
              // แสดงรหัสห้องหลังจากกดสร้างห้อง
              <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 border border-amber-200 transform transition-all duration-300 hover:shadow-xl">
                <div className="text-center mb-8">
                  <div className="inline-block p-3 rounded-full bg-gradient-to-r from-amber-300 to-orange-400 shadow-md mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h1 className="text-3xl font-bold text-amber-600">ห้องสร้างเสร็จแล้ว!</h1>
                  <p className="text-amber-500 mt-2">แชร์รหัสนี้กับเพื่อนของคุณ</p>
                </div>

                <div className="mb-8 bg-amber-50 p-5 rounded-lg border border-amber-200">
                  <p className="text-sm text-amber-600 mb-2">รหัสห้องของคุณ:</p>
                  <div className="flex items-center justify-between">
                    <div className="bg-white py-3 px-4 rounded-lg border border-amber-200 w-full text-center">
                      <span className="text-2xl font-bold tracking-widest text-amber-700">{roomCode}</span>
                    </div>
                    <button
                        onClick={copyRoomCode}
                        className="ml-2 bg-amber-100 p-3 rounded-lg text-amber-600 hover:bg-amber-200 transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-amber-500 mb-4">กำลังนำคุณเข้าสู่ห้อง...</p>
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-500"></div>
                  </div>
                </div>
              </div>
          ) : (
              // หน้าฟอร์มสร้างห้อง (แบบเดิม)
              <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 border border-amber-200 transform transition-all duration-300 hover:shadow-xl">
                <div className="text-center mb-8">
                  <div className="inline-block p-3 rounded-full bg-gradient-to-r from-amber-300 to-orange-400 shadow-md mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h1 className="text-3xl font-bold text-amber-600">สร้างห้องใหม่</h1>
                  <p className="text-amber-500 mt-2">ตั้งค่าห้องของคุณเพื่อเริ่มสุ่มอาหาร</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="mb-5">
                    <label className="block text-amber-700 text-sm font-medium mb-2" htmlFor="nickname">
                      ชื่อที่ใช้ในห้อง
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                          id="nickname"
                          name="nickname"
                          type="text"
                          className="pl-10 shadow-sm appearance-none border border-amber-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200"
                          placeholder="ชื่อของคุณ"
                          value={roomSettings.nickname}
                          onChange={handleChange}
                          required
                      />
                    </div>
                  </div>


                  <div className="mb-5">
                    <label className="block text-amber-700 text-sm font-bold mb-2" htmlFor="maxMembers">
                      จำนวนผู้เข้าร่วมสูงสุด
                    </label>
                    <div className="flex items-center justify-between">
                      <div className="bg-amber-100 rounded-lg px-3 py-1">
                        <span className="text-amber-600 font-bold text-xl">{roomSettings.maxMembers}</span>
                        <span className="text-amber-600 text-xs ml-1">คน</span>
                      </div>
                      <input
                          id="maxMembers"
                          name="maxMembers"
                          type="range"
                          min="1"
                          max="10"
                          className="w-3/4 h-2 bg-amber-100 rounded-lg appearance-none cursor-pointer"
                          value={roomSettings.maxMembers}
                          onChange={handleChange}
                      />
                    </div>
                  </div>


                  <div className="mb-6">
                    <label className="block text-amber-700 text-sm font-medium mb-2" htmlFor="foodOptions">
                      จำนวนตัวเลือกอาหารที่จะสุ่ม
                    </label>
                    <div className="flex items-center justify-between">
                      <div className="bg-amber-100 rounded-lg px-3 py-1">
                        <span className="text-amber-600 font-bold text-xl">{roomSettings.foodOptions}</span>
                        <span className="text-amber-600 text-xs ml-1">รายการ</span>
                      </div>
                      <input
                          id="foodOptions"
                          name="foodOptions"
                          type="range"
                          min="2"
                          max="5"
                          className="w-3/4 h-2 bg-amber-100 rounded-lg appearance-none cursor-pointer"
                          value={roomSettings.foodOptions}
                          onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-amber-100">
                    <button
                        type="button"
                        onClick={() => router.push('/')}
                        className="inline-flex items-center text-amber-600 hover:text-amber-800 font-medium transition duration-200 focus:outline-none cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      กลับ
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white font-medium py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-opacity-50 shadow-md transition duration-200 disabled:opacity-50 transform hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      {isLoading ? (
                          <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      กำลังสร้างห้อง...
                    </span>
                      ) : (
                          <span className="flex items-center">
                      สร้างห้อง
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
          )}
        </div>
      </div>
  );
}