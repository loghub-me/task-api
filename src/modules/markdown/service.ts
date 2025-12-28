import { MarkdownRenderer } from 'loghub-me-markdown-renderer';
import { JSDOM } from 'jsdom';

export abstract class MarkdownService {
  private static renderer = new MarkdownRenderer({ enabledPlugins: ['anchor', 'safeLink', 'captionedImage'] });

  static async render(markdown: string | string[]) {
    if (typeof markdown === 'string') {
      return { result: this.renderAndParseAnchors(markdown) };
    }

    return { result: markdown.map((markdown) => this.renderAndParseAnchors(markdown)) };
  }

  static async normalize(markdown: string) {
    const normalizedMarkdown = markdown
      .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Replace links with plain text
      .replace(/```(\w+)?/g, ' ') // Remove code block delimiters
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/^(\s*)[#>\-\*]+(\s+)/gm, '$1$2') // Remove headings, blockquotes, and list markers
      .replace(/^(\s*)\d+\.(\s+)/gm, '$1$2') // Remove numbered list markers
      .replace(/[*_`~\[\]|]/g, ' ') // Remove special markdown characters
      .replace(/[\n\r\t]/g, ' ') // Replace newlines and tabs with spaces
      .replace(/\s+/g, ' ') // Collapse multiple spaces
      .trim();
    return { result: normalizedMarkdown };
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
