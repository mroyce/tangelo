import React from 'react';
import PropTypes from 'prop-types';

import { SortDirection } from './constants';


const HeaderSortArrow = ({ sortDirection }) => {
  // TODO Get SVG from K2
  if (sortDirection === SortDirection.DESC) {
    return 'V';
  } else if (sortDirection === SortDirection.ASC) {
    return '^';
  }
  return null;
};

HeaderSortArrow.propTypes = {
  sortDirection: PropTypes.oneOf([
    SortDirection.ASC,
    SortDirection.DESC,
  ]),
};

HeaderSortArrow.defaultProps = {
  sortDirection: null,
};


export default HeaderSortArrow;
