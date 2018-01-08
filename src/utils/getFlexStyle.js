/**
 * Creates inline flex styles object.
 *
 * @param {number} width
 * @param {string} widthType
 * @returns {Object}
 */
export default (width, widthType) => {
  const flexString = `${width}${widthType}`;
  return widthType === '%' ?
    { flexBasis: flexString } :
    { flex: `0 0 ${flexString}` };
};
