import { convertToWebpAndUploadImage } from '~/lib/image/upload';

export abstract class ImageService {
  static async upload(file: File, username: string) {
    if (!file.type.startsWith('image/')) {
      throw new Error('Invalid file type');
    }

    const path = `${username}/${crypto.randomUUID()}_${file.name.replace(/\.[^/.]+$/, '')}.webp`;
    await convertToWebpAndUploadImage(file, path);
    return { data: path };
  }
}
