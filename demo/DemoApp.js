import React from 'react';

import { Table, TableColumn } from '../src';
import FakeDataObjectListCreator from './utils/FakeDataObjectListCreator';
import { MailIcon } from './SVGs';


// TODO increase this to 10000 once we render rows in view
const DEFAULT_NUM_ROWS = 200;


class DemoApp extends React.Component {
  constructor() {
    super();

    this.state = {
      data: FakeDataObjectListCreator.createFakePeopleList(DEFAULT_NUM_ROWS),
      firstNameColor: {},
      numRows: DEFAULT_NUM_ROWS,
    };

    this.handleNumRowsChange = this.handleNumRowsChange.bind(this);

    // <Table /> props
    this.getRowProps = this.getRowProps.bind(this);
    this.shouldRowUpdate = this.shouldRowUpdate.bind(this);

    // Cell Renderers
    this.thumbnailCellRenderer = this.thumbnailCellRenderer.bind(this);
    this.firstNameCellRenderer = this.firstNameCellRenderer.bind(this);
    this.lastNameCellRenderer = this.lastNameCellRenderer.bind(this);
    this.addressCellRenderer = this.addressCellRenderer.bind(this);
    this.emailCellRenderer = this.emailCellRenderer.bind(this);
    this.birthDateCellRenderer = this.birthDateCellRenderer.bind(this);

    // Sort Functions
    this.sortByBirthDate = this.sortByBirthDate.bind(this);

    // Action Handlers
    this.onFirstNameCellClick = this.onFirstNameCellClick.bind(this);
  }

  handleNumRowsChange(event) {
    const numRows = Number(event.target.value);
    this.setState({
      numRows,
      data: FakeDataObjectListCreator.createFakePeopleList(numRows),
    });
  }

  /***************
   * Table Props *
   ***************/
  getRowProps({ rowIndex }) {
    return {
      person: this.state.data[rowIndex],
      firstNameColor: this.state.firstNameColor[rowIndex],
    }
  }

  shouldRowUpdate({ currentRowProps, nextRowProps, rowIndex }) {
    // TODO rows don't update when `data` changes
    return currentRowProps.firstNameColor !== nextRowProps.firstNameColor;
  }

  /*****************************
   * Table Body Cell Renderers *
   *****************************/
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

  /**********************************
   * Table Body Cell Sort Functions *
   **********************************/

  sortByBirthDate(aRowProps, bRowProps) {
    return new Date(aRowProps.person.birthDate) - new Date(bRowProps.person.birthDate);
  }

  /***********************************
   * Table Body Cell Action Handlers *
   ***********************************/
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
    return ([
      <div
        key="config"
        className="config-container"
      >
        <div>
          <label>Num Rows:</label>
          <input type="text" value={this.state.numRows} onChange={this.handleNumRowsChange} />
        </div>
      </div>,

      <div
        key="table"
        className="table-container"
      >
        <Table
          getRowProps={this.getRowProps}
          headerHeight={32}
          rowCount={this.state.numRows}
          rowHeight={36}
          shouldRowUpdate={this.shouldRowUpdate}
        >
          <TableColumn
            key="thumbnail"
            bodyCellRenderer={this.thumbnailCellRenderer}
            hideRightBorder
            width={24}
            widthType="px"
          />
          <TableColumn
            key="first name"
            bodyCellRenderer={this.firstNameCellRenderer}
            headerCellRenderer="First Name"
            onCellClick={this.onFirstNameCellClick}
            sortBy="person.firstName"
            width={120}
            widthType="px"
          />
          <TableColumn
            key="last name"
            bodyCellRenderer={this.lastNameCellRenderer}
            headerCellRenderer="Last Name"
            sortBy="person.lastName"
            width={120}
            widthType="px"
          />
          <TableColumn
            key="address"
            bodyCellRenderer={this.addressCellRenderer}
            headerCellRenderer="Address"
            width={30}
            widthType="%"
          />
          <TableColumn
            key="email"
            bodyCellRenderer={this.emailCellRenderer}
            headerCellRenderer="Email"
            icons={[<MailIcon />]}
            sortBy="person.email"
            width={40}
            widthType="%"
          />
          <TableColumn
            key="birth date"
            bodyCellRenderer={this.birthDateCellRenderer}
            headerCellRenderer="Birth Date"
            sortBy={this.sortByBirthDate}
            width={30}
            widthType="%"
          />
        </Table>
      </div>,
    ]);
  }
};


export default DemoApp;
