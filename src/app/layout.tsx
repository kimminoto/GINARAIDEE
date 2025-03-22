import React from 'react';
import Navbar from './components/Navbar';
import './globals.css'; // นำเข้า tailwind
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Test NextJS',
  description: 'NextJS 15 Tutorial',
  keywords: 'Test NextJS, Thailand',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="th">
      <body className="overflow-hidden h-screen"> 
        {/* ทำให้หน้าจอไม่ขยับและทำให้รูปเท่ากับขนาดหน้าจอ */}
        
        <Navbar />
        <main className="flex-grow">
          {children}
          
        </main>
        <footer className="bg-white-100 py-4 text-center text-gray-600 text-sm">
          <div className="container mx-auto px-4">
            &copy; {new Date().getFullYear()} GINARAIDEE
          </div>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;