import z from 'zod';

export namespace AvatarModel {
  export const generateRequest = z.object({ userId: z.number() });
  export const generateResponse = z.object({ data: z.string() });

  export const uploadRequest = z.object({ file: z.file(), userId: z.coerce.number() });
  export const uploadResponse = z.object({ data: z.string() });
}
