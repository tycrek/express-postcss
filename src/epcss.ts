import Options from './Options';
import fs from 'fs-extra';
import postcss from 'postcss';
import { Request, Response, NextFunction } from 'express';

/**
 * Express.js Middleware that processes a CSS file with PostCSS.
 */
export function epcss(options: Options): (req: Request, res: Response, next: NextFunction) => void {
	return (req: Request, res: Response, next: NextFunction) => (
		fs.readFile(options.cssPath)
			.then((bytes) => postcss(options.plugins).process(bytes, { from: options.cssPath, to: options.cssPath }))
			.then((result) => (result.warnings().forEach((warn) => (options.warn)(warn)), result.css))
			.then((css) => res.type('css').send(css))
			.catch(next)
		, void 0);
}
