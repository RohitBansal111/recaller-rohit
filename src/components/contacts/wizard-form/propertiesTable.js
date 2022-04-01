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
      columnName: "Name",
      firstValue: props.tableData[0]?.name,
      mapTo: (
        <select value={props.selectedName} onChange={props.handleNameChange}>
          <option value={"name"}> Name</option>
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
            <option value="" selected></option>
            <option value={"name"}> Name</option>
            <option value={"phone"}>Primary Phone</option>
            <option value={"email"}>Primary Email</option>
          </select>
          <span className="spanError">{props.errors.selectedPhone}</span>
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
            <option value="" selected></option>
            <option value={"name"}> Name</option>
            <option value={"phone"}>Primary Phone</option>
            <option value={"email"}>Primary Email</option>
          </select>
          <span className="spanError">{props.errors.selectedEmail}</span>
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
