import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

// Import our mock database (in a real app, you'd use a real database)
// This is just for demonstration
const rooms: Record<string, any> = {};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { roomId, name } = body;
    
    if (!roomId || !name) {
      return NextResponse.json(
        { message: 'ต้องระบุรหัสห้องและชื่อ' },
        { status: 400 }
      );
    }
    
    // Check if room exists
    if (!rooms[roomId]) {
      return NextResponse.json(
        { message: 'ไม่พบห้องที่ระบุ' },
        { status: 404 }
      );
    }
    
    // Create a user ID for the new user
    const userId = randomUUID();
    
    // Add user to the room
    rooms[roomId].users.push({
      id: userId,
      name,
    });
    
    // In a real implementation, you'd emit a socket event to notify others
    
    return NextResponse.json({ roomId, userId });
  } catch (error) {
    console.error('Error joining room:', error);
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดในการเข้าร่วมห้อง' },
      { status: 500 }
    );
  }
}