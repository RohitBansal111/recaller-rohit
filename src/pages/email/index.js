import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addTagsApi, deleteTagApi, getTagsApi, updateTagsApi } from "../../api/tag";
import ChatBoot from "../../components/text/chatBoot";
import EmailModal from "../../models/EmailModal";

const EmailPage = () => {
  const [openMessageModal, setOpenMessageModal] = useState(false);
 

  const [openManageTagModal, setOpenManageTagModal] = useState(false);
  const [openCreateTagModal, setOpenCreateTagModal] = useState(false);
  const [addTags, setaddTags] = useState({});
  const [tags, setTags] = useState([]);
  const [openEditTagModal, setOpenEditTagModal] = useState(false);
  const [deleteTags, setDeleteTags] = useState({});
  const [openDelTagModal, setOpenDelTagModal] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [conversationTags, setConversationTags] = useState();

  const handleNewMessage = () => {
    setOpenMessageModal(true);
  };
  const handleCloseMessageModal = () => {
    setOpenMessageModal(false);
  };
  const handleCloseETModal = () => {
    setOpenEditTagModal(false);
  };
  const handleManageTag = () => {
    setOpenManageTagModal(true);
  };
  const handleCloseManageModal = () => {
    setOpenManageTagModal(false);
  };
  const handleCMModal = () => {
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
      setConversationTags(res.data.data);
    }
  };

  const handleEditChange = (e) => {
    setaddTags({ ...addTags, [e.target.name]: e.target.value });
  };
  const handleEditClick = (item) => {
    setaddTags(item);
    setOpenEditTagModal(true);
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

  const handleSelectedTagItems = (item, index) => {
    const obj = {
      selectedId: item._id,
      selectedName: item.name,
      selectedColor: item.color,
    };
    setSelectedTags((oldArray) => [...oldArray, obj]);

    const newArrayState = conversationTags.filter((value, theIndex) => {
      return index !== theIndex;
    });
    setConversationTags(newArrayState);
  };

  const handleSelectDel = (item, index) => {
    if (conversationTags) {
      let data = [...selectedTags];
      data.splice(data.indexOf(item), 1);
      setSelectedTags(data);
      console.log([item], "selectedTags");
    } else {
      var arr = [];
      arr.push(item);
      console.log(arr, "arr");
      setConversationTags(arr);
    }
  };


  return (
    <div className="content-page-layout text-page-content">
      <div className="page-header justify-flex-end">
        <button
          type="button"
          className="btn btn-medium btn-primary"
          onClick={handleNewMessage}
        >
          New Email
        </button>
      </div>
      <div className="text-main-section">
        <ChatBoot
          openManageTagModal={openManageTagModal}
          openCreateTagModal={openCreateTagModal}
          onClick={handleManageTag}
          handleCloseCTModal={handleCloseCTModal}
          handleCloseManageModal={handleCloseManageModal}
          addTags={addTags}
          handleChange={handleChange}
          handleClick={handleClick}
          handleCMModal={handleCMModal}
          openEditTagModal={openEditTagModal}
          handleCloseETModal={handleCloseETModal}
          handleEditChange={handleEditChange}
          handleEdit={handleEdit}
          editTags={addTags}
          tags={tags}
          handleEditClick={handleEditClick}
          handleDelModal={handleDelModal}
          openDelTagModal={openDelTagModal}
          handleDeleteTags={handleDeleteTags}
          handleCloseDeleteModal={handleCloseDeleteModal}
          handleSelectedTagItems={handleSelectedTagItems}
          newAray={selectedTags}
          handleSelectDel={handleSelectDel}
          conversationTags={conversationTags}
        />
      </div>
      <EmailModal
        open={openMessageModal}
        handleCloseMessageModal={handleCloseMessageModal}
      />
    </div>
  );
};

export default EmailPage;
