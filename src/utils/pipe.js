import noop from './noop';

/**
 * Combines the given functions into a single function.
 *
 * @param {...function} fns The functions to combine
 */
export default (...fns) => (...args) => fns.reduce((currArgs, fn) => (fn || noop)(currArgs), ...args);
