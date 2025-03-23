// src/components/RoomLobby/RoomLobby.tsx
'use client';

import React, {useState, useEffect, useRef} from 'react';
import {Card} from '../ui/Card';
import {Button} from '../ui/Button';

interface Participant {
    userId: string;
    username: string;
    isHost: boolean;
    ready: boolean;
}

interface RoomLobbyProps {
    participants: Participant[],
    roomId: string,
    isHost: boolean,
    onNext: () => void,
    showStartButton?: boolean,
    maxMembers?: number,
    foodOptions?: number
}

interface FoodCategory {
    id: string;
    name: string;
}

// FoodItem with color property for animation
interface FoodItem {
    id: string;
    name: string;
    color: string;
}

const restaurantOptions = [
    'McDonald\'s', 'KFC', 'Pizza Hut', 'Burger King', 'Subway', 'Starbucks', 'Taco Bell',
    'Domino\'s', 'Dunkin\'', 'Popeyes', 'LekYai', 'Teaw', 'PadKraPrao', 'Bonchon', 'EatAmAre', 'Sizler'
];

const foodCategories: FoodCategory[] = [
    {id: 'thai', name: 'อาหารไทย'},
    {id: 'japanese', name: 'อาหารญี่ปุ่น'},
    {id: 'chinese', name: 'อาหารจีน'},
    {id: 'italian', name: 'อาหารอิตาเลียน'},
    {id: 'fastfood', name: 'ฟาสต์ฟู้ด'},
    {id: 'dessert', name: 'ของหวาน'},
    {id: 'cafe', name: 'คาเฟ่'},
    {id: 'korean', name: 'อาหารเกาหลี'},
    {id: 'indian', name: 'อาหารอินเดีย'},
    {id: 'vietnamese', name: 'อาหารเวียดนาม'},
];

