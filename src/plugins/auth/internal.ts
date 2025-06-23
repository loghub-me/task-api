import { Elysia } from 'elysia';
import { bearer } from '@elysiajs/bearer';

export const authInternalPlugin = new Elysia({ name: 'auth/internal' })
  .use(bearer())
  .derive(async ({ bearer, status }) => {
    if (bearer !== Bun.env.INTERNAL_TOKEN) {
      return status(401, 'Unauthorized');
    }
  });
