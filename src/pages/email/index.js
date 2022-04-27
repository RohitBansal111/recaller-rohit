import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  addTagsToListApi,
  getContactApi,
  removeTagsToListApi,
  updateContactApi,
} from "../../api/contact";
import {
  getEmailMessageApi,
  getUserWithEmailMessage,
  sendEmailMessageApi,
  sendSingleEmailMessageApi,
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
  const [selectEmailSubscription, setSelectEmailSubscription] =
    useState("opted-in");
  const [selectPhoneSubscription, setSelectPhoneSubscription] =
    useState("opted-in");
  const [sendEmailMessage, setSendEmailMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
    setPreview(false);
    setEmailMessage("");
    setLoading(false);
  };

  const handleCloseMessageModal = () => {
    setOpenMessageModal(false);
    setErrors({});
    setEmailMessage("");
    setSelected([]);
    setLoading(false);
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
  const getTags = async (filterTag = []) => {
    const res = await getTagsApi();
    if (res && res.data && res.data.status === 200) {
      setTags(res.data.data);
      setConversationTags(res.data.data);
    }
    if (res && res.data && res.data.status === 200) {
      setTags(res.data.data);
      setConversationTags(res.data.data);
      if (filterTag && filterTag.length > 0) {
        const resData1 = res.data.data.filter(
          (value) =>
            filterTag.filter((item) => item._id == value._id).length == 0
        );
        if (resData1.length == res.data.data.length) {
          setConversationTags([]);
        } else {
          setConversationTags(resData1);
        }
      }
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

  const handleSelectedTagItems = async (item, index) => {
    setSelectedTags((oldArray) => [...oldArray, item]);
    const newArrayState = tags.filter((value, theIndex) => {
      return index != theIndex;
    });
    setConversationTags(newArrayState);
    const obj = {
      tags: item._id,
      contactId: selecteduser.contact && selecteduser.contact._id,
    };
    const res = await addTagsToListApi(obj);
    if (res && res.data && res.data.status === 200) {
      getEmailMessage(false, true);
    }
  };

  const handleSelectDel = async (item) => {
    let conversationdata = conversationTags;
    let data = [...selectedTags];
    data.splice(data.indexOf(item), 1);
    setSelectedTags(data);
    conversationdata.push(item);
    setConversationTags(conversationdata);
    const obj = {
      tags: item._id,
      contactId: selecteduser.contact && selecteduser.contact._id,
    };
    const res = await removeTagsToListApi(obj);
    if (res && res.data && res.data.status === 200) {
      getEmailMessage(false, true);
    }
  };
  const handleSelectChange = (values) => {
    setSelected(values);
    setErrors({});
    setLoading(false);
  };

  const handleMessageChange = (e) => {
    setEmailMessage(e.target.value);
    setErrors({});
    setLoading(false);
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
      setLoading(true);
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
        setLoading(false);
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

  const getEmailMessage = async (check = true, tagsCheck = false) => {
    let res = await getUserWithEmailMessage();
    if (res && res.data && res.data.status === 200) {
      setEmailMessageList(res.data.data);
      if (!tagsCheck) {
        setSelecteduser(res.data.data[0]);
        openChatClick(res.data.data[0]._id, false);
        setSelectedTags(res.data.data[0].contact.tags);
      }
      if (check) {
        getTags(res.data.data[0].contact.tags);
      }
      if (!tagsCheck) {
        setSelecteduser(res.data.data[0]);
        openChatClick(res.data.data[0]._id, false);
        setSelectedTags(res.data.data[0].contact.tags);
      }
      if (check) {
        getTags(res.data.data[0].contact.tags);
      } else {
        const objTag = res.data.data.find(
          (item) => item.contact._id == selecteduser._id
        );
        getTags(objTag.contact.tags);
      }
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
      setSelectedTags(selecteduser.contact.tags);
      if (selecteduser.contact.tags && selecteduser.contact.tags.length > 0) {
        const resData1 = tags.filter(
          (value) =>
            selecteduser.contact.tags.filter((item) => item._id == value._id)
              .length == 0
        );

        if (resData1.length == tags.length) {
          setConversationTags([]);
        } else {
          setConversationTags(resData1);
        }
      } else {
        setConversationTags(tags);
      }
    }
  };

  const onHandleChange = (e) => {
    setSendEmailMessage(e.target.value);
    setLoading(false);
  };

  const onHandleClick = async () => {
    setLoading(true);
    const obj = {
      message: sendEmailMessage,
      contactid: selecteduser.contact && selecteduser.contact.contactid,
    };
    const res = await sendSingleEmailMessageApi(obj);

    if (res && res.data && res.data.status === 200) {
      setSendEmailMessage("");
      setLoading(false)
    }
    getEmailMessage();
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

  const handleEmailSubSelectChange = (e) => {
    setSelectEmailSubscription(e.target.value);
  };

  const handlePhoneSubSelectChange = (e) => {
    setSelectPhoneSubscription(e.target.value);
  };

  const handleConDataEdit = async () => {
    const editData = {
      firstName: editContact.firstName,
      lastName: editContact.lastName,
      phoneSubs: selectPhoneSubscription,
      emailSubs: selectEmailSubscription,
    };
    const res = await updateContactApi(editContact._id, editData);
    if (res && res.data && res.data.status === 200) {
      setOpenContactModal(false);
    }
    getData();
    getEmailMessage();
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
          sendEmailMessage={sendEmailMessage}
          onHandleChange={onHandleChange}
          onHandleClick={onHandleClick}
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
          selectEmailSubscription={selectEmailSubscription}
          selectPhoneSubscription={selectPhoneSubscription}
          handleEmailSubSelectChange={handleEmailSubSelectChange}
          handlePhoneSubSelectChange={handlePhoneSubSelectChange}
          loading={loading}
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
        loading={loading}
      />
    </div>
  );
};

export default EmailPage;
