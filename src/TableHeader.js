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
          columnClassName({ columnIndex }) :
          columnClassName;
      
      const cellContent =
        typeof cellRenderer === 'function' ?
          cellRenderer({ columnIndex }) :
          cellRenderer;
      
      this._cellCache[columnIndex] = (
        <TableCell
          key={`table_cell_header_${columnIndex}`}
          align={align}
          className={className}
          columnIndex={columnIndex}
          flexStyle={flexStyle}
          onClick={onCellClick}
          onDoubleClick={onCellDoubleClick}
          onMouseOut={onCellMouseOut}
          onMouseOver={onCellMouseOver}
          onRightClick={onCellRightClick}
          rowIndex={-1}
        > 
          {cellContent}
        </TableCell>
      );
    });
  }

  render() {
    return ([
      <div
        key="header-content"
        className={`Tangelo__Table__header ${this.props.className}`}
      >
        {Object.values(this._cellCache)}
      </div>,

      <div
        key="header-space"
        className="Tangelo__Table__header-space"
      />,
    ]);
  }
};

TableHeader.propTypes = {
  /**
   *
   */
  className: PropTypes.string,

  /**
   *
   * TODO create types for columns
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
      ]),
      onCellClick: PropTypes.func,
      onCellDoubleClick: PropTypes.func,
      onCellMouseOut: PropTypes.func,
      onCellMouseOver: PropTypes.func,
      onCellRightClick: PropTypes.func,
    })
  ).isRequired,
};

TableHeader.defaultProps = {
  className: '',
};

TableHeader.displayName = 'TangeloTableHeader';


export default TableHeader;
