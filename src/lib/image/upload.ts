import { s3 } from 'bun';
import sharp from 'sharp';

export async function convertToWebpAndUploadImage(file: File, path: string) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const webpBuffer = await sharp(buffer).webp({ quality: 75 }).toBuffer();

  const s3file = s3.file(path);
  return s3file.write(webpBuffer, { type: 'image/webp' });
}

export async function renameS3File(oldPath: string, newPath: string) {
  const oldFile = s3.file(oldPath);
  const newFile = s3.file(newPath);

  const buffer = Buffer.from(await oldFile.arrayBuffer());

  await newFile.write(buffer);
  await oldFile.delete();

  return buffer;
}
