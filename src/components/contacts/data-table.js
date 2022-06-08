import * as React from "react";
import useState from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import HelpIcon from "@mui/icons-material/Help";
import { Dropdown } from "react-bootstrap";
import SendMessageModal from "../../models/sendMessageModal";
import DeleteContactModal from "../../models/deleteContactModal";
import LogNoteModal from "../../models/LogNoteModal";
import moment from "moment";
import LoaderPic from "./../../assets/images/loader.gif";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "firstName",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Primary Email",
  },
  {
    id: "phone",
    numeric: true,
    disablePadding: false,
    label: "Primary Phone",
  },
  // {
  //   id: "country",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Country",
  // },
  // {
  //   id: "state",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "State",
  // },
  // {
  //   id: "city",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "City",
  // },
  // {
  //   id: "zipcode",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Zip Code",
  // },
  // {
  //   id: "address",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Address",
  // },
  // {
  //   id: "updatedAt",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Last Activity Date",
  // },
  {
    id: "createdAt",
    numeric: true,
    disablePadding: false,
    label: "Import Date",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <b style={{ fontWeight: "600" }}>{headCell.label}</b>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;
  const [showLogModal, setShowLogModal] = React.useState(false);
  const [showSendMSGModal, setShowSendMSGModal] = React.useState(false);

  const handleShowSendMessageModal = () => setShowSendMSGModal(true);
  const handleSendMessage = () => setShowSendMSGModal(false);
  const handleCloseSendModal = () => setShowSendMSGModal(false);

  const handleLogNoteShow = () => setShowLogModal(true);
  const handleLogNote = () => setShowLogModal(false);
  const handleCloseNoteModal = () => setShowLogModal(false);
  return (
    <Toolbar
      className="tableFilter-toolbar"
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <div className="table-filter-left">
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
            className="selected-items"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
            className="selected-items"
          >
            0 selected
          </Typography>
        )}
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          component="button"
          className={
            numSelected > 0
              ? "btn table-light-btn delActive"
              : "btn table-light-btn disabled"
          }
          onClick={handleShowSendMessageModal}
        >
          <MessageOutlinedIcon />
          Send Message
        </Typography>
        {numSelected === 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            component="button"
            className="btn table-light-btn disabled"
          >
            <MoreHorizOutlinedIcon /> More
          </Typography>
        ) : (
          <Dropdown itemSelector="button:not(:disabled)">
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className={
                numSelected > 0
                  ? "btn table-light-btn delActive"
                  : "btn table-light-btn disabled"
              }
            >
              <MoreHorizOutlinedIcon /> More
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogNoteShow}>
                {" "}
                Log Note{" "}
              </Dropdown.Item>
              <Dropdown.Item onClick={props.handleDeleteContact}>
                {" "}
                Delete Contacts{" "}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        <Tooltip title="Please select contacts from the list below to use available actions">
          <IconButton>
            <HelpIcon />
          </IconButton>
        </Tooltip>
        <SendMessageModal
          showSendMSGModal={showSendMSGModal}
          numSelected={numSelected}
          handleSendMessage={handleSendMessage}
          handleCloseSendModal={handleCloseSendModal}
          // showCreateTemplateModal={props.showCreateTemplateModal}
          // handleCloseCreateTemplateModal={props.handleCloseCreateTemplateModal}
          // showManageeTemplateModal={props.showManageeTemplateModal}
          // handleCloseManageTemplateModal={props.handleCloseManageTemplateModal}
          // handleScheduleModal={props.handleScheduleModal}
          // handleCreateTemplate={props.handleCreateTemplate}
          // handleManageTemplate={props.handleManageTemplate}
          // templateName={props.templateName}
          // handleTemplateName={props.handleTemplateName}
          // templateTags={props.templateTags}
          // handleTemplateTagChange={props.handleTemplateTagChange}
          // templateMessage={props.templateMessage}
          // handleTempMessageChange={props.handleTempMessageChange}
          // handleTemplateSubmit={props.handleTemplateSubmit}
          // templateData={props.templateData}
          // templateDataState={props.templateDataState}
          // handleTempInsert={props.handleTempInsert}
          // handleSingleTempInsert={props.handleSingleTempInsert}
          // handleTempTitleClick={props.handleNewTempTitleClick}
          // handleTempShowClick={props.handleTempShowClick}
          // editmanageTemplate={props.editmanageTemplate}
          // handleEditTemplate={props.handleEditTemplate}
          // handleTempEditCancel={props.handleTempEditCancel}
          // editTempData={props.editTempData}
          // handleEditTempChange={props.handleEditTempChange}
          // templateEditTags={props.templateEditTags}
          // handleTempEditSave={props.handleTempEditSave}
          // handleTempRemove={props.handleTempRemove}
          // handleEditTemplateTagChange={props.handleEditTemplateTagChange}
        />
        <DeleteContactModal
          showDeleteContactModal={props.showDeleteContactModal}
          handleDeleteContact={props.handleContactDeleteV}
          handleCloseDeleteModal={props.handleCloseDeleteModal}
          selectedItems={numSelected}
        />
        <LogNoteModal
          showLogModal={showLogModal}
          handleLogNote={handleLogNote}
          handleCloseNoteModal={handleCloseNoteModal}
        />
      </div>

      <Tooltip title="Filter list">
        <div className="table-filter-search">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name, Email or Phone"
            name="name"
            value={props.value.name}
            onChange={props.handleSearchChange}
          />
          {props.value && <SearchIcon />}
        </div>
      </Tooltip>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable(props) {
  const { rowsData } = props;

  const loadContacts = () => {
    let filtered = [];
    filtered =
      props.filterByCompaigns.length > 0
        ? props.filterByCompaigns.filter(
            (contact) =>
              contact.firstName
                .toLowerCase()
                .startsWith(props.value.toLowerCase()) ||
              contact.firstName
                .toLowerCase()
                .startsWith(props.value.toLowerCase()) ||
              contact.lastName
                .toLowerCase()
                .startsWith(props.value.toLowerCase()) ||
              contact.phone.startsWith(props.value) ||
              contact.country.startsWith(props.value) ||
              contact.state.startsWith(props.value) ||
              contact.city.startsWith(props.value) ||
              contact.zipcode.startsWith(props.value) ||
              contact.address.startsWith(props.value) ||
              contact.email.toLowerCase().startsWith(props.value.toLowerCase())
          )
        : rowsData.filter(
            (contact) =>
              contact.firstName
                .toLowerCase()
                .startsWith(props.value.toLowerCase()) ||
              contact.lastName
                .toLowerCase()
                .startsWith(props.value.toLowerCase()) ||
              contact.phone.startsWith(props.value) ||
              contact.country.startsWith(props.value) ||
              contact.state.startsWith(props.value) ||
              contact.city.startsWith(props.value) ||
              contact.zipcode.startsWith(props.value) ||
              contact.address.startsWith(props.value) ||
              contact.email.toLowerCase().startsWith(props.value.toLowerCase())
          );

    const contactData =
      filtered &&
      filtered.length > 0 &&
      stableSort(filtered, getComparator(props.order, props.orderBy))
        .slice(
          props.page * props.rowsPerPage,
          props.page * props.rowsPerPage + props.rowsPerPage
        )

        .map((row, index) => {
          const isItemSelected = props.isSelected(row.contactid);
          const labelId = `enhanced-table-checkbox-${index}`;
          return (
            <TableRow
              hover
              onClick={(event) => props.handleClick(event, row.contactid)}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={row.firstName}
              selected={isItemSelected}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={isItemSelected}
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </TableCell>
              <TableCell component="th" id={labelId} scope="row" padding="none">
                {row && row.firstName + " " + row.lastName}
              </TableCell>
              <TableCell align="right">{row && row.email}</TableCell>
              <TableCell align="right">{row && row.phone}</TableCell>
              {/* <TableCell align="right">{row && row.country}</TableCell>
              <TableCell align="right">{row && row.state}</TableCell>
              <TableCell align="right">{row && row.city}</TableCell>
              <TableCell align="right">{row && row.zipcode}</TableCell>
              <TableCell align="right">{row && row.address}</TableCell> */}
              {/* <TableCell align="right">
                {moment(row && row.updatedAt).format("DD/MM/YYYY")}
              </TableCell> */}
              <TableCell align="right">
                {moment(row && row.createdAt).format("DD/MM/YYYY")}
              </TableCell>
            </TableRow>
          );
        });
    return contactData;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {!rowsData && (
          <div className="data-notFound">
            <img src={LoaderPic} alt="not found" />
          </div>
        )}
        {rowsData && (
          <>
            <EnhancedTableToolbar
              numSelected={props.selected.length}
              showDeleteContactModal={props.showDeleteContactModal}
              handleContactDeleteV={props.handleContactDeleteV}
              handleDeleteContact={props.handleDeleteContact}
              handleCloseDeleteModal={props.handleCloseDeleteModal}
              handleSearchChange={props.handleSearchChange}
              value={props.value}
            />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={props.dense ? "small" : "medium"}
              >
                <EnhancedTableHead
                  numSelected={props.selected.length}
                  order={props.order}
                  orderBy={props.orderBy}
                  onSelectAllClick={props.handleSelectAllClick}
                  onRequestSort={props.handleRequestSort}
                  rowCount={rowsData && rowsData.length}
                />
                <TableBody>
                  {loadContacts()}
                  {props.emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (props.dense ? 33 : 53) * props.emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rowsData ? rowsData.length : 0}
              rowsPerPage={props.rowsPerPage}
              page={props.page}
              onPageChange={props.handleChangePage}
              onRowsPerPageChange={props.handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
    </Box>
  );
}
