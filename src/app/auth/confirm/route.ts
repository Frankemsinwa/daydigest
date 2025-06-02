// This route is no longer used as authentication has been removed.
// You can delete this file.
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));
}
