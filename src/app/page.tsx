import Link from 'next/link';
import { Button } from './components/ui/Button';
import { Card } from './components/ui/Card';

export default function Home() {

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url("https://i.pinimg.com/1200x/13/75/0d/13750d8970141cab1ab2a703d950fb75.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',

      }}

    >
      {/* ส่วนที่ 2: Content */}
      <main className="flex-grow py-6 px-4 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card className="w-full p-8 border-0 shadow-xl bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl">

            <div className="text-center mb-6">
              <div className="inline-block p-2 bg-white rounded-full shadow-lg mb-4">
                <span className='text-6xl'>🍽</span>
              </div>
              <h1 className="text-5xl font-bold text-orange-800 mb-2">GINARAIDEE</h1>
              <p className="text-xl text-orange-600 font-medium">ไม่รู้จะกินอะไร? มาสุ่มกันเถอะ!</p>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <Link href="/create" className="w-full block">
                  <Button className="w-full py-4 text-lg bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl font-medium">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    สร้างห้องใหม่
                  </Button>
                </Link>
              </div>

              <div className="text-center">
                <Link href="/join" className="w-full block">
                  <Button variant="outline" className="w-full py-4 text-lg border-2 border-orange-300 text-orange-700 hover:bg-orange-50 hover:border-orange-400 hover:text-orange-800 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl font-medium">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    เข้าร่วมห้อง
                  </Button>
                </Link>
              </div>

              <div className="pt-4 border-t border-orange-100">
                <div className="flex items-center justify-center space-x-4">
                  <div className="flex items-center text-amber-700">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    <span className="text-sm">ชวนเพื่อน</span>
                  </div>

                  <div className="flex items-center text-amber-700">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">หลายเมนูให้เลือก</span>
                  </div>

                  <div className="flex items-center text-amber-700">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1z" clipRule="evenodd" />
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">ฟรี</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Food illustrations */}
          <div className="relative h-14 w-full mt-4">
            
          </div>
        </div>
      </main>

      {/* ส่วนที่ 3: Footer */}
      <footer className="py-6 px-4">
        <div className="container mx-auto max-w-md">
          <p className="text-center text-sm text-orange-700">
            สร้างห้องและชวนเพื่อนมาสุ่มอาหารด้วยกัน เพื่อความสนุกในการเลือกเมนูอาหาร!!!
          </p>
        </div>
      </footer>
    </div>
  );
}

// Commit1