import React from 'react';
import PropTypes from 'prop-types';


class EmptyTablePlaceholder extends React.Component {
  get style() {
    const {
      rowHeight,
    } = this.props;

    const sectionHeight = rowHeight * 3;

    return {
      minHeight: sectionHeight,
    };
  }

  render() {
    const { emptyTablePlaceholder } = this.props;

    const emptyTableContent =
      typeof emptyTablePlaceholder === 'function' ?
        emptyTablePlaceholder() :
        emptyTablePlaceholder;

    return (
      <div className="Tangelo__EmptyTablePlaceholder" style={this.style}>
        {emptyTableContent}
      </div>
    );
  }
};

EmptyTablePlaceholder.propTypes = {
  /**
   *
   */
  emptyTablePlaceholder: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),

  /**
   *
   */
  rowHeight: PropTypes.number.isRequired,
};

EmptyTablePlaceholder.defaultProps = {
  emptyTablePlaceholder: null,
};

EmptyTablePlaceholder.displayName = 'TangeloEmptyTablePlaceholder';


export default EmptyTablePlaceholder;
