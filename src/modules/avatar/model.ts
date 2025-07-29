import { t } from 'elysia';

export namespace AvatarModel {
  export const generateRequest = t.Object({ userId: t.Number() });
  export const generateResponse = t.Object({ data: t.String() });

  export const uploadRequest = t.Object({ file: t.File(), userId: t.String() });
  export const uploadResponse = t.Object({ data: t.String() });
}
