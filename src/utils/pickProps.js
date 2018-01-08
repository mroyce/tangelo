import React from 'react';


/**
 * Picks specified props from a React Element or Prop Object.
 *
 * @param {(React.Element|Object)} object The element/props to pick from
 * @param {string[]} propNames A list of prop name keys we wish to pick
 * @returns {Object} The picked props
 */
export default (object, propNames) => {
  const props = React.isValidElement(object) ? object.props : object;
  return propNames.reduce((o, k) => {
    o[k] = props[k];
    return o;
  }, {});
};
