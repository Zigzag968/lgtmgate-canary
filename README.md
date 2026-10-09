# lgtmgate-canary

Canary consumer for the [lgtmgate](https://github.com/Zigzag968/claude-code-lgtmgate) Claude Code plugin, **beta channel** (`zigzag-plugins-beta`, tracks `main`).

A deliberately tiny Node project (stdlib only, `node --test`) whose sole purpose is to exercise the Theo -> Sam -> Nick -> Morgan pipeline end-to-end before a plugin version reaches the stable channel. Issues here are seeded on purpose; see `seed/` and `SETUP.md`.

## Usage

```js
const { slugify } = require('./src/slugify');
slugify('Héllo  Wörld!');
// -> "hello-world"
```

```js
const { render } = require('./src/render');
render({ title: 'Hello', tags: ['a', 'b'] });
// -> "Hello\n=====\n#a #b"
```

```js
const { wordCount } = require('./src/wordCount');
wordCount(' a  b\tc\nd ');
// -> 4
```

```js
const { capitalizeWords } = require('./src/capitalizeWords');
capitalizeWords(' ada  lovelace ');
// -> " Ada  Lovelace "
```
