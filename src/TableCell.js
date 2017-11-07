import React from 'react';
import PropTypes from 'prop-types';


class TableCell extends React.Component {
  get interactionProps() {
    const interactionProps = {};
  }

  render() {
    return (
      <div
        className={`tangelo-table__cell ${this.props.className}`}
        {...this.interactionProps}
      >
        {this.props.children}
      </div>
    );
  }
};

TableCell.propTypes = {
  /**
   *
   */
  children: PropTypes.node,

  /**
   *
   */
  className: PropTypes.string,

  /**
   *
   */
  columnIndex: PropTypes.number.isRequired,
};

TableCell.defaultProps = {
  children: null,
  className: '',
};

TableCell.displayName = 'TanegloTableCell';


export default TableCell;
