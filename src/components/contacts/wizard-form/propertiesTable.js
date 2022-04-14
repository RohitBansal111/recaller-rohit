import * as React from "react";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Column Name",
    selector: (row) => row.columnName,
  },
  {
    name: "First Value",
    selector: (row) => row.firstValue,
  },
  {
    name: "Map To",
    selector: (row) => row.mapTo,
  },
];

const PropertiesTable = (props) => {
  const data = [
    {
      columnName: "First Name",
      firstValue: props.tableData[0]?.firstName,
      mapTo: (
        <select
          value={props.selectedFirstName}
          onChange={props.handleFirstNameChange}
        >
          <option value={"firstName"}> First Name</option>
          <option value={"lastName"}> Last Name</option>
          <option value={"phone"}>Primary Phone</option>
          <option value={"email"}>Primary Email</option>
        </select>
      ),
    },
    {
      columnName: "Last Name",
      firstValue: props.tableData[0]?.lastName,
      mapTo: (
        <select
          value={props.selectedLastName}
          onChange={props.handleLastNameChange}
        >
          <option value={"firstName"}> First Name</option>
          <option value={"lastName"}> Last Name</option>
          <option value={"phone"}>Primary Phone</option>
          <option value={"email"}>Primary Email</option>
        </select>
      ),
    },
    {
      columnName: "Phone",
      firstValue: props.tableData[0]?.phone,
      mapTo: (
        <>
          <select
            value={props.selectedPhone}
            onChange={props.handlePhoneChange}
          >
            <option value={"firstName"}> First Name</option>
            <option value={"lastName"}> Last Name</option>
            <option value={"phone"} selected>
              Primary Phone
            </option>
            <option value={"email"}>Primary Email</option>
          </select>
        </>
      ),
    },
    {
      columnName: "Email",
      firstValue: props.tableData[0]?.email,
      mapTo: (
        <>
          <select
            value={props.selectedEmail}
            onChange={props.handleEmailChange}
          >
            <option value={"firstName"}> First Name</option>
            <option value={"lastName"}> Last Name</option>
            <option value={"phone"}>Primary Phone</option>
            <option value={"email"} selected>
              Primary Email
            </option>
          </select>
        </>
      ),
    },
  ];

  return (
    <div
      className="SchedulemapTo-data-table common-data-table"
      style={{ height: "auto", width: "100%" }}
    >
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default PropertiesTable;
