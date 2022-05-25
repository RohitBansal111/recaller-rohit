import * as React from "react";
import DataTable from "react-data-table-component";
export default function SearchDataTable(props) {
  const columns = [
    {
      name: "Position",
      selector: (row) => row.position,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },

    {
      name: "Snippet",
      selector: (row) => (row && row.snippet ? row.snippet : ""),
      sortable: true,
    },
  ];

  const data = [
    {
      productName: props.searchData?.title,
      mapTo: ({ title }) => {
        <td>{title.title}</td>;
      },
    },
  ];

  return (
    <div
      className="search-data-table common-data-table searchDataTable"
      style={{ height: 500, width: "100%" }}
    >
      <DataTable
        columns={columns}
        data={props.searchData ? props.searchData : []}
        pagination
      />
    </div>
  );
}
