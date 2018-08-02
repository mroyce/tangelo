import React from 'react';
import PropTypes from 'prop-types';

import { SortDirection } from './constants';


const Arrow = ({ direction }) => {
  const SIZE = 14;
  const transformFlipVertically = direction === 'up' ? `scale(1, -1) translate(0, -${SIZE})` : '';
  const viewBox = `0 0 ${SIZE} ${SIZE}`;

  // Safari doesn't support transforms on <svg> so we add a nested <g> element
  return (
    <svg width={SIZE} height={SIZE} viewBox={viewBox} className="Tangelo__HeaderSortArrow">
      <g transform={transformFlipVertically}>
        <g fill="#000" fillRule="evenodd">
          <rect width={SIZE} height={SIZE} fillOpacity=".2" rx="2"/>
          <path fillOpacity=".6" d="M8 8.414l1.828-1.828L11.243 8l-2.829 2.828L7 12.243 2.757 8l1.415-1.414L6 8.414V2h2v6.414z"/>
        </g>
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
