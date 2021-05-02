import React from 'react';
import PropTypes from 'prop-types';

import { noop } from './utils';


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
   * Alignment of content for cells in this column.
   */
  align: PropTypes.oneOf([
    'left',
    'right',
    'center',
  ]),

  /**
   * The content that will be displayed for table body cells in this column.
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
   * ``className`` that will be applied to cells in this column.
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
   * The content that will be displayed for table header cells in this column.
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
   * If True, doesn't display a dividing line between this column and the column to the right.
   */
  hideRightBorder: PropTypes.bool,

  /**
   * An array of SVG elements or a function that returns an array of SVG elements
   * which will be displayed in the bottom-right-hand corner of the cell.
   * All SVGs will be scaled to 16x16 pixels.
   *
   * Accepts the following parameters:
   * {
   *   rowIndex,
   * }
   */
  icons: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
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
   * The sorting criteria for this column. Can either be a string or a function.
   * If the criteria is a string, we use the string as the key for the property
   * in ``rowProps`` and compare against that value.
   *
   * If the criteria is a function, the function will be used as a comparator
   * and will receive the following parameters: 
   * {
   *   rowIndex,
   * }
   */
  sortBy: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),

  /**
   *
   */
  tooltip: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),

   /**
   * An array of SVG elements or a function that returns an array of SVG elements
   * which will be displayed beside the label in table cell
   * All SVGs will be scaled to 16x16 pixels.
   *
   * Accepts the following parameters:
   * {
   *   rowIndex,
   * }
   */
  trailingIcons: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.func,
  ]),

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
  hideRightBorder: false,
  icons: [],
  minWidth: null,
  onCellClick: noop,
  onCellDoubleClick: noop,
  onCellMouseOut: noop,
  onCellMouseOver: noop,
  onCellRightClick: noop,
  sortBy: null,
  tooltip: null,
  trailingIcons: [],
  widthType: '%',
};

TableColumn.displayName = 'TangeloTableColumn';


export default TableColumn;
