import { convertToWebpAndUploadImage } from '~/lib/image/upload';

export abstract class ImageService {
  static async upload(file: File) {
    if (!file.type.startsWith('image/')) {
      throw new Error('Invalid file type');
    }

    const path = `images/${crypto.randomUUID()}_${file.name.replace(/\.[^/.]+$/, '')}.webp`;
    await convertToWebpAndUploadImage(file, path);
    return { data: path };
  }
}
