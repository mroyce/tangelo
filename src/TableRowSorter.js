import React from 'react';
import PropTypes from 'prop-types';

import { SortDirection } from './constants';
import TableRow from './TableRow';


class TableRowSorter extends React.Component {
  constructor() {
    super();

    // <number: rowOrder, number: rowIndex>
    this._rowOrderCache = {};
  }

  componentWillMount() {
    for (let index = 0; index < React.Children.toArray(this.props.children).length; index++) {
      this._rowOrderCache[index] = index;
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
        sortDirection,
        sortingCriteria,
    } = nextProps;

    if (this.props.sortingCriteria !== sortingCriteria ||
            this.props.sortDirection !== sortDirection) {
      this._orderRows(sortingCriteria, sortDirection);
    }
  }

  _orderRows(sortingCriteria, sortDirection) {
    const rows = this.props.children;
    let sorted;

    if (typeof sortingCriteria === 'function') {
      sorted = rows.sort((a, b) => {
        return sortingCriteria(a.props.rowProps, b.props.rowProps);
      });
    } else if (typeof sortingCriteria === 'string') {
      const sortingCriteriaFieldArray = sortingCriteria.split('.');
      sorted = rows.sort((a, b) => {
        let aVal = a.props.rowProps;
        let bVal = b.props.rowProps;

        for (let index = 0; index < sortingCriteriaFieldArray.length; index++) {
          const key = sortingCriteriaFieldArray[index];
          aVal = aVal[key];
          bVal = bVal[key];
        }

        if (aVal > bVal) {
          return 1;
        }
        if (aVal < bVal) {
          return -1;
        }
        return 0;
      });
    } else {
      // This shouldn't happen, maybe throw an error?
      sorted = rows;
    }

    if (sortDirection === SortDirection.DESC) {
      sorted.reverse();
    }

    for (let index = 0; index < sorted.length; index++) {
      this._rowOrderCache[index] = sorted[index].props.rowIndex;
    }
  }

  render() {
    const sorted = [];

    for (const index in this._rowOrderCache) {
      sorted[index] = React.Children.toArray(this.props.children)[this._rowOrderCache[index]];
    }

    return sorted;
  }
}

TableRowSorter.propTypes = {
  /**
   * Children of `<TableRowSorter />` should be `<TableRow />`.
   */
  children: props => {
    React.Children.toArray(props.children).forEach(child => {
      if (child.type !== TableRow) {
        return new Error('`TableRowSorter` only accepts children of type `TableRow`');
      }
    });
  },

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
}

TableRowSorter.defaultProps = {
  sortDirection: null,
  sortingCriteria: null,
}


export default TableRowSorter;
