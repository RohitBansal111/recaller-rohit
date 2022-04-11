import { useEffect, useState } from "react";
import CreateTagModal from "../../../components/settings/createTagModal";
import ConversationTagsTable from "../../../components/settings/tags-table";
import { toast } from "react-toastify";
import {
  addTagsApi,
  deleteTagApi,
  getTagsApi,
  updateTagsApi,
} from "../../../api/tag";
const ConversationTags = () => {
  const [openCreateTagModal, setOpenCreateTagModal] = useState(false);
  const [addTags, setaddTags] = useState({});
  const [tags, setTags] = useState([]);
  const [deleteTags, setDeleteTags] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openEditTagModal, setOpenEditTagModal] = useState(false);
  const [openDelTagModal, setOpenDelTagModal] = useState(false);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (item) => {
    setaddTags(item);
    setOpenEditTagModal(true);
  };
  const handleCloseETModal = () => {
    setOpenEditTagModal(false);
    setaddTags({});
  };

  const openCTModal = () => {
    setOpenCreateTagModal(true);
    setaddTags({});
  };
  const handleCloseCTModal = () => {
    setOpenCreateTagModal(false);
    setaddTags({});
  };

  const handleChange = (e) => {
    setaddTags({ ...addTags, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getTags();
  }, []);

  const handleClick = async () => {
    let res = await addTagsApi(addTags);
    if (res && res.data && res.data.status === 200) {
      toast.success("Tags Added Successfully");
      setOpenCreateTagModal(false);
      setaddTags({});
      getTags();
    } else {
      toast.error(res.data.massage);
    }
  };

  const getTags = async () => {
    const res = await getTagsApi();
    if (res && res.data && res.data.status === 200) {
      setTags(res.data.data);
    }
  };

  const handleEditChange = (e) => {
    setaddTags({ ...addTags, [e.target.name]: e.target.value });
  };

  const handleEdit = async () => {
    let res = await updateTagsApi(addTags._id, addTags);
    if (res && res.data && res.data.status === 200) {
      toast.success("Tags Edit Successfully");
      setOpenEditTagModal(false);
      getTags();
    }
  };

  const handleDelModal = (item) => {
    setDeleteTags(item);
    setOpenDelTagModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDelTagModal(false);
  };

  const handleDeleteTags = async () => {
    const res = await deleteTagApi(deleteTags._id);
    if (res && res.data && res.data.status === 200) {
      setOpenDelTagModal(false);
      getTags();
    }
  };

  return (
    <div className="content-page-layout">
      <div className="page-header subheading-bar">
        <div className="header-text">
          <h1>Settings</h1>
          <p>Setting / Local Messages / Conversation Tags</p>
        </div>
        <div className="header-action">
          <button
            type="button"
            className="btn btn-primary"
            onClick={openCTModal}
          >
            Create Tag
          </button>
        </div>
      </div>
      <div className="setting-page-main">
        <ConversationTagsTable
          data={addTags}
          tags={tags}
          handleEditClick={handleEditClick}
          openEditTagModal={openEditTagModal}
          handleCloseETModal={handleCloseETModal}
          handleEdit={handleEdit}
          editTags={addTags}
          handleChange={handleEditChange}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          handleDelModal={handleDelModal}
          showDeleteTagModal={openDelTagModal}
          handleDeleteTags={handleDeleteTags}
          handleCloseDeleteModal={handleCloseDeleteModal}
        />
      </div>
      <CreateTagModal
        open={openCreateTagModal}
        handleCloseCTModal={handleCloseCTModal}
        handleChange={handleChange}
        handleClick={handleClick}
        addTags={addTags}
      />
    </div>
  );
};

export default ConversationTags;
