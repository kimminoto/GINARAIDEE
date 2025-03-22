import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface RoomSettingsData {
  maxParticipants: number;
  resultCount: number;
  waitTime: number;
  showRestaurantDetails: boolean;
}

interface RoomSettingsProps {
  currentSettings?: RoomSettingsData;
  onSaveSettings: (settings: RoomSettingsData) => void;
  onClose: () => void;
}

const RoomSettings: React.FC<RoomSettingsProps> = ({ 
  currentSettings, 
  onSaveSettings, 
  onClose 
}) => {
  const [settings, setSettings] = useState<RoomSettingsData>({
    maxParticipants: currentSettings?.maxParticipants || 6,
    resultCount: currentSettings?.resultCount || 2,
    waitTime: currentSettings?.waitTime || 5,
    showRestaurantDetails: currentSettings?.showRestaurantDetails !== undefined 
      ? currentSettings.showRestaurantDetails 
      : true,
  });

  const handleChange = (field: keyof RoomSettingsData, value: string | boolean): void => {
    setSettings({
      ...settings,
      [field]: field === 'showRestaurantDetails' ? value : parseInt(value as string),
    });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSaveSettings(settings);
  };

  return (
    <Card className="p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">ตั้งค่าห้อง</h3>
        <Button onClick={onClose} className="bg-gray-300 text-gray-700">
          ปิด
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              จำนวนผู้เข้าร่วมสูงสุด
            </label>
            <div className="flex items-center">
              <Input
                type="range"
                min="2"
                max="10"
                value={settings.maxParticipants}
                onChange={(e) => handleChange('maxParticipants', e.target.value)}
                className="w-full mr-3"
              />
              <span className="text-lg font-medium w-8 text-center">{settings.maxParticipants}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              จำนวนประเภทอาหารที่จะสุ่มได้
            </label>
            <div className="flex items-center">
              <Input
                type="range"
                min="1"
                max="5"
                value={settings.resultCount}
                onChange={(e) => handleChange('resultCount', e.target.value)}
                className="w-full mr-3"
              />
              <span className="text-lg font-medium w-8 text-center">{settings.resultCount}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              เวลารอก่อนแสดงผลลัพธ์ (วินาที)
            </label>
            <div className="flex items-center">
              <Input
                type="range"
                min="3"
                max="10"
                value={settings.waitTime}
                onChange={(e) => handleChange('waitTime', e.target.value)}
                className="w-full mr-3"
              />
              <span className="text-lg font-medium w-8 text-center">{settings.waitTime}</span>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showRestaurantDetails"
              checked={settings.showRestaurantDetails}
              onChange={(e) => handleChange('showRestaurantDetails', e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="showRestaurantDetails" className="ml-2 block text-sm text-gray-700">
              แสดงรายละเอียดร้านอาหารในผลลัพธ์
            </label>
          </div>
        </div>

        <div className="mt-6">
          <Button type="submit" className="w-full bg-blue-500 text-white">
            บันทึกการตั้งค่า
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default RoomSettings;