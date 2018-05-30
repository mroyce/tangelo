import noop from './noop';


/**
 * Returns true if the component has any onClick, onDoubleClick, or onRightClick props.
 *
 * @param {React.Component} component
 * @returns {Boolean}
 */
export default component => {
  const {
    onClick,
    onDoubleClick,
    onRightClick,
  } = component.props;

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
