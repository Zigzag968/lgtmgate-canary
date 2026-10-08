'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
const usage = readme.split(/^## Usage/m)[1] || '';
const blocks = [...usage.matchAll(/```js\n([\s\S]*?)```/g)].map((m) => m[1]);

const localRequire = (p) => require(path.resolve(root, p));

test('README Usage section has exactly three js blocks', () => {
  assert.equal(blocks.length, 3);
});

blocks.forEach((block, i) => {
  test(`README Usage block ${i + 1} output matches`, () => {
    const lines = block.trim().split('\n');
    const expected = lines.pop().replace(/^\/\/ -> /, '');
    const call = lines.pop().replace(/;\s*$/, '');
    const preamble = lines.join('\n');
    const result = new Function('require', `${preamble}\nreturn ${call}`)(localRequire);
    assert.equal(JSON.stringify(result), expected);
  });
});
