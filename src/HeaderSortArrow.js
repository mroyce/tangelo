import React from 'react';
import PropTypes from 'prop-types';

import { SortDirection } from './constants';


const Arrow = ({ direction }) => {
  const transformFlipVertically = direction === 'up' ? 'scale(1, -1)' : '';

  return (
    <svg width="14" height="14" viewBox="0 0 14 14" transform={transformFlipVertically}>
      <g fill="#000" fillRule="evenodd">
        <rect width="14" height="14" fillOpacity=".1" rx="2"/>
        <path fillOpacity=".3" d="M8 8.414l1.828-1.828L11.243 8l-2.829 2.828L7 12.243 2.757 8l1.415-1.414L6 8.414V2h2v6.414z"/>
      </g>
    </svg>
  );
};

Arrow.propTypes = {
  direction: PropTypes.oneOf([
    'down',
    'up',
  ]).isRequired,
};


const HeaderSortArrow = ({ sortDirection }) => {
  if (sortDirection === SortDirection.ASC) {
    return <Arrow direction="down" />;
  } else if (sortDirection === SortDirection.DESC) {
    return <Arrow direction="up" />;
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
