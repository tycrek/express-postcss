# express-postcss
Express.js middleware for on-demand PostCSS compiling

## install

```bash
npm i @tycrek/express-postcss
```

## usage

```js
const epcss = require('@tycrek/express-postcss');
app.use('/css', epcss({ /* options */ }));
```

Any requests to `/css` will be handled by the middleware.
