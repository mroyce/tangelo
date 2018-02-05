import React from 'react';
import PropTypes from 'prop-types';

import RowSorterWrapper from './RowSorterWrapper';
import TableBodyRow from './TableBodyRow';
import { SortDirection } from './constants';
import { pickProps } from './utils';

import styles from './styles.css';


class TableBody extends React.Component {
  constructor() {
    super();

    /*
     * Key: rowIndex
     * Value: <TableRow /> element
     *
     * @type {Object<number, React.Element>}
     */
    this._rowCache = {};
  }

  /*
  componentWillUpdate(nextProps) {
    // TODO only check rows that are in view
    for (const rowKey in this._unorderedRowsMap) {
      const row = this._unorderedRowsMap[rowKey];
      const rowIndex = row.props.rowIndex;
      const currentRowProps = row.props.rowProps;
      const nextRowProps = nextProps.getRowProps({ rowIndex });

      if (nextProps.shouldRowUpdate({ currentRowProps, nextRowProps, rowIndex })) {
        // TODO we need the `_constructRow` function from <TableBody />
        this._unorderedRowsMap[rowKey] = this._constructRow(rowIndex, nextProps);
      }
    }
  }
  */

  get tableBodyStyle() {
    const {
      rowHeight,
    } = this.props;

    return {
      height: `calc(100% - ${rowHeight}px)`,
    };
  }

  get tableStyle() {
    const {
      rowCount,
      rowHeight,
    } = this.props;

    return {
      // 1px border bottom
      height: `${rowCount * (rowHeight + 1)}px`,
    };
  }

  componentWillMount() {
    // TODO optimize so we only render rows that are in view
    for (let rowIndex = 0; rowIndex < this.props.rowCount; rowIndex++) {
      this._rowCache[rowIndex] = this._constructRow(rowIndex, this.props);
    }
  }

  _constructRow(rowIndex, props) {
    const className =
      typeof props.rowClassName === 'function' ?
      props.rowClassName({ rowIndex }) :
      props.rowClassName;

    const rowProps = props.getRowProps({ rowIndex });

    return (
      <TableBodyRow
        {...pickProps(props, [
          'columns',
          'rowHeight',
          'shouldRowUpdate',
        ])}
        key={`table_row_${rowIndex}`}
        className={className}
        onClick={props.onRowClick}
        onDoubleClick={props.onRowDoubleClick}
        onMouseOut={props.onRowMouseOut}
        onMouseOver={props.onRowMouseOver}
        onRightClick={props.onRowRightClick}
        rowIndex={rowIndex}
        rowProps={rowProps}
      />
    );
  }

  render() {
    return (
      <RowSorterWrapper
        rows={Object.values(this._rowCache)}
        sortDirection={this.props.sortDirection}
        sortingCriteria={this.props.sortingCriteria}
        render={sortedRows => (
          <div
            className={styles.TableBody}
            style={this.tableBodyStyle}
          >
            <div style={this.tableStyle}>
              {sortedRows}
            </div>
          </div>
        )}
      />
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
      icons: PropTypes.arrayOf(PropTypes.element),
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
  rowHeight: PropTypes.oneOfType([
    PropTypes.number,
  ]),

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
  sortDirection: null,
  sortingCriteria: null,
};

TableBody.displayName = 'TangeloTableBody';


export default TableBody;
