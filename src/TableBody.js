import React from 'react';
import PropTypes from 'prop-types';

import { SortDirection } from './constants';
import TableRow from './TableRow';


class TableBody extends React.Component {
  constructor() {
    super();

    // <number: rowIndex, Element: <TableRow />>
    this._rowCache = {};

    // <number: rowOrder, number: rowIndex>
    this._rowOrderCache = {};
  }

  componentWillMount() {
    this._constructRows();
  }

  componentWillUpdate(nextProps) {
    const {
      getRowProps,
      rowCount,
      shouldRowUpdate,
      sortDirection,
      sortingCriteria,
    } = nextProps;

    // TODO only check rows that are in view
    for (const rowIndexString in this._rowCache) {
      const rowIndex = Number(rowIndexString);
      const currentRowProps = this._rowCache[rowIndex].props.rowProps;
      const nextRowProps = getRowProps({ rowIndex });

      // TODO don't check this function if it's the default () => true
      if (shouldRowUpdate({ currentRowProps, nextRowProps, rowIndex })) {
        this._rowCache[rowIndex] = this._constructRow(rowIndex, nextProps);
      }
    }

    if (sortingCriteria !== this.props.sortingCriteria ||
            sortDirection !== this.props.sortDirection) {
      this._orderRows(sortingCriteria, sortDirection);
    }
  }

  get sortedRows() {
    const sorted = [];

    for (const index in this._rowOrderCache) {
      sorted[index] = this._rowCache[this._rowOrderCache[index]];
    }

    return sorted;
  }

  _orderRows(sortingCriteria, sortDirection) {
    const rows = Object.values(this._rowCache).splice(0);
    let sorted;

    if (typeof sortingCriteria === 'function') {
      sorted = rows.sort((a, b) => {
        return sortingCriteria(a.props.rowProps, b.props.rowProps);
      });
    } else if (typeof sortingCriteria === 'string') {
      const sortingCriteriaFieldArray = sortingCriteria.split('.');
      sorted = rows.sort((a, b) => {
        let aVal = a.props.rowProps;
        let bVal = b.props.rowProps;

        for (let index = 0; index < sortingCriteriaFieldArray.length; index++) {
          const key = sortingCriteriaFieldArray[index];
          aVal = aVal[key];
          bVal = bVal[key];
        }

        if (aVal > bVal) {
          return 1;
        }
        if (aVal < bVal) {
          return -1;
        }
        return 0;
      });
    } else {
      // This shouldn't happen, maybe throw an error?
      sorted = rows;
    }

    if (sortDirection === SortDirection.DESC) {
      sorted.reverse();
    }

    for (let index = 0; index < sorted.length; index++) {
      this._rowOrderCache[index] = sorted[index].props.rowIndex;
    }
  }

  _constructRow(rowIndex, props) {
    const {
      columns,
      getRowProps,
      onRowClick,
      onRowDoubleClick,
      onRowMouseOut,
      onRowMouseOver,
      onRowRightClick,
      rowClassName,
      rowCount,
    } = props;

    const className = typeof rowClassName === 'function' ? rowClassName({ rowIndex }) : rowClassName;
    const rowProps = getRowProps({ rowIndex });

    return (
      <TableRow
        key={`table_row_${rowIndex}`}
        columns={columns}
        className={className}
        onClick={onRowClick}
        onDoubleClick={onRowDoubleClick}
        onMouseOut={onRowMouseOut}
        onMouseOver={onRowMouseOver}
        onRightClick={onRowRightClick}
        rowCount={rowCount}
        rowIndex={rowIndex}
        rowProps={rowProps}
      />
    );
  }

  _constructRows() {
    const {
      rowCount,
    } = this.props;

    // TODO optimize so we only render rows that are in view
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      this._rowCache[rowIndex] = this._constructRow(rowIndex, this.props);
      this._rowOrderCache[rowIndex] = rowIndex;
    }
  }

  render() {
    return (
      <div className="Tangelo__Table__body">
        {this.sortedRows}
      </div>
    );
  }
};

TableBody.propTypes = {
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
      ]),
    })
  ).isRequired,

  /**
   *
   * {
   *   rowIndex,
   * }
   */
  getRowProps: PropTypes.func.isRequired,

  /**
   *
   */
  onRowClick: PropTypes.func.isRequired,

  /**
   *
   */
  onRowDoubleClick: PropTypes.func.isRequired,

  /**
   *
   */
  onRowMouseOut: PropTypes.func.isRequired,

  /**
   *
   */
  onRowMouseOver: PropTypes.func.isRequired,

  /**
   *
   */
  onRowRightClick: PropTypes.func.isRequired,

  /**
   *
   */
  rowClassName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,

  /**
   *
   */
  rowCount: PropTypes.number.isRequired,

  /**
   *
   */
  shouldRowUpdate: PropTypes.func.isRequired,

  /**
   *
   */
  sortDirection: PropTypes.oneOf([
    SortDirection.ASC,
    SortDirection.DESC,
  ]),

  /**
   *
   */
  sortingCriteria: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
};

TableBody.defaultProps = {
  sortingCriteria: null,
};

TableBody.displayName = 'TangeloTableBody';


export default TableBody;
