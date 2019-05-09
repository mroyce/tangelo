import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

/**
 * Largely copied from material-ui.
 *
 * Helper component to allow attaching a ref to a
 * wrapped element to access the underlying DOM element.
 *
 * It's highly inspired by https://github.com/facebook/react/issues/11401#issuecomment-340543801.
 * For example:
 * ```jsx
 * import React from 'react';
 * import RootRef from '@material-ui/core/RootRef';
 *
 * class MyComponent extends React.Component {
 *   constructor() {
 *     super();
 *     this.domRef = React.createRef();
 *   }
 *
 *   componentDidMount() {
 *     console.log(this.domRef.current); // DOM node
 *   }
 *
 *   render() {
 *     return (
 *       <RootRef rootRef={this.domRef}>
 *         <SomeChildComponent />
 *       </RootRef>
 *     );
 *   }
 * }
 * ```
 */
class RootRef extends React.Component {
  constructor(...args) {
    super(...args);

    this.ref = null;
  }

  componentDidMount() {
    this.ref = ReactDOM.findDOMNode(this);
    this.props.rootRef.current = this.ref;
  }

  componentDidUpdate(prevProps) {
    const ref = ReactDOM.findDOMNode(this);

    if (prevProps.rootRef !== this.props.rootRef || this.ref !== ref) {
      if (prevProps.rootRef !== this.props.rootRef) {
        prevProps.rootRef.current = null;
      }

      this.ref = ref;
      this.props.rootRef.current = this.ref;
    }
  }

  componentWillUnmount() {
    this.ref = null;
    this.props.rootRef.current = null;
  }

  render() {
    return this.props.children;
  }
}

RootRef.propTypes = {
  /**
   * The wrapped element.
   */
  children: PropTypes.element.isRequired,

  /**
   * Provide a way to access the DOM node of the wrapped element.
   * You can provide a callback ref or a `React.createRef()` ref.
   */
  rootRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};


export default RootRef;
