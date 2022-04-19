import fs from 'fs-extra';
import postcss, { AcceptedPlugin } from 'postcss';

import { Request, Response, NextFunction } from 'express';

export interface Options {

	/**
	 * Path to the CSS file to be processed.
	 */
	cssPath: string;

	/**
	 * PostCSS plugins to be used.
	 */
	plugins?: AcceptedPlugin[];

	/**
	 * A function that will be called with warnings from PostCSS. Useful for debugging.
	 */
	warn: (warning: any) => void;
}

/**
 * Express.js Middleware that processes a CSS file with PostCSS.
 */
export function epcss(options: Options): (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>> {
	return (req: Request, res: Response, next: NextFunction) =>
		fs.readFile(options.cssPath)
			.then((bytes) => postcss(options.plugins).process(bytes, { from: options.cssPath, to: options.cssPath }))
			.then((result) => (result.warnings().forEach((warn) => (options.warn)(warn)), result.css))
			.then((css) => res.type('css').send(css))
			.catch(next)
}
