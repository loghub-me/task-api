import { s3 } from 'bun';
import sharp from 'sharp';

export async function convertToWebpAndUploadImage(file: File, path: string) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const webpBuffer = await sharp(buffer).webp({ quality: 75 }).toBuffer();

  const s3file = s3.file(path);
  return s3file.write(webpBuffer, { type: 'image/webp' });
}
