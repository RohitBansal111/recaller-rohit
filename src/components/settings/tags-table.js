import * as React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTagModal from "./EditTagModal";
import TablePagination from "@mui/material/TablePagination";
import DeleteTagsModal from "../../models/deleteTagsModal";


function createData(
  name: string,
  action: string,
) {
  return { name, action};
}

const rows = [
  createData('Frozen yoghurt'),
  createData('Ice cream sandwich'),
  createData('Eclair'),
  createData('Cupcake'),
  createData('Gingerbread'),
];

const ConversationTagsTable = (props) => {
  return (
    <div
      className="tags-data-table common-data-table"
      style={{ height: 500, width: "100%" }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((item) => (
              <TableRow
                key={item.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" >
                  <span style={{borderColor:'green', color: 'green'}}>{item.name}</span>
                </TableCell>
                <TableCell align="right">
                  <div className="table-action">
                    <EditIcon
                        titleAccess="Edit"
                        onClick={() => props.handleEditClick(item)}
                      />
                      <DeleteIcon
                        titleAccess="Delete"
                        onClick={() => props.handleDelModal(item)}
                      />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        
      <TablePagination
       rowsPerPageOptions={[5, 10, 25]}
       component="div"
       count={props.tags ? props.tags.length : 0}
       rowsPerPage={props.rowsPerPage}
       page={props.page}
       onPageChange={props.handleChangePage}
       onRowsPerPageChange={props.handleChangeRowsPerPage}
      />
      <DeleteTagsModal
        showDeleteTagModal={props.showDeleteTagModal}
        handleDeleteTagsData={props.handleDeleteTags}
        handleCloseDeleteModal={props.handleCloseDeleteModal}
      />
      <EditTagModal
        open={props.openEditTagModal}
        handleCloseETModal={props.handleCloseETModal}
        handleChange={props.handleChange}
        handleEdit={props.handleEdit}
        editTags={props.editTags}
      />
    </div>
  );
};

export default ConversationTagsTable;
