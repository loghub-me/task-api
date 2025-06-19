import { t } from 'elysia';

export namespace MarkdownModel {
  export const parseRequest = t.Object({ markdown: t.Union([t.String(), t.Array(t.String())]) });
  export const parseResponse = t.Object({ html: t.Union([t.String(), t.Array(t.String())]) });
}
