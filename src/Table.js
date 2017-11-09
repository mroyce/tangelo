import React from 'react';
import PropTypes from 'prop-types';

import getFlexStyle from './utils/getFlexStyle';
import TableBody from './TableBody';
import TableColumn from './TableColumn';
import TableHeader from './TableHeader';


class Table extends React.Component {
  get header() {
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
      };
    });

    return (
      <TableHeader
        className={headerClassName}
        columns={columns}
      />
    );
  }

  get body() {
    const {
      children,
      onRowClick,
      onRowDoubleClick,
      onRowMouseOut,
      onRowMouseOver,
      onRowRightClick,
      rowClassName,
      rowCount,
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
        onRowClick={onRowClick}
        onRowDoubleClick={onRowDoubleClick}
        onRowMouseOut={onRowMouseOut}
        onRowMouseOver={onRowMouseOver}
        onRowRightClick={onRowRightClick}
        rowClassName={rowClassName}
        rowCount={rowCount}
      />
    );
  }

  render() {
    console.log('Table.render');
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
};

Table.defaultProps = {
  className: '',
  disableHeader: false,
  emptyTableRenderer: null,
  headerClassName: '',
  onRowClick: null,
  onRowDoubleClick: null,
  onRowMouseOut: null,
  onRowMouseOver: null,
  onRowRightClick: null,
  rowClassName: '',
};

Table.displayName = 'TangeloTable';


export default Table;
