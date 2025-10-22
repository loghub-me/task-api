import z from 'zod';

export namespace ImageModel {
  export const uploadRequest = z.object({ file: z.file(), userId: z.coerce.number() });
  export const uploadResponse = z.object({ path: z.string() });
}
