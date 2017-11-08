import React from 'react';
import PropTypes from 'prop-types';

import TableRow from './TableRow';


class TableBody extends React.Component {
  constructor() {
    super();

    // <number: rowIndex, Element: <TableRow />>
    this._rowCache = {};
  }

  componentWillMount() {
    this._constructRows();
  }

  _constructRows() {
    const {
      columns,
      rowClassName,
      rowCount,
    } = this.props;

    // TODO optimize so we only render rows that are in view
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      const className = typeof rowClassName === 'function' ? rowClassName({ rowIndex }) : rowClassName;

      this._rowCache[rowIndex] = (
        <TableRow
          key={`table_row_${rowIndex}`}
          columns={columns}
          className={className}
          rowIndex={rowIndex}
        />
      );
    }
  }

  render() {
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
      ]).isRequired,
    })
  ).isRequired,

  /**
   *
   */
  onRowClick: PropTypes.func,

  /**
   *
   */
  onRowDoubleClick: PropTypes.func,

  /**
   *
   */
  onRowMouseOut: PropTypes.func,

  /**
   *
   */
  onRowMouseOver: PropTypes.func,

  /**
   *
   */
  onRowRightClick: PropTypes.func,

  /**
   *
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

TableBody.defaultProps = {
  onRowClick: () => {},
  onRowDoubleClick: () => {},
  onRowMouseOut: () => {},
  onRowMouseOver: () => {},
  onRowRightClick: () => {},
  rowClassName: '',
};

TableBody.displayName = 'TangeloTableBody';


export default TableBody;
