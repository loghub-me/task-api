import { Elysia } from 'elysia';
import { AvatarService } from '~/modules/avatar/service';
import { AvatarModel } from '~/modules/avatar/model';

export const avatar = new Elysia({ prefix: '/avatar' })
  .post('/generate', ({ body: { userId } }) => AvatarService.generateAvatar(userId), {
    body: AvatarModel.generateRequest,
    response: { 200: AvatarModel.generateResponse },
  })
  .post('/upload', ({ body: { file, userId } }) => AvatarService.uploadAvatar(file, userId), {
    body: AvatarModel.uploadRequest,
    response: { 200: AvatarModel.uploadResponse },
  });
