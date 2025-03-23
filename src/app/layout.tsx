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
       
      </body>
    </html>
  );
};

export default RootLayout;