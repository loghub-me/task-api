import { z } from 'zod';

export const userPayload = z.object({
  username: z.string(),
  nickname: z.string(),
  role: z.enum(['MEMBER', 'ADMIN', 'BOT']),
});
