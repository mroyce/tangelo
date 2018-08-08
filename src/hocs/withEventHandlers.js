import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  getEventHandlerProps,
  getIsClickable,
  noop,
} from './utils';


/**
 * Passes in event handler props and clickable modifier classNames to components
 * with event handler props.
 *
 * @param {React.Component} WrappedComponent
 * @param {Function} parameters
 * @returns {React.Component}
 */
export default (WrappedComponent, parameters) => {
  class withEventHandlers extends React.Component {
    constructor(...args) {
      super(...args);

      this.state = {
        // If a child of a clickable element is highlighted, then the parent should not be highlighted
        isClickableChildHighlighted: false,
      };

      this.handleClickableChildMouseOver = this.handleClickableChildMouseOver.bind(this);
      this.handleClickableChildMouseOut = this.handleClickableChildMouseOut.bind(this);
    }

    handleClickableChildMouseOver() {
      this.setState({ isClickableChildHighlighted: true });
    }

    handleClickableChildMouseOut() {
      this.setState({ isClickableChildHighlighted: false });
    }

    render() {
      const eventHandlerProps = getEventHandlerProps(this.props, parameters(this.props));
      const className = classNames(
        this.props.className,
        {
          '--clickable': getIsClickable(eventHandlerProps),
          '--clickable--disable-highlight': this.state.isClickableChildHighlighted,
        }
      );

      return (
        <WrappedComponent
          {...this.props}
          className={className}
          eventHandlerProps={eventHandlerProps}
          handleClickableChildMouseOver={this.handleClickableChildMouseOver}
          handleClickableChildMouseOut={this.handleClickableChildMouseOut}
        />
      );
    }
  }

  withEventHandlers.propTypes = {
    /**
     *
     */
    className: PropTypes.string,

    /**
     *
     */
    onClick: PropTypes.func,
  
    /**
     *
     */
    onDoubleClick: PropTypes.func,
  
    /**
     *
     */
    onMouseOut: PropTypes.func,
  
    /**
     *
     */
    onMouseOver: PropTypes.func,
  
    /**
     *
     */
    onRightClick: PropTypes.func,
  };

  withEventHandlers.defaultProps = {
    className: '',
    onClick: noop,
    onDoubleClick: noop,
    onMouseOut: noop,
    onMouseOver: noop,
    onRightClick: noop,
  };

  return withEventHandlers;
};
