import React, { useState, useEffect } from "react";
import SearchDataTable from "../../components/search/table";
import LoadingButton from "@mui/lab/LoadingButton";
import { getSearch } from "../../api/search";
import Layout from "../../components/layout";
import { toast } from "react-toastify";

const Search = () => {
  const [search, setSearch] = useState({});
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [table, setTable] = useState(false);
  const toastId = React.useRef(null);

  const getSearchResults = async () => {
    console.log(search);
    if (Object.keys(search).length == 0) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Please select atleast one field");
      }
    } else {
      let q =
        search.productName +
        " " +
        search.prooductSku +
        " " +
        search.productCompany +
        "";
      const res = await getSearch(q);

      if (res && res.data && res.data.status === 200) {
        setSearchData(res.data.data.organic_results);
        setLoading(false);
      }
    }
  };
  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    // search.productName = "";
    // search.prooductSku = "";
    // search.productCompany = "";
    setSearch("");
  };
  return (
    <Layout>
      <div className="content-page-layout">
        <div className="page-header">{/* <h1>Search</h1> */}</div>
        <div className="search-main-section">
          <div className="search-filter">
            <form className="main-form">
              <div className="field-group">
                <label htmlFor="name"> Product Name </label>
                <input
                  name="productName"
                  type="text"
                  className="form-control"
                  placeholder="Enter Product name"
                  value={search.productName}
                  onChange={handleChange}
                />
              </div>
              <div className="field-group">
                <label htmlFor="name"> Product SKU </label>
                <input
                  name="prooductSku"
                  type="text"
                  className="form-control"
                  placeholder="Enter Product SKU"
                  value={search.prooductSku}
                  onChange={handleChange}
                />
              </div>
              <div className="field-group">
                <label htmlFor="name"> Product company </label>
                <input
                  name="productCompany"
                  type="text"
                  className="form-control"
                  placeholder="Enter Product company"
                  value={search.productCompany}
                  onChange={handleChange}
                />
              </div>
              <div className="field-group">
                <LoadingButton
                  type="button"
                  // disabled={
                  //   !search.productName ||
                  //   !search.prooductSku ||
                  //   !search.productCompany
                  //     ? true
                  //     : false
                  // }
                  loadingPosition="center"
                  loading={loading}
                  onClick={getSearchResults}
                  className="btn btn-primary"
                  variant="contained"
                >
                  Send to search
                </LoadingButton>
              </div>
              <div className="field-group">
                <LoadingButton
                  type="reset"
                  className="btn btn-primary"
                  onClick={resetForm}
                >
                  Reset
                </LoadingButton>
              </div>
            </form>
          </div>
          {searchData && <SearchDataTable searchData={searchData} />}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
