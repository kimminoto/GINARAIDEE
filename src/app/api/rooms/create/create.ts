import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

// Mock database for storing rooms (in a real app, you'd use a real database)
const rooms: Record<string, any> = {};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;
    
    if (!name) {
      return NextResponse.json(
        { message: 'ชื่อไม่สามารถว่างได้' },
        { status: 400 }
      );
    }
    
    // Create a new room with a random ID
    const roomId = randomUUID().substring(0, 6);
    const userId = randomUUID();
    
    const newRoom = {
      id: roomId,
      name: `ห้องของ ${name}`,
      owner: userId,
      createdAt: new Date().toISOString(),
      users: [
        {
          id: userId,
          name,
        }
      ],
      settings: {
        categories: [],
        priceRange: 'any',
        dietary: [],
      }
    };
    
    // Save room to our mock database
    rooms[roomId] = newRoom;
    
    return NextResponse.json({ roomId, userId });
  } catch (error) {
    console.error('Error creating room:', error);
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดในการสร้างห้อง' },
      { status: 500 }
    );
  }
}