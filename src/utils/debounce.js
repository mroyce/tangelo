/**
 * Debounce function
 *
 */
export default (func, wait, immediate) => {
  let timeout;
  return (...args) => {
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
