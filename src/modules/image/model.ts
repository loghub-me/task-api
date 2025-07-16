import { t } from 'elysia';

export namespace ImageModel {
  export const uploadRequest = t.Object({ file: t.File(), userId: t.String() });
  export const uploadResponse = t.Object({ path: t.String() });
}
