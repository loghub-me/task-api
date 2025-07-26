import { MarkdownRenderer } from 'loghub-markdown-parser';

export abstract class MarkdownService {
  private static renderer = new MarkdownRenderer({
    useMarkdownItAnchor: true,
    useSafeLinkify: true,
    useSanitize: true,
  });

  static async parse(markdown: string | string[]) {
    if (typeof markdown === 'string') {
      return { html: this.renderer.parse(markdown) };
    }

    return { html: markdown.map((md) => this.renderer.parse(md)) };
  }
}
