import { t } from 'elysia';

export namespace ImageModel {
  export const uploadRequest = t.Object({ file: t.File({ type: ['image/jpeg', 'image/png', 'image/gif'] }) });
  export const uploadResponse = t.Object({ data: t.String() });
}
