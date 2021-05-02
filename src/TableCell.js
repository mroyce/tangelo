import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useComponentSize from './hooks/useComponentSize';
import {
  getEventHandlerProps,
  getIsClickable,
  isEmpty,
  noop,
  pipe,
} from './utils';
import Tooltip from './Tooltip';


/**
 * Represents a single Cell in <TableRow />.
 *
 * @param {Object} props
 * @returns {React.Element}
 */
const TableCell = props => {
  const content = React.useRef(null);
  const size = useComponentSize(content);
  const { columnIndex, rowIndex } = props;

  const cellStyle = {
    ...props.flexStyle,
    textAlign: props.align,
  };

  const eventHandlerProps = getEventHandlerProps(props, { columnIndex, rowIndex });
  const highlightable = !isEmpty(eventHandlerProps);
  const emptyChildren = Array.isArray(props.children) ? !props.children.some(c => c) : !props.children;

  const cell = (
    <div
      className={classNames(
        "Tangelo__TableCell",
        props.className,
        {
          'Tangelo__TableCell--hide-right-border': props.hideRightBorder,
          'Tangelo__TableCell--empty': emptyChildren,
          'Tangelo__TableCell--highlightable': highlightable,
          'Tangelo__TableCell--clickable': getIsClickable(props),
        }
      )}
      style={cellStyle}
      {...eventHandlerProps}
    >
      <div
        className="Tangelo__TableCell__Content"
        ref={content}
      >
        {isEmpty(props.trailingIcons) || props.align !== 'right' || props.trailingIcons.map((icon, idx) => (
          <div
            className="Tangelo__TableCell__TrailingIconWrapper Tangelo__TableCell__TrailingIconWrapper--left"
            key={`table_trailingicon_${rowIndex}_${columnIndex}_${idx}`}
          >
            {icon}
          </div>
        ))}
        <span>{props.children}</span>
        {isEmpty(props.trailingIcons) || props.align === 'right' || props.trailingIcons.map((icon, idx) => (
          <div
            className="Tangelo__TableCell__TrailingIconWrapper"
            key={`table_trailingicon_${rowIndex}_${columnIndex}_${idx}`}
          >
            {icon}
          </div>
        ))}
      </div>
      {isEmpty(props.icons) || (
        <div
          className={classNames(
            "Tangelo__TableCell__IconsSection",
            {
              'Tangelo__TableCell__IconsSection--left': props.align === "right",
            }
          )}
        >
          {props.icons.map((icon, idx) => (
            <div
              key={`table_icon_${rowIndex}_${columnIndex}_${idx}`}
              className="Tangelo__TableCell__IconWrapper"
            >
              {icon}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  let tooltipContent;
  if (props.tooltip) {
    // use props.tooltip if provided
    tooltipContent = props.tooltip;
  } else {
    // else check if content is truncated - display tooltip with the innterText
    if (content.current && content.current.scrollWidth > size.width) {
      tooltipContent = content.current.innerText;
    }
  }

  return tooltipContent ? (
    <Tooltip title={tooltipContent}>
      {cell}
    </Tooltip>
  ) : cell;
};

TableCell.propTypes = {
  /**
   *
   */
  align: PropTypes.oneOf([
    'left',
    'right',
    'center',
  ]),

  /**
   *
   */
  children: PropTypes.node,

  /**
   *
   */
  className: PropTypes.string,

  /**
   *
   */
  columnIndex: PropTypes.number.isRequired,

  /**
   *
   */
  flexStyle: PropTypes.oneOfType([
    PropTypes.shape({
      'flex-basis': PropTypes.string,
    }),
    PropTypes.shape({
      flex: PropTypes.string,
    }),
  ]).isRequired,

  /**
   * True if you want to hide the right border from this cell.
   */
  hideRightBorder: PropTypes.bool,

  /**
   *
   */
  icons: PropTypes.arrayOf(PropTypes.element),

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
  rowIndex: PropTypes.number.isRequired,

  /**
   *
   */
  tooltip: PropTypes.node,

  /**
   *
   */
  trailingIcons: PropTypes.arrayOf(PropTypes.element),
};

TableCell.defaultProps = {
  children: null,
  className: '',
  hideRightBorder: false,
  onClick: null,
  onDoubleClick: null,
  onMouseOut: null,
  onMouseOver: null,
  onRightClick: null,
  tooltip: null,
};

TableCell.displayName = 'TangeloTableCell';


export default TableCell;
