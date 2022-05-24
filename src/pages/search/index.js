import React, { useState } from "react";
import SearchDataTable from "../../components/search/table";
import axios from "axios";
const Search = () => {
  const [search, setSearch] = useState({});
  const [searchData, setSearchData] = useState([]);
  
  const getSearchResults = async () => {
    const res = await axios.get(
      `http://localhost:5000/contact/search-api?apikey=1a2383ac8b7bd70fe640928f483d45645abe844b15bd03a4e219fa8ea5c3e79c&engine=duckduckgo&q=${
        search.productName
          ? search.productName
          : " " + " " + search.prooductSku
          ? search.prooductSku
          : "" + " " + search.productCompany
          ? search.productCompany
          : ""
      }`
    );
    if (res && res.data && res.data.status === 200) {
      setSearchData(res.data.data.organic_results);
    }
  };

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  }

  return (
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
              <button
                type="button"
                className="btn btn-primary"
                onClick={getSearchResults}
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <SearchDataTable
          searchData={searchData}
        />
      </div>
    </div>
  );
};

export default Search;
