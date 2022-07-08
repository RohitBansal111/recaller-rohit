/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import EnhancedTable from "../../components/contacts/data-table";
import FilterTabs from "../../components/contacts/Filtertabs";
import ContactModal from "../../models/contactModel";
import UploadSpreadsheetModal from "../../models/uploadSpreadsheetModal";
import { createApi, deleteApi, getContactApi } from "../../api/contact";
import { toast } from "react-toastify";
import { getCompaignApi } from "../../api/compaign";
import {
  addContactFilter,
  deleteContactFilterApi,
  editContactFilterApi,
  getContactFilterApi,
  applyContactFilterApi,
} from "../../api/filter";

const Import = () => {
  const [show, setShow] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [addContact, setAddContact] = useState({});
  const [errors, setErrors] = useState({});
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rowsData, setRowsData] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchState, setSearchState] = React.useState("");
  const [compaign, setCompaigns] = useState([]);
  const [selectComgaigns, setSelectCompaign] = useState(null);
  const [filterByCompaigns, setFilterByCompaigns] = useState([]);
  const [properties, setProperties] = useState("");
  const [rules, setRules] = useState("");
  const [daysAgo, setDaysAgo] = useState("");
  const [value, setValue] = useState("");
  const [addFilter, setAddFilter] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [lastActiveDate, setLastActiveDate] = useState("");
  const [showAddFilterModal, setShowAddFilterModal] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [filterList, setFilterList] = useState([]);
  const [editFilter, setEditFilter] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const [editFilterData, setEditFilterData] = useState({});
  const [editFilterValue, setEditFilterValue] = useState({});
  const [showDeleteFilterModal, setShowDeleteFilterModal] = useState(false);
  const [totalRowsData, setTotalRowsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tabKeySet, setTabKeySet] = useState("all");

  const handleClose = () => {
    setShow(false);
    setSelectCompaign(null);
    setAddContact({});
    setErrors({});
    setLoading(false);
  };

  const handleUploadShow = () => {
    setUploadModal(true);
  };
  const handleUploadClose = () => {
    setUploadModal(false);
  };

  const handleShow = () => {
    setShow(true);
    setAddContact({});
    setErrors({});
    setLoading(false);
  };

  const isValid = () => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const phoneRegex = /^\d{10}$/;
    const num = /^[0-9]+$/;
    let formData = true;
    switch (true) {
      case !addContact.firstName:
        setErrors({ firstName: "First Name is required!" });
        formData = false;
        break;
      case !addContact.lastName:
        setErrors({ lastName: "Last Name is required!" });
        formData = false;
        break;
      case !addContact.phone && !addContact.email:
        setErrors({ phone: "Please Fill one field either phone or email!" });
        formData = false;
        break;
      case !addContact.email && !addContact.phone:
        setErrors({ email: "Please Fill one field either phone or email!" });
        formData = false;
        break;
      case addContact.phone && !num.test(addContact.phone):
        setErrors({
          phone: "Phone Number only contains digits for eg. 9999999999",
        });
        formData = false;
        break;
      case addContact.phone && !phoneRegex.test(addContact.phone):
        setErrors({ phone: "Phone Number contains 10 digits only" });
        formData = false;
        break;

      // case !addContact.country:
      //   setErrors({ country: "Please select country!" });
      //   formData = false;
      //   break;
      // case !addContact.state:
      //   setErrors({ state: "Please select State!" });
      //   formData = false;
      //   break;
      // case !addContact.city:
      //   setErrors({ city: "Please select city!" });
      //   formData = false;
      //   break;
      // case !addContact.zipcode:
      //   setErrors({ zipcode: "Please enter valid Zip Code!" });
      //   formData = false;
      //   break;
      // case !addContact.address:
      //   setErrors({ address: "Please add enter Address!" });
      //   formData = false;
      //   break;
      case addContact.email && !regex.test(addContact.email):
        setErrors({ email: "Please enter valid email address!" });
        formData = false;
        break;
      case !addContact.compaign:
        setErrors({ compaign: "Please enter your Campaign" });
        formData = false;
        break;
      default:
        formData = true;
    }
    return formData;
  };

  const isValidFilterName = () => {
    let formData = true;
    switch (true) {
      case !filterName:
        setErrors({ filterName: "Filter Name is required!" });
        formData = false;
        break;
      default:
        formData = true;
    }
    return formData;
  };

  const handleSubmit = async () => {
    if (isValid()) {
      setLoading(true);
      setIsLoading(true);
      let res = await createApi(addContact);
      if (res && res.data && res.data.status === 200) {
        setShow(false);
        setAddContact({});
        toast.success("Contact saved!");
        setErrors({});
        getData();
        setIsLoading(false);
      } else {
        setLoading(false);
        setIsLoading(false);
        toast.error(res.data.message);
      }
    }
  };

  const isFilterValid = () => {
    let formData = true;
    switch (true) {
      case !properties:
        setErrors({ properties: "Please Select Properties!" });
        formData = false;
        break;
      case properties == "joinedDate" && rules == "":
        setErrors({ rules: "Please Select Rules!" });
        formData = false;
        break;
      case properties == "Last Message Received" && rules == "":
        setErrors({ rules: "Please Select Rules!" });
        formData = false;
        break;
      case properties == "campaigns" && rules == "":
        setErrors({ rules: "Please Select Rules!" });
        formData = false;
        break;
      case !inputValue:
        setErrors({ error: "Field is required!" });

        formData = false;
        break;
      default:
        formData = true;
    }
    return formData;
  };

  const getData = async () => {
    let res = await getContactApi();
    if (res && res.data && res.data.status === 200) {
      console.log("campaign data:::",res.data.data)
      setRowsData(res.data.data);
      setTotalRowsData(res.data.data.length);
    }
    getContactCompaign();
  };

  useEffect(() => {
    getData();
    getContactCompaign();
    getContactFilter();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setAddContact((prevTime) => {
      return {
        ...prevTime,
        [name]: value,
      };
    });
    setErrors({});
    setLoading(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rowsData && rowsData.map((n) => n.contactid);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex == -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex == 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex == selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - rowsData && rowsData.length)
      : 0;

  const handleContactDeleteV = async () => {
    const data = { contacts: JSON.stringify(selected) };
    const res = await deleteApi(data);
    if (res && res.data && res.data.status === 200) {
      getData();
      toast.success("Contact Deleted Successfully");
      setIsOpenDelete(false);
      setSelected([]);
    }
  };

  const handleFinish = () => {
    setUploadModal(false);
  };

  const getContactCompaign = async () => {
    let res = await getCompaignApi();
    if (res && res.data && res.data.status === 200) {
      let data = res.data.data.map(function (item) {
        return { value: item._id, label: item.name };
      });
      setCompaigns(data);
    }
  };

  const handleTagChange = (value) => {
    setSelectCompaign(value);
    setErrors({});
  };

  const handleTagsClick = (item) => {
    setEditFilterData(item);
    const data =
      rowsData && rowsData.filter((val) => val.compaignId == item.value);
    setFilterByCompaigns(data);
    setShowSelect(true);
    applyFilter(item);
  };

  const applyFilter = async (data) => {
    const response = await applyContactFilterApi(data);
    if (response && response.data && response.data.results) {
      setRowsData(response.data.results ? response.data.results : []);
    }
  };

  const handleAllTagsData = () => {
    setEditFilter(false);
    setShowSelect(false);
    getData();
    setFilterByCompaigns([]);
  };

  const handleFilterCancel = () => {
    getData();
    setShowAddFilterModal(false);
    setInputValue("");
    setFilterName("");
    setProperties("");
    setRules("");
    setErrors({});
    setValue(`All(${totalRowsData ? totalRowsData : 0})`);
  };

  const onHandleSave = async () => {
    if (isFilterValid()) {
      setShowAddFilterModal(true);
    }
  };
  const handlePropertiesChange = async (event) => {
    setErrors({});
    setProperties(event.target.value);
    setRules("");
    setInputValue("");
  };

  const handleSelect = (e) => {
    setValue(e);
    getContactFilter();
  };

  const handleClear = () => {
    setProperties("");
    setRules("");
    setErrors({});
    getData();
    setTabKeySet("all");
  };

  const handleJDChange = async (e) => {
    setErrors({});
    setInputValue(e.target.value);
    let value = e.target.value;
    if (value) {
      applyFilter({ property: properties, rule: rules, value });
    }
  };

  const handleRulesChange = (event) => {
    setRules(event.target.value);
    setErrors({});
    setInputValue("");
    if (event.target.value == "Today") {
      applyFilter({
        property: properties,
        rule: event.target.value,
        value: inputValue,
      });
    } else if (event.target.value == "Never") {
      applyFilter({
        property: properties,
        rule: event.target.value,
        value: inputValue,
      });
    } else {
    }
  };

  const handleAddFilterData = async () => {
    if (isValidFilterName()) {
      const obj = {
        property: properties,
        rule: rules,
        value: inputValue,
        name: filterName,
        resultCount: rowsData ? rowsData.length : 0,
      };

      const res = await addContactFilter(obj);
      if (res && res.data && res.data.status === 200) {
        setShowAddFilterModal(false);
        setProperties("");
        setRules("");
        setInputValue("");
        toast.success(res.data.message);
        getContactFilter();
        setFilterName("");
        setErrors({});
        getData();
      } else {
        toast.error(res.data.message);
      }
    }
  };

  const handleCloseAddFilterModal = () => {
    setShowAddFilterModal(false);
    setInputValue("");
    setFilterName("");
  };

  const onFilterNameChange = (e) => {
    setFilterName(e.target.value);
    setErrors({});
  };

  const getContactFilter = async () => {
    const res = await getContactFilterApi();
    if (res && res.data && res.data.status === 200) {
      setFilterList(res.data.results);
    }
  };

  const afterFilterApply = (data) => {
    setRowsData(data);
  };

  const handleEditFilter = (item) => {
    setEditFilterValue(item);
    setEditFilter(true);
    setShowSelect(false);
    setShowDeleteFilterModal(false);
  };

  const onhandleEditFilterChange = (e) => {
    if (e.target.name == "property") {
      setEditFilterValue({
        ...editFilterValue,
        [e.target.name]: e.target.value,
        rule: "",
        value: "",
      });
    } else {
      setEditFilterValue({
        ...editFilterValue,
        [e.target.name]: e.target.value,
      });
    }
    applyFilter({
      property: editFilterValue.property,
      rule: editFilterValue.rule,
      value: e.target.value,
      resultCount: rowsData ? rowsData.length : 0,
    });
    if (e.target.value == "Never") {
      applyFilter({
        property: editFilterValue.property,
        rule: e.target.value,
        value: editFilterValue.value,
        resultCount: rowsData ? rowsData.length : 0,
      });
    }
    if (e.target.value == "Today") {
      applyFilter({
        property: editFilterValue.property,
        rule: e.target.value,
        value: editFilterValue.value,
        resultCount: rowsData ? rowsData.length : 0,
      });
    }
  };

  const handleFilterEdit = async () => {
    const res = await editContactFilterApi(
      editFilterValue._id,
      editFilterValue
    );
    if (res && res.data && res.data.status === 200) {
      setEditFilter(false);
      setShowSelect(true);
      toast.success(res.data.message);
      getContactFilter();
    }
  };

  const deleteFilter = () => {
    setShowDeleteFilterModal(true);
  };

  const handleDeleteFilter = async () => {
    const res = await deleteContactFilterApi(editFilterValue._id);
    if (res && res.data && res.data.status === 200) {
      setEditFilter(false);
      setShowSelect(false);
      toast.success(res.data.message);
      handleAllTagsData();
      getContactFilter();
      getData();
    }
  };

  const handleCloseDeleteFilterModal = () => {
    setShowDeleteFilterModal(false);
  };

  const handleContactFilterCancel = () => {
    setEditFilter(false);
    getContactFilter();
    setFilterList([]);
    setShowSelect(true);
  };

  const handleTabsSelect = (key) => {
    setTabKeySet(key);
    setShowAddFilterModal(false);
    setInputValue("");
    setFilterName("");
    setProperties("");
    setRules("");
    setErrors({});
    getData();
  };

  return (
    <>
      <div className="page-header justify-flex-end">
        {/* <h1>Imported Contacts</h1> */}
        <Dropdown>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            className="btn btn-medium btn-primary"
          >
            Add Contacts
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#" onClick={handleUploadShow}>
              Upload Spreadsheet
            </Dropdown.Item>
            <Dropdown.Item href="#" onClick={handleShow}>
              Manual Entry
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="filter-by-option">
        <h3>Filter By:</h3>
        <FilterTabs
          totalRecords={totalRowsData ? totalRowsData : 0}
          compaign={compaign}
          handleTagsClick={handleTagsClick}
          handleAllTagsData={handleAllTagsData}
          handleFilterCancel={handleFilterCancel}
          handlePropertiesChange={handlePropertiesChange}
          setDaysAgo={setDaysAgo}
          properties={properties}
          rules={rules}
          daysAgo={daysAgo}
          onHandleSave={onHandleSave}
          handleClear={handleClear}
          handleSelect={handleSelect}
          value={value}
          rowsData={rowsData}
          addFilter={addFilter}
          inputValue={inputValue}
          lastActiveDate={lastActiveDate}
          handleJDChange={handleJDChange}
          showAddFilterModal={showAddFilterModal}
          handleCloseAddFilterModal={handleCloseAddFilterModal}
          handleAddFilterData={handleAddFilterData}
          errors={errors}
          handleRulesChange={handleRulesChange}
          filterName={filterName}
          filterList={filterList}
          onFilterNameChange={onFilterNameChange}
          handleEditFilter={handleEditFilter}
          editFilter={editFilter}
          showSelect={showSelect}
          editFilterData={editFilterData}
          editFilterValue={editFilterValue}
          onhandleEditFilterChange={onhandleEditFilterChange}
          handleFilterEdit={handleFilterEdit}
          deleteFilter={deleteFilter}
          handleContactFilterCancel={handleContactFilterCancel}
          showDeleteFilterModal={showDeleteFilterModal}
          handleCloseDeleteFilterModal={handleCloseDeleteFilterModal}
          handleDeleteFilter={handleDeleteFilter}
          afterFilterApply={afterFilterApply}
          handleTabsSelect={handleTabsSelect}
          tabsKey={tabKeySet}
        />
      </div>
      <div className="contact-data-table-main">
        <EnhancedTable
          rowsData={rowsData}
          handleContactDeleteV={handleContactDeleteV}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleChangePage={handleChangePage}
          page={page}
          rowsPerPage={rowsPerPage}
          dense={dense}
          emptyRows={emptyRows}
          handleClick={handleClick}
          isSelected={isSelected}
          order={order}
          orderBy={orderBy}
          handleRequestSort={handleRequestSort}
          handleSelectAllClick={handleSelectAllClick}
          selected={selected}
          handleCloseDeleteModal={() => setIsOpenDelete(false)}
          handleDeleteContact={() => setIsOpenDelete(true)}
          showDeleteContactModal={isOpenDelete}
          value={searchState}
          handleSearchChange={(e) => setSearchState(e.target.value)}
          filterByCompaigns={filterByCompaigns}
          isLoading={isLoading}
          totalRecords={totalRowsData ? totalRowsData : 0}
          compaign={compaign}
        />
      </div>

      <ContactModal
        show={show}
        loading={loading}
        handleClose={handleClose}
        handleShow={handleShow}
        handleSubmit={handleSubmit}
        onChange={onChange}
        errors={errors}
        addTags={compaign}
        selectTags={selectComgaigns}
        addContactData={addContact}
      />

      <UploadSpreadsheetModal
        uploadModal={uploadModal}
        handleUploadClose={handleUploadClose}
        handleUploadShow={handleUploadShow}
        onChange={onChange}
        errors={errors}
        handleFinish={handleFinish}
        getData={getData}
        addTags={compaign}
        setSelectTags={setSelectCompaign}
        setIsLoading={setIsLoading}
        setUploadModal={setUploadModal}
      />
    </>
  );
};

export default Import;
