import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { markdown } from '~/modules/markdown';
import { image } from '~/modules/image';

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
  .use(markdown)
  .use(image)
  .listen(Bun.env.PORT || 8081);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
