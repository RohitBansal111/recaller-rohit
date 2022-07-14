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
      firstValue: props.tableData[0]['First Name']?props.tableData[0]['First Name']:'',
      mapTo: (
        <select
          value={props.selectedFirstName}
          onChange={props.handleFirstNameChange}
        >
          <option value={"First Name"}> First Name</option>
          <option value={"Last Name"}> Last Name</option>
          <option value={"Home Phone"}>Home Phone</option>
          <option value={"Mobile Phone"}>Primary Phone</option>
          <option value={"Email"}>Primary Email</option>
        </select>
      ),
    },
    {
      columnName: "Last Name",
      firstValue: props.tableData[0]['Last Name']?props.tableData[0]['Last Name']:'',
      mapTo: (
        <select
          value={props.selectedLastName}
          onChange={props.handleLastNameChange}
        >
          <option value={"First Name"}> First Name</option>
          <option value={"Last Name"}> Last Name</option>
          <option value={"Mobile Phone"}>Primary Phone</option>
          <option value={"Home Phone"}>Home Phone</option>
          <option value={"Email"}>Primary Email</option>
        </select>
      ),
    },
    {
      columnName: "Mobile Phone",
      firstValue: props.tableData[0]['Mobile Phone']?props.tableData[0]['Mobile Phone']:'',
      mapTo: (
        <>
          <select
            value={props.selectedPhone}
            onChange={props.handlePhoneChange}
          >
            <option value={"First Name"}> First Name</option>
            <option value={"Last Name"}> Last Name</option>
            <option value={"Home Phone"}>Home Phone</option>
            <option value={"Mobile Phone"} selected>
              Primary Phone
            </option>
            <option value={"Email"}>Primary Email</option>
          </select>
        </>
      ),
    },
    {
      columnName: "Home Phone",
      firstValue: props.tableData[0]['Home Phone']?props.tableData[0]['Home Phone']:'',
      mapTo: (
        <>
          <select
            value={props.selectedHomePhone}
            onChange={props.handleHomePhoneChange}
          >
            <option value={"First Name"}> First Name</option>
            <option value={"Last Name"}> Last Name</option>
            <option value={"Home Phone"} selected>Home Phone</option>
            <option value={"Mobile Phone"} >
              Primary Phone
            </option>
            <option value={"Email"}>Primary Email</option>
          </select>
        </>
      ),
    },
    {
      columnName: "Email",
      firstValue: props.tableData[0]?.Email,
      mapTo: (
        <>
          <select
            value={props.selectedEmail}
            onChange={props.handleEmailChange}
          >
            <option value={"First Name"}> First Name</option>
            <option value={"Last Name"}> Last Name</option>
            <option value={"Home Phone"}>Home Phone</option>
            <option value={"Mobile Phone"}>Primary Phone</option>
            <option value={"Email"} selected>
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
