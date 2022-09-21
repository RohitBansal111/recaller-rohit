import React from "react";

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
import { Link } from "react-router-dom";
import { MdChevronRight } from "react-icons/md";
import Layout from "../../../components/layout";

const ConversationTags = () => {
  const [openCreateTagModal, setOpenCreateTagModal] = useState(false);
  const [addTags, setaddTags] = useState({});
  const [tags, setTags] = useState([]);
  const [deleteTags, setDeleteTags] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openEditTagModal, setOpenEditTagModal] = useState(false);
  const [openDelTagModal, setOpenDelTagModal] = useState(false);
  const [errors, setErrors] = useState({});
  const toastId = React.useRef(null);

  const isValid = () => {
    let formData = true;
    switch (true) {
      case !addTags.name:
        setErrors({ name: "Please Enter a Tag Name" });
        formData = false;
        break;
      default:
        formData = true;
    }
    return formData;
  };

  const handleChangePage = (event, newPage) => {
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
    setErrors({});
  };
  const handleCloseCTModal = () => {
    setOpenCreateTagModal(false);
    setaddTags({});
    setErrors({});
  };

  const handleChange = (e) => {
    setaddTags({ ...addTags, [e.target.name]: e.target.value });
    setErrors({});
  };

  useEffect(() => {
    getTags();
  }, []);

  const handleClick = async () => {
    if (isValid()) {
      let res = await addTagsApi(addTags);
      if (res && res.data && res.data.status === 200) {
        toast.success("Tag Added Successfully");
        setOpenCreateTagModal(false);
        setaddTags({});
        getTags();
      } else {
        toast.error(res.data.massage);
      }
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
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Tag Updated Successfully");
      }

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
      toast.success("Tag Deleted Successfully");
    }
  };

  return (
    <Layout>
      <div className="content-page-layout">
        <div className="page-header subheading-bar">
          <div className="header-text">
            <h1>Settings</h1>
            <p>
              {<Link to={"/settings"}>Settings</Link>}
              <MdChevronRight />
              {<Link to={"/settings/text"}>Text</Link>}
              <MdChevronRight />
              Conversation Tags
            </p>
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
          errors={errors}
        />
      </div>
    </Layout>
  );
};

export default ConversationTags;
