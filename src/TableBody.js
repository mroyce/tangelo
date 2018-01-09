import React from 'react';
import PropTypes from 'prop-types';

import { SortDirection } from './constants';
import pickProps from './utils/pickProps';
import TableRow from './TableRow';
import RowSorterWrapper from './RowSorterWrapper';


class TableBody extends React.Component {
  constructor() {
    super();

    /*
     * Mapping from row number to <TableRow /> element
     *
     * @type {Object<number, React.Element>}
     */
    this._rowCache = {};
  }

  componentWillMount() {
    this._constructRows();
  }

  componentWillUpdate(nextProps) {
    // TODO only check rows that are in view
    for (const rowIndexString in this._rowCache) {
      const rowIndex = Number(rowIndexString);
      const currentRowProps = this._rowCache[rowIndex].props.rowProps;
      const nextRowProps = nextProps.getRowProps({ rowIndex });

      // TODO don't check this function if it's the default () => true
      if (nextProps.shouldRowUpdate({ currentRowProps, nextRowProps, rowIndex })) {
        this._rowCache[rowIndex] = this._constructRow(rowIndex, nextProps);
      }
    }
  }

  _constructRow(rowIndex, props) {
    const className =
      typeof props.rowClassName === 'function' ?
      props.rowClassName({ rowIndex }) :
      props.rowClassName;

    const rowProps = props.getRowProps({ rowIndex });

    return (
      <TableRow
        {...pickProps(props, [
          'columns',
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

  _constructRows() {
    // TODO optimize so we only render rows that are in view
    for (let rowIndex = 0; rowIndex < this.props.rowCount; rowIndex++) {
      this._rowCache[rowIndex] = this._constructRow(rowIndex, this.props);
    }
  }

  render() {
    return (
      <div className="Tangelo__Table__body">
        <RowSorterWrapper
          sortDirection={this.props.sortDirection}
          sortingCriteria={this.props.sortingCriteria}
        >
          {Object.values(this._rowCache)}
        </RowSorterWrapper>
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
  sortDirection: null,
  sortingCriteria: null,
};

TableBody.displayName = 'TangeloTableBody';


export default TableBody;
