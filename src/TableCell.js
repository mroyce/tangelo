import React from 'react';
import PropTypes from 'prop-types';

import getEventHandlerProps from './utils/getEventHandlerProps';


// TODO possibly convert this to a function like react-virtualized-table
class TableCell extends React.Component {
  render() {
    const {
      children,
      className,
      columnIndex,
      flexStyle,
      hideRightBorder,
      rowIndex,
    } = this.props;

    // TODO use classNames package
    let constructedClassName = 'Tangelo__Table__cell';
    constructedClassName += className ? ` ${className}` : '';
    constructedClassName += hideRightBorder ? ' Tangelo__Table__cell--hide-right-border' : '';

    // TODO find better way of checking if cell is empty
    if (Array.isArray(children)) {
      constructedClassName += children.some(c => c) ? '' : ' Tangelo__Table__cell--empty';
    } else {
      constructedClassName += children ? '' : ' Tangelo__Table__cell--empty';
    }

    return (
      <div
        className={constructedClassName}
        style={flexStyle}
        {...getEventHandlerProps(this, { columnIndex, rowIndex })}
      >
        {children}
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
   * True if you want to hide the right border from this cell.
   */
  hideRightBorder: PropTypes.bool,

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
  hideRightBorder: false,
  onClick: null,
  onDoubleClick: null,
  onMouseOut: null,
  onMouseOver: null,
  onRightClick: null,
};

TableCell.displayName = 'TanegloTableCell';


export default TableCell;
