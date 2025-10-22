import { convertToWebpAndUploadImage } from '@/lib/image';

export abstract class ImageService {
  static async upload(file: File, userId: number) {
    if (!file.type.startsWith('image/')) {
      throw new Error('Invalid file type');
    }

    const filename = file.name
      .replace(/\.[^/.]+$/, '') // 확장자 제거
      .replace(/[^a-zA-Z0-9_-]/g, '') // 허용되지 않은 문자 제거
      .substring(0, 20); // 최대 길이 20자
    const path = `${userId}/${Date.now()}_${filename}.webp`;
    await convertToWebpAndUploadImage(file, path);
    return { path };
  }
}
