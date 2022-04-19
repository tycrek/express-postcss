const fetch = require('node-fetch');
const express = require('express');
const cssnano = require('cssnano');
const { epcss } = require('../dist/index');
const path = require('path');


// Set up Express app for tests
const app = express();

// Set view engine
app.set('view engine', 'pug');
app.set('views', path.join(process.cwd(), 'views/'));

// CSS
const cssPath = path.join(process.cwd(), 'tailwind-test.css');
const tailwindcss = require('tailwindcss')({
	mode: 'jit',
	content: ['./views/**/*.pug']
});
const plugins = [
	tailwindcss,
	cssnano()
];

// Routes
app.use('/css', epcss({ cssPath, plugins }));
app.all('*', (_req, res) => res.render('index'));

// Error handling
app.use((err, _req, res, _next) => {
	console.error(err);
	res.status(500).send(err);
	process.exit(1);
});

// Host the app
const PORT = 3030;
const TIMEOUT = 500;
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
	setTimeout(() =>
		fetch(`http://127.0.0.1:${PORT}/css`)
			.then((res) => res.text())
			.then((css) => console.log(`Success! Generated CSS length is ${css.length} bytes`))
			.then(() => setTimeout(() => process.exit(0), TIMEOUT))
		, TIMEOUT);
});
