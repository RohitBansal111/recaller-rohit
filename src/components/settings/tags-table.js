import * as React from "react";
import DataTable from "react-data-table-component";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTagModal from "./EditTagModal";
import { TablePagination } from "@mui/material";
import DeleteTagsModal from "../../models/deleteTagsModal";

const columns = [
  {
    name: "Name",
    selector: (row) => row.tags,
  },
  {
    name: "Actions",
    selector: (row) => row.productAction,
  },
];

const ConversationTagsTable = (props) => {
  return (
    <div
      className="tags-data-table common-data-table"
      style={{ height: 500, width: "100%" }}
    >
      <DataTable
        columns={columns}
        data={
          props.tags
            ? props.tags
                .slice(
                  props.page * props.rowsPerPage,
                  props.page * props.rowsPerPage + props.rowsPerPage
                )
                .map((item) => {
                  return {
                    tags: item.name,
                    productAction: (
                      <div className="table-action">
                        {" "}
                        <EditIcon
                          titleAccess="Edit"
                          onClick={() => props.handleEditClick(item)}
                        />
                        <DeleteIcon
                          titleAccess="Delete"
                          onClick={() => props.handleDelModal(item)}
                        />
                      </div>
                    ),
                  };
                })
            : []
        }
      />
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
