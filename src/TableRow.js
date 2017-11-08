import React from 'react';
import PropTypes from 'prop-types';

import TableCell from './TableCell';


class TableRow extends React.Component {
  constructor() {
    super();

    // <number: columnIndex, Element: <TableCell />>
    this._cellCache = {};
  }

  componentWillMount() {
    this._constructCells();
  }

  _constructCells() {
    const {
      columns,
      rowIndex,
    } = this.props;

    // TODO optimize so we only render cells that are in view
    columns.forEach((column, columnIndex) => {
      const {
        align,
        cellRenderer,
        columnClassName,
        flexStyle,
        onCellClick,
        onCellDoubleClick,
        onCellMouseOut,
        onCellMouseOver,
        onCellRightClick,
      } = column;

      const className = 
        typeof columnClassName === 'function' ?
          columnClassName({ columnIndex, rowIndex }) :
          columnClassName;

      const cellContent =
        typeof cellRenderer === 'function' ?
          cellRenderer({ columnIndex, rowIndex }) :
          cellRenderer;

      this._cellCache[columnIndex] = (
        <TableCell
          key={`table_cell_${rowIndex}_${columnIndex}`}
          align={align}
          className={className}
          columnIndex={columnIndex}
          flexStyle={flexStyle}
          onCellClick={onCellClick}
          onCellDoubleClick={onCellDoubleClick}
          onCellMouseOut={onCellMouseOut}
          onCellMouseOver={onCellMouseOver}
          onCellRightClick={onCellRightClick}
        >
          {cellContent}
        </TableCell>
      );
    });
  }

  render() {
    return (
      <div
        className={`Tangelo__Table__row ${this.props.className}`}
      >
        {Object.values(this._cellCache)}
      </div>
    );
  }
};

TableRow.propTypes = {
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
  rowIndex: PropTypes.number.isRequired,
};

TableRow.defaultProps = {
  className: '',
};

TableRow.displayName = 'TangeloTableRow';


export default TableRow;
