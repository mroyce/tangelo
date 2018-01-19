import React from 'react';
import PropTypes from 'prop-types';

// import HeaderSortArrow from './HeaderSortArrow';
import TableRow from './TableRow';
import { SortDirection } from './constants';
import { pipe } from './utils';


class TableHeaderRow extends React.Component {
  get columns() {
    return this.props.columns.map(column => {
      if (column.sortBy) {
        column.onCellClick = pipe(column.onCellClick, () => this.props.handleHeaderSortClick(column.sortBy));
      }

      // TODO include <SortArrow /> once we have icon slots

      return column;
    });
  }

  render() {
    // TODO use classNames package
    let constructedClassName = 'Tangelo__Table__header-row';
    constructedClassName += this.props.className ? ` ${this.props.className}` : '';

    return [
      <TableRow
        key="Table__Row__Header"
        className={constructedClassName}
        columns={this.columns}
        rowIndex={-1}
      />,

      <div
        key="header-space"
        className="Tangelo__Table__header-space"
      />,
    ];
  }
};

TableHeaderRow.propTypes = {
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
      icons: PropTypes.arrayOf(PropTypes.element),
      onCellClick: PropTypes.func,
      onCellDoubleClick: PropTypes.func,
      onCellMouseOut: PropTypes.func,
      onCellMouseOver: PropTypes.func,
      onCellRightClick: PropTypes.func,
    })
  ).isRequired,

  /**
   *
   */
  handleHeaderSortClick: PropTypes.func.isRequired,

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

TableHeaderRow.defaultProps = {
  className: '',
  sortDirectio: null,
  sortingCriteria: null,
};

TableHeaderRow.displayName = 'TangeloTableHeaderRow';


export default TableHeaderRow;
