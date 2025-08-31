import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb/client';
import { RoomComponent } from '@/lib/mongoose/models/room-component.model';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { componentIds } = await request.json();

    if (!componentIds || !Array.isArray(componentIds)) {
      return NextResponse.json(
        { success: false, error: 'Component IDs are required' },
        { status: 400 }
      );
    }

    const components = await RoomComponent.find({
      _id: { $in: componentIds }
    });

    return NextResponse.json({
      success: true,
      components
    });

  } catch (error) {
    console.error('Error fetching room components:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch room components' },
      { status: 500 }
    );
  }
}