import { t } from 'elysia';

export namespace MarkdownModel {
  const renderResult = t.Object({
    html: t.String(),
    anchors: t.Array(
      t.Object({
        level: t.Number(),
        slug: t.String(),
        text: t.String(),
      })
    ),
  });

  export const renderRequest = t.Object({ markdown: t.Union([t.String(), t.Array(t.String())]) });
  export const renderResponse = t.Object({ result: t.Union([renderResult, t.Array(renderResult)]) });
}
