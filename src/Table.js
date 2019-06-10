import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import EmptyTablePlaceholder from './EmptyTablePlaceholder';
import TableBody from './TableBody';
import TableColumn from './TableColumn';
import TableHeaderRow from './TableHeaderRow';
import { SortDirection } from './constants';
import {
  getFlexStyle,
  noop,
  pickProps,
} from './utils';


class Table extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      sort: {
        criteria: this.props.initialSortState.criteria,
        direction: this.props.initialSortState.direction,
      },
    };

    this.handleHeaderSortClick = this.handleHeaderSortClick.bind(this);
  }

  handleHeaderSortClick(sortingCriteria) {
    this.setState(({ sort: prevSort }) => {
      let newDirection = prevSort.direction;
      let newCriteria = sortingCriteria;

      if (prevSort.criteria === sortingCriteria) {
        if (prevSort.direction === SortDirection.ASC) {
          // ASC -> DESC
          newDirection = SortDirection.DESC;
        } else if (prevSort.direction === SortDirection.DESC) {
          // DESC -> None
          newDirection = null;
          newCriteria = null;
        }
      } else {
        // None -> ASC
        newDirection = SortDirection.ASC;
      }

      return {
        sort: {
          criteria: newCriteria,
          direction: newDirection,
        },
      };
    }, () => this.props.onSort(this.state.sort));
  }

  get headerColumns() {
    return this.columns.map(column => ({
      ...pickProps(column, [
        'align',
        'columnClassName',
        'hideRightBorder',
        'onCellClick',
        'onCellDoubleClick',
        'onCellMouseOut',
        'onCellMouseOver',
        'onCellRightClick',
        'sortBy',
      ]),
      cellRenderer: column.props.headerCellRenderer,
      flexStyle: getFlexStyle(column.props.width, column.props.widthType),
    }));
  }

  get bodyColumns() {
    return this.columns.map(column => ({
      ...pickProps(column, [
        'align',
        'columnClassName',
        'hideRightBorder',
        'icons',
        'onCellClick',
        'onCellDoubleClick',
        'onCellMouseOut',
        'onCellMouseOver',
        'onCellRightClick',
        'tooltip',
      ]),
      cellRenderer: column.props.bodyCellRenderer,
      flexStyle: getFlexStyle(column.props.width, column.props.widthType),
    }));
  }

  get columns() {
    return React.Children.toArray(this.props.children);
  }

  render() {
    return (
      <div
        className={classNames(
          "Tangelo__Table",
          this.props.className
        )}
        ref={this.props.tableRef}
      >
        {this.props.disableHeader || (
          <TableHeaderRow
            {...pickProps(this.props, [
              'headerHeight',
            ])}
            className={this.props.headerClassName}
            columns={this.headerColumns}
            handleHeaderSortClick={this.handleHeaderSortClick}
            sortDirection={this.state.sort.direction}
            sortingCriteria={this.state.sort.criteria}
          />
        )}
        {this.props.rowCount ? (
          <TableBody
            {...pickProps(this.props, [
              'bodyRef',
              'getRowProps',
              'headerHeight',
              'hideBorderBottom',
              'onRowClick',
              'onRowDoubleClick',
              'onRowMouseOut',
              'onRowMouseOver',
              'onRowRightClick',
              'paginationFunc',
              'paginationLoading',
              'paginationRowCountBuffer',
              'rowClassName',
              'rowCount',
              'rowHeight',
              'shouldRowUpdate',
              'scrollRef',
            ])}
            columns={this.bodyColumns}
            sortDirection={this.state.sort.direction}
            sortingCriteria={this.state.sort.criteria}
          />
        ) : (
          <EmptyTablePlaceholder
            {...pickProps(this.props, [
              'emptyTablePlaceholder',
              'rowHeight',
            ])}
          />
        )}
      </div>
    );
  }
};

Table.propTypes = {
  /**
   *
   */
  bodyRef: PropTypes.object,

  /**
   * Children of `<Table />` should be `<TableColumn />`.
   */
  children: props => {
    React.Children.toArray(props.children).forEach(child => {
      if (child.type !== TableColumn) {
        return new Error('`Table` only accepts children of type `TableColumn`');
      }
    });
  },

  /**
   *
   */
  className: PropTypes.string,

  /**
   *
   */
  disableHeader: PropTypes.bool,

  /**
   *
   */
  emptyTablePlaceholder: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),

  /**
   *
   * {
   *   rowIndex,
   * }
   */
  getRowProps: PropTypes.func,

  /**
   *
   */
  headerClassName: PropTypes.string,

  /**
   *
   */
  headerHeight: PropTypes.number,

  /**
   *
   */
  hideBorderBottom: PropTypes.bool,

  /**
   *
   */
  initialSortState: PropTypes.shape({
    criteria: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    direction: PropTypes.oneOf([
      SortDirection.ASC,
      SortDirection.DESC,
    ]),
  }),

  /**
   *
   * {
   *   rowIndex,
   * }
   */
  onRowClick: PropTypes.func,

  /**
   *
   * {
   *   rowIndex,
   * }
   */
  onRowDoubleClick: PropTypes.func,

  /**
   *
   * {
   *   rowIndex,
   * }
   */
  onRowMouseOut: PropTypes.func,

  /**
   *
   * {
   *   rowIndex,
   * }
   */
  onRowMouseOver: PropTypes.func,

  /**
   *
   * {
   *   rowIndex,
   * }
   */
  onRowRightClick: PropTypes.func,

  /**
   *
   * {
   *   criteria,
   *   direction,
   * }
   */
  onSort: PropTypes.func,

  /**
   *
   */
  paginationFunc: PropTypes.func,

  /**
   *
   */
  paginationLoading: PropTypes.bool,

  /**
   *
   */
  paginationRowCountBuffer: PropTypes.number,

  /**
   *
   * {
   *   rowIndex,
   * }
   */
  rowClassName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),

  /**
   *
   */
  rowCount: PropTypes.number.isRequired,

  /**
   *
   */
  rowHeight: PropTypes.number,

  /**
   *
   */
  scrollRef: PropTypes.object,

  /**
   * {
   *   rowProps,
   *   nextRowProps,
   *   rowIndex,
   * }
   */
  shouldRowUpdate: PropTypes.func,

  /**
   *
   */
  tableRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

Table.defaultProps = {
  // Props
  className: '',
  disableHeader: false,
  emptyTablePlaceholder: null,
  getRowProps: () => null,
  headerClassName: '',
  headerHeight: 40,
  hideBorderBottom: false,
  initialSortState: {
    criteria: null,
    direction: null,
  },
  onRowClick: noop,
  onRowDoubleClick: noop,
  onRowMouseOut: noop,
  onRowMouseOver: noop,
  onRowRightClick: noop,
  onSort: noop,
  paginationFunc: null,
  paginationLoading: false,
  paginationRowCountBuffer: 0,
  rowClassName: '',
  rowHeight: 48,
  shouldRowUpdate: () => true,
  // Refs
  bodyRef: null,
  scrollRef: null,
  tableRef: null,
};

Table.displayName = 'TangeloTable';


export default Table;
