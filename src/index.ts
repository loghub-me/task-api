import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { authPlugin } from '~/plugins/auth';
import { markdown } from '~/modules/markdown';
import { image } from '~/modules/image';
import { avatar } from '~/modules/avatar';
import { mail } from '~/modules/mail';

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
  .use(authPlugin)
  .use(markdown)
  .use(image)
  .use(avatar)
  .use(mail)
  .listen(Bun.env.PORT || 8081);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
