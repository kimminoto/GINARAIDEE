'use client';
// pages/index.js
import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <Head>
        <title>Food Randomizer - เลือกร้านอาหารแบบสุ่ม</title>
        <meta name="description" content="แอปสุ่มร้านอาหารร่วมกับเพื่อนแบบ CSGO" />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Food Randomizer</h1>
          <p className="text-xl text-white opacity-80">
            ไม่รู้จะกินอะไร? ให้เราช่วยคุณตัดสินใจ!
          </p>
        </div>

        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl p-6">
          <div className="flex flex-col gap-4">
            <Link 
              href="/create" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg text-center transition-colors"
            >
              สร้างห้องใหม่
            </Link>
            
            <Link 
              href="/join" 
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg text-center transition-colors"
            >
              เข้าร่วมห้อง
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}