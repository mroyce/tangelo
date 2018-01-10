/**
 * Returns true if the given array/object is empty.
 *
 * @param {(Object|*[]} value
 * @returns {boolean}
 */
export default value => {
  if (Array.isArray(value)) {
    return value.length === 0;
  }

  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
};
