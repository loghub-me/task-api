import { convertToWebpAndUploadImage, renameS3File } from '~/lib/image/upload';

export abstract class UserService {
  static async uploadAvatar(file: File, username: string) {
    if (!file.type.startsWith('image/')) {
      throw new Error('Invalid file type');
    }

    const path = `${username}/avatar.webp`;
    await convertToWebpAndUploadImage(file, path);
    return { data: path };
  }

  static async renameAvatar(oldUsername: string, newUsername: string) {
    const oldPath = `${oldUsername}/avatar.webp`;
    const newPath = `${newUsername}/avatar.webp`;

    await renameS3File(oldPath, newPath);
    return { data: newPath };
  }
}
