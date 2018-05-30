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


// TODO possibly convert this to a function like react-virtualized-table
class TableCell extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      isTooltipVisible: false,
      tooltipContent: null,
    };

    this.handleShowTooltip = this.handleShowTooltip.bind(this);
    this.handleHideTooltip = this.handleHideTooltip.bind(this);
  }

  handleShowTooltip() {
    if (!this.state.isTooltipVisible) {
      if (this.props.tooltip) {
        this.setState({
          isTooltipVisible: true,
          tooltipContent: this.props.tooltip,
        });
        return;
      }

      if (this.isContentTruncated) {
        this.setState({
          isTooltipVisible: true,
          tooltipContent: this.content.innerText,
        });
      }
    }
  }

  handleHideTooltip() {
    if (this.state.isTooltipVisible) {
      this.setState({
        isTooltipVisible: false,
        tooltipContent: null,
      });
    }
  }

  get isContentTruncated() {
    return this.content.scrollWidth > this.content.clientWidth;
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
      align,
      children,
      columnIndex,
      rowIndex,
      tooltip,
    } = this.props;

    // Handle highlighting individual cells
    const eventHandlerProps = getEventHandlerProps(this, { columnIndex, rowIndex });
    const highlightable = !isEmpty(eventHandlerProps);
    if (!isEmpty(eventHandlerProps)) {
      eventHandlerProps.onMouseOver = pipe(eventHandlerProps.onMouseOver, this.props.handleChildCellMouseOver);
      eventHandlerProps.onMouseOut = pipe(eventHandlerProps.onMouseOut, this.props.handleChildCellMouseOut);
    }

    // Handle showing/hiding tooltip
    eventHandlerProps.onMouseOver = pipe(eventHandlerProps.onMouseOver, this.handleShowTooltip);
    eventHandlerProps.onMouseOut = pipe(eventHandlerProps.onMouseOut, this.handleHideTooltip);

    return (
      <div
        className={classNames(
          "Tangelo__TableCell",
          this.props.className,
          {
            'Tangelo__TableCell--hide-right-border': this.props.hideRightBorder,
            'Tangelo__TableCell--empty': Array.isArray(children) ? !children.some(c => c) : !children,
            'Tangelo__TableCell--highlightable': highlightable,
            'Tangelo__TableCell--clickable': getIsClickable(this),
          }
        )}
        style={this.style}
        {...eventHandlerProps}
      >
        <div
          className="Tangelo__TableCell__Content"
          ref={ref => {this.content = ref; }}
        >
          {children}
          {isEmpty(this.props.icons) || (
            <div
              className={classNames(
                "Tangelo__TableCell__IconsSection",
                {
                  'Tangelo__TableCell__IconsSection--left': align === "right",
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
        {(this.state.isTooltipVisible && this.state.tooltipContent) && (
          <div className="Tangelo__TableCell__Tooltip">
            {this.state.tooltipContent}
          </div>
        )}
      </div>
    );
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
