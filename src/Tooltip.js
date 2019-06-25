import React from 'react';
import PropTypes from 'prop-types';

import Popper from './Popper';


/**
 * Largely inspired by material-ui Tooltip.
 */
class Tooltip extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      open: false,
    };

    this.childRef = React.createRef();

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  get childrenProps() {
    return {
      onMouseOver: this.handleMouseOver,
      onMouseOut: this.handleMouseOut,
      ref: this.childRef,
    };
  }

  handleMouseOver(e) {
    if (!this.state.open) {
      this.setState({ open: true });
    }
  }

  handleMouseOut(e) {
    if (this.state.open) {
      this.setState({ open: false });
    }
  }

  render() {
    return (
      <React.Fragment>
        {React.cloneElement(this.props.children, this.childrenProps)}
        {(this.state.open && this.props.title) && (
          <Popper referenceObject={this.childRef}>
            <div className="Tangelo__Tooltip">
              {this.props.title}
            </div>
          </Popper>
        )}
      </React.Fragment>
    );
  }
}

Tooltip.propTypes = {
  /**
   * The wrapped node -- hovering over this will produce a Popper Tooltip.
   */
  children: PropTypes.node.isRequired,

  /**
   * The content rendered in the Tooltip.
   * Falsy titles are not displayed.
   */
  title: PropTypes.node,
};


export default Tooltip;
