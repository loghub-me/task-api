import highlightJs from 'highlight.js';
import MarkdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import { linkOpenRule } from '~/lib/markdown/rules/link-open';
import { slugify } from '~/lib/markdown/slugify';
import { sanitize } from '~/lib/markdown/sanitize';

const md = MarkdownIt({
  html: false,
  xhtmlOut: false,
  langPrefix: 'language-',
  linkify: true,
  typographer: false,
  highlight: (code, lang) => {
    if (lang && highlightJs.getLanguage(lang)) {
      try {
        return highlightJs.highlight(code, { language: lang }).value;
      } catch (_) {}
    }

    return '';
  },
});
md.use(markdownItAnchor, { slugify });
md.renderer.rules.link_open = linkOpenRule;

const parseMarkdown = (text: string) => sanitize(md.render(text));

export { parseMarkdown };
