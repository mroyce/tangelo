import noop from './noop';

/**
 * Passes in additional contextual parameters to event handlers.
 * Used by <TableRow /> and <TableCell /> to pass in `rowIndex` and `columnIndex` as params.
 *
 * @param {Object} props
 * @param {Object} [parameters={}]
 * @returns {Object}
 */
export default (props, parameters = {}) => {
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
  } = props;

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
