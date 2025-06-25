import { Elysia } from 'elysia';
import { authJwtPlugin } from '~/plugins/auth/jwt';
import { UserService } from '~/modules/avatar/service';
import { AvatarModel } from '~/modules/avatar/model';
import { authInternalPlugin } from '~/plugins/auth/internal';

export const avatar = new Elysia({ prefix: '/avatar' })
  .group('', (app) =>
    app
      .use(authJwtPlugin)
      .post('/upload', ({ body: { file }, user }) => UserService.uploadAvatar(file, user.username), {
        body: AvatarModel.uploadRequest,
        response: { 200: AvatarModel.uploadResponse },
      })
  )
  .group('', (app) =>
    app
      .use(authInternalPlugin)
      .post('/rename', ({ body: { oldUsername, newUsername } }) => UserService.renameAvatar(oldUsername, newUsername), {
        body: AvatarModel.renameRequest,
        response: { 200: AvatarModel.renameResponse },
      })
  );
