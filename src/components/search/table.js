import axios from "axios";
import * as React from "react";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Product name",
    selector: (row) => row.productName,
    sortable: true,
  },
  {
    name: "Product SKU",
    selector: (row) => row.productSku,
    sortable: true,
  },
  {
    name: "Product company",
    selector: (row) => row.productCompany,
    sortable: true,
  },
  {
    name: "Recall",
    selector: (row) => row.recallr,
    sortable: true,
  },
];

const data = [
  {
    productName: "New Product Hyper",
    productSku: "Beetlejuice",
    productCompany: "1988",
    recallr: "nonbe",
  },
  {
    productName: "Super Market Package",
    productSku: "Beetlejuice2",
    productCompany: "1989",
    recallr: "nonbe23",
  },
  {
    productName: "Super Market Package",
    productSku: "Beetlejuice2",
    productCompany: "1989",
    recallr: "nonbe23",
  },
  {
    productName: "Super Market Package",
    productSku: "Beetlejuice2",
    productCompany: "1989",
    recallr: "nonbe23",
  },
  {
    productName: "Super Market Package",
    productSku: "Beetlejuice2",
    productCompany: "1989",
    recallr: "nonbe23",
  },
];

export default function SearchDataTable(props) {
  console.log(props.data, "datttttttttt");

  return (
    <div
      className="search-data-table common-data-table"
      style={{ height: 500, width: "100%" }}
    >
      <DataTable columns={columns} data={data} pagination />
    </div>
  );
}
