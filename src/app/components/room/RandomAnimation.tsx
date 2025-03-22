import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../ui/Card';

// Type definitions
interface Restaurant {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  restaurants?: Restaurant[];
}

interface PreparedCategory extends Category {
  color: string;
  restaurants: Restaurant[];
}

interface RandomAnimationProps {
  categories: Category[];
  onRandomComplete?: (results: PreparedCategory[]) => void;
  numResults?: number;
}

const RandomAnimation: React.FC<RandomAnimationProps> = ({ 
  categories, 
  onRandomComplete, 
  numResults = 2 
}) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<PreparedCategory[]>([]);
  const [displayItems, setDisplayItems] = useState<PreparedCategory[]>([]);
  const [finalResults, setFinalResults] = useState<PreparedCategory[]>([]);
  const animationRef = useRef<number | null>(null);
  const speedRef = useRef<number>(30);
  const frameRef = useRef<number>(0);
  const animationDurationRef = useRef<number>(3000); // 3 วินาที
  const startTimeRef = useRef<number>(0);

  // ฟังก์ชันเพื่อเตรียมข้อมูลสำหรับการสุ่ม
  const prepareItems = (): PreparedCategory[] => {
    if (!categories || categories.length === 0) return [];
    
    // สร้างรายการที่จะใช้สำหรับการสุ่ม โดยเพิ่มสีเป็น property
    return categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      color: getRandomColor(),
      restaurants: cat.restaurants || [
        { id: `${cat.id}-1`, name: `ร้าน ${cat.name} 1` },
        { id: `${cat.id}-2`, name: `ร้าน ${cat.name} 2` },
        { id: `${cat.id}-3`, name: `ร้าน ${cat.name} 3` },
        { id: `${cat.id}-4`, name: `ร้าน ${cat.name} 4` },
      ]
    }));
  };

  const getRandomColor = (): string => {
    // สร้างสีสุ่มที่สว่างพอที่จะใช้ตัวอักษรสีดำ
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 65%)`;
  };

  // เริ่มแอนิเมชัน
  const startAnimation = (): void => {
    if (isAnimating || !categories || categories.length === 0) return;
    
    // เตรียมข้อมูลสำหรับการสุ่ม
    const preparedItems = prepareItems();
    if (preparedItems.length === 0) return;
    
    // เตรียมผลลัพธ์สุดท้าย (สุ่มและเก็บไว้)
    const finalSelectedCategories = shuffleArray([...preparedItems]).slice(0, numResults);
    setFinalResults(finalSelectedCategories);
    
    // สร้างรายการที่ยาวพอสำหรับแอนิเมชัน
    const repeatedItems: PreparedCategory[] = [];
    for (let i = 0; i < 10; i++) {
      repeatedItems.push(...shuffleArray([...preparedItems]));
    }
    
    setDisplayItems(repeatedItems);
    setIsAnimating(true);
    speedRef.current = 30; // ตั้งค่าความเร็วเริ่มต้น
    frameRef.current = 0;
    startTimeRef.current = Date.now();
    
    // เริ่มแอนิเมชัน
    animationRef.current = requestAnimationFrame(updateAnimation);
  };

  // อัพเดทแอนิเมชัน
  const updateAnimation = (): void => {
    const elapsed = Date.now() - startTimeRef.current;
    const progress = Math.min(elapsed / animationDurationRef.current, 1);
    
    // ควบคุมความเร็วให้ช้าลงตามเวลาที่ผ่านไป
    const speed = Math.max(1, Math.floor(30 * (1 - progress * 0.9)));
    
    if (frameRef.current % speed === 0) {
      // เลื่อนรายการไปที่ละ 1
      setDisplayItems(prev => {
        const newItems = [...prev];
        newItems.push(newItems.shift() as PreparedCategory);
        return newItems;
      });
    }
    
    frameRef.current++;
    
    // ตรวจสอบว่าถึงเวลาหยุดหรือยัง
    if (progress >= 1) {
      stopAnimation();
      return;
    }
    
    animationRef.current = requestAnimationFrame(updateAnimation);
  };

  // หยุดแอนิเมชัน
  const stopAnimation = (): void => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    // แสดงผลลัพธ์สุดท้าย
    setIsAnimating(false);
    setSelectedCategories(finalResults);
    
    // แจ้งผลลัพธ์ไปยัง parent component
    if (typeof onRandomComplete === 'function') {
      onRandomComplete(finalResults);
    }
  };

  // ฟังก์ชันสุ่มลำดับรายการ
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // ล้างผลลัพธ์เมื่อคอมโพเนนต์ถูกทำลาย
  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Reset selections when categories change
  useEffect(() => {
    setSelectedCategories([]);
  }, [categories]);

  // คำนวณแถวของรายการที่จะแสดง (เหลือเพียง 7 รายการที่มองเห็นได้)
  const visibleItems = displayItems.slice(0, 7);

  return (
    <Card className="p-4 mb-4 relative overflow-hidden">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-xl font-bold">การสุ่มประเภทอาหาร</h3>
        <button
          onClick={startAnimation}
          disabled={isAnimating || !categories || categories.length === 0}
          className={`px-4 py-2 rounded ${
            isAnimating || !categories || categories.length === 0
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isAnimating ? 'กำลังสุ่ม...' : 'เริ่มสุ่ม'}
        </button>
      </div>

      {categories && categories.length > 0 ? (
        <>
          <div className="relative h-64 overflow-hidden bg-gray-800 rounded-lg">
            {/* เส้นแสดงตำแหน่งตรงกลาง */}
            <div className="absolute top-0 left-1/2 w-1 h-full bg-red-500 z-10 transform -translate-x-1/2"></div>
            
            {/* แสงกระพริบ */}
            <div className={`absolute inset-0 bg-white opacity-0 ${isAnimating ? 'animate-pulse' : ''}`}></div>
            
            {/* คอนเทนเนอร์สำหรับรายการที่กำลังสุ่ม */}
            <div className="flex flex-col justify-center items-center h-full">
              {visibleItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="random-item w-64 h-12 my-1 flex items-center justify-center text-center rounded-lg transition-all duration-300"
                  style={{
                    backgroundColor: item.color,
                    transform: `scale(${index === 3 ? 1.1 : 0.9}) translateX(${index === 3 ? 0 : index < 3 ? -20 : 20}px)`,
                    opacity: Math.max(0.3, 1 - Math.abs(index - 3) * 0.2)
                  }}
                >
                  <span className="text-lg font-bold">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* แสดงผลที่ได้จากการสุ่ม */}
          {selectedCategories.length > 0 && !isAnimating && (
            <div className="mt-4">
              <h4 className="font-bold mb-2">ผลการสุ่ม:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedCategories.map((cat) => (
                  <span
                    key={cat.id}
                    className="px-3 py-1 rounded-full text-black font-medium"
                    style={{ backgroundColor: cat.color }}
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
              
              {/* แสดงร้านอาหารจากหมวดหมู่ที่สุ่มได้ */}
              <div className="mt-4">
                <h4 className="font-bold mb-2">ร้านอาหารแนะนำ:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedCategories.flatMap(cat => 
                    cat.restaurants.slice(0, 2).map(restaurant => (
                      <div 
                        key={restaurant.id} 
                        className="p-2 rounded border border-gray-200 flex items-center"
                      >
                        <div 
                          className="w-4 h-4 rounded-full mr-2" 
                          style={{ backgroundColor: cat.color }}
                        ></div>
                        <span>{restaurant.name}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="py-10 text-center text-gray-500">
          ไม่มีหมวดหมู่อาหารให้สุ่ม กรุณาเพิ่มหมวดหมู่ก่อน
        </div>
      )}
    </Card>
  );
};

export default RandomAnimation;