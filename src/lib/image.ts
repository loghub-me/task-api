import { s3 } from 'bun';
import sharp from 'sharp';

async function convertToWebpAndUploadImage(file: File, path: string) {
  const webpBuffer = await convertToWebp(file);
  return writeBufferToS3(webpBuffer, path);
}

async function convertToWebp(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  return sharp(buffer).webp({ quality: 75 }).toBuffer();
}

async function writeBufferToS3(buffer: Buffer, path: string) {
  const s3file = s3.file(path);
  return s3file.write(buffer, { type: 'image/webp' });
}

export { convertToWebpAndUploadImage, writeBufferToS3 };
