/**
 * @param {React.Component} component
 * @param {Object} [parameters={}]
 * @returns {Object}
 */
export default (component, parameters = {}) => {
  const createEventHandler = handler => event => {
    handler({ event, ...parameters });
    event.stopPropagation();
  };

  const {
    onClick,
    onDoubleClick,
    onMouseOut,
    onMouseOver,
    onRightClick,
  } = component.props;

  const eventHandlerProps = {};

  if (onClick) {
    eventHandlerProps.onClick = createEventHandler(onClick);
  }

  if (onDoubleClick) {
    eventHandlerProps.onDoubleClick = createEventHandler(onDoubleClick);
  }

  if (onMouseOut) {
    eventHandlerProps.onMouseOut = createEventHandler(onMouseOut);
  }

  if (onMouseOver) {
    eventHandlerProps.onMouseOver = createEventHandler(onMouseOver);
  }

  if (onRightClick) {
    eventHandlerProps.onContextMenu = createEventHandler(onRightClick);
  }

  return eventHandlerProps;
};
