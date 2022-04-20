import { useEffect, useState } from "react";
import MessageModal from "../../components/text/messageModal";
import ChatBoot from "../../components/text/chatBoot";
import {
  addTagsApi,
  deleteTagApi,
  getTagsApi,
  updateTagsApi,
} from "../../api/tag";
import { toast } from "react-toastify";
import { getContactApi } from ".././../api/contact";
import { getMessageApi, sendMessageApi } from "../../api/textMessage";

const TextPage = () => {
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [openManageTagModal, setOpenManageTagModal] = useState(false);
  const [openCreateTagModal, setOpenCreateTagModal] = useState(false);
  const [addTags, setaddTags] = useState({});
  const [tags, setTags] = useState([]);
  const [openEditTagModal, setOpenEditTagModal] = useState(false);
  const [deleteTags, setDeleteTags] = useState({});
  const [openDelTagModal, setOpenDelTagModal] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [conversationTags, setConversationTags] = useState([]);
  const [sendMessage, setSendMessage] = useState("");
  const [messageData, setMessageData] = useState([]);
  const [rowsData, setRowsData] = useState([]);
  const [sendNewMessage, setSendNewMessage] = useState("");
  const [selected, setSelected] = useState([]);
  const [messages, setMessages] = useState([]);
  const [preview, setPreview] = useState(false);
  const [errors, setErrors] = useState({});
  const handleNewMessage = () => {
    setOpenMessageModal(true);
    setPreview(false);
    setErrors({});
  };
  const handleCloseMessageModal = () => {
    setOpenMessageModal(false);
    setSelected([]);
    setSendNewMessage("");
    setErrors({});
  };

  const isTagValid = () => {
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

  const isValid = () => {
    let formData = true;
    switch (true) {
      case selected.length == 0:
        setErrors({ selected: "Please Select a Contact" });
        formData = false;
        break;
      default:
        formData = true;
    }
    return formData;
  };

  const handleCloseETModal = () => {
    setOpenEditTagModal(false);
    setErrors({});
  };
  const handleManageTag = () => {
    setOpenManageTagModal(true);
    setErrors({});
  };
  const handleCloseManageModal = () => {
    setOpenManageTagModal(false);
    setErrors({});
  };
  const handleCMModal = () => {
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
    getData();
    getMessage();
  }, []);

  const handleClick = async () => {
    if (isTagValid()) {
      console.log(addTags,"addTags");
      // let res = await addTagsApi(addTags);
      // if (res && res.data && res.data.status === 200) {
      //   toast.success("Tags Added Successfully");
      //   setOpenCreateTagModal(false);
      //   setaddTags({});
      //   getTags();
      //   setErrors({});
      // }
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
    setSelectedTags((oldArray) => [...oldArray, item]);
    const newArrayState = conversationTags.filter((value, theIndex) => {
      return index !== theIndex;
    });
    setConversationTags(newArrayState);
  };

  const handleSelectDel = (item) => {
    let data = [...selectedTags];
    data.splice(data.indexOf(item), 1);
    setSelectedTags(data);
    conversationTags.push(item);
    setConversationTags(conversationTags);
  };

  const onHandleChange = (e) => {
    setSendMessage(e.target.value);
  };
  const onHandleClick = () => {
    const obj = {
      sendMessage: sendMessage,
    };
    setMessageData([...messageData, obj]);
    setSendMessage("");
  };

  const getData = async () => {
    let res = await getContactApi();
    if (res && res.data && res.data.status === 200) {
      let data = res.data.data.map(function (item) {
        return {
          value: item.contactid,
          label: item.firstName + " " + item.lastName,
          phone: item.phone,
        };
      });
      setRowsData(data);
    }
  };

  const handleNewMChange = (e) => {
    setSendNewMessage(e.target.value);
    setErrors({});
  };

  const handleSendClick = async () => {
    if (isValid()) {
      let contactid = selected.map((item) => item.value);
      const obj = {
        contactid: contactid,
        message: sendNewMessage,
      };
      let res = await sendMessageApi(obj);
      if (res && res.data && res.data.status === 200) {
        toast.success(" Message sent Successfully");
        setOpenMessageModal(false);
        setSelected([]);
        setSendNewMessage("");
      }
      getMessage();
    }
  };

  const handleSelectChange = (values) => {
    setSelected(values);
    setErrors({});
  };

  const getMessage = async () => {
    const res = await getMessageApi();
    console.log(res, "messages");
    if (res && res.data && res.data.status === 200) {
      setMessages(res.data.data);
    }
  };
  const handlePreview = () => {
    setOpenMessageModal(true);
    setPreview(true);
  };

  const handleBackMessageModal = () => {
    setOpenMessageModal(true);
    setPreview(false);
  };
  return (
    <div className="content-page-layout text-page-content">
      <div className="page-header justify-flex-end">
        <button
          type="button"
          className="btn btn-medium btn-primary"
          onClick={handleNewMessage}
        >
          New Message
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
          onHandleChange={onHandleChange}
          sendMessage={sendMessage}
          onHandleClick={onHandleClick}
          messageData={messageData}
          errors={errors}
          contactMessageList={messages}
        />
      </div>
      <MessageModal
        open={openMessageModal}
        handleCloseMessageModal={handleCloseMessageModal}
        options={rowsData}
        handleSendClick={handleSendClick}
        sendNewMessage={sendNewMessage}
        handleNewMChange={handleNewMChange}
        handleSelectChange={handleSelectChange}
        selected={selected}
        handlePreview={handlePreview}
        preview={preview}
        handleBackMessageModal={handleBackMessageModal}
        errors={errors}
      />
    </div>
  );
};

export default TextPage;
