import { AcceptedPlugin } from 'postcss';

export default class Options {

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
