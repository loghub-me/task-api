import { Elysia } from 'elysia';
import { ImageService } from '~/modules/image/service';
import { ImageModel } from '~/modules/image/model';

export const image = new Elysia({ prefix: '/image' }).post(
  '/upload',
  ({ body: { file, userId } }) => ImageService.upload(file, userId),
  {
    body: ImageModel.uploadRequest,
    response: { 200: ImageModel.uploadResponse },
  }
);
