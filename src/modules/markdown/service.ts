import { MarkdownRenderer } from 'loghub-me-markdown-renderer';
import { JSDOM } from 'jsdom';

export abstract class MarkdownService {
  private static renderer = new MarkdownRenderer({
    useMarkdownItAnchor: true,
    useSafeLinkify: true,
    useSanitize: true,
  });

  static async render(markdown: string | string[]) {
    if (typeof markdown === 'string') {
      return { result: this.renderAndParseAnchors(markdown) };
    }

    return { result: markdown.map((markdown) => this.renderAndParseAnchors(markdown)) };
  }

  private static renderAndParseAnchors(markdown: string) {
    const html = this.renderer.render(markdown);
    const dom = new JSDOM(html);
    const anchors = this.parseAnchors(dom.window.document.body.innerHTML);
    return { html, anchors };
  }

  private static parseAnchors(html: string) {
    const dom = new JSDOM(html);
    return Array.from(dom.window.document.querySelectorAll('h1[id], h2[id], h3[id], h4[id]')).map((el) => ({
      level: parseInt(el.tagName[1], 10),
      slug: el.id,
      text: el.textContent || '',
    }));
  }
}
