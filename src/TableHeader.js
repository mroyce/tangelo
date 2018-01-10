import React from 'react';
import PropTypes from 'prop-types';

import { SortDirection } from './constants';
import pickProps from './utils/pickProps';
import HeaderSortArrow from './HeaderSortArrow';
import TableCell from './TableCell';


// TODO make <TableHeader /> render an instance of <TableRow /> so we don't
// have this duplicate code
class TableHeader extends React.Component {
  constructor() {
    super();

    // <number: columnIndex, Element: <TableCell />>
    this._cellCache = {};

    this.state = {
      // If a child cell is highlighted, we shouldn't highlight the row
      isChildCellHighlighted: false,
    };

    this.handleChildCellMouseOver = this.handleChildCellMouseOver.bind(this);
    this.handleChildCellMouseOut = this.handleChildCellMouseOut.bind(this);
  }

  componentWillMount() {
    this._constructCells(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.sortingCriteria !== nextProps.sortingCriteria ||
        this.props.sortDirection !== nextProps.sortDirection) {
      this._constructCells(nextProps);
    }
  }

  handleChildCellMouseOver() {
    this.setState({ isChildCellHighlighted: true });
  }

  handleChildCellMouseOut() {
    this.setState({ isChildCellHighlighted: false });
  }

  _constructCells(props) {
    // TODO optimize so we only render cells that are in view
    props.columns.forEach((column, columnIndex) => {
      const className = 
        typeof column.columnClassName === 'function' ?
        column.columnClassName({ columnIndex }) :
        column.columnClassName;
      
      const cellContent =
        typeof column.cellRenderer === 'function' ?
        column.cellRenderer({ columnIndex }) :
        column.cellRenderer;

      // TODO better function composition
      let onClick = column.onCellClick;
      if (column.sortBy) {
        onClick = event => {
          column.onCellClick({ event, columnIndex, rowIndex: -1 });
          props.handleHeaderSortClick(column.sortBy);
        }
      }
      
      this._cellCache[columnIndex] = (
        <TableCell
          {...pickProps(column, [
            'align',
            'flexStyle',
          ])}
          key={`table_cell_header_${columnIndex}`}
          className={className}
          columnIndex={columnIndex}
          handleChildCellMouseOver={this.handleChildCellMouseOver}
          handleChildCellMouseOut={this.handleChildCellMouseOut}
          onClick={onClick}
          onDoubleClick={column.onCellDoubleClick}
          onMouseOut={column.onCellMouseOut}
          onMouseOver={column.onCellMouseOver}
          onRightClick={column.onCellRightClick}
          rowIndex={-1}
        > 
          {cellContent}
          {column.sortBy && props.sortingCriteria === column.sortBy &&
            <HeaderSortArrow sortDirection={props.sortDirection} />
          }
        </TableCell>
      );
    });
  }

  render() {
    const {
      className,
    } = this.props;

    const {
      isChildCellHighlighted,
    } = this.state;

    // TODO use classNames package
    let constructedClassName = 'Tangelo__Table__header';
    constructedClassName += className ? ` ${className}` : '';
    constructedClassName += isChildCellHighlighted ? ' Tangelo__Table__header--highlight-disabled' : '';

    return [
      <div
        key="header-content"
        className={constructedClassName}
      >
        {Object.values(this._cellCache)}
      </div>,

      <div
        key="header-space"
        className="Tangelo__Table__header-space"
      />,
    ];
  }
};

TableHeader.propTypes = {
  /**
   *
   */
  className: PropTypes.string,

  /**
   *
   * TODO create types for columns
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
      onCellClick: PropTypes.func,
      onCellDoubleClick: PropTypes.func,
      onCellMouseOut: PropTypes.func,
      onCellMouseOver: PropTypes.func,
      onCellRightClick: PropTypes.func,
    })
  ).isRequired,

  /**
   *
   */
  handleHeaderSortClick: PropTypes.func.isRequired,

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

TableHeader.defaultProps = {
  className: '',
  sortDirectio: null,
  sortingCriteria: null,
};

TableHeader.displayName = 'TangeloTableHeader';


export default TableHeader;
