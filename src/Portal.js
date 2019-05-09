import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import noop from './utils';


/**
 * Largely inspired by material-ui Portal.
 *
 * Portals provide a first-class way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 */
class Portal extends React.Component {
  constructor(...args) {
    super(...args);

    this.mountNode = null;
  }

  componentDidMount() {
    this.mountNode = document.body;
    this.forceUpdate(this.props.onRendered);
  }

  componentWillUnmount() {
    this.mountNode = null
  }

  render() {
    return this.mountNode ? ReactDOM.createPortal(this.props.children, this.mountNode) : null;
  }
}


Portal.propTypes = {
  children: PropTypes.node,
  /**
   * Callback fired once the portal has rendered the children.
   */
  onRendered: PropTypes.func,
};

Portal.defaultProps = {
  children: null,
  onRendered: noop,
};


export default Portal;
