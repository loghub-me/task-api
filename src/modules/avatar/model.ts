import { t } from 'elysia';

export namespace AvatarModel {
  export const uploadRequest = t.Object({ file: t.File({ type: ['image/jpeg', 'image/png', 'image/gif'] }) });
  export const uploadResponse = t.Object({ data: t.String() });

  export const renameRequest = t.Object({
    oldUsername: t.String(),
    newUsername: t.String(),
  });
  export const renameResponse = t.Object({ data: t.String() });
}
