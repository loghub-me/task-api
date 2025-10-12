import { Elysia } from 'elysia';
import { MarkdownService } from '@/modules/markdown/service';
import { MarkdownModel } from '@/modules/markdown/model';

export const markdown = new Elysia({ prefix: '/markdown' }).post(
  '/render',
  ({ body: { markdown } }) => MarkdownService.render(markdown),
  {
    body: MarkdownModel.renderRequest,
    response: { 200: MarkdownModel.renderResponse },
  }
);
