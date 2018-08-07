import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  getEventHandlerProps,
  getIsClickable,
} from './utils';


/**
 *
 */
export default (ComposedComponent, parameters) => {
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
      console.log('MUDDA OVER');
    }

    handleClickableChildMouseOut() {
      this.setState({ isClickableChildHighlighted: false });
      console.log('MUDDA OUT');
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

      console.log(this.state);
      console.log(className);

      return (
        <ComposedComponent
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

  return withEventHandlers;
};
