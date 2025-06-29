import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '../../../../../../../lib/cloudinary';
import { Readable } from 'stream';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ oldImageName: string }> }
): Promise<NextResponse> {
  try {
    const { oldImageName } = await params;

    const formData = await req.formData();
    const file = formData.get('image') as File;
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const publicId = file.name.replace(/\.[^/.]+$/, '');

    if (oldImageName && oldImageName !== 'undefined') {
      const oldPublicId = oldImageName.replace(/\.[^/.]+$/, '');
      await cloudinary.uploader.destroy(`portfolio/skills/backend/${oldPublicId}`);
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'portfolio/skills/backend',
          public_id: publicId,
          overwrite: true,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      Readable.from(buffer).pipe(uploadStream);
    });

    return NextResponse.json({ success: true, data: uploadResult });
  } catch (err) {
    console.error('Cloudinary update error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}