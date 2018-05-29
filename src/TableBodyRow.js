import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TableRow from './TableRow';
import { pickProps } from './utils';


// TODO possibly convert this to a function like react-virtualized-table
class TableBodyRow extends React.Component {
  render() {
    return (
      <TableRow
        key={`Table__Row__${this.props.rowIndex}`}
        {...pickProps(this.props, [
          'columns',
          'onClick',
          'onDoubleClick',
          'onMouseOut',
          'onMouseOver',
          'onRightClick',
          'rowHeight',
          'rowIndex',
        ])}
        className={classNames(
          "Tangelo__TableRow--body",
          this.props.className
        )}
      />
    );
  }
};

TableBodyRow.propTypes = {
  /**
   *
   */
  className: PropTypes.string,

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
      icons: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.func,
      ]),
    })
  ).isRequired,

  /**
   *
   */
  onClick: PropTypes.func,

  /**
   *
   */
  onDoubleClick: PropTypes.func,

  /**
   *
   */
  onMouseOut: PropTypes.func,

  /**
   *
   */
  onMouseOver: PropTypes.func,

  /**
   *
   */
  onRightClick: PropTypes.func,

  /**
   *
   */
  rowHeight: PropTypes.number.isRequired,

  /**
   *
   */
  rowIndex: PropTypes.number.isRequired,

  /**
   * TODO better propType validation
   */
  rowProps: PropTypes.object,

  /**
   *
   */
  selected: PropTypes.bool,
};

TableBodyRow.defaultProps = {
  className: '',
  onClick: null,
  onDoubleClick: null,
  onMouseOut: null,
  onMouseOver: null,
  onRightClick: null,
  selected: false,
};

TableBodyRow.displayName = 'TangeloTableBodyRow';


export default TableBodyRow;
