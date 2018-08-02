import React from 'react';
import PropTypes from 'prop-types';

import TableRow from './TableRow';
import { SortDirection } from './constants';
import { getNestedValue } from './utils';


/**
 * Stable sorting algorithm.
 * https://medium.com/@fsufitch/is-javascript-array-sort-stable-46b90822543f
 */
Array.prototype.stableSort = function(cmp) {
  cmp = !!cmp ? cmp : (a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };
  let stabilizedThis = this.map((el, index) => [el, index]);
  let stableCmp = (a, b) => {
    let order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  };
  stabilizedThis.sort(stableCmp);
  for (let i = 0; i < this.length; i ++) {
    this[i] = stabilizedThis[i][0];
  };
  return this;
};


/**
 * Wrapper responsible for sorting rows in <TableBody />.
 * Rows are sorted based on `sortingCriteria` and `sortDirection`.
 */
class RowSorterWrapper extends React.Component {
  constructor(...args) {
    super(...args);

    /*
     * Key: sortingCriteria string
     * Value: array of <TableRow /> in sorted order
     *
     * @type {Object<string, <TableRow />[]}
     */
    this._orderedRowsMap = {};

    if (this.props.sortingCriteria) {
      this._constructSortedRows(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sortingCriteria) {
      // TODO only sort if there was a sorting criteria change
      this._constructSortedRows(nextProps);
    }
  }

  _constructSortedRows(nextProps) {
    const {
      sortingCriteria,
      rows,
    } = nextProps;

    let sorted;
    const sortingCriteriaKey = this._getSortingCriteriaKey(sortingCriteria);

    /*
    // Check if we have already sorted this array
    if (this._orderedRowsMap[sortingCriteriaKey]) {
      // TODO check if array has to be resorted (new rowProp values, additions, deletions)
      return;
    }
    */

    // Otherwise sort the array and cache the result
    switch(typeof sortingCriteria) {
      case 'function':
        this._orderedRowsMap[sortingCriteriaKey] = rows.stableSort((a, b) => sortingCriteria(a.props.rowProps, b.props.rowProps));
        break;
      case 'string':
        this._orderedRowsMap[sortingCriteriaKey] = rows.stableSort((a, b) => {
          const aVal = getNestedValue(a.props.rowProps, sortingCriteria);
          const bVal = getNestedValue(b.props.rowProps, sortingCriteria);

          // Check existence
          if (!aVal) {
            if (!bVal) {
              return 0;
            }
            return -1;
          } else if (!bVal) {
            return 1;
          }

          // Compare
          if (aVal > bVal) {
            return 1;
          }
          if (aVal < bVal) {
            return -1;
          }
          return 0;
        });
        break;
      default:
        // This shouldn't happen
        throw new Error(
          `'sortingCriteria' should be of type 'function' or 'string',` +
          `received a ${typeof sortingCriteria}`
        );
    }
  }

  _getSortingCriteriaKey(sortingCriteria) {
    switch(typeof sortingCriteria) {
      case 'function':
        return sortingCriteria.name;
      case 'string':
        return sortingCriteria;
      default:
        // This shouldn't happen
        throw new Error(
          `'sortingCriteria' should be of type 'function' or 'string',` +
          `received a ${typeof sortingCriteria}`
        );
    }
  }

  _getOrderedRowsBySortingCriteria(sortingCriteria) {
    const sortingCriteriaKey = this._getSortingCriteriaKey(sortingCriteria);
    return this._orderedRowsMap[sortingCriteriaKey];
  }

  render() {
    switch(this.props.sortDirection) {
      case SortDirection.ASC:
        return this.props.render(this._getOrderedRowsBySortingCriteria(this.props.sortingCriteria));
      case SortDirection.DESC:
        return this.props.render(this._getOrderedRowsBySortingCriteria(this.props.sortingCriteria).reverse());
      default:
        return this.props.render(this.props.rows);
    }
  }
}

RowSorterWrapper.propTypes = {
  /**
   *
   */
  render: PropTypes.func.isRequired,

  /**
   *
   */
  rows: props => {
    React.Children.toArray(props.rows).forEach(child => {
      if (child.type !== TableRow) {
        return new Error('`RowSorterWrapper` only accepts children of type `TableRow`');
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
};

RowSorterWrapper.defaultProps = {
  sortDirection: null,
  sortingCriteria: null,
};


export default RowSorterWrapper;
