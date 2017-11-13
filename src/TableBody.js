import React from 'react';
import PropTypes from 'prop-types';

import TableRow from './TableRow';


class TableBody extends React.Component {
  constructor() {
    super();

    // <number: rowIndex, Element: <TableRow />>
    // TODO change to <rowKey, Element>?
    this._rowCache = {};
  }

  componentWillMount() {
    this._constructRows();
  }

  componentWillUpdate(nextProps) {
    const {
      getRowProps,
      rowCount,
      shouldRowUpdate,
    } = nextProps;

    // TODO only check rows that are in view
    for (const rowIndexString in this._rowCache) {
      const rowIndex = Number(rowIndexString);
      const currentRowProps = this._rowCache[rowIndex].props.rowProps;
      const nextRowProps = getRowProps({ rowIndex });
      if (shouldRowUpdate({ currentRowProps, nextRowProps, rowIndex })) {
        this._rowCache[rowIndex] = this._constructRow(rowIndex, nextProps);
      }
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
    }
  }

  render() {
    console.log('TableBody.render');
    return (
      <div className="Tangelo__Table__body">
        {Object.values(this._rowCache)}
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
};

TableBody.displayName = 'TangeloTableBody';


export default TableBody;
