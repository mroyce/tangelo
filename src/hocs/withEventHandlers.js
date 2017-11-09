import React from 'react';
import PropTypes from 'prop-types';

import getDisplayName from './utils/getDisplayName';
import noop from './utils/noop';


const withEventHandlers = (WrappedComponent, parameters = {}) => {
  class _withEventHandlers extends React.Component {
    _createEventHandler(handler) {
      return event => handler(Object.assign({ event }, parameters));
    }

    get interactionProps() {
      const {
        onClick,
        onDoubleClick,
        onMouseOut,
        onMouseOver,
        onRightClick,
      } = this.props;

      return {
        onClick: this._createEventHandler(onClick),
        onDoubleClick: this._createEventHandler(onDoubleClick),
        onMouseOut: this._createEventHandler(onMouseOut),
        onMouseOver: this._createEventHandler(onMouseOver),
        onContextMenu: this._createEventHandler(onRightClick),
      };
    }

    render() {
      return (
        <div {...this.eventHandlers}>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  }

  _withEventHandlers.propTypes = {
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
    onMouseOut: PropTypes.func,
    onMouseOver: PropTypes.func,
    onRightClick: PropTypes.func,
  };

  _withEventHandlers.defaultProps = {
    onClick: noop,
    onDoubleClick: noop,
    onMouseOut: noop,
    onMouseOver: noop,
    onRightClick: noop,
  };

  _withEventHandlers.displayName = getDisplayName(WrappedComponent, 'withEventHandlers');
  
  return _withEventHandlers;
};


export default withEventHandlers;
