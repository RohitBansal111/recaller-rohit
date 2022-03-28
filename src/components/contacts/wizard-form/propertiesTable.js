import * as React from "react";
import DataTable from "react-data-table-component";

const columns = [
  // {
  //     name: 'Include',
  //     selector: row => row.include,
  //     sortable: true,
  // },
  {
<<<<<<< HEAD
      name: 'Include',
      selector: row => row.include,
=======
    name: "Column Name",
    selector: (row) => row.columnName,
>>>>>>> b5cc85b7bdb4acad6fcc5b24754d992d4b6dbd30
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
<<<<<<< HEAD
    include: <input type="checkbox" />,
    columnName: 'Lorum Ipsum',
    firstValue: 'User Name',
    mapTo: <select className='form-control'><option>First Name</option><option>Last Name</option><option>Primary Phone</option></select>,
  },
  {
    include: <input type="checkbox" />,
    columnName: 'Lorum Ipsum',
    firstValue: 'User Name',
    mapTo: <select className='form-control'><option>First Name</option><option>Last Name</option><option>Primary Phone</option></select>,
  },
  {
    include: <input type="checkbox" />,
    columnName: 'Lorum Ipsum',
    firstValue: 'User Name',
    mapTo: <select className='form-control'><option>First Name</option><option>Last Name</option><option>Primary Phone</option></select>,
  },
  {
    include: <input type="checkbox" />,
    columnName: 'Lorum Ipsum',
    firstValue: 'User Name',
    mapTo: <select className='form-control'><option>First Name</option><option>Last Name</option><option>Primary Phone</option></select>,
  }
]
=======
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
>>>>>>> b5cc85b7bdb4acad6fcc5b24754d992d4b6dbd30

const PropertiesTable = (props) => {
  return (
<<<<<<< HEAD
    <div className="Spreadsheet-data-table common-data-table" style={{ height: 'auto', width: '100%' }}>
      <DataTable
       columns={columns} 
       data={data} 
      />
=======
    <div
      className="SchedulemapTo-data-table common-data-table"
      style={{ height: "auto", width: "100%" }}
    >
      <DataTable columns={columns} data={data} />
>>>>>>> b5cc85b7bdb4acad6fcc5b24754d992d4b6dbd30
    </div>
  );
};

export default PropertiesTable;
