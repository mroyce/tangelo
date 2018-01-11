import React from 'react';


class CellTooltip extends React.Component {
  render() {
    return (
      <span className="Tangelo__Cell__tooltip">
        {this.props.children}
      </span>
    );
  }
}


export default CellTooltip;
