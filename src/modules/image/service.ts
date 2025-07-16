import { convertToWebpAndUploadImage } from '~/lib/image/upload';

export abstract class ImageService {
  static async upload(file: File, userId: string) {
    if (!file.type.startsWith('image/')) {
      throw new Error('Invalid file type');
    }

    const path = `${userId}/${Date.now()}_${file.name.replace(/\.[^/.]+$/, '')}.webp`;
    await convertToWebpAndUploadImage(file, path);
    return { path };
  }
}
