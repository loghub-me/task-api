import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { authPlugin } from '~/plugins/auth';
import { markdown } from '~/modules/markdown';
import { image } from '~/modules/image';
import { avatar } from '~/modules/avatar';
import { pinoLogger } from '~/lib/log';

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
  .decorate({ log: pinoLogger })
  .onError(({ error, log }) => {
    if (!log) {
      console.error('An error occurred but no logger is available:', error);
      return;
    }

    if (error instanceof Error) {
      log.error(`${error.name}: ${error.message}`);
    } else {
      log.error(error, 'An unexpected error occurred');
    }
  })
  .use(authPlugin)
  .use(avatar)
  .use(image)
  .use(markdown)
  .listen(Bun.env.PORT || 3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
