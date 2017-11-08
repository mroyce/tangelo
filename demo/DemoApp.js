import React from 'react';

import { Table, TableColumn } from '../src';
import FakeDataObjectListCreator from './utils/FakeDataObjectListCreator';


const DEFAULT_NUM_ROWS = 100;


class DemoApp extends React.Component {
  constructor() {
    super();

    this.state = {
      numRows: DEFAULT_NUM_ROWS,
      data: FakeDataObjectListCreator.createFakePeopleList(DEFAULT_NUM_ROWS),
    };

    this.thumbnailCellRenderer = this.thumbnailCellRenderer.bind(this);
    this.firstNameCellRenderer = this.firstNameCellRenderer.bind(this);
    this.lastNameCellRenderer = this.lastNameCellRenderer.bind(this);
    this.addressCellRenderer = this.addressCellRenderer.bind(this);
  }

  thumbnailCellRenderer({ columnIndex, rowIndex }) {
    return (
      <img
        src={this.state.data[rowIndex].thumbnail}
        alt={this.state.data[rowIndex].firstName}
        height={32}
        width={32}
      />
    );
  }

  firstNameCellRenderer({ columnIndex, rowIndex }) {
    return this.state.data[rowIndex].firstName;
  }

  lastNameCellRenderer({ columnIndex, rowIndex }) {
    return this.state.data[rowIndex].lastName;
  }

  addressCellRenderer({ columnIndex, rowIndex }) {
    return this.state.data[rowIndex].address;
  }


  render() {
    return (
      <Table
        rowCount={this.state.numRows}
      >
        <TableColumn
          bodyCellRenderer={this.thumbnailCellRenderer}
          width={48}
          widthType="px"
        />
        <TableColumn
          bodyCellRenderer={this.firstNameCellRenderer}
          headerCellRenderer="First Name"
          width={200}
          widthType="px"
        />
        <TableColumn
          bodyCellRenderer={this.lastNameCellRenderer}
          headerCellRenderer="Last Name"
          width={40}
          widthType="%"
        />
        <TableColumn
          bodyCellRenderer={this.addressCellRenderer}
          headerCellRenderer="Address"
          width={60}
          widthType="%"
        />
      </Table>
    );
  }
};


export default DemoApp;
