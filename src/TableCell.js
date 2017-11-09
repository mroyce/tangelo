import React from 'react';
import PropTypes from 'prop-types';


class TableCell extends React.Component {
  get interactionProps() {
    const interactionProps = {};

    return interactionProps;
  }

  render() {
    // TODO use classNames package
    let className = 'Tangelo__Table__cell';
    className += this.props.className ? ` ${this.props.className}` : '';
    className += this.props.children ? '' : ' Tangelo__Table__cell--empty';

    return (
      <div
        className={className}
        style={this.props.flexStyle}
        {...this.interactionProps}
      >
        {this.props.children}
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
};

TableCell.defaultProps = {
  children: null,
  className: '',
};

TableCell.displayName = 'TanegloTableCell';


export default TableCell;
