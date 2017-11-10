import React from 'react';
import PropTypes from 'prop-types';

import noop from '../utils/noop';


const getEventHandlerProps = (Component, parameters = {}) => {
  const createEventHandler = (handler) => event => {
    handler({ event, ...parameters });
    if (handler !== noop) {
      event.stopPropagation();
    }
  };

  const {
    onClick,
    onDoubleClick,
    onMouseOut,
    onMouseOver,
    onRightClick,
  } = Component.props;

  // TODO don't even add handler prop if it's a noop
  return {
    onClick: createEventHandler(onClick),
    onDoubleClick: createEventHandler(onDoubleClick),
    onMouseOut: createEventHandler(onMouseOut),
    onMouseOver: createEventHandler(onMouseOver),
    onContextMenu: createEventHandler(onRightClick),
  };
}


export default getEventHandlerProps;
