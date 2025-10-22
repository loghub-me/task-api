import { convertToWebpAndUploadImage, writeBufferToS3 } from '@/lib/image';
import { generateAvatarBuffer } from '@/lib/avatar';

export abstract class AvatarService {
  static async generateAvatar(userId: number) {
    const path = `${userId}/avatar.webp`;
    const buffer = await generateAvatarBuffer({ seed: userId.toString() });
    await writeBufferToS3(buffer, path);
    return { data: path };
  }

  static async uploadAvatar(file: File, userId: number) {
    if (!file.type.startsWith('image/')) {
      throw new Error('Invalid file type');
    }

    const path = `${userId}/avatar.webp`;
    await convertToWebpAndUploadImage(file, path);
    return { data: path };
  }
}
