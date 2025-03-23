'use client';
// pages/join.tsx
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Image from 'next/image';

interface FormData {
  roomCode: string;
  nickname: string;
}

// Header Component
const Header = () => {
  return (
    <div className="py-2 text-center">
      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold mt-2 text-center text-gray-800">เข้าร่วมห้อง</h1>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <div className="py-2 text-center">
      <p className="text-gray-600 text-xs">
        Food Randomizer - สุ่มอาหารกับเพื่อนๆ ได้อย่างสนุกสนาน
      </p>
    </div>
  );
};

export default function JoinRoom() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    roomCode: '',
    nickname: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [windowHeight, setWindowHeight] = useState<number>(0);

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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/rooms/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push(`/room/${formData.roomCode}`);
      } else {
        setError(data.message || 'ไม่สามารถเข้าร่วมห้องได้');
      }
    } catch (err) {
      console.error('Error joining room:', err);
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

  // Main Container with Form
  const Container = () => {
    return (
      <div className="py-2 flex-grow flex flex-col justify-center">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-2">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
        
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="roomCode">
              รหัสห้อง
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <input
                id="roomCode"
                name="roomCode"
                type="text"
                placeholder="กรอกรหัสห้อง"
                className="bg-gray-50 shadow-inner appearance-none border border-gray-200 rounded-lg w-full py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                value={formData.roomCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="nickname">
              ชื่อที่ใช้ในห้อง
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 016 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                id="nickname"
                name="nickname"
                type="text"
                placeholder="ชื่อของคุณ"
                className="bg-gray-50 shadow-inner appearance-none border border-gray-200 rounded-lg w-full py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                value={formData.nickname}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="flex items-center text-orange-600 hover:text-orange-800 transition-colors focus:outline-none cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              กลับ
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 shadow-md transform transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  กำลังเข้าร่วม...
                </span>
              ) : 'เข้าร่วมห้อง'}
            </button>
          </div>
        </form>
      </div>
    );
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
        <title>เข้าร่วมห้อง | Food Randomizer</title>
      </Head>

      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-orange-100 flex flex-col" style={{ maxHeight: `${windowHeight - 40}px` }}>
          {/* 1. Header */}
          <Header />
          
          {/* 2. Main Container */}
          <Container />
          
          
        </div>
      </div>
    </div>
  );
}