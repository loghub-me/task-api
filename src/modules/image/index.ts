import { Elysia, status, t } from 'elysia';
import { ImageService } from '~/modules/image/service';
import { ImageModel } from '~/modules/image/model';
import jwt from '@elysiajs/jwt';
import { bearer } from '@elysiajs/bearer';

export const image = new Elysia({ prefix: '/image' })
  .use(bearer())
  .use(jwt({ name: 'jwt', alg: 'HS512', secret: Bun.env.JWT_SECRET!! }))
  .derive(async ({ bearer, jwt }) => {
    try {
      const payload = await jwt.verify(bearer);
      if (!payload || !payload['username'] || typeof payload['username'] !== 'string') {
        return status(400, 'Invalid username in token');
      }
      return { payload } as { payload: { username: string } };
    } catch {
      return status(401, 'Invalid Token');
    }
  })
  .post('/upload', ({ body: { file }, payload: { username } }) => ImageService.upload(file, username), {
    body: ImageModel.uploadRequest,
    response: {
      200: ImageModel.uploadResponse,
      400: t.String({ description: 'Invalid file type' }),
    },
  });
