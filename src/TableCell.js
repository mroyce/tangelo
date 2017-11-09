import React from 'react';
import PropTypes from 'prop-types';

import getEventHandlerProps from './utils/getEventHandlerProps';


// TODO possibly convert this to a function like react-virtualized-table
class TableCell extends React.Component {
  render() {
    console.log('TableCell.render');

    const {
      columnIndex,
      rowIndex,
    } = this.props;

    // TODO use classNames package
    let className = 'Tangelo__Table__cell';
    className += this.props.className ? ` ${this.props.className}` : '';
    className += this.props.children ? '' : ' Tangelo__Table__cell--empty';

    return (
      <div
        className={className}
        style={this.props.flexStyle}
        {...getEventHandlerProps(this, { columnIndex, rowIndex })}
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
  align: PropTypes.oneOf([
    'left',
    'right',
    'center',
  ]),

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

  /**
   *
   */
  flexStyle: PropTypes.oneOfType([
    PropTypes.shape({
      'flex-basis': PropTypes.string,
    }),
    PropTypes.shape({
      flex: PropTypes.string,
    }),
  ]).isRequired,

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

  /**
   *
   */
  rowIndex: PropTypes.number.isRequired,
};

TableCell.defaultProps = {
  children: null,
  className: '',
  onClick: null,
  onDoubleClick: null,
  onMouseOut: null,
  onMouseOver: null,
  onRightClick: null,
};

TableCell.displayName = 'TanegloTableCell';


export default TableCell;
