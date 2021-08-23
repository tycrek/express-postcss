const fetch = require('node-fetch');
const express = require('express');
const cssnano = require('cssnano');
const epcss = require('../index');

// Set up Express app for tests
const app = express();

// Set view engine
app.set('view engine', 'pug');
app.set('views', './views/');

// CSS
const cssPath = './tailwind-test.css';
const tailwindcss = require('tailwindcss')({
	mode: 'jit',
	purge: {
		enabled: false,
		content: ['./views/**/*.pug']
	}
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
			.then((_css) => setTimeout(() => process.exit(0), TIMEOUT))
		, TIMEOUT);
});
