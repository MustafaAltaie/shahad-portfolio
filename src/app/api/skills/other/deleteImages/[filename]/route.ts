import { NextResponse } from 'next/server';
import cloudinary from '../../../../../../../lib/cloudinary';

interface Props { params: Promise<{ filename: string }> }

export async function DELETE(_: Request, props: Props) {
  try {
    const { filename } = await props.params;
    const publicId = `portfolio/skills/other/${filename.split('.')[0]}`;
    const { result } = await cloudinary.uploader.destroy(publicId, { resource_type: 'image', invalidate: true });
    if (result === 'ok') {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Deletion failed' }, { status: 500 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}