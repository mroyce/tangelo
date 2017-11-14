import React from 'react';
import PropTypes from 'prop-types';

import { SortDirection } from './constants';
import getFlexStyle from './utils/getFlexStyle';
import noop from './utils/noop';
import TableBody from './TableBody';
import TableColumn from './TableColumn';
import TableHeader from './TableHeader';


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
      let sortDirection;

      if (prevState.sortingCriteria === sortingCriteria) {
        if (prevState.sortDirection === SortDirection.ASC) {
          sortDirection = SortDirection.DESC;
        } else if (prevState.sortDirection === SortDirection.DESC) {
          sortingCriteria = null;
        }
      } else {
        sortDirection = SortDirection.ASC;
      }

      return {
        sortDirection,
        sortingCriteria,
      };
    });
  }

  get header() {
    const {
      handleHeaderSortClick,
    } = this;

    const {
      sortDirection,
      sortingCriteria,
    } = this.state;

    const {
      children,
      disableHeader,
      headerClassName,
    } = this.props;

    if (disableHeader) {
      return null;
    }

    const columns = React.Children.toArray(children).map(column => {
      const {
        align,
        columnClassName,
        headerCellRenderer,
        onCellClick,
        onCellDoubleClick,
        onCellMouseOut,
        onCellMouseOver,
        onCellRightClick,
        sortBy,
        width,
        widthType,
      } = column.props;

      return {
        align,
        columnClassName,
        cellRenderer: headerCellRenderer,
        flexStyle: getFlexStyle(width, widthType),
        onCellClick,
        onCellDoubleClick,
        onCellMouseOut,
        onCellMouseOver,
        onCellRightClick,
        sortBy,
      };
    });

    return (
      <TableHeader
        className={headerClassName}
        columns={columns}
        handleHeaderSortClick={handleHeaderSortClick}
        sortDirection={sortDirection}
        sortingCriteria={sortingCriteria}
      />
    );
  }

  get body() {
    const {
      sortDirection,
      sortingCriteria,
    } = this.state;

    const {
      children,
      getRowProps,
      onRowClick,
      onRowDoubleClick,
      onRowMouseOut,
      onRowMouseOver,
      onRowRightClick,
      rowClassName,
      rowCount,
      shouldRowUpdate,
    } = this.props;

    const columns = React.Children.toArray(children).map(column => {
      const {
        align,
        bodyCellRenderer,
        columnClassName,
        onCellClick,
        onCellDoubleClick,
        onCellMouseOut,
        onCellMouseOver,
        onCellRightClick,
        width,
        widthType,
      } = column.props;

      return {
        align,
        columnClassName,
        cellRenderer: bodyCellRenderer,
        flexStyle: getFlexStyle(width, widthType),
        onCellClick,
        onCellDoubleClick,
        onCellMouseOut,
        onCellMouseOver,
        onCellRightClick,
      };
    });

    return (
      <TableBody
        columns={columns}
        getRowProps={getRowProps}
        onRowClick={onRowClick}
        onRowDoubleClick={onRowDoubleClick}
        onRowMouseOut={onRowMouseOut}
        onRowMouseOver={onRowMouseOver}
        onRowRightClick={onRowRightClick}
        rowClassName={rowClassName}
        rowCount={rowCount}
        shouldRowUpdate={shouldRowUpdate}
        sortDirection={sortDirection}
        sortingCriteria={sortingCriteria}
      />
    );
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
