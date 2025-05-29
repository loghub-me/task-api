import sharp from 'sharp';
import { status } from 'elysia';
import { s3 } from 'bun';

export abstract class ImageService {
  static async upload(username: string, file: File) {
    if (!file.type.startsWith('image/')) {
      return status(400, 'Invalid file type');
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const webpBuffer = await sharp(buffer).webp({ quality: 75 }).toBuffer();

    const path = `${username}/${crypto.randomUUID()}_${file.name.replace(/\.[^/.]+$/, '')}.webp`;
    const s3file = s3.file(path);
    await s3file.write(webpBuffer, { type: 'image/webp' });
    return { data: path, message: '', status: 'CREATED' };
  }
}
