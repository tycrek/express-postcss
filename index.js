const fs = require('fs-extra');
const postcss = require('postcss');

const DEFAULT_OPTIONS = {
	cssPath: null,
	plugins: [],
	warn: (warning) => console.warn(warning)
};

/**
 * Export the middleware
 * @param {DEFAULT_OPTIONS} options - Middleware options
 * @param {string} options.cssPath - Path to the CSS file
 * @param {Array} options.plugins - Array of PostCSS plugins
 * @param {Function} options.warn - Function to handle warnings; should accept one parameter, the warning
 */
module.exports = (options = DEFAULT_OPTIONS) =>
	(_req, res, next) =>
		fs.readFile(options.cssPath)
			.then((bytes) => postcss(options.plugins || DEFAULT_OPTIONS.plugins).process(bytes, { from: options.cssPath, to: options.cssPath }))
			.then((result) => (result.warnings().forEach((warn) => (options.warn || DEFAULT_OPTIONS.warn)(warn)), result.css))
			.then((css) => res.type('css').send(css))
			.catch(next);
