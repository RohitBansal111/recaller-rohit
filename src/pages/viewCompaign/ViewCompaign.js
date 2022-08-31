import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { contactCompaignApi } from "../../api/compaign";
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
import { visuallyHidden } from "@mui/utils";
import Layout from "../../components/layout";
import moment from "moment";

const ViewCompaign = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rowsData, setRowsData] = React.useState([]);
  const [campaign, setCampaign] = useState({});
  const [rows, setCampaignContacts] = useState([]);
  const { id } = useParams();
  const [viewList, setViewList] = useState();
  useEffect(() => {
    setViewList(id);
    viewCompaignList(id);
  }, [id]);
  console.log(viewList, "view");
  const viewCompaignList = async (id) => {
    const res = await contactCompaignApi(id);
    let compaignId = res.data.data;
    if (compaignId && compaignId.contactCompaighn) {
      setCampaignContacts(compaignId.contactCompaighn);
      console.log(res, "setDataaaaa");
    }
    setCampaign(compaignId);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  function createData(name, calories, fat, carbs, protein) {
    return {
      name,
      calories,
      fat,
      carbs,
      protein,
    };
  }

  // const rows = [
  //   createData("Cupcake", 305, 3.7, 67, 4.3),
  //   createData("Donut", 452, 25.0, 51, 4.9),
  //   createData("Eclair", 262, 16.0, 24, 6.0),
  //   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  //   createData("Gingerbread", 356, 16.0, 49, 3.9),
  //   createData("Honeycomb", 408, 3.2, 87, 6.5),
  //   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  //   createData("Jelly Bean", 375, 0.0, 94, 0.0),
  //   createData("KitKat", 518, 26.0, 65, 7.0),
  //   createData("Lollipop", 392, 0.2, 98, 0.0),
  //   createData("Marshmallow", 318, 0, 81, 2.0),
  //   createData("Nougat", 360, 19.0, 9, 37.0),
  //   createData("Oreo", 437, 18.0, 63, 4.0),
  // ];

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
          <TableCell padding="checkbox"></TableCell>
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
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
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
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            <h1> Campaign Name :-{campaign.name}</h1>
          </Typography>
        )}
      </Toolbar>
    );
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  // const isSelected = (name) => selected.indexOf(name) !== -1;

  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Layout>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                // numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    // const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.contactid)}
                        role="checkbox"
                        // aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.firstName}
                        // selected={isItemSelected}
                      >
                        <TableCell padding="checkbox"></TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row && row.firstName}
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row && row.lastName}
                        </TableCell>
                        <TableCell align="right">{row && row.email}</TableCell>
                        <TableCell align="right">
                          {row && row.homePhone}
                        </TableCell>
                        <TableCell align="right">{row && row.phone}</TableCell>
                        <TableCell align="right">
                          {moment(row && row.createdAt).format("DD/MM/YYYY")}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {/* {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )} */}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Layout>
  );
};
export default ViewCompaign;
