/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import EnhancedTable from "../../components/contacts/data-table";
import FilterTabs from "../../components/contacts/Filtertabs";
import ContactModal from "../../models/contactModel";
import UploadSpreadsheetModal from "../../models/uploadSpreadsheetModal";
import { createApi, deleteApi, getContactApi } from "../../api/contact";
import { toast } from "react-toastify";
import { getTagsApi } from "../../api/tag";

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
  const [addTags, setAddTags] = useState([]);
  const [selectTags, setSelectTags] = useState(null);
  const [filterByTags, setFilterByTags] = useState([]);
  const [properties, setProperties] = useState("");
  const [rules, setRules] = useState("");
  const [daysAgo, setDaysAgo] = useState("");
  const [value, setValue] = useState("");

  const handleClose = () => {
    setShow(false);
    setSelectTags(null);
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
    const phoneRegex = /^[+0]{0,2}(91)?[0-9]{10}$/;
    let formData = true;
    switch (true) {
      case !addContact.firstName:
        setErrors({ firstName: "First Name field is required!" });
        formData = false;
        break;
      case !addContact.lastName:
        setErrors({ lastName: "Last Name field is required!" });
        formData = false;
        break;
      case !addContact.phone:
        setErrors({ phone: "Phone field is required!" });

        formData = false;
        break;
      case addContact.phone && !phoneRegex.test(addContact.phone):
        setErrors({ phone: "Please enter valid Valid Phone Number!" });
        formData = false;
        break;
      case !addContact.email:
        setErrors({ email: "Email field is required!" });
        formData = false;
        break;
      case addContact.email && !regex.test(addContact.email):
        setErrors({ email: "Please enter valid email address!" });
        formData = false;
        break;
      default:
        formData = true;
    }
    return formData;
  };

  const tagValidation = () => {
    let tagData = true;
    switch (true) {
      case !selectTags:
        toast.warning(
          "You won’t be able to generate a custom campaign report without the tag. "
        );
        tagData = false;
        break;
      default:
        tagData = true;
    }
    return tagData;
  };

  const handleSubmit = async () => {
    if (isValid()) {
      setLoading(true);
      if (selectTags) {
        addContact.tag = selectTags.value;
      }
      let res = await createApi(addContact);
      if (res && res.data && res.data.status === 200) {
        setShow(false);
        setAddContact({});
        tagValidation();
        toast.success("Contact saved!");
        setSelectTags(null);
        setErrors({});
        getData();
      } else {
        toast.error(res.data.message);
      }
    }
  };

  const getData = async () => {
    let res = await getContactApi();
    if (res && res.data && res.data.status === 200) {
      setRowsData(res.data.data);
    }
  };

  useEffect(() => {
    getData();
    getContactTags();
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

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
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
      setIsOpenDelete(false);
      setSelected([]);
    }
  };

  const handleFinish = () => {
    setUploadModal(false);
  };

  const getContactTags = async () => {
    let res = await getTagsApi();
    if (res && res.data && res.data.status === 200) {
      let data = res.data.data.map(function (item) {
        return { value: item._id, label: item.name };
      });
      setAddTags(data);
    }
  };

  const handleTagChange = (value) => {
    setSelectTags(value);
    setErrors({});
  };

  const handleTagsClick = (item) => {
    const data = rowsData && rowsData.filter((val) => val.tagId == item.value);
    setFilterByTags(data);
  };

  const handleAllTagsData = () => {
    setFilterByTags([]);
  };

  const handleFilterCancel = () => {};

  const onHandleSave = (e) => {};
  const handlePropertiesChange = (event) => {
    setProperties(event.target.value);
  };

  const handleSelect = (e) => {
    setValue(e);
  };

  const handleClear = () => {
    setProperties("");
    setRules("");
    setDaysAgo("");
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
          totalRecords={rowsData ? rowsData.length : 0}
          tags={addTags}
          handleTagsClick={handleTagsClick}
          handleAllTagsData={handleAllTagsData}
          handleFilterCancel={handleFilterCancel}
          handlePropertiesChange={handlePropertiesChange}
          setRules={setRules}
          setDaysAgo={setDaysAgo}
          properties={properties}
          rules={rules}
          daysAgo={daysAgo}
          onHandleSave={onHandleSave}
          handleClear={handleClear}
          handleSelect={handleSelect}
          value={value}
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
          filterTagsData={filterByTags}
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
        addTags={addTags}
        selectTags={selectTags}
        handleChange={handleTagChange}
        addContactData={addContact}
      />

      <UploadSpreadsheetModal
        uploadModal={uploadModal}
        handleUploadClose={handleUploadClose}
        handleUploadShow={handleUploadShow}
        // handleProceed={handleProceed}
        onChange={onChange}
        errors={errors}
        handleFinish={handleFinish}
        getData={getData}
        addTags={addTags}
        selectTags={selectTags}
        tagValidation={tagValidation}
        handleChange={handleTagChange}
        setSelectTags={setSelectTags}
      />
    </>
  );
};

export default Import;
