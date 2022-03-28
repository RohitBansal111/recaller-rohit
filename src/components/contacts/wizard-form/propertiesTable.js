import * as React from "react";
import DataTable from "react-data-table-component";

const columns = [
  // {
  //     name: 'Include',
  //     selector: row => row.include,
  //     sortable: true,
  // },
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
      // include: <input type="checkbox" />,
      columnName: "Name",
      firstValue: props.tableData[0]?.name,
      mapTo: (
        <select onChange={props.handleChange}>
          <option>First Name</option>
          <option>Last Name</option>
          <option>Primary Phone</option>
        </select>
      ),
    },
    {
      // include: <input type="checkbox" />,
      columnName: "Phone",
      firstValue: props.tableData[0]?.phone,
      mapTo: (
        <select onChange={props.handleChange}>
          <option>First Name</option>
          <option>Last Name</option>
          <option>Primary Phone</option>
        </select>
      ),
    },
    {
      // include: <input type="checkbox" />,
      columnName: "Email",
      firstValue: props.tableData[0]?.email,
      mapTo: (
        <select onChange={props.handleChange}>
          <option>First Name</option>
          <option>Last Name</option>
          <option>Primary Phone</option>
        </select>
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
