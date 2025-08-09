import { Elysia } from 'elysia';
import { bearer } from '@elysiajs/bearer';

export const authPlugin = new Elysia({ name: 'auth' })
  .use(bearer())
  .derive({ as: 'global' }, async ({ bearer, status }) => {
    if (bearer !== Bun.env.INTERNAL_TOKEN) {
      return status(401, 'Unauthorized');
    }
  });
