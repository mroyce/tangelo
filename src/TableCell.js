import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {
  getEventHandlerProps,
  isEmpty,
  noop,
  pipe,
} from './utils';


// TODO possibly convert this to a function like react-virtualized-table
class TableCell extends React.Component {
  constructor() {
    super();

    this.state = {
      isTooltipVisible: false,
      tooltipText: '',
    };

    this.handleShowTooltip = this.handleShowTooltip.bind(this);
    this.handleHideTooltip = this.handleHideTooltip.bind(this);
  }

  handleShowTooltip() {
    if (!this.state.isTooltipVisible && this.isContentTruncated) {
      this.setState({
        isTooltipVisible: true,
        tooltipText: this.content.innerText,
      });
    }
  }

  handleHideTooltip() {
    if (this.state.isTooltipVisible) {
      this.setState({
        isTooltipVisible: false,
        tooltipText: '',
      });
    }
  }

  get isContentTruncated() {
    return this.content.scrollWidth > this.content.clientWidth;
  }

  render() {
    const {
      children,
      className,
      columnIndex,
      flexStyle,
      hideRightBorder,
      icons,
      rowIndex,
    } = this.props;

    // TODO use classNames package
    let constructedClassName = 'Tangelo__Table__Cell';
    constructedClassName += className ? ` ${className}` : '';
    constructedClassName += hideRightBorder ? ' Tangelo__Table__Cell--hide-right-border' : '';

    // TODO find better way of checking if cell is empty
    if (Array.isArray(children)) {
      constructedClassName += children.some(c => c) ? '' : ' Tangelo__Table__Cell--empty';
    } else {
      constructedClassName += children ? '' : ' Tangelo__Table__Cell--empty';
    }

    // Handle highlighting individual cells
    const eventHandlerProps = getEventHandlerProps(this, { columnIndex, rowIndex });
    if (!isEmpty(eventHandlerProps)) {
      constructedClassName += ' Tangelo__Table__Cell--highlightable';
      eventHandlerProps.onMouseOver = pipe(eventHandlerProps.onMouseOver, this.props.handleChildCellMouseOver);
      eventHandlerProps.onMouseOut = pipe(eventHandlerProps.onMouseOut, this.props.handleChildCellMouseOut);
    }

    // Handle showing/hiding tooltip
    eventHandlerProps.onMouseOver = pipe(eventHandlerProps.onMouseOver, this.handleShowTooltip);
    eventHandlerProps.onMouseOut = pipe(eventHandlerProps.onMouseOut, this.handleHideTooltip);

    return (
      <div
        className={constructedClassName}
        style={flexStyle}
        {...eventHandlerProps}
      >
        <div
          className="Tangelo__Table__Cell__Content"
          ref={ref => {this.content = ref; }}
        >
          {children}
          {isEmpty(icons) || (
            <div className="Tangelo__Table__Cell__Icons-Section">
              {icons.map((icon, idx) => (
                <div key={idx} className="Tangelo__Table__Cell__Icon-Wrapper">
                  {icon}
                </div>
              ))}
            </div>
          )}
        </div>
        {this.state.isTooltipVisible && (
          <div className="Tangelo__Table__Cell__Tooltip">
            {this.state.tooltipText}
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

TableCell.displayName = 'TanegloTableCell';


export default TableCell;
