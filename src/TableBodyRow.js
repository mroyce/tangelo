import React from 'react';
import PropTypes from 'prop-types';

import getEventHandlerProps from './utils/getEventHandlerProps';
import pickProps from './utils/pickProps';
import TableRow from './TableRow';


// TODO possibly convert this to a function like react-virtualized-table
class TableBodyRow extends React.Component {
  /*
  shouldComponentUpdate(nextProps) {
    return nextProps.shouldRowUpdate({
      currentRowProps: this.props.rowProps,
      nextRowProps: nextProps.rowProps,
      rowIndex: this.props.rowIndex,
    });
  }
  */

  render() {
    const {
      className,
      columns,
      rowIndex,
    } = this.props;

    // TODO use classNames package
    let constructedClassName = 'Tangelo__Table__body-row';
    constructedClassName += className ? ` ${className}` : '';

    return (
      <TableRow
        key={`Table__Row__${rowIndex}`}
        className={constructedClassName}
        columns={columns}
        rowIndex={rowIndex}
      />
    );
  }
};

TableBodyRow.propTypes = {
  /**
   *
   */
  className: PropTypes.string,

  /**
   *
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      align: PropTypes.oneOf([
        'left',
        'right',
        'center',
      ]),
      columnClassName: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]),
      cellRenderer: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func,
      ]),
      flexStyle: PropTypes.oneOfType([
        PropTypes.shape({
          flexBasis: PropTypes.string,
        }),
        PropTypes.shape({
          flex: PropTypes.string,
        }),
      ]).isRequired,
    })
  ).isRequired,

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

  /**
   * TODO better propType validation
   */
  rowProps: PropTypes.object,

  /**
   *
   */
  selected: PropTypes.bool,
};

TableBodyRow.defaultProps = {
  className: '',
  onClick: null,
  onDoubleClick: null,
  onMouseOut: null,
  onMouseOver: null,
  onRightClick: null,
  selected: false,
};

TableBodyRow.displayName = 'TangeloTableBodyRow';


export default TableBodyRow;
