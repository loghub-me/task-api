import { Elysia } from 'elysia';
import { MarkdownService } from '~/modules/markdown/service';
import { MarkdownModel } from '~/modules/markdown/model';

export const markdown = new Elysia({ prefix: '/markdown' }).post(
  '/parse',
  ({ body: { markdown } }) => MarkdownService.parse(markdown),
  {
    body: MarkdownModel.parseRequest,
    response: { 200: MarkdownModel.parseResponse },
  }
);
