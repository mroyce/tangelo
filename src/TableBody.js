import React from 'react';
import PropTypes from 'prop-types';

import RowSorterWrapper from './RowSorterWrapper';
import TableBodyRow from './TableBodyRow';
import { SortDirection } from './constants';
import { pickProps } from './utils';


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
      <div className="Tangelo__Table__Body">
        <RowSorterWrapper
          getRowProps={this.props.getRowProps}
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
