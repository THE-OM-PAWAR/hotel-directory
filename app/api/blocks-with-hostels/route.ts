import { NextResponse } from 'next/server';
import { getBlocksWithHostels } from '@/lib/services/block.service';

export async function GET() {
  try {
    const blocks = await getBlocksWithHostels();
    return NextResponse.json({ blocks });
  } catch (error) {
    console.error('Error fetching blocks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blocks' },
      { status: 500 }
    );
  }
}
