import React from 'react';
import PropTypes from 'prop-types';

import TableCell from './TableCell';


class TableHeader extends React.Component {
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
    } = this.props;

    // TODO optimize so we only render cells that are in view
    columns.forEach((column, columnIndex) => {
      const {
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
          columnClassName({ columnIndex }) :
          columnClassName;
      
      const cellContent =
        typeof cellRenderer === 'function' ?
          cellRenderer({ columnIndex }) :
          cellRenderer;
      
      this._cellCache[columnIndex] = (
        <TableCell
          key={`table_cell_header_${columnIndex}`}
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
      <div className={`tangelo-table__header ${this.props.className}`}>
        {Object.values(this._cellCache)}
      </div>
    );
  }
};

TableHeader.propTypes = {
  /**
   *
   */
  className: PropTypes.string,

  /**
   *
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
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
          'flex-basis': PropTypes.string,
        }),
        PropTypes.shape({
          flex: PropTypes.string,
        }),
      ]).isRequired,
    })
  ).isRequired,
};

TableHeader.defaultProps = {
  className: '',
};

TableHeader.displayName = 'TangeloTableHeader';


export default TableHeader;
