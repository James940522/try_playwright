import { NextRequest, NextResponse } from 'next/server';
import { PlaywrightService } from '@/entities';

const playwrightService = new PlaywrightService();

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    const result = await playwrightService.startRecording(url);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to start recording' },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { sessionId } = await request.json();
    const result = await playwrightService.stopRecording(sessionId);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to stop recording' },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get('sessionId');
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 },
      );
    }
    const result = await playwrightService.getRecordingStatus(sessionId);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get recording status' },
      { status: 500 },
    );
  }
}
