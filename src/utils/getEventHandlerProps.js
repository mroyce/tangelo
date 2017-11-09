import React from 'react';
import PropTypes from 'prop-types';

import noop from '../utils/noop';


const getEventHandlerProps = (Component, parameters = {}) => {
  const createEventHandler = handler =>
    event => (handler || noop)(Object.assign({ event }, parameters));

  const {
    onClick,
    onDoubleClick,
    onMouseOut,
    onMouseOver,
    onRightClick,
  } = Component.props;

  return {
    onClick: createEventHandler(onClick),
    onDoubleClick: createEventHandler(onDoubleClick),
    onMouseOut: createEventHandler(onMouseOut),
    onMouseOver: createEventHandler(onMouseOver),
    onContextMenu: createEventHandler(onRightClick),
  };
}


export default getEventHandlerProps;
