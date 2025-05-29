import { Elysia, status, t } from 'elysia';
import jwt from '@elysiajs/jwt';
import { cors } from '@elysiajs/cors';
import { ImageService } from './services/image';

const app = new Elysia()
  .use(
    cors({
      origin: Bun.env.CLIENT_HOST,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Authorization'],
      credentials: true,
      exposeHeaders: ['Authorization'],
      maxAge: 3600,
    })
  )
  .use(jwt({ name: 'jwt', alg: 'HS512', secret: Bun.env.JWT_SECRET!! }))
  .derive(async ({ jwt, headers }) => {
    const authHeader = headers['authorization'];
    if (!authHeader?.startsWith('Bearer ')) {
      return status(401, 'Unauthorized');
    }

    const token = authHeader.slice(7); // Remove Bearer

    if (token === Bun.env.INTERNAL_TOKEN) {
      return { isAuth: true };
    }

    try {
      const payload = await jwt.verify(token);
      return { isAuth: true, payload };
    } catch {
      return status(401, 'Invalid Token');
    }
  })
  .post(
    '/image/upload',
    ({ payload, body: { file } }) => {
      if (!payload || !payload.username || typeof payload.username !== 'string') {
        return status(400, 'Invalid payload');
      }
      return ImageService.upload(payload.username, file);
    },
    {
      body: t.Object({ file: t.File({ type: ['image/jpeg', 'image/png', 'image/gif'] }) }),
    }
  )
  .listen(Bun.env.PORT || 8081);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
