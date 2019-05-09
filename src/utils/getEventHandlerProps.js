import noop from './noop';

/**
 * @param {React.Component|Object} component
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
  } = typeof component === 'function' ? component.props : component;

  const eventHandlerProps = {};

  if (onClick && onClick !== noop) {
    eventHandlerProps.onClick = createEventHandler(onClick);
  }

  if (onDoubleClick && onDoubleClick !== noop) {
    eventHandlerProps.onDoubleClick = createEventHandler(onDoubleClick);
  }

  if (onMouseOut && onMouseOut !== noop) {
    eventHandlerProps.onMouseOut = createEventHandler(onMouseOut);
  }

  if (onMouseOver && onMouseOver !== noop) {
    eventHandlerProps.onMouseOver = createEventHandler(onMouseOver);
  }

  if (onRightClick && onRightClick !== noop) {
    eventHandlerProps.onContextMenu = createEventHandler(onRightClick);
  }

  return eventHandlerProps;
};
