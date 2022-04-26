import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getContactApi } from "../../api/contact";
import {
  getEmailMessageApi,
  getUserWithEmailMessage,
  sendEmailMessageApi,
} from "../../api/emailMessage";
import {
  addTagsApi,
  deleteTagApi,
  getTagsApi,
  updateTagsApi,
} from "../../api/tag";
import EmailChatBoot from "../../components/email/emailChatBoot";
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
  const [conversationTags, setConversationTags] = useState([]);
  const [errors, setErrors] = useState({});
  const [selected, setSelected] = useState([]);
  const [preview, setPreview] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [emailMessageList, setEmailMessageList] = useState([]);
  const [rowsData, setRowsData] = useState([]);
  const [selecteduser, setSelecteduser] = useState("");
  const [emailChatMessages, setEmailChatMesssages] = useState([]);
  const [editContactName, setEditContactName] = useState(false);
  const [editCName, setEditCName] = useState({});
  const [contactData, setContactData] = useState([]);
  const [editContact, setEditContact] = useState({});
  const [openContactModal, setOpenContactModal] = useState(false);
  const [searchState, setSearchState] = useState("");

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

  const handleNewMessage = () => {
    setOpenMessageModal(true);
    setErrors({});
    setEmailMessage("");
  };
  const handleCloseMessageModal = () => {
    setOpenMessageModal(false);
    setErrors({});
    setEmailMessage("");
    setSelected([]);
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
    getEmailMessage();
    getData();
  }, []);

  const handleClick = async () => {
    if (isValid()) {
      let res = await addTagsApi(addTags);
      if (res && res.data && res.data.status === 200) {
        toast.success("Tags Added Successfully");
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

  const handleSelectChange = (values) => {
    setSelected(values);
    setErrors({});
  };

  const handleMessageChange = (e) => {
    setEmailMessage(e.target.value);
    setErrors({});
  };

  const isSelectValid = () => {
    let formData = true;
    switch (true) {
      case selected.length == 0:
        setErrors({ selected: "Please Select an email address" });
        formData = false;
        break;
      default:
        formData = true;
    }
    return formData;
  };

  const sendMessageClick = async () => {
    if (isSelectValid()) {
      let contactid = selected.map((item) => item.value);
      const obj = {
        contactid: contactid,
        message: emailMessage,
      };
      let res = await sendEmailMessageApi(obj);
      if (res && res.data && res.data.status === 200) {
        toast.success(" Message sent Successfully");
        setOpenMessageModal(false);
        setSelected([]);
        setEmailMessage("");
      }
      getEmailMessage();
    }
  };

  const handleBackMessageModal = () => {
    setOpenMessageModal(true);
    setPreview(false);
  };

  const handlePreview = () => {
    setOpenMessageModal(true);
    setPreview(true);
  };

  const getData = async () => {
    let res = await getContactApi();
    if (res && res.data && res.data.status === 200) {
      let data = res.data.data.map(function (item) {
        return {
          value: item.contactid,
          label: item.firstName + " " + item.lastName,
          phone: item.phone,
          id: item._id,
        };
      });
      setRowsData(data);
      setContactData(res.data.data);

    }
  };

  const getEmailMessage = async () => {
    let res = await getUserWithEmailMessage();
    if (res && res.data && res.data.status === 200) {
      setEmailMessageList(res.data.data);
      setSelecteduser(res.data.data[0]);
      openChatClick(res.data.data[0]._id, false);
    }
  };
  const openChatClick = async (id, check) => {
    const res = await getEmailMessageApi(id);
    if (res && res.data && res.data.status === 200) {
      setEmailChatMesssages(res.data.data);
    }
    if (check) {
      const selecteduser = emailMessageList.find((c) => c._id == id);
      setSelecteduser(selecteduser);
    }
  };

  const handleContactEditModal = (id) => {
    const val = contactData.find((item) => item._id == id);
    setEditContact(val);
    setOpenContactModal(true);
  };

  const handleEditUserName = (id) => {
    const val = contactData.find((item) => item._id == id);
    const obj = {
      firstName: val.firstName,
      lastName: val.lastName,
    };
    setEditCName(obj);
    setEditContactName(true);
  };

  const handleEditContactChange = (e) => {
    setEditContact({ ...editContact, [e.target.name]: e.target.value });
  };

  const handleUserNameEdit = (e) => {
    setEditCName({ ...editCName, [e.target.name]: e.target.value });
  };

  const handleConDataEdit = async () => {
    console.log(editContact, "editContact");
    // const res = await updateContactApi(editContact._id, editContact);
    // if (res && res.data && res.data.status === 200) {
      setOpenContactModal(false);
    //   getData();
    // }
  };

  const handleCloseContactModal = () => {
    setOpenContactModal(false);
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
        <EmailChatBoot
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
          errors={errors}
          emailMessageList={emailMessageList}
          openChatClick={openChatClick}
          selecteduser={selecteduser}
          emailChatData={emailChatMessages}
          contactName={selecteduser}
          editContactName={editContactName}
          handleEditUserName={handleEditUserName}
          editCName={editCName}
          openContactModal={openContactModal}
          handleCloseContactModal={handleCloseContactModal}
          editContact={editContact}
          handleEditContactChange={handleEditContactChange}
          handleConDataEdit={handleConDataEdit}
          handleContactEditModal={handleContactEditModal}
          searchValue={searchState}
          handleSearchChange={(e) => setSearchState(e.target.value)}
          handleUserNameEdit={handleUserNameEdit}
        />
      </div>
      <EmailModal
        open={openMessageModal}
        handleCloseMessageModal={handleCloseMessageModal}
        selected={selected}
        options={rowsData}
        handleSelectChange={handleSelectChange}
        errors={errors}
        emailMessage={emailMessage}
        preview={preview}
        handlePreview={handlePreview}
        handleMessageChange={handleMessageChange}
        sendMessageClick={sendMessageClick}
        handleBackMessageModal={handleBackMessageModal}
      />
    </div>
  );
};

export default EmailPage;
