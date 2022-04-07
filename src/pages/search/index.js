import SearchDataTable from "../../components/search/table";

const Search = () => {
  return (
    <div className="content-page-layout">
      <div className="page-header">
        {/* <h1>Search</h1> */}
      </div>
      <div className="search-main-section">
        <div className="search-filter">
          <form className="main-form">
            <div className="field-group">
              <label htmlFor="name"> Product Name </label>
              <input type="text" className="form-control" placeholder="Enter Product name" />
            </div>
            <div className="field-group">
              <label htmlFor="name"> Product SKU </label>
              <input type="text" className="form-control" placeholder="Enter Product SKU" />
            </div>
            <div className="field-group">
              <label htmlFor="name"> Product company </label>
              <input type="text" className="form-control" placeholder="Enter Product company" />
            </div>
            <div className="field-group">
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </form>
        </div>
        <SearchDataTable />
      </div>
    </div>
  );
};

export default Search;
