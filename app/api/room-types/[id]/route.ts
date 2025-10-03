import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb/client';
import { RoomType } from '@/lib/mongoose/models/room-type.model';
import { RoomComponent } from '@/lib/mongoose/models/room-component.model';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const roomTypes = await RoomType.find({ blockId: params.id }).lean();

    if (!roomTypes || roomTypes.length === 0) {
      return NextResponse.json({ roomTypes: [] });
    }

    const roomTypesWithComponents = await Promise.all(
      roomTypes.map(async (roomType: any) => {
        if (roomType.components && roomType.components.length > 0) {
          const components = await RoomComponent.find({
            _id: { $in: roomType.components }
          }).lean();

          return {
            ...roomType,
            components
          };
        }

        return {
          ...roomType,
          components: []
        };
      })
    );

    return NextResponse.json({ roomTypes: roomTypesWithComponents });
  } catch (error) {
    console.error('Error fetching room types:', error);
    return NextResponse.json(
      { error: 'Failed to fetch room types' },
      { status: 500 }
    );
  }
}
