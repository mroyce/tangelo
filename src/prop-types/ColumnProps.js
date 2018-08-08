import PropTypes from 'prop-types';


export default {
  /**
   * Alignment of content for cells in this column.
   */
  align: PropTypes.oneOf([
    'left',
    'right',
    'center',
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
   * The content that will be displayed for cells in this column.
   *
   * Accepts the following parameters:
   * {
   *   columnIndex,
   *   rowIndex, (if table body cell)
   * }
   */
  cellRenderer: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),

  /**
   * Flex styles to apply to cells in this column.
   *
   * Percent widths use flex-basis, pixel widths use flex.
   */
  flexStyle: PropTypes.oneOfType([
    PropTypes.shape({
      flexBasis: PropTypes.string,
    }),
    PropTypes.shape({
      flex: PropTypes.string,
    }),
  ]).isRequired,

  /**
   * An array of SVG elements or a function that returns an array of SVG elements
   * which will be displayed in the bottom-right-hand corner of the cell.
   * All SVGs are scaled to 16x16 pixels.
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
};
