/**
 * Creates inline flex styles object.
 *
 * @param {number} width
 * @param {string} widthType
 * @returns {Object}
 */
const getFlexStyle = (width, widthType) => {
  const flexString = `${width}${widthType}`;
  return widthType === '%' ?
    { flexBasis: flexString } :
    { flex: `0 0 ${flexString}` };
};


export default getFlexStyle;
