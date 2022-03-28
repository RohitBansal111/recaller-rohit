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

const data = [
  {
    // include: <input type="checkbox" />,
    columnName: "Lorum Ipsum",
    firstValue: "User Name",
    mapTo: (
      <select>
        <option>First Name</option>
        <option>Last Name</option>
        <option>Primary Phone</option>
      </select>
    ),
  },
  {
    // include: <input type="checkbox" />,
    columnName: "Lorum Ipsum",
    firstValue: "User Name",
    mapTo: (
      <select>
        <option>First Name</option>
        <option>Last Name</option>
        <option>Primary Phone</option>
      </select>
    ),
  },
  {
    // include: <input type="checkbox" />,
    columnName: "Lorum Ipsum",
    firstValue: "User Name",
    mapTo: (
      <select>
        <option>First Name</option>
        <option>Last Name</option>
        <option>Primary Phone</option>
      </select>
    ),
  },
];

const PropertiesTable = (props) => {
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
