import { convertToWebpAndUploadImage } from '~/lib/image/upload';

export abstract class AvatarService {
  static async generateAvatar(username: string) {
    const path = `${username}/avatar.webp`;
    // TODO
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
