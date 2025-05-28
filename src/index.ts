import { Elysia, status } from 'elysia';
import jwt from '@elysiajs/jwt';

const app = new Elysia()
  .use(jwt({ name: 'jwt', alg: 'HS512', secret: Bun.env.JWT_SECRET!! }))
  .derive(({ jwt, headers }) => {
    const authHeader = headers['authorization'];
    if (!authHeader?.startsWith('Bearer ')) {
      return status(401, 'Unauthorized');
    }

    const token = authHeader.slice(7); // Remove Bearer

    if (token === Bun.env.INTERNAL_TOKEN) {
      return { isAuth: true };
    }

    try {
      const payload = jwt.verify(token);
      return { isAuth: true, payload };
    } catch {
      return status(401, 'Invalid Token');
    }
  })
  .get('/', () => 'Hello Elysia')
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
