import { Elysia } from 'elysia';
import { ImageService } from '~/modules/image/service';
import { ImageModel } from '~/modules/image/model';
import { authPlugin } from '~/plugins/auth';

export const image = new Elysia({ prefix: '/image' })
  .use(authPlugin)
  .post('/upload', ({ body: { file } }) => ImageService.upload(file), {
    body: ImageModel.uploadRequest,
    response: { 200: ImageModel.uploadResponse },
  });
