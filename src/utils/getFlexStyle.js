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
    { 'flex-basis': flexString } :
    { 'flex': `0 0 ${flexString}` };
};


export default getFlexStyle;
