<div align="center">

express-postcss
===

[![NPMCBT badge]][NPMCBT link]

*Express.js middleware for on-demand PostCSS compiling*
</div>

[NPMCBT badge]: https://img.shields.io/npm/v/@tycrek/express-postcss?color=CB3837&label=%20View%20on%20NPM&logo=npm&style=for-the-badge
[NPMCBT link]: https://www.npmjs.com/package/@tycrek/express-postcss

## Usage

Install with `npm i @tycrek/express-postcss`, then import/require it in your code.

```js
const { epcss } = require('@tycrek/express-postcss');
// or
import { epcss } from '@tycrek/express-postcss';
```

Then, use it as middleware.

```js
app.use('/css', epcss({ /* options */ }));
```

Any requests to `/css` will be handled by the middleware.

For a more complete example, see [test/test.js](test/test.js).
