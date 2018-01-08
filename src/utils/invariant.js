/**
 * Provides an assertion facility that will get compiled out of production builds.
 *
 * @param {boolean} condition A condition for the assert provided as a plain value, this should be
 *                            pure so that it can be compiled out of the build together with the
 *                            invariant call.
 * @param {string} errorMsg The contents to populate any resulting error with.
 */
export default (condition, errorMsg = null) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!condition) {
      const errorMessage = errorMsg || 'You should supply a message here to be most useful';
      const error = new Error(errorMessage);
      error.framesToPop = 1;
      error.name = 'Failed Invariant';
      throw error;
    }
  }
};
