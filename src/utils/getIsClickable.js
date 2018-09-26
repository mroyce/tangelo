import noop from './noop';


/**
 * Returns true if the component has any onClick, onDoubleClick, or onRightClick props.
 *
 * @param {Object} props
 * @returns {Boolean}
 */
export default props => {
  const {
    onClick,
    onDoubleClick,
    onRightClick,

    onCellClick,
    onCellDoubleClick,
    onCellRightClick,
  } = props;

  if (onClick && onClick !== noop) {
    return true;
  }

  if (onDoubleClick && onDoubleClick !== noop) {
    return true;
  }

  if (onRightClick && onRightClick !== noop) {
    return true;
  }

  if (onCellClick && onCellClick !== noop) {
    return true;
  }

  if (onCellDoubleClick && onCellDoubleClick !== noop) {
    return true;
  }

  if (onCellRightClick && onCellRightClick !== noop) {
    return true;
  }

  return false;
};  
