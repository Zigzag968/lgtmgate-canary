'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { truncate } = require('../src/truncate');

const source = fs.readFileSync(path.join(__dirname, '..', 'src', 'truncate.js'), 'utf8');
const examples = [...source.matchAll(/^\s*\*\s*truncate\((.*)\) -> (".*")\s*$/gm)];

test('truncate doc: at least three examples are documented', () => {
  assert.ok(examples.length >= 3);
});

for (const [, args, expected] of examples) {
  test(`truncate doc: truncate(${args}) -> ${expected}`, () => {
    assert.equal(truncate(...JSON.parse(`[${args}]`)), JSON.parse(expected));
  });
}
