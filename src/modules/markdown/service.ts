import { parseMarkdown } from '~/lib/markdown/parse';

export abstract class MarkdownService {
  static async parse(markdown: string | string[]) {
    if (typeof markdown === 'string') {
      return { html: parseMarkdown(markdown) };
    }

    return { html: markdown.map((md) => parseMarkdown(md)) };
  }
}
