import { Elysia } from 'elysia';
import { AvatarService } from '~/modules/avatar/service';
import { AvatarModel } from '~/modules/avatar/model';
import { authPlugin } from '~/plugins/auth';

export const avatar = new Elysia({ prefix: '/avatar' })
  .use(authPlugin)
  .post('/upload', ({ body: { file, username } }) => AvatarService.uploadAvatar(file, username), {
    body: AvatarModel.uploadRequest,
    response: { 200: AvatarModel.uploadResponse },
  })
  .post('/rename', ({ body: { oldUsername, newUsername } }) => AvatarService.renameAvatar(oldUsername, newUsername), {
    body: AvatarModel.renameRequest,
    response: { 200: AvatarModel.renameResponse },
  });
