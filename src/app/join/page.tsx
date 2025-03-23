'use client';
// pages/join.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

// Form Data Interface
interface FormData {
  roomCode: string;
  nickname: string;
}

// Header Component
const Header = () => (
    <div className="py-2 text-center">
      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold mt-2 text-gray-800">เข้าร่วมห้อง</h1>
    </div>
);

// Form Container Component
const JoinForm = ({
                    formData,
                    error,
                    isLoading,
                    handleChange,
                    handleSubmit,
                    router,
                  }: {
  formData: FormData;
  error: string;
  isLoading: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  router: ReturnType<typeof useRouter>;
}) => (
    <div className="py-2 flex-grow flex flex-col justify-center">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-2">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
        )}

        {/* Room Code Field */}
        <div>
          <label htmlFor="roomCode" className="block text-sm font-semibold text-gray-700 mb-1">
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
                className="bg-gray-50 shadow-inner border border-gray-200 rounded-lg w-full py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                value={formData.roomCode}
                onChange={handleChange}
                required
            />
          </div>
        </div>

        {/* Nickname Field */}
        <div>
          <label htmlFor="nickname" className="block text-sm font-semibold text-gray-700 mb-1">
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
                className="bg-gray-50 shadow-inner border border-gray-200 rounded-lg w-full py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                value={formData.nickname}
                onChange={handleChange}
                required
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
              type="button"
              onClick={() => router.push('/')}
              className="flex items-center text-orange-600 hover:text-orange-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            กลับ
          </button>
          <button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-md transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
                <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              กำลังเข้าร่วม...
            </span>
            ) : 'เข้าร่วมห้อง'}
          </button>
        </div>
      </form>
    </div>
);

// Main Component
export default function JoinRoom() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({ roomCode: '', nickname: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/rooms/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

  return (
      <div
          className="fixed inset-0 flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: 'url("https://i.pinimg.com/1200x/13/75/0d/13750d8970141cab1ab2a703d950fb75.jpg")' }}
      >
        <Head>
          <title>เข้าร่วมห้อง | Food Randomizer</title>
        </Head>
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-orange-100 flex flex-col max-h-screen">
            <Header />
            <JoinForm
                formData={formData}
                error={error}
                isLoading={isLoading}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                router={router}
            />
          </div>
        </div>
      </div>
  );
}
