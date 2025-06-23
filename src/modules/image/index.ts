import { Elysia, t } from 'elysia';
import { ImageService } from '~/modules/image/service';
import { ImageModel } from '~/modules/image/model';
import { authJwtPlugin } from '~/plugins/auth/jwt';

export const image = new Elysia({ prefix: '/image' })
  .use(authJwtPlugin)
  .post('/upload', ({ body: { file }, user }) => ImageService.upload(file, user.username), {
    body: ImageModel.uploadRequest,
    response: {
      200: ImageModel.uploadResponse,
      400: t.String({ description: 'Invalid file type' }),
    },
  });
