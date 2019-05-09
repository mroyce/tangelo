import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import PopperJS from 'popper.js';

import Portal from './Portal';


/**
 * Largely inspired by material-ui Popper.
 * Acts as a wrapper around PopperJS.
 *
 * Poppers rely on the 3rd party library [Popper.js](https://github.com/FezVrasta/popper.js) for positioning.
 */
class Popper extends React.Component {
  constructor(...args) {
    super(...args);

    this.popper = null;

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillUnmount() {
    this.handleClose();
  }

  handleOpen() {
    const popperNode = ReactDOM.findDOMNode(this);

    if (!popperNode) {
      return null;
    }

    this.destroyPopper();

    this.popper = new PopperJS(this.props.referenceObject.current, popperNode, {
      placement: this.props.placement,
      preventOverflow: {
        boundariesElement: 'window',
      },
    });
  }

  handleClose() {
    this.destroyPopper();
  }

  destroyPopper() {
    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }
  }

  render() {
    return (
      <Portal onRendered={this.handleOpen}>
        {this.props.children}
      </Portal>
    );
  }
}


Popper.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * PopperJS placement.
   */
  placement: PropTypes.oneOf([
    'bottom-end',
    'bottom-start',
    'bottom',
    'left-end',
    'left-start',
    'left',
    'right-end',
    'right-start',
    'right',
    'top-end',
    'top-start',
    'top',
  ]),
  /**
   * From popper.js documentation:
   *
   * The referenceObject is an object that provides an interface compatible with Popper.js
   * and lets you use it as replacement of a real DOM node.
   * You can use this method to position a popper relatively to a set of coordinates
   * in case you don't have a DOM node to use as reference.
   */
  referenceObject: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

Popper.defaultProps = {
  placement: 'top',
};


export default Popper;
