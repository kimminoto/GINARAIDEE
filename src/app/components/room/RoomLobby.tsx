import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface Participant {
  userId: string;
  username: string;
  isHost: boolean;
  ready: boolean;
}

interface RoomLobbyProps {
  participants: Participant[];
  roomId: string;
  isHost: boolean;
  onNext: () => void;
  showStartButton?: boolean;
}

const restaurantOptions = [
  'McDonald\'s', 'KFC', 'Pizza Hut', 'Burger King', 'Subway', 'Starbucks', 'Taco Bell', 'Domino\'s', 'Dunkin\'', 'Popeyes', 'LekYai', 'Teaw', 'PadKraPrao', 'Bonchon', 'Japan', 'Korean', 'Eat Am Are', 'Sizler'
];

const RoomLobby: React.FC<RoomLobbyProps> = ({
                                               participants,
                                               roomId,
                                               isHost,
                                               onNext,
                                               showStartButton = false
                                             }) => {
  const [copySuccess, setCopySuccess] = useState<string>('');
  const [spinning, setSpinning] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [displayedOptions, setDisplayedOptions] = useState<string[]>([]);

    useEffect(() => {
        if (spinning) {
            const interval = setInterval(() => {
                setDisplayedOptions(generateRandomSequence());
            }, 100 );

            setTimeout(() => {
                clearInterval(interval);
                const finalPick = restaurantOptions[Math.floor(Math.random() * restaurantOptions.length)];
                setSelectedRestaurant(finalPick);
                setSpinning(false);
            }, 4000);
        }
    }, [spinning]);


    const generateRandomSequence = () => {
    return Array.from({ length: 30 }, () =>
        restaurantOptions[Math.floor(Math.random() * restaurantOptions.length)]
    );
  };

  const handleCopyRoomCode = (): void => {
    navigator.clipboard.writeText(roomId)
        .then(() => {
          setCopySuccess('คัดลอกรหัสห้องแล้ว!');
          setTimeout(() => setCopySuccess(''), 2000);
        })
        .catch(err => {
          console.error('ไม่สามารถคัดลอกข้อความได้: ', err);
        });
  };

  const handleOpenCase = () => {
    setSpinning(true);
    setDisplayedOptions(generateRandomSequence());

    setTimeout(() => {
      const finalPick = restaurantOptions[Math.floor(Math.random() * restaurantOptions.length)];
      setSelectedRestaurant(finalPick);
      setSpinning(false);
    }, 4000);
  };

  return (
      <Card className="p-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">ผู้เข้าร่วมห้อง</h3>
          <div className="flex space-x-2 items-center">
            <div className="relative">
              <Button onClick={handleCopyRoomCode} className="bg-blue-500 text-white">
                คัดลอกรหัสห้อง
              </Button>
              {copySuccess && (
                  <div className="absolute right-0 mt-2 bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                    {copySuccess}
                  </div>
              )}
            </div>
            {showStartButton && (
                <Button onClick={onNext} className="bg-green-500 text-white">
                  เริ่มการสุ่ม
                </Button>
            )}
            {!showStartButton && isHost && participants.length >= 2 && (
                <Button onClick={onNext} className="bg-blue-500 text-white">
                  ต่อไป
                </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {participants.map((participant) => (
              <div
                  key={participant.userId}
                  className={`p-3 rounded-lg border flex items-center ${
                      participant.ready ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                  }`}
              >
                <div className={`w-3 h-3 rounded-full mr-3 ${
                    participant.ready ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
                <div className="flex-grow">
                  <p className="font-medium">{participant.username}</p>
                  <p className="text-sm text-gray-500">
                    {participant.isHost ? 'เจ้าของห้อง' : 'ผู้เข้าร่วม'}
                  </p>
                </div>
                <div className="text-sm">
                  {participant.ready ? 'พร้อมแล้ว' : 'ยังไม่พร้อม'}
                </div>
              </div>
          ))}
        </div>

        {/* สุ่มแบบ CS:GO */}
        <div className="mt-6 text-center">
          <h3 className="text-lg font-bold">สุ่มร้านอาหาร</h3>
          <div className="overflow-hidden border border-gray-300 rounded-lg w-full max-w-md mx-auto relative mt-2">
            <div className="flex transition-transform duration-1000 ease-out"
                 style={{
                     transform: `translateX(-${spinning ? 1000 : 0}px)`,
                     transition: spinning ? "transform 3s cubic-bezier(0.1, 0.57, 0.1, 1)" : "none",
                 }}>
              {displayedOptions.map((restaurant, index) => (
                  <div key={index} className="p-3 w-32 text-center border-r border-gray-200 bg-white">
                    {restaurant}
                  </div>
              ))}
            </div>
          </div>
          <Button onClick={handleOpenCase} className="bg-blue-500 text-white mt-4" disabled={spinning}>
            เริ่มสุ่ม !
          </Button>
          {selectedRestaurant && (
              <div className="mt-4 text-lg font-semibold text-green-600">
                🎉 คุณได้ทาน {selectedRestaurant}!
              </div>
          )}
        </div>
      </Card>
  );
};

export default RoomLobby;