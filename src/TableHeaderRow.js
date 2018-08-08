import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ColumnProps from './prop-types/ColumnProps';
import HeaderSortArrow from './HeaderSortArrow';
import TableRow from './TableRow';
import { SortDirection } from './constants';
import { pickProps, pipe } from './utils';


class TableHeaderRow extends React.Component {
  get columns() {
    return this.props.columns.map(column => {
      if (column.sortBy) {
        column.onCellClick = pipe(column.onCellClick, () => this.props.handleHeaderSortClick(column.sortBy));
      }

      if (column.sortBy === this.props.sortingCriteria) {
        column.icons = [<HeaderSortArrow sortDirection={this.props.sortDirection} />];
      }

      return column;
    });
  }

  get headerSpaceStyle() {
    const borderHeight = 1;
    return {
      height: this.props.headerHeight + borderHeight,
    };
  }

  render() {
    return [
      <TableRow
        key="Table__Table__Row--header"
        className={classNames(
          "Tangelo__TableRow--header",
          this.props.className
        )}
        columns={this.columns}
        rowHeight={this.props.headerHeight}
        rowIndex={-1}
        {...pickProps(this.props, [
          'onClick',
          'onDoubleClick',
          'onMouseOut',
          'onMouseOver',
          'onRightClick',
        ])}
      />,

      <div
        key="header-space"
        style={this.headerSpaceStyle}
      />,
    ];
  }
};

TableHeaderRow.propTypes = {
  /**
   *
   */
  className: PropTypes.string.isRequired,

  /**
   *
   */
  columns: PropTypes.arrayOf(ColumnProps).isRequired,

  /**
   *
   */
  handleHeaderSortClick: PropTypes.func.isRequired,

  /**
   *
   */
  headerHeight: PropTypes.number.isRequired,

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
  sortDirection: null,
  sortingCriteria: null,
};

TableHeaderRow.displayName = 'TangeloTableHeaderRow';


export default TableHeaderRow;
