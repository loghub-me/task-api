import { Elysia } from 'elysia';
import { MarkdownService } from '~/modules/markdown/service';
import { MarkdownModel } from '~/modules/markdown/model';
import { authInternalPlugin } from '~/plugins/auth/internal';

export const markdown = new Elysia({ prefix: '/markdown' })
  .use(authInternalPlugin)
  .post('/parse', ({ body: { markdown } }) => MarkdownService.parse(markdown), {
    body: MarkdownModel.parseRequest,
    response: { 200: MarkdownModel.parseResponse },
  });
