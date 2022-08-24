import * as React from "react";
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
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { Button } from "@material-ui/core";
import DeleteContactModal from "../../models/deleteContactModal";
import SearchIcon from "@mui/icons-material/Search";
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
    label: "First Name",
  },
  {
    id: "lastName",
    numeric: false,
    disablePadding: true,
    label: "Last Name",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Primary Email",
  },
  {
    id: "homePhone",
    numeric: true,
    disablePadding: false,
    label: "Home Phone",
  },
  {
    id: "phone",
    numeric: true,
    disablePadding: false,
    label: "Mobile Phone",
  },
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
              {headCell.label}
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
        {numSelected === 0 ? (
          <Button
            className="btn table-light-btn disabled "
            onClick={props.handleDeleteContact}
          >
            {" "}
            Delete Contacts{" "}
          </Button>
        ) : (
          <Button
            className="btn table-light-btn delActive"
            onClick={props.handleDeleteContact}
          >
            {" "}
            Delete Contacts{" "}
          </Button>
        )}
        <DeleteContactModal
          showDeleteContactModal={props.showDeleteContactModal}
          handleDeleteContact={props.handleContactDeleteV}
          handleCloseDeleteModal={props.handleCloseDeleteModal}
          selectedItems={numSelected}
        />
      </div>

      <Tooltip title="Filter list">
        <div className="table-filter-search">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name, Email or Phone"
            name="name"
            value={props.value}
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

export default function ContactCompaign(props) {
  const { rowsData } = props;

  console.log(props.rows, "rowss");

  const loadContacts = () => {
    let filtered = "";
    filtered =
      rowsData &&
      rowsData.filter(
        (contact) =>
          contact.firstName
            .toLowerCase()
            .startsWith(props.value.toLowerCase()) ||
          contact.lastName
            .toLowerCase()
            .startsWith(props.value.toLowerCase()) ||
          (contact && contact.phone && contact.phone.startsWith(props.value)) ||
          (contact &&
            contact.email &&
            contact.email.toLowerCase().startsWith(props.value.toLowerCase()))
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
              onClick={(event) => props.handleClick(event.target.checked, row)}
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
                {row.firstName}
              </TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.homePhone}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
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
                  <> {loadContacts()}</>
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

//    <TableRow
// hover
// onClick={(event) => handleClick(event, row.firstName)}
// role="checkbox"
// aria-checked={isItemSelected}
// tabIndex={-1}
// key={row.firstName}
// selected={isItemSelected}
// >
// <TableCell padding="checkbox">
//   <Checkbox
//     color="primary"
//     checked={isItemSelected}
//     inputProps={{
//       "aria-labelledby": labelId,
//     }}
//   />
// </TableCell>
// <TableCell
//   component="th"
//   id={labelId}
//   scope="row"
//   padding="none"
// >
//   {row.firstName}
// </TableCell>
// <TableCell align="right">{row.lastName}</TableCell>
// <TableCell align="right">{row.email}</TableCell>
// <TableCell align="right">{row.homePhone}</TableCell>
// <TableCell align="right">{row.phone}</TableCell>
// <TableCell align="right">
//   {moment(row && row.createdAt).format("DD/MM/YYYY")}
// </TableCell>
// </TableRow>
