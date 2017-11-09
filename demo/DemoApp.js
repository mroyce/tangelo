import React from 'react';

import { Table, TableColumn } from '../src';
import FakeDataObjectListCreator from './utils/FakeDataObjectListCreator';


const DEFAULT_NUM_ROWS = 100;


class DemoApp extends React.Component {
  constructor() {
    super();

    this.state = {
      data: FakeDataObjectListCreator.createFakePeopleList(DEFAULT_NUM_ROWS),
      firstNameColor: {},
      rowCount: DEFAULT_NUM_ROWS,
    };

    this.thumbnailCellRenderer = this.thumbnailCellRenderer.bind(this);
    this.firstNameCellRenderer = this.firstNameCellRenderer.bind(this);
    this.lastNameCellRenderer = this.lastNameCellRenderer.bind(this);
    this.addressCellRenderer = this.addressCellRenderer.bind(this);
    this.emailCellRenderer = this.emailCellRenderer.bind(this);
    this.birthDateCellRenderer = this.birthDateCellRenderer.bind(this);

    this.onFirstNameCellClick = this.onFirstNameCellClick.bind(this);
  }

  thumbnailCellRenderer({ columnIndex, rowIndex }) {
    return (
      <img
        src={this.state.data[rowIndex].thumbnail}
        alt={this.state.data[rowIndex].firstName}
        className="user-profile-image"
        height={24}
        width={24}
      />
    );
  }

  firstNameCellRenderer({ columnIndex, rowIndex }) {
    const firstName = this.state.data[rowIndex].firstName;
    const color = this.state.firstNameColor[rowIndex];

    return color ? (
      <b style={{ color }}>{firstName}</b>
    ) : firstName;
  }

  lastNameCellRenderer({ columnIndex, rowIndex }) {
    return this.state.data[rowIndex].lastName;
  }

  addressCellRenderer({ columnIndex, rowIndex }) {
    return this.state.data[rowIndex].address;
  }

  emailCellRenderer({ columnIndex, rowIndex }) {
    return (
      <a href="javascript:void(0);">
        {this.state.data[rowIndex].email}
      </a>
    );
  }

  birthDateCellRenderer({ columnIndex, rowIndex }) {
    return new Date(this.state.data[rowIndex].birthDate).toDateString();
  }

  onFirstNameCellClick({ event, columnIndex, rowIndex }) {
    this.setState((prevState) => {
      const { firstNameColor } = prevState;

      const options = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
      let hexString = '#';
      for (let i = 0; i < 6; i++) {
        hexString += options[Math.floor(Math.random() * options.length)];
      }
      firstNameColor[rowIndex] = hexString;

      return { firstNameColor };
    });
  }

  render() {
    return (
      <Table
        rowCount={this.state.rowCount}
      >
        <TableColumn
          bodyCellRenderer={this.thumbnailCellRenderer}
          width={24}
          widthType="px"
        />
        <TableColumn
          bodyCellRenderer={this.firstNameCellRenderer}
          headerCellRenderer="First Name"
          onCellClick={this.onFirstNameCellClick}
          width={120}
          widthType="px"
        />
        <TableColumn
          bodyCellRenderer={this.lastNameCellRenderer}
          headerCellRenderer="Last Name"
          width={120}
          widthType="px"
        />
        <TableColumn
          bodyCellRenderer={this.addressCellRenderer}
          headerCellRenderer="Address"
          width={30}
          widthType="%"
        />
        <TableColumn
          bodyCellRenderer={this.emailCellRenderer}
          headerCellRenderer="Email"
          width={40}
          widthType="%"
        />
        <TableColumn
          bodyCellRenderer={this.birthDateCellRenderer}
          headerCellRenderer="Birth Date"
          width={30}
          widthType="%"
        />
      </Table>
    );
  }
};


export default DemoApp;
