import { Elysia } from 'elysia';
import { bearer } from '@elysiajs/bearer';
import { userPayload } from '~/schemas/auth';
import jwt from '@elysiajs/jwt';

export const authJwtPlugin = new Elysia({ name: 'auth/jwt' })
  .use(bearer())
  .use(jwt({ name: 'jwt', alg: 'HS512', secret: Bun.env.JWT_SECRET!! }))
  .derive({ as: 'scoped' }, async ({ bearer, jwt }) => ({ user: await jwt.verify(bearer) }))
  .resolve({ as: 'scoped' }, async ({ user, status }) => {
    const parsed = await userPayload.safeParseAsync(user);

    if (!parsed.success) {
      return status(401, 'Invalid Token');
    }

    return { user: parsed.data };
  });
