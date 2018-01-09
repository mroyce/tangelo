/**
 * Gets the value in an object at the given path.
 *
 * @param {Object} object
 * @param {(string|string[])} path
 * @returns {*} Property value
 */
export default (object, path) => {
  let value = object;
  const pathList = Array.isArray(path) ? path : path.split('.');

  for (let index = 0; index < pathList.length; index++) {
    const key = pathList[index];
    value = value[key];
  }

  return value;
}
