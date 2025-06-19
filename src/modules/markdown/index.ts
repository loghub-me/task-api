import { Elysia, status } from 'elysia';
import { MarkdownService } from '~/modules/markdown/service';
import { MarkdownModel } from '~/modules/markdown/model';
import { bearer } from '@elysiajs/bearer';

export const markdown = new Elysia({ prefix: '/markdown' })
  .use(bearer())
  .derive(async ({ bearer }) => {
    if (bearer !== Bun.env.INTERNAL_TOKEN) {
      return status(401, 'Unauthorized');
    }
  })
  .post('/parse', ({ body: { markdown } }) => MarkdownService.parse(markdown), {
    body: MarkdownModel.parseRequest,
    response: { 200: MarkdownModel.parseResponse },
  });
