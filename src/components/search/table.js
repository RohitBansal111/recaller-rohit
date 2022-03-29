import axios from "axios";
import * as React from "react";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Product name",
    selector: (row) => row.productname,
    sortable: true,
  },
  {
    name: "Product SKU",
    selector: (row) => row.productSKU,
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
    productname: "New Product Hyper",
    productSKU: "Beetlejuice",
    productCompany: "1988",
    recallr: "nonbe",
  },
  {
    productname: "Super Market Package",
    productSKU: "Beetlejuice2",
    productCompany: "1989",
    recallr: "nonbe23",
  },
  {
    productname: "Super Market Package",
    productSKU: "Beetlejuice2",
    productCompany: "1989",
    recallr: "nonbe23",
  },
  {
    productname: "Super Market Package",
    productSKU: "Beetlejuice2",
    productCompany: "1989",
    recallr: "nonbe23",
  },
  {
    productname: "Super Market Package",
    productSKU: "Beetlejuice2",
    productCompany: "1989",
    recallr: "nonbe23",
  },
];

export default function SearchDataTable() {
  const getSeachResults = async () => {
    const res = await axios.get(
      `https://serpapi.com/search.json?engine=duckduckgo&q=apple&api_key=1a2383ac8b7bd70fe640928f483d45645abe844b15bd03a4e219fa8ea5c3e79c`
    );
    console.log("res", res);
  };

  React.useEffect(() => {
    getSeachResults();
  }, []);

  return (
    <div
      className="search-data-table common-data-table"
      style={{ height: 500, width: "100%" }}
    >
      <DataTable columns={columns} data={data} pagination />
    </div>
  );
}
