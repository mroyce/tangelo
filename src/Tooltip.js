import React from 'react';
import PropTypes from 'prop-types';

import Popper from './Popper';
import RootRef from './RootRef';

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
        <RootRef rootRef={this.childRef}>
          {React.cloneElement(this.props.children, this.childrenProps)}
        </RootRef>
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
   * The text rendered in the Tooltip.
   */
  title: PropTypes.node.isRequired,
};


export default Tooltip;
