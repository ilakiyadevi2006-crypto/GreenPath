import React, { useMemo } from 'react';
import { Marked } from 'marked';
import DOMPurify from 'dompurify';

interface MarkdownRendererProps {
  content: string;
  isUser?: boolean;
  className?: string;
}

// Dedicated Marked instance with GFM, GitHub-style tables, and natural line breaks
const markedParser = new Marked({
  gfm: true,
  breaks: true,
  pedantic: false
});

// Configure link rendering so all markdown links open safely in a new tab
markedParser.use({
  renderer: {
    link({ href, title, text }) {
      const cleanHref = href || '#';
      const titleAttr = title ? ` title="${title}"` : '';
      return `<a href="${cleanHref}" target="_blank" rel="noopener noreferrer"${titleAttr}>${text}</a>`;
    }
  }
});

/**
 * Robust, cross-environment DOMPurify sanitizer.
 * Handles bundler differences, window factory invocations, and browser fallbacks.
 */
const sanitizeHtml = (dirtyHtml: string): string => {
  try {
    let purifier: any = DOMPurify;

    // Direct instance
    if (purifier && typeof purifier.sanitize === 'function') {
      return purifier.sanitize(dirtyHtml, {
        USE_PROFILES: { html: true },
        ADD_ATTR: ['target', 'rel'],
        FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'style'],
        FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur']
      });
    }

    // Default export
    if (purifier && purifier.default && typeof purifier.default.sanitize === 'function') {
      return purifier.default.sanitize(dirtyHtml, {
        USE_PROFILES: { html: true },
        ADD_ATTR: ['target', 'rel'],
        FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'style'],
        FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur']
      });
    }

    // Factory requiring window in certain ESM setups
    if (typeof purifier === 'function' && typeof window !== 'undefined') {
      const instance = purifier(window);
      if (instance && typeof instance.sanitize === 'function') {
        return instance.sanitize(dirtyHtml, {
          USE_PROFILES: { html: true },
          ADD_ATTR: ['target', 'rel'],
          FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'style'],
          FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur']
        });
      }
    }

    // Browser window global fallback
    if (typeof window !== 'undefined' && (window as any).DOMPurify?.sanitize) {
      return (window as any).DOMPurify.sanitize(dirtyHtml, {
        USE_PROFILES: { html: true },
        ADD_ATTR: ['target', 'rel']
      });
    }
  } catch (err) {
    console.warn('DOMPurify sanitize warning in EcoMentor AI:', err);
  }

  // Fallback DOM-based sanitization in browser if DOMPurify is unavailable
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    try {
      const container = document.createElement('div');
      container.innerHTML = dirtyHtml;
      const dangerous = container.querySelectorAll('script, iframe, object, embed, style');
      dangerous.forEach((node) => node.remove());
      const allElements = container.querySelectorAll('*');
      allElements.forEach((el) => {
        Array.from(el.attributes).forEach((attr) => {
          const name = attr.name.toLowerCase();
          const val = attr.value.toLowerCase();
          if (name.startsWith('on') || val.includes('javascript:')) {
            el.removeAttribute(attr.name);
          }
        });
        if (el.tagName === 'A') {
          el.setAttribute('target', '_blank');
          el.setAttribute('rel', 'noopener noreferrer');
        }
      });
      return container.innerHTML;
    } catch {
      // In case of error, fall through
    }
  }

  return dirtyHtml;
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  isUser = false,
  className = ''
}) => {
  const sanitizedHtml = useMemo(() => {
    if (!content || typeof content !== 'string') return '';

    try {
      // Parse Markdown into semantic HTML structure with synchronous guarantee
      const rawHtml = markedParser.parse(content.trim(), { async: false }) as string;
      // Sanitize the HTML to prevent any XSS or script injection
      return sanitizeHtml(rawHtml);
    } catch (err) {
      console.error('Error rendering markdown in EcoMentor AI:', err);
      // Safe escaped fallback preserving line breaks
      const escaped = content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br/>');
      return `<p>${escaped}</p>`;
    }
  }, [content]);

  return (
    <div
      className={`markdown-content ${isUser ? 'markdown-content-user' : ''} ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};
