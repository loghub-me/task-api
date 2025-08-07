import { MarkdownRenderer } from 'loghub-markdown-renderer';

export abstract class MarkdownService {
  private static renderer = new MarkdownRenderer({
    useMarkdownItAnchor: true,
    useSafeLinkify: true,
    useSanitize: true,
  });

  static async parse(markdown: string | string[]) {
    if (typeof markdown === 'string') {
      return { html: this.renderer.render(markdown) };
    }

    return { html: markdown.map((md) => this.renderer.render(md)) };
  }
}
