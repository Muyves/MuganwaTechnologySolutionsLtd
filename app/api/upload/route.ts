import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate mime type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files (JPEG, PNG, WEBP, etc.) are allowed' }, { status: 400 });
    }

    // Max 10MB limit
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds 10MB limit' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate safe unique filename
    const ext = path.extname(file.name) || '.jpg';
    const cleanName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 30);
    const fileName = `${Date.now()}-${cleanName}${ext}`;

    // Base64 data URL fallback (works 100% on Vercel and serverless where filesystem is read-only)
    const base64Data = buffer.toString('base64');
    const dataUrl = `data:${file.type};base64,${base64Data}`;

    let relativeUrl = dataUrl;

    // Try saving locally to public/uploads
    try {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await fs.mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, fileName);
      await fs.writeFile(filePath, buffer);
      relativeUrl = `/uploads/${fileName}`;
    } catch (fsErr) {
      console.warn('Filesystem write not available (serverless environment), falling back to data URL', fsErr);
    }

    return NextResponse.json({
      success: true,
      url: relativeUrl,
      dataUrl: dataUrl,
      fileName: fileName,
      fileSize: file.size,
      mimeType: file.type,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message || 'Failed to upload photo' }, { status: 500 });
  }
}
