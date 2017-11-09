/**
 * Utility function for constructing a ``displayName`` for a React Component.
 *
 * @param {React.Component} Component The component we are creating the displayName for
 * @param {String} wrapperName If this is a wrapped component
 * @returns {String} The constructed displayName for the given component
 */
const getDisplayName = (Component, wrapperName = '') => {
  const componentDisplayName = Component.displayName || Component.name || 'Component';

  if (wrapperName) {
    return `${wrapperName}(${componentDisplayName})`;
  }
  return componentDisplayName;
};


export default getDisplayName;
