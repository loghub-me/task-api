import { convertToWebpAndUploadImage } from '@/lib/image';

export abstract class ImageService {
  static async upload(file: File, userId: number) {
    if (!file.type.startsWith('image/')) {
      throw new Error('Invalid file type');
    }

    const filename = file.name.replace(/\.[^/.]+$/, '');
    const path = `${userId}/${Date.now()}_${filename}.webp`;
    await convertToWebpAndUploadImage(file, path);
    return { path };
  }
}
