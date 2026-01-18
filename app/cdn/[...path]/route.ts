import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }>}) {
  const pathSegments = (await params).path;
  const filePath = path.join(process.cwd(), 'public', 'cdn', ...pathSegments);

  if (!fs.existsSync(filePath)) {
    return new NextResponse('File not found', { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();

  console.log('✅ DATOTEKA PRONAĐENA, šaljem klijentu...');

  const mimeTypes: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
  };

  const contentType = mimeTypes[ext] || 'application/octet-stream';

  return new NextResponse(fileBuffer, {
    headers: { 
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    }
  });
}