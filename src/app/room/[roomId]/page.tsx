'use client';

import { useSearchParams } from 'next/navigation';
import RoomLobby from '@/app/components/room/RoomLobby';

export default function RoomPage({ params }: { params: { roomId: string } }) {
    const searchParams = useSearchParams();
    const roomId = params.roomId;
    const nickname = searchParams.get('nickname') || 'Guest';

    // จำลองรายชื่อผู้เข้าร่วม
    const participants = [
        { userId: '1', username: nickname, isHost: true, ready: false }
    ];

    return (
        <RoomLobby participants={participants} roomId={roomId} isHost={true} onNext={() => {}} />
    );
}