const RoomLobby: React.FC<RoomLobbyProps> = ({
                                                 participants,
                                                 isHost,
                                                 onNext,
                                                 showStartButton = false
                                             }) => {
    const [copySuccess] = useState<string>('');
    const [isUserReady, setIsUserReady] = useState<boolean>(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // Animation state
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [displayItems, setDisplayItems] = useState<FoodItem[]>([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
    const [showResultPopup, setShowResultPopup] = useState<boolean>(false);
    const animationRef = useRef<number | null>(null);
    const speedRef = useRef<number>(30);
    const frameRef = useRef<number>(0);
    const animationDurationRef = useRef<number>(3000); // 3 seconds
    const startTimeRef = useRef<number>(0);

    // Get random color for animation items
    const getRandomColor = (): string => {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 70%, 65%)`;
    };

    // Prepare food items with colors
    const prepareFoodItems = (): FoodItem[] => {
        return restaurantOptions.map(restaurant => ({
            id: restaurant.replace(/\s+/g, '-').toLowerCase(),
            name: restaurant,
            color: getRandomColor()
        }));
    };

    // Shuffle array helper
    const shuffleArray = <T,>(array: T[]): T[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    // Start animation
    const startAnimation = (): void => {
        if (isAnimating) return;

        // Hide any previous result popup
        setShowResultPopup(false);
        setSelectedRestaurant(null);

        const preparedItems = prepareFoodItems();

        // Create a longer array for smooth animation
        const repeatedItems: FoodItem[] = [];
        for (let i = 0; i < 10; i++) {
            repeatedItems.push(...shuffleArray([...preparedItems]));
        }

        setDisplayItems(repeatedItems);
        setIsAnimating(true);
        speedRef.current = 30; // Initial speed
        frameRef.current = 0;
        startTimeRef.current = Date.now();

        // Start animation
        animationRef.current = requestAnimationFrame(updateAnimation);
    };

    // Update animation frame - now horizontal right to left
    const updateAnimation = (): void => {
        const elapsed = Date.now() - startTimeRef.current;
        const progress = Math.min(elapsed / animationDurationRef.current, 1);

        // Gradually slow down animation
        const speed = Math.max(1, Math.floor(30 * (1 - progress * 0.9)));

        if (frameRef.current % speed === 0) {
            // Shift items one by one - right to left
            setDisplayItems(prev => {
                const newItems = [...prev];
                newItems.push(newItems.shift() as FoodItem);
                return newItems;
            });
        }

        frameRef.current++;

        // Check if animation should stop
        if (progress >= 1) {
            stopAnimation();
            return;
        }

        animationRef.current = requestAnimationFrame(updateAnimation);
    };

    // Stop animation and display result
    const stopAnimation = (): void => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }

        // Get middle item as result
        const middleIndex = Math.floor(displayItems.length / 2) % restaurantOptions.length;
        const selectedItem = displayItems[middleIndex];

        // Make sure we have a valid item
        if (selectedItem) {
            setSelectedRestaurant(selectedItem.name);
            // Force a small delay before showing popup to ensure state is updated
            setTimeout(() => {
                setIsAnimating(false);
                setShowResultPopup(true);
            }, 100);
        } else {
            // Fallback if somehow we don't have an item
            const randomIndex = Math.floor(Math.random() * restaurantOptions.length);
            setSelectedRestaurant(restaurantOptions[randomIndex]);
            setTimeout(() => {
                setIsAnimating(false);
                setShowResultPopup(true);
            }, 100);
        }
    };

    // Clean up animation on unmount
    useEffect(() => {
        return () => {
            if (animationRef.current !== null) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    const toggleCategory = (categoryId: string) => {
        // Only allow toggling if user is not ready
        if (!isUserReady) {
            setSelectedCategories(prev => {
                if (prev.includes(categoryId)) {
                    return prev.filter(id => id !== categoryId);
                } else {
                    return [...prev, categoryId];
                }
            });
        }
    };

    const toggleReady = () => {
        setIsUserReady(!isUserReady);
    };

    // Ensure we have items when component loads
    useEffect(() => {
        if (displayItems.length === 0) {
            setDisplayItems(prepareFoodItems());
        }
    }, []);

    // Make sure visibleItems always has items even before animation
    // Visible items for animation (show 7 in horizontal row)
    const visibleItems = displayItems.length > 0
        ? displayItems.slice(0, 7)
        : prepareFoodItems().slice(0, 7);

    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{
                backgroundImage: `url("https://i.pinimg.com/1200x/13/75/0d/13750d8970141cab1ab2a703d950fb75.jpg")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Card className="p-6 max-w-4xl w-full mx-auto bg-white bg-opacity-90 shadow-lg rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">ผู้เข้าร่วมห้อง</h3>
                    <div className="flex space-x-2 items-center">
                        <div className="relative">
                            {copySuccess && (
                                <div
                                    className="absolute right-0 mt-2 bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
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

                {/* Food Filter Section */}
                <div className="mb-6">
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
                                    } transition-colors ${isUserReady ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    disabled={isUserReady}
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
                                {isUserReady && (
                                    <span className="text-sm text-yellow-600 ml-2">
                                        (ไม่สามารถเปลี่ยนแปลงได้หลังจากเตรียมพร้อม)
                                    </span>
                                )}
                            </div>
                            <Button
                                onClick={toggleReady}
                                className={`${isUserReady ? 'bg-green-500' : 'bg-yellow-500'} text-white px-6`}
                            >
                                {isUserReady ? 'พร้อมแล้ว ✓' : 'กดเมื่อพร้อม'}
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* รายชื่อผู้เข้าร่วม */}
                <div className="grid grid-cols-1 gap-3 mb-6">
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

                {/* Animation Section - now HORIZONTAL from right to left */}
                <div className="mt-6 text-center">
                    <h3 className="text-lg font-bold mb-4">สุ่มร้านอาหาร</h3>

                    <div className="relative h-20 overflow-hidden bg-gray-800 rounded-lg mb-4">
                        {/* Center marker line - vertical red line */}
                        <div className="absolute top-0 left-1/2 w-1 h-full bg-red-500 z-10 transform -translate-x-1/2"></div>

                        {/* Flashing effect during animation */}
                        <div className={`absolute inset-0 bg-white opacity-0 ${isAnimating ? 'animate-pulse' : ''}`}></div>

                        {/* Container for horizontally spinning items */}
                        <div className="flex flex-row justify-center items-center h-full">
                            {visibleItems.map((item, index) => (
                                <div
                                    key={`${item.id}-${index}`}
                                    className="h-16 w-32 mx-1 flex items-center justify-center text-center rounded-lg transition-all duration-300"
                                    style={{
                                        backgroundColor: item.color,
                                        transform: `scale(${index === 3 ? 1.1 : 0.9}) translateY(${index === 3 ? 0 : index < 3 ? -5 : 5}px)`,
                                        opacity: Math.max(0.3, 1 - Math.abs(index - 3) * 0.2)
                                    }}
                                >
                                    <span className="text-lg font-bold">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button
                        onClick={startAnimation}
                        className="bg-yellow-500 text-white px-6 py-2 text-lg"
                        disabled={isAnimating}
                    >
                        {isAnimating ? 'กำลังสุ่ม...' : 'เริ่มสุ่ม !'}
                    </Button>
                </div>
            </Card>

            {/* Result Popup - Center of screen */}
            {showResultPopup && selectedRestaurant && (
                <div className="fixed inset-0 flex items-center justify-center z-50 ">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center transform transition-all animate-bounce-once">
                        <div className="text-2xl font-bold mb-4">🎉 ผลการสุ่ม 🎉</div>
                        <div className="text-3xl font-extrabold text-red-300 my-6">
                            {selectedRestaurant}
                        </div>
                        <Button
                            onClick={() => setShowResultPopup(false)}
                            className="bg-green-500 text-white px-6 py-2 mt-4 hover:bg-green-600 transition-colors"
                        >
                            ตกลง
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomLobby;