import noop from './noop';


/**
 * Returns true if the props contain any onClick, onDoubleClick, or onRightClick functions.
 *
 * @param {Object} props
 * @returns {Boolean}
 */
export default props => {
  const {
    onClick,
    onDoubleClick,
    onRightClick,
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

  return false;
};  
