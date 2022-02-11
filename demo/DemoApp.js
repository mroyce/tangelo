import React from 'react';

import { Table, TableColumn } from '../src';
import { debounce } from '../src/utils';
import FakeDataObjectListCreator from './utils/FakeDataObjectListCreator';
import { MailIcon } from './SVGs';


// TODO increase this to 10000 once we render rows in view
const DEFAULT_NUM_ROWS = 100;


class DemoApp extends React.Component {
  constructor() {
    super();

    this.state = {
      currentSort: {
        criteria: null,
        direction: null,
      },
      data: FakeDataObjectListCreator.createFakePeopleList(DEFAULT_NUM_ROWS),
      firstNameColor: {},
      numRows: DEFAULT_NUM_ROWS,
      paginationLoading: false,
      scrollTop: 0,
    };

    this.handleNumRowsChange = this.handleNumRowsChange.bind(this);

    // <Table /> props
    this.getRowProps = this.getRowProps.bind(this);
    this.getRowKey = this.getRowKey.bind(this);
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

    // Refs
    this.bodyRef = React.createRef();
    this.scrollRef = React.createRef();
    this.tableRef = React.createRef();

    // Event Handlers
    this.onScroll = this.onScroll.bind(this);
    this.onScrollDebounce = debounce(this.onScroll, 100);
    this.onSort = this.onSort.bind(this);

    // Pagination
    this.paginationFunc = this.paginationFunc.bind(this);
  }

  componentDidMount() {
    this.scrollRef.current.addEventListener('scroll', this.onScrollDebounce);
  }

  componentWillUnmount() {
    this.scrollRef.current.removeEventListener('scroll', this.onScrollDebounce);
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

  getRowKey({ rowIndex }) {
    return `row_key_${this.state.data[rowIndex].id}`;
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

  /******************
   * Event Handlers *
   ******************/
  onScroll() {
    /*
    this.setState({
      scrollTop: this.scrollRef.current.scrollTop,
    });
    */
  }

  onSort(sort) {
    this.setState({ currentSort: sort });
  }

  /**************
   * Pagination *
   **************/
  paginationFunc() {
    this.setState({ paginationLoading: true });
    setTimeout(() => {
      const NUM_NEW_ROWS = 50;
      this.setState(prevState => ({
        numRows: prevState.numRows + NUM_NEW_ROWS,
        data: prevState.data.concat(FakeDataObjectListCreator.createFakePeopleList(NUM_NEW_ROWS)),
        paginationLoading: false,
      }));
    }, 1000);
  }

  get currentSortDisplay() {
    const { criteria, direction } = this.state.currentSort;

    let criteriaString;
    switch (criteria) {
      case 'person.firstName':
        criteriaString = 'First Name';
        break;
      case 'person.lastName':
        criteriaString = 'Last Name';
        break;
      case 'person.email':
        criteriaString = 'Email';
        break;
      case this.sortByBirthDate:
        criteriaString = 'Birthday';
        break;
      default:
        criteriaString = '';
    }

    let directionString;
    switch (direction) {
      case 'ASC':
        directionString = 'Ascending';
        break;
      case 'DESC':
        directionString = 'Descending';
        break;
      default:
        directionString = '';
    }

    return criteriaString ? `${criteriaString} ${directionString}` : 'None';
  }

  render() {
    return (
      <React.Fragment>
        <div
          key="config"
          className="config-container"
        >
          <div>
            <label>Num Rows:</label>
            <input type="text" value={this.state.numRows} onChange={this.handleNumRowsChange} />
          </div>
          <div>
            <label>Scroll Top:</label>
            <span>{this.state.scrollTop}</span>
          </div>
          <div>
            <label>Current Sort:</label>
            <span>{this.currentSortDisplay}</span>
          </div>
        </div>
        <div
          key="table"
          className="table-container"
        >
          <Table
            bodyRef={this.bodyRef}
            getRowProps={this.getRowProps}
            getRowKey={this.getRowKey}
            headerHeight={32}
            initialSortState={{
              criteria: 'person.firstName',
              direction: 'ASC',
            }}
            onSort={this.onSort}
            paginationFunc={this.paginationFunc}
            paginationLoading={this.state.paginationLoading}
            paginationRowCountBuffer={20}
            rowCount={this.state.numRows}
            rowHeight={36}
            scrollRef={this.scrollRef}
            shouldRowUpdate={this.shouldRowUpdate}
            shouldHighlightRow
            tableRef={this.tableRef}
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
              tooltip={({ rowIndex }) => (
                <span>
                  Name: {this.state.data[rowIndex].firstName} {this.state.data[rowIndex].lastName}
                </span>
              )}
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
              trailingIcons={({ rowIndex }) =>
                this.state.data[rowIndex].email.includes('gmail') ?
                [<MailIcon />] :
                null
              }
            />
            <TableColumn
              key="address"
              align="right"
              bodyCellRenderer={this.addressCellRenderer}
              headerCellRenderer="Address"
              tooltip={({ rowIndex }) => (
                <span>
                  Address is {this.state.data[rowIndex].address}
                </span>
              )}
              width={30}
              widthType="%"
            />
            <TableColumn
              key="email"
              align="right"
              bodyCellRenderer={this.emailCellRenderer}
              headerCellRenderer="Email"
              icons={({ rowIndex }) =>
                this.state.data[rowIndex].email.includes('gmail') ?
                [<MailIcon />] :
                null
              }
              sortBy="person.email"
              width={40}
              widthType="%"
            />
            <TableColumn
              key="birth date"
              align="center"
              bodyCellRenderer={this.birthDateCellRenderer}
              headerCellRenderer="Birth Date"
              sortBy={this.sortByBirthDate}
              width={30}
              widthType="%"
            />
          </Table>
        </div>
      </React.Fragment>
    );
  }
};


export default DemoApp;
