import * as React from 'react';
import DataTable from 'react-data-table-component';


const columns = [
  {
      name: 'Product name',
      selector: row => row.productname,
      sortable: true,
  },
  {
      name: 'Product SKU',
      selector: row => row.productSKU,
      sortable: true,
  },
  {
      name: 'Product company',
      selector: row => row.productCompany,
      sortable: true,
  },
  {
    name: 'Recall',
    selector: row => row.recallr,
    sortable: true,
  },
];

const data = [
  {
    productname: 1,
    productSKU: 'Beetlejuice',
    productCompany: '1988',
    recallr: 'nonbe'
  },
  {
    productname: 2,
    productSKU: 'Beetlejuice2',
    productCompany: '1989',
    recallr: 'nonbe23'
  },
]

export default function SearchDataTable() {
  return (
    <div className="search-data-table common-data-table" style={{ height: 500, width: '100%' }}>
      {/* <DataGrid
        rows={rows}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[4]}
      /> */}
      <DataTable columns={columns} data={data} pagination />
    </div>
  );
}
