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
      rowIndex,
    } = this.props;

    // TODO use classNames package
    let constructedClassName = 'Tangelo__Table__cell';
    constructedClassName += className ? ` ${className}` : '';
    constructedClassName += children ? '' : ' Tangelo__Table__cell--empty';

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
