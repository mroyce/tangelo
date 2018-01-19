import React from 'react';
import PropTypes from 'prop-types';

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
  constructor() {
    super();

    this.state = {
      sortDirection: null,
      sortingCriteria: null,
    };

    this.handleHeaderSortClick = this.handleHeaderSortClick.bind(this);
  }

  handleHeaderSortClick(sortingCriteria) {
    this.setState((prevState) => {
      let newSortDirection = prevState.sortDirection;
      let newSortingCriteria = sortingCriteria;

      if (prevState.sortingCriteria === sortingCriteria) {
        if (prevState.sortDirection === SortDirection.ASC) {
          // ASC -> DESC
          newSortDirection = SortDirection.DESC;
        } else if (prevState.sortDirection === SortDirection.DESC) {
          // DESC -> None
          newSortDirection = null;
          newSortingCriteria = null;
        }
      } else {
        // None -> ASC
        newSortDirection = SortDirection.ASC;
      }

      return {
        sortDirection: newSortDirection,
        sortingCriteria: newSortingCriteria,
      };
    });
  }

  get header() {
    if (this.props.disableHeader) {
      return null;
    }

    const columns = this.columns.map(column => {
      return {
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
          'sortBy',
        ]),
        cellRenderer: column.props.headerCellRenderer,
        flexStyle: getFlexStyle(column.props.width, column.props.widthType),
      };
    });

    return (
      <TableHeaderRow
        className={this.props.headerClassName}
        columns={columns}
        handleHeaderSortClick={this.handleHeaderSortClick}
        sortDirection={this.state.sortDirection}
        sortingCriteria={this.state.sortingCriteria}
      />
    );
  }

  get body() {
    const columns = this.columns.map(column => {
      return {
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
        ]),
        cellRenderer: column.props.bodyCellRenderer,
        flexStyle: getFlexStyle(column.props.width, column.props.widthType),
      };
    });

    return (
      <TableBody
        {...pickProps(this.props, [
          'getRowProps',
          'onRowClick',
          'onRowDoubleClick',
          'onRowMouseOut',
          'onRowMouseOver',
          'onRowRightClick',
          'rowClassName',
          'rowCount',
          'shouldRowUpdate',
        ])}
        columns={columns}
        sortDirection={this.state.sortDirection}
        sortingCriteria={this.state.sortingCriteria}
      />
    );
  }

  get columns() {
    return React.Children.toArray(this.props.children);
  }

  render() {
    return (
      <div className={`Tangelo__Table ${this.props.className}`}>
        {this.header}
        {this.body}
      </div>
    );
  }
};

Table.propTypes = {
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
  emptyTableRenderer: PropTypes.oneOfType([
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
   * {
   *   rowProps,
   *   nextRowProps,
   *   rowIndex,
   * }
   */
  shouldRowUpdate: PropTypes.func,
};

Table.defaultProps = {
  className: '',
  disableHeader: false,
  emptyTableRenderer: null,
  getRowProps: () => null,
  headerClassName: '',
  onRowClick: noop,
  onRowDoubleClick: noop,
  onRowMouseOut: noop,
  onRowMouseOver: noop,
  onRowRightClick: noop,
  rowClassName: '',
  shouldRowUpdate: () => true,
};

Table.displayName = 'TangeloTable';


export default Table;
