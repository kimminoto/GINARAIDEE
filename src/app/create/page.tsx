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
  const [error, setError] = useState<string>('');
  const [windowHeight, setWindowHeight] = useState<number>(0);
  const [roomSettings, setRoomSettings] = useState<RoomSettings>({
    maxMembers: 5,
    foodOptions: 3,
    nickname: '',
  });

  // Get window height on client side
  useEffect(() => {
    setWindowHeight(window.innerHeight);
    
    // Prevent scrolling
    document.body.style.overflow = 'hidden';
    
    // Listen for window resize
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRoomSettings({
      ...roomSettings,
      [name]: name === 'maxMembers' || name === 'foodOptions' ? parseInt(value, 10) : value,
    });
    if (error) setError('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/rooms/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomSettings),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        router.push(`/room/${data.roomCode}`);
      } else {
        setError(data.message || 'ไม่สามารถสร้างห้องได้');
      }
    } catch (err) {
      console.error('Error creating room:', err);
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render until we have window height (client-side only)
  if (windowHeight === 0) {
    return null;
  }

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
        <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-amber-200 flex flex-col" style={{ maxHeight: `${windowHeight - 40}px` }}>
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-300 to-orange-400 rounded-full flex items-center justify-center mx-auto shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mt-2 text-amber-600">สร้างห้องใหม่</h1>
            <p className="text-amber-500 text-sm mt-1">ตั้งค่าห้องของคุณเพื่อเริ่มสุ่มอาหาร</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4 flex-grow">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-2">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-amber-700 text-sm font-semibold mb-1" htmlFor="nickname">
                ชื่อที่ใช้ในห้อง
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 016 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  id="nickname"
                  name="nickname"
                  type="text"
                  className="bg-gray-50 shadow-inner appearance-none border border-amber-200 rounded-lg w-full py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  placeholder="ชื่อของคุณ"
                  value={roomSettings.nickname}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-amber-700 text-sm font-semibold mb-1" htmlFor="maxMembers">
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
            
            <div>
              <label className="block text-amber-700 text-sm font-semibold mb-1" htmlFor="foodOptions">
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
            
            <div className="flex items-center justify-between pt-4 border-t border-amber-100 mt-4">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="flex items-center text-amber-600 hover:text-amber-800 font-medium transition duration-200 focus:outline-none cursor-pointer"
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
      </div>
    </div>
  );
}