'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

// Define TypeScript interfaces for props and any other objects
interface FoodCategory {
  id: string;
  name: string;
}

interface FoodFilterProps {
  onFilterChange?: (categories: string[]) => void;
  onReadyChange?: (isReady: boolean) => void;
  isReady?: boolean;
  userId?: string | null;
  isHost?: boolean;
}

const FoodFilter: React.FC<FoodFilterProps> = ({ 
  onFilterChange = () => {}, 
  onReadyChange = () => {}, 
  isReady = false, 
  userId = null, 
  isHost = false 
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [ready, setReady] = useState<boolean>(isReady || false);
  
  const foodCategories: FoodCategory[] = [
    { id: 'thai', name: 'อาหารไทย' },
    { id: 'japanese', name: 'อาหารญี่ปุ่น' },
    { id: 'chinese', name: 'อาหารจีน' },
    { id: 'italian', name: 'อาหารอิตาเลียน' },
    { id: 'fastfood', name: 'ฟาสต์ฟู้ด' },
    { id: 'dessert', name: 'ของหวาน' },
    { id: 'cafe', name: 'คาเฟ่' },
    { id: 'korean', name: 'อาหารเกาหลี' },
    { id: 'indian', name: 'อาหารอินเดีย' },
    { id: 'vietnamese', name: 'อาหารเวียดนาม' },
  ];

  useEffect(() => {
    onFilterChange(selectedCategories);
  }, [selectedCategories, onFilterChange]);

  const toggleCategory = useCallback((categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  }, []);

  const toggleReady = useCallback(() => {
    const newReadyState = !ready;
    setReady(newReadyState);
    onReadyChange(newReadyState);
  }, [ready, onReadyChange]);

  return (
    <Card className="p-4 mb-4">
      <h3 className="text-lg font-bold mb-4">เลือกประเภทอาหารที่ต้องการ</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-4">
        {foodCategories.map(category => (
          <Button
            key={category.id}
            onClick={() => toggleCategory(category.id)}
            className={`${
              selectedCategories.includes(category.id)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800'
            } transition-colors`}
          >
            {category.name}
          </Button>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <span className="text-sm text-gray-600">
            เลือกแล้ว {selectedCategories.length} ประเภท
          </span>
        </div>
        <Button 
          onClick={toggleReady} 
          className={`${ready ? 'bg-green-500' : 'bg-yellow-500'} text-white px-6`}
        >
          {ready ? 'พร้อมแล้ว ✓' : 'กดเมื่อพร้อม'}
        </Button>
      </div>
    </Card>
  );
};

export default FoodFilter;
