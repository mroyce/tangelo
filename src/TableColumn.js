import React from 'react';
import PropTypes from 'prop-types';


class TableColumn extends React.Component {
  render() {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(
        '<TableColumn /> should never render'
      );
    }
    return null;
  }
};

TableColumn.propTypes = {
  /**
   *
   */
  align: PropTypes.oneOf([
    'left',
    'right',
    'center',
  ]),

  /**
   * The cell content that will be displayed for cells under this column
   * for each row in the table.
   *
   * Accepts the following parameters:
   * {
   *   columnIndex,
   *   rowIndex,
   * }
   */
  bodyCellRenderer: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),

  /**
   * ``className`` that will be applied to every cell in this column.
   *
   * Accepts the following parameters:
   * {
   *   columnIndex,
   *   rowIndex,
   * }
   */
  columnClassName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),

  /**
   * The cell component that will be displayed in the header for this column.
   *
   * Accepts the following parameters:
   * {
   *   columnIndex,
   * }
   */
  headerCellRenderer: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),

  /**
   * For resizable columns (i.e. those using '%' width), provide a minimum width
   * in pixels, at which point horizontal scrolling is enabled.
   */
  minWidth: PropTypes.number,

  /**
   * Function that is called with a cell is clicked.
   *
   * Accepts the following parameters:
   * {
   *   columnIndex,
   *   rowIndex,
   * }
   */
  onCellClick: PropTypes.func,

  /**
   * Function that is called when a cell is double clicked.
   *
   * Accepts the following parameters:
   * {
   *   columnIndex,
   *   rowIndex,
   * }
   */
  onCellDoubleClick: PropTypes.func,

  /**
   * Function that is called when the user's cursor leaves a cell.
   *
   * Accepts the following parameters:
   * {
   *   columnIndex,
   *   rowIndex,
   * }
   */
  onCellMouseOut: PropTypes.func,

  /**
   * Function that is called when the user's cursor enters a cell.
   *
   * Accepts the following parameters:
   * {
   *   columnIndex,
   *   rowIndex,
   * }
   */
  onCellMouseOver: PropTypes.func,

  /**
   * Function that is called when a cell is right clicked.
   *
   * Accepts the following parameters:
   * {
   *   columnIndex,
   *   rowIndex,
   * }
   */
  onCellRightClick: PropTypes.func,

  /**
   * The width of the cells in this column in pixels or percentage.
   */
  width: PropTypes.number.isRequired,

  /**
   * The measurement unit for this column's width. Can be either 'px' or '%'.
   * If the value is 'px', the column will be a fixed width.
   * If the value is '%', the column will scale with the browser window.
   * By default, values are percentage width.
   */
  widthType: PropTypes.oneOf(['px', '%']),
};

TableColumn.defaultProps = {
  align: 'left',
  bodyCellRenderer: null, // TODO create defaultBodyCellRenderer
  columnClassName: '',
  headerCellRenderer: null, // TODO create defaultHeaderCellRenderer
  minWidth: null,
  onCellClick: () => {},
  onCellDoubleClick: () => {},
  onCellMouseOut: () => {},
  onCellMouseOver: () => {},
  onCellRightClick: () => {},
  widthType: '%',
};

TableColumn.displayName = 'TangeloTableColumn';


export default TableColumn;
