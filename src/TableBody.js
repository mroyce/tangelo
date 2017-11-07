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
      <div className="tangelo-table__body">
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
          'flex-basis': PropTypes.string,
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
  rowClassName: '',
};

TableBody.displayName = 'TangeloTableBody';


export default TableBody;
