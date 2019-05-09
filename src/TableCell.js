import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  getEventHandlerProps,
  getIsClickable,
  isEmpty,
  noop,
  pipe,
} from './utils';
import Tooltip from './Tooltip';


// TODO possibly convert this to a function like react-virtualized-table
class TableCell extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      tooltipContent: null,
    };

    this.content = React.createRef();
  }

  componentDidMount() {
    const { current } = this.content;

    if (this.props.tooltip) {
      this.setState({
        tooltipContent: this.props.tooltip,
      });
    }

    if (current && current.scrollWidth > current.clientWidth) {
      this.setState({
        tooltipContent: current.innerText,
      });
    }
  }

  get style() {
    const {
      align,
      flexStyle,
    } = this.props;

    return {
      ...flexStyle,
      textAlign: align,
    };
  }

  render() {
    const {
      columnIndex,
      rowIndex,
    } = this.props;

    const eventHandlerProps = getEventHandlerProps(this, { columnIndex, rowIndex });
    const highlightable = !isEmpty(eventHandlerProps);
    const emptyChildren = Array.isArray(this.props.children) ?
      !this.props.children.some(c => c) :
      !this.props.children;

    const cell = (
      <div
        className={classNames(
          "Tangelo__TableCell",
          this.props.className,
          {
            'Tangelo__TableCell--hide-right-border': this.props.hideRightBorder,
            'Tangelo__TableCell--empty': emptyChildren,
            'Tangelo__TableCell--highlightable': highlightable,
            'Tangelo__TableCell--clickable': getIsClickable(this),
          }
        )}
        style={this.style}
        {...eventHandlerProps}
      >
        <div
          className="Tangelo__TableCell__Content"
          ref={this.content}
        >
          {this.props.children}
          {isEmpty(this.props.icons) || (
            <div
              className={classNames(
                "Tangelo__TableCell__IconsSection",
                {
                  'Tangelo__TableCell__IconsSection--left': this.props.align === "right",
                }
              )}
            >
              {this.props.icons.map((icon, idx) => (
                <div key={idx} className="Tangelo__TableCell__IconWrapper">
                  {icon}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );

    return this.state.tooltipContent ? (
      <Tooltip title={this.state.tooltipContent}>
        {cell}
      </Tooltip>
    ) : cell;
  }
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
};

TableCell.displayName = 'TangeloTableCell';


export default TableCell;
