import z from 'zod';

export namespace MarkdownModel {
  const renderResult = z.object({
    html: z.string(),
    anchors: z.array(
      z.object({
        level: z.number(),
        slug: z.string(),
        text: z.string(),
      })
    ),
  });

  export const renderRequest = z.object({ markdown: z.union([z.string(), z.array(z.string())]) });
  export const renderResponse = z.object({ result: z.union([renderResult, z.array(renderResult)]) });
}
