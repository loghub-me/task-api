import { MarkdownRenderer } from 'loghub-markdown-renderer';

export abstract class MarkdownService {
  private static renderer = new MarkdownRenderer({
    useMarkdownItAnchor: true,
    useSafeLinkify: true,
    useSanitize: true,
  });

  static async render(markdown: string | string[]) {
    if (typeof markdown === 'string') {
      return { result: this.renderer.render(markdown) };
    }

    return { result: markdown.map((md) => this.renderer.render(md)) };
  }
}
