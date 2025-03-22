import { NextResponse } from 'next/server';

// Import our mock database (in a real app, you'd use a real database)
// This is just for demonstration
const rooms: Record<string, any> = {};

export async function GET(
  request: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const { roomId } = params;
    
    if (!roomId) {
      return NextResponse.json(
        { message: 'ต้องระบุรหัสห้อง' },
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
    
    return NextResponse.json(rooms[roomId]);
  } catch (error) {
    console.error('Error getting room:', error);
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดในการดึงข้อมูลห้อง' },
      { status: 500 }
    );
  }
}