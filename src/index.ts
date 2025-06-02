import { Elysia, status, t } from 'elysia';
import jwt from '@elysiajs/jwt';
import { cors } from '@elysiajs/cors';
import { ImageService } from '~/services/image';
import { MarkdownService } from '~/services/markdown';

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
      return { authType: 'INTERNAL' } as AuthReturn;
    }

    try {
      const payload = await jwt.verify(token);
      return { payload, authType: 'JWT' } as AuthReturn;
    } catch {
      return status(401, 'Invalid Token');
    }
  })
  .post(
    '/image/upload',
    ({ payload, body: { file } }) => {
      if (!payload || payload.authType !== 'JWT') {
        return status(401, 'Unauthorized');
      }
      if (!payload.username || typeof payload.username !== 'string') {
        return status(400, 'Invalid username in token');
      }
      return ImageService.upload(payload.username, file);
    },
    {
      body: t.Object({ file: t.File({ type: ['image/jpeg', 'image/png', 'image/gif'] }) }),
    }
  )
  .post(
    '/markdown/parse',
    ({ body: { markdown }, authType }) => {
      if (authType !== 'INTERNAL') {
        return status(403, 'Forbidden');
      }
      return MarkdownService.parse(markdown);
    },
    {
      body: t.Object({ markdown: t.Union([t.String(), t.Array(t.String())]) }),
    }
  )
  .listen(Bun.env.PORT || 8081);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
