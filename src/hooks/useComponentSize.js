import React from 'react';

import debounce from '../utils/debounce';


/**
 * Given an HTML element, returns the dimensions.
 * That is, returns the offsetHeight/offsetWidth.
 *
 * @param {HTMLElement} element
 * @returns {Object}
 */
const getSize = element => element ? {
  height: element.offsetHeight,
  width: element.offsetWidth,
} : {
  height: 0,
  width: 0,
};


/**
 * Heavily borrows logic from https://github.com/rehooks/component-size/blob/master/index.js
 *
 * Given a ref, returns the dimensions of the ref as ``size``.
 * That is, returns the offsetHeight/offsetWidth.
 *
 * @param {Object|Function}
 * @returns {Object}
 *   {
 *     width,
 *     height,
 *   }
 */
const useComponentSize = ref => {
  let [size, setSize] = React.useState(getSize(ref ? ref.current : {}));

  const handleResize = React.useCallback(
    () => {
      if (ref.current) {
        setSize(getSize(ref.current));
      }
    },
    [ref]
  );
  const handleResizeDebounced = debounce(handleResize, 100);

  React.useLayoutEffect(
    () => {
      if (!ref.current) {
        return;
      }

      handleResize();

      // attempt to use ResizeObserver, otherwise fallback to window eventListeners
      if (typeof ResizeObserver === 'function') {
        let resizeObserver = new ResizeObserver(handleResizeDebounced);
        resizeObserver.observe(ref.current);

        return () => {
          resizeObserver.disconnect(ref.current);
          resizeObserver = null;
        };
      } else {
        window.addEventListener('resize', handleResizeDebounced);

        return () => {
          window.removeEventListener('resize', handleResizeDebounced);
        };
      }
    },
    [ref.current]
  );

  return size;
};


export default useComponentSize;
