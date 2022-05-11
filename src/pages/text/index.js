import { useEffect, useRef, useState } from "react";
import MessageModal from "../../components/text/messageModal";
import ChatBoot from "../../components/text/chatBoot";
import {
  addTagsApi,
  deleteTagApi,
  getTagsApi,
  updateTagsApi,
} from "../../api/tag";
import { toast } from "react-toastify";
import {
  addTagsToListApi,
  getContactApi,
  updateContactApi,
  removeTagsToListApi,
} from ".././../api/contact";
import {
  getMessageApi,
  getUserWithMessage,
  sendMessageApi,
  sendSingleMessageApi,
} from "../../api/textMessage";
import {
  deleteTemplate,
  getTemplateApi,
  sendTemplate,
  updateTemplate,
} from "../../api/template";

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
  const [rowsData, setRowsData] = useState([]);
  const [sendNewMessage, setSendNewMessage] = useState("");
  const [selected, setSelected] = useState([]);
  const [messages, setMessages] = useState([]);
  const [preview, setPreview] = useState(false);
  const [errors, setErrors] = useState({});
  const [chatMessages, setChatMesssages] = useState([]);
  const [searchState, setSearchState] = useState("");
  const [selecteduser, setSelecteduser] = useState("");
  const [openContactModal, setOpenContactModal] = useState(false);
  const [contactData, setContactData] = useState([]);
  const [editContact, setEditContact] = useState({});
  const [editCName, setEditCName] = useState({});
  const [editContactName, setEditContactName] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showCreateTemplateModal, setShowCreateTemplateModal] = useState(false);
  const [showManageeTemplateModal, setShowManageeTemplateModal] =
    useState(false);
  const [templateName, setTemplateName] = useState("");
  const [templateTags, setTemplateTags] = useState(null);
  const [templateMessage, setTemplateMessage] = useState("");
  const [templateData, setTemplateData] = useState("");
  const [templateDataState, setTemplateDataState] = useState("");
  const [editmanageTemplate, seteditmanageTemplate] = useState(false);
  const [editTempData, setEditTempData] = useState("");
  const [templateEditTags, setTemplateEditTags] = useState(null);
  const [dateSelected, setDateSelected] = useState("");
  const [deleteTempComfirmation, setDeleteTempComfirmation] = useState(false);
  const [onShowEmoji, setOnShowEmoji] = useState(false);
  const [onShowChatBotEmojiOpen, setOnShowChatBotEmojiOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const divRef = useRef(null);

  const handleNewMessage = () => {
    setOpenMessageModal(true);
    setPreview(false);
    setErrors({});
    setLoading(false);
    setOnShowEmoji(false);
    setOnShowChatBotEmojiOpen(false);
  };
  const handleCloseMessageModal = () => {
    setOpenMessageModal(false);
    setSelected([]);
    setSendNewMessage("");
    setErrors({});
    setLoading(false);
    setOnShowChatBotEmojiOpen(false);
  };

  const handleScheduleModal = () => {
    setShowScheduleModal(true);
    setDateSelected("");
  };
  const handleCloseSchedultModal = () => {
    setShowScheduleModal(false);
    setDateSelected("");
  };
  const handleCreateTemplate = () => {
    setShowCreateTemplateModal(true);
    setTemplateName("");
    setTemplateName("");
    setTemplateMessage("");
    setErrors({});
  };
  const handleCloseCreateTemplateModal = () => {
    setShowCreateTemplateModal(false);
    setTemplateTags(null);
    setTemplateName("");
    setTemplateMessage("");
    setErrors({});
  };
  const handleManageTemplate = () => {
    getTemplate();
    setShowManageeTemplateModal(true);
    seteditmanageTemplate(false);
  };
  const handleCloseManageTemplateModal = () => {
    setShowManageeTemplateModal(false);
    seteditmanageTemplate(false);
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

  const isValidTemplate = () => {
    let formData = true;
    switch (true) {
      case !templateName:
        setErrors({ templateName: "Please Enter Template Name " });
        formData = false;
        break;
      case !templateMessage:
        setErrors({ templateMessage: "Please Enter Template Message" });
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
    getTemplate();
  }, []);

  const handleClick = async () => {
    if (isTagValid()) {
      let res = await addTagsApi(addTags);
      if (res && res.data && res.data.status === 200) {
        toast.success("Tags Added Successfully");
        setOpenCreateTagModal(false);
        setaddTags({});
        getTags();
        setErrors({});
      }
    }
  };

  const getTags = async (filterTag = []) => {
    const res = await getTagsApi();

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
      getMessage(false, true);
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
      getMessage(false, true);
    }
  };

  const onHandleChange = (e) => {
    setSendMessage(e.target.value);
    setLoading(false);
  };
  const scrollToBottom = (e) => {
    divRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const onHandleClick = async () => {
    setLoading(true);
    const obj = {
      message: sendMessage,
      contactid: selecteduser.contact && selecteduser.contact.contactid,
    };
    const res = await sendSingleMessageApi(obj);

    if (res && res.data && res.data.status === 200) {
      setSendMessage("");
      scrollToBottom();
      setLoading(false);
    }
    getMessage();
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

  const handleNewMChange = (e) => {
    setSendNewMessage(e.target.value);
    setErrors({});
    setLoading(false);
  };

  const handleSendClick = async () => {
    if (isValid()) {
      setLoading(true);
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
        setLoading(false);
      }
      getMessage();
    }
  };

  const handleSelectChange = (values) => {
    setSelected(values);
    setErrors({});
    setLoading(false);
  };

  const getMessage = async (check = true, tagsCheck = false) => {
    const res = await getUserWithMessage();
    if (res && res.data && res.data.status === 200) {
      setMessages(res.data.data);
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

  const handlePreview = () => {
    setOpenMessageModal(true);
    setPreview(true);
  };

  const handleBackMessageModal = () => {
    setOpenMessageModal(true);
    setPreview(false);
  };

  const openChatClick = async (id, check) => {
    const res = await getMessageApi(id);
    if (res && res.data && res.data.status === 200) {
      setChatMesssages(res.data.data);
    }
    if (check) {
      const selecteduser = messages.find((c) => c._id == id);
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

  const handleContactEditModal = (id) => {
    const val = contactData.find((item) => item._id == id);
    setEditContact(val);
    setOpenContactModal(true);
  };
  const handleCloseContactModal = () => {
    setOpenContactModal(false);
  };

  const handleEditContactChange = (e) => {
    setEditContact({ ...editContact, [e.target.name]: e.target.value });
  };

  const handleUserNameEdit = (e) => {
    setEditCName({ ...editCName, [e.target.name]: e.target.value });
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

  const handleConDataEdit = async () => {
    const editData = {
      firstName: editContact.firstName,
      lastName: editContact.lastName,
      phoneSubs: editContact.phoneSubs,
      emailSubs: editContact.emailSubs,
    };
    const res = await updateContactApi(editContact._id, editData);
    if (res && res.data && res.data.status === 200) {
      toast.success("Contact Updated Successfully");
      setOpenContactModal(false);
      getMessage(false, true);
      selecteduser.contact.firstName = editContact.firstName;
      selecteduser.contact.lastName = editContact.lastName;
      selecteduser.contact.phoneSubs = editContact.phoneSubs;
      selecteduser.contact.emailSubs = editContact.emailSubs;
      setSelecteduser(selecteduser);
    }
    getData();
  };

  const handleOptOut = async (type) => {
    const editData = {
      firstName: selecteduser.contact.firstName,
      lastName: selecteduser.contact.lastName,
      phoneSubs: type,
      emailSubs: selecteduser.contact.emailSubs,
    };
    const res = await updateContactApi(selecteduser._id, editData);
    if (res && res.data && res.data.status === 200) {
      toast.success(`${type} Successfully`);
      getMessage(false, true);
      selecteduser.contact.phoneSubs = type;
      setSelecteduser(selecteduser);
    }
    getData();
  };

  const handleTemplateName = (e) => {
    setTemplateName(e.target.value);
    setErrors({});
  };

  const handleTemplateTagChange = (e) => {
    let data = e.target.value;
    setTemplateTags(data);
    setErrors({});
    setTemplateMessage(templateMessage + data);
  };

  const handleEditTemplateTagChange = (e) => {
    setTemplateEditTags(e.target.value);
    setEditTempData({
      ...editTempData,
      message: editTempData.message + e.target.value,
    });
  };

  const handleTempMessageChange = (e) => {
    setTemplateMessage(e.target.value);
  };

  const replacefunc = (item) => {
    var x = "";
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (
      userData &&
      userData.firstName &&
      selecteduser.contact &&
      selecteduser.contact.firstName
    ) {
      x =
        item &&
        item
          .replace("[Employee First Name]", userData.firstName)
          .replace("[Employee Last Name]", userData.lastName)
          .replace(
            "[Employee Full Name]",
            userData.firstName + " " + userData.lastName
          )
          .replace(
            "[Customer Full Name]",
            selecteduser.contact.firstName + " " + selecteduser.contact.lastName
          );

      return x;
    }
  };

  const handleTemplateSubmit = async () => {
    if (isValidTemplate()) {
      const obj = {
        title: templateName,
        message: templateMessage,
      };
      setLoading(true);
      let res = await sendTemplate(obj);
      if (res && res.data && res.data.status == 200) {
        toast.success(res.data.message);
        setShowCreateTemplateModal(false);
        setTemplateTags(null);
        setTemplateName("");
        setTemplateMessage("");
        setErrors({});
        setLoading(false);
        let x = replacefunc(obj.message);
        setSendMessage(x);
        getTemplate();
      } else {
        toast.error(res.data.message);
      }
    }
  };

  const getTemplate = async () => {
    let res = await getTemplateApi();
    if (res && res.data && res.data.status == 200) {
      setTemplateData(res.data.data);
      setEditTempData(res.data.data[0]);
      setTemplateDataState(res.data.data[0]);
    }
  };

  const handleTempTitleClick = (item) => {
    let x = replacefunc(item.message);
    setSendMessage(x);
  };

  const handleNewTempTitleClick = (item) => {
    let x = replacefunc(item.message);
    setSendNewMessage(x);
  };
  const handleTempShowClick = (item) => {
    setEditTempData(item);
    setTemplateDataState(item);
  };

  const handleTempInsert = () => {
    let x = replacefunc(templateDataState.message);
    setSendNewMessage(x);
    setShowManageeTemplateModal(false);
  };

  const handleSingleTempInsert = () => {
    let x = replacefunc(templateDataState.message);
    setSendMessage(x);
    setShowManageeTemplateModal(false);
  };

  const handleEditTemplate = (item) => {
    seteditmanageTemplate(true);
    setEditTempData(item);
  };

  const handleTempEditCancel = () => {
    seteditmanageTemplate(false);
  };

  const handleEditTempChange = (e) => {
    setEditTempData({ ...editTempData, [e.target.name]: e.target.value });
  };

  const handleTempEditSave = async () => {
    const res = await updateTemplate(templateDataState._id, editTempData);
    if (res && res.data && res.data.status == 200) {
      templateDataState.title = editTempData.title;
      templateDataState.message = editTempData.message;
      let x = replacefunc(templateDataState.message);
      templateDataState.message = x;
      setTemplateDataState(templateDataState);
      seteditmanageTemplate(false);
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
    getTemplate();
  };

  const handleCloseDeleteTempModal = () => {
    setDeleteTempComfirmation(false);
  };

  const handleTempDelModal = () => {
    setDeleteTempComfirmation(true);
  };

  const handleTempRemove = async () => {
    const res = await deleteTemplate(templateDataState._id);
    if (res && res.data && res.data.status == 200) {
      toast.success(res.data.message);
      getTemplate();
      setDeleteTempComfirmation(false);
    } else {
      toast.error(res.data.message);
    }
  };

  const handleDateChange = (e) => {
    setDateSelected({ ...dateSelected, [e.target.name]: e.target.value });
  };

  const handleEmojiOpen = () => {
    setOnShowEmoji(true);
  };

  const handleChatBotEmojiOpen = () => {
    setOnShowChatBotEmojiOpen(true);
  };

  const onEmojiClick = (event, emojiObject) => {
    setSendNewMessage((prevInput) => prevInput + emojiObject.emoji);
    setOnShowEmoji(false);
  };

  const onChatBotEmojiClick = (event, emojiObject) => {
    setSendMessage((prevInput) => prevInput + emojiObject.emoji);
    setOnShowChatBotEmojiOpen(false);
  };

  const savelistToMessageClick = (e) => {
    let data = e.target.getAttribute("data-name");
    setSendNewMessage(sendNewMessage + data);
  };

  const handleImageOpen = () => {
    setSelectedImage(true);
  };

  const handleImageCancel = () => {
    setSelectedImage(false);
  };

  const handleImageChange = (event) => {
    console.log(event.target.files[0]);
    let img = event.target.files[0];
    setSelectedImage(URL.createObjectURL(img));
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
          selecteduser={selecteduser}
          replacefunc={replacefunc}
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
          errors={errors}
          userMessageList={messages}
          openChatClick={openChatClick}
          chatData={chatMessages}
          searchValue={searchState}
          handleSearchChange={(e) => setSearchState(e.target.value)}
          handleContactEditModal={handleContactEditModal}
          handleCloseContactModal={handleCloseContactModal}
          openContactModal={openContactModal}
          editContact={editContact}
          handleEditContactChange={handleEditContactChange}
          handleConDataEdit={handleConDataEdit}
          editCName={editCName}
          handleUserNameEdit={handleUserNameEdit}
          handleEditUserName={handleEditUserName}
          editContactName={editContactName}
          loading={loading}
          handleOptOut={handleOptOut}
          divRef={divRef}
          showScheduleModal={showScheduleModal}
          handleCloseSchedultModal={handleCloseSchedultModal}
          showCreateTemplateModal={showCreateTemplateModal}
          handleCloseCreateTemplateModal={handleCloseCreateTemplateModal}
          showManageeTemplateModal={showManageeTemplateModal}
          handleCloseManageTemplateModal={handleCloseManageTemplateModal}
          handleScheduleModal={handleScheduleModal}
          handleCreateTemplate={handleCreateTemplate}
          handleManageTemplate={handleManageTemplate}
          templateName={templateName}
          handleTemplateName={handleTemplateName}
          templateTags={templateTags}
          handleTemplateTagChange={handleTemplateTagChange}
          templateMessage={templateMessage}
          handleTempMessageChange={handleTempMessageChange}
          handleTemplateSubmit={handleTemplateSubmit}
          templateData={templateData}
          handleTempTitleClick={handleTempTitleClick}
          handleTempShowClick={handleTempShowClick}
          templateDataState={templateDataState}
          handleSingleTempInsert={handleSingleTempInsert}
          handleEditTemplate={handleEditTemplate}
          editmanageTemplate={editmanageTemplate}
          handleTempEditCancel={handleTempEditCancel}
          editTempData={editTempData}
          templateEditTags={templateEditTags}
          handleEditTempChange={handleEditTempChange}
          handleTempEditSave={handleTempEditSave}
          handleTempRemove={handleTempRemove}
          handleEditTemplateTagChange={handleEditTemplateTagChange}
          dateSelected={dateSelected}
          handleDateChange={handleDateChange}
          handleTempDelModal={handleTempDelModal}
          handleCloseDeleteTempModal={handleCloseDeleteTempModal}
          showDeleteTempModal={deleteTempComfirmation}
          handleChatBotEmojiOpen={handleChatBotEmojiOpen}
          onChatBotEmojiClick={onChatBotEmojiClick}
          onShowChatBotEmojiOpen={onShowChatBotEmojiOpen}
          handleImageOpen={handleImageOpen}
          selectedImage={selectedImage}
          handleImageCancel={handleImageCancel}
          handleImageChange={handleImageChange}
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
        loading={loading}
        showScheduleModal={showScheduleModal}
        handleCloseSchedultModal={handleCloseSchedultModal}
        showCreateTemplateModal={showCreateTemplateModal}
        handleCloseCreateTemplateModal={handleCloseCreateTemplateModal}
        showManageeTemplateModal={showManageeTemplateModal}
        handleCloseManageTemplateModal={handleCloseManageTemplateModal}
        handleScheduleModal={handleScheduleModal}
        handleCreateTemplate={handleCreateTemplate}
        handleManageTemplate={handleManageTemplate}
        templateName={templateName}
        handleTemplateName={handleTemplateName}
        templateTags={templateTags}
        handleTemplateTagChange={handleTemplateTagChange}
        templateMessage={templateMessage}
        handleTempMessageChange={handleTempMessageChange}
        handleTemplateSubmit={handleTemplateSubmit}
        templateData={templateData}
        templateDataState={templateDataState}
        handleTempInsert={handleTempInsert}
        handleSingleTempInsert={handleSingleTempInsert}
        handleTempTitleClick={handleNewTempTitleClick}
        handleTempShowClick={handleTempShowClick}
        editmanageTemplate={editmanageTemplate}
        handleEditTemplate={handleEditTemplate}
        handleTempEditCancel={handleTempEditCancel}
        editTempData={editTempData}
        handleEditTempChange={handleEditTempChange}
        templateEditTags={templateEditTags}
        handleTempEditSave={handleTempEditSave}
        handleTempRemove={handleTempRemove}
        handleEditTemplateTagChange={handleEditTemplateTagChange}
        searchValue={searchState}
        handleSearchChange={(e) => setSearchState(e.target.value)}
        replacefunc={replacefunc}
        dateSelected={dateSelected}
        handleDateChange={handleDateChange}
        handleTempDelModal={handleTempDelModal}
        handleCloseDeleteTempModal={handleCloseDeleteTempModal}
        showDeleteTempModal={deleteTempComfirmation}
        handleEmojiOpen={handleEmojiOpen}
        onEmojiClick={onEmojiClick}
        onShowEmojiOpen={onShowEmoji}
        savelistToMessageClick={savelistToMessageClick}
      />
    </div>
  );
};

export default TextPage;
