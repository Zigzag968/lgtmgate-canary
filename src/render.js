'use strict';

/**
 * Render a tiny "card" as plain text: a title line, an underline, and an
 * optional list of tags. Pure function, no I/O.
 *
 *   render({ title: 'Hello', tags: ['a', 'b'] })
 *   // "Hello\n=====\n#a #b"
 */
function render(card) {
  if (!card || typeof card.title !== 'string' || card.title.trim().length === 0) {
    throw new TypeError('render: card.title must be a non-empty string');
  }
  const title = card.title.trim();
  const underline = '='.repeat(title.length);
  const lines = [title, underline];
  const tags = Array.isArray(card.tags)
    ? card.tags.filter(Boolean).map((tag) => String(tag).trim()).filter(Boolean)
    : [];
  if (tags.length > 0) {
    lines.push(tags.map((tag) => `#${tag}`).join(' '));
  }
  return lines.join('\n');
}

module.exports = { render };
