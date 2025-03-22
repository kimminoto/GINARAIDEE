import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* โลโก้เว็บไซต์ */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-10 w-10 overflow-hidden">
              {/* ตัวอย่างโลโก้แบบใช้ div สำหรับกรณีที่ไม่มีรูปภาพ */}
              <div className="absolute inset-0 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-3xl">Ⓖ</span>
              </div>
              
              {/* หากมีไฟล์โลโก้จริง ให้ใช้โค้ดด้านล่างแทน */}
              {/* <Image 
                src="/logo.png" 
                alt="Logo" 
                fill 
                style={{ objectFit: 'contain' }} 
                priority 
              /> */}
            </div>
            <div className="text-xl font-bold text-orange-500">GINARAIDEE</div>
          </Link>

          {/* เมนูหลัก */}
          <nav className="hidden md:flex">
            <div className="flex items-center divide-x divide-gray-300">
              <Link href="/join" className="p-4 text-gray-700 hover:text-orange-500 transition px-4">
                เข้าร่วมห้อง
              </Link>
              <Link href="/create" className="p-4 text-gray-700 hover:text-orange-500 transition px-4">
                สร้างห้อง
              </Link>
              <Link href="/about" className="p-4 text-gray-700 hover:text-orange-500 transition px-4">
                เกี่ยวกับเรา
              </Link>
            </div>
          </nav>

          {/* ปุ่มสำหรับมือถือ */}
          <div className="md:hidden">
            <button className="p-2 rounded-md bg-gray-100 hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;