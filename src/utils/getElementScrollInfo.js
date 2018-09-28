/**
 * Returns information about the given element's scroll properties.
 *
 * @param {React.Element} e
 * @returns {Object}
 */
export default e => {
  const {
    clientHeight,
    scrollHeight,
    scrollTop,
  } = e;

  return {
    distanceFromBottom: scrollHeight - (scrollTop + clientHeight),
    distanceFromTop: scrollTop,
    isScrollable: scrollHeight !== clientHeight,
    isScrolledBottom: scrollHeight - scrollTop === clientHeight,
    isScrolledTop: scrollTop === 0,
  };
};
