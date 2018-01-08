import React from 'react';
import PropTypes from 'prop-types';

import { SortDirection } from './constants';
import TableRow from './TableRow';


/**
 * Wrapper responsible for sorting rows in <TableBody />.
 * Rows are sorted based on `sortingCriteria` and `sortDirection`.
 * 
 * `sortingCriteria` can be either a `function` or a `string`.
 */
class RowSorterWrapper extends React.Component {
  constructor(props) {
    super(props);

    /*
     * Original copy of unordered rows
     *
     * @type {React.Element[]}
     */
    this._unorderedRows = React.Children.toArray(props.children);

    /*
     * Key: sortingCriteria string
     * Value: array of rows sorted by the given sortingCriteria key
     *
     * @type {Object<string, React.Element[]>}
     */
    this._orderedRowsMap = {};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sortingCriteria &&
        this.props.sortingCriteria !== nextProps.sortingCriteria) {
      this._constructSortedRows(nextProps.sortingCriteria);
    }
  }

  _constructSortedRows(sortingCriteria) {
    // Check if we've cached a sorted array
    if (this._orderedRowsMap[sortingCriteria]) {
      // TODO check if array has to be resorted (new rowProp values, additions, deletions)
      return;
    }

    // Otherwise sort the original array and store the sorted array
    const unorderedRows = this._unorderedRows.slice();
    switch(typeof sortingCriteria) {
      case 'function':
        this._orderedRowsMap[sortingCriteria] = unorderedRows.sort((a, b) => sortingCriteria(a.props.rowProps, b.props.rowProps));
        break;
      case 'string':
        const sortingCriteriaFieldNames = sortingCriteria.split('.');
        this._orderedRowsMap[sortingCriteria] = unorderedRows.sort((a, b) => {
          let aVal = a.props.rowProps;
          let bVal = b.props.rowProps;

          for (let index = 0; index < sortingCriteriaFieldNames.length; index++) {
            const key = sortingCriteriaFieldNames[index];
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
        break;
      default:
        // This shouldn't happen
        throw new Error(
          `'sortingCriteria' should be of type 'function' or 'string',` +
          `received a ${typeof sortingCriteria}`
        );
    }
  }

  render() {
    switch(this.props.sortDirection) {
      case SortDirection.ASC:
        return this._orderedRowsMap[this.props.sortingCriteria];
      case SortDirection.DESC:
        return this._orderedRowsMap[this.props.sortingCriteria].slice().reverse();
      default:
        return this._unorderedRows;
    }
  }
}

RowSorterWrapper.propTypes = {
  /**
   * Children of `<RowSorterWrapper />` should be `<TableRow />`.
   */
  children: props => {
    React.Children.toArray(props.children).forEach(child => {
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
}

RowSorterWrapper.defaultProps = {
  sortDirection: null,
  sortingCriteria: null,
}


export default RowSorterWrapper;
