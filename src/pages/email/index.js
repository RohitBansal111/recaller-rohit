import moment from "moment";
import { createRef, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addTagsToListApi,
  getContactApi,
  removeTagsToListApi,
  updateContactApi,
} from "../../api/contact";
import {
  deleteReScheduleEmailApi,
  getEmailMessageApi,
  getUserWithEmailMessage,
  reScheduleEmailApi,
  sendEmailMessageApi,
  sendSingleEmailMessageApi,
} from "../../api/emailMessage";
import {
  deleteEmailTemplate,
  getEmailTemplateApi,
  sendEmailTemplate,
  updateEmailTemplate,
} from "../../api/emailTemplates";
import {
  addTagsApi,
  deleteTagApi,
  getTagsApi,
  updateTagsApi,
} from "../../api/tag";
import EmailChatBoot from "../../components/email/emailChatBoot";
import EmailModal from "../../models/EmailModal";

const EmailPage = () => {
  var today = new Date();
  const curTime = today.getHours() + ":" + today.getMinutes();

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
  const [sendEmailMessage, setSendEmailMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showCreateTemplateModal, setShowCreateTemplateModal] = useState(false);
  const [showManageeTemplateModal, setShowManageeTemplateModal] =
    useState(false);
  const [templateName, setTemplateName] = useState("");
  const [templateTags, setTemplateTags] = useState(null);
  const [templateMessage, setTemplateMessage] = useState("");
  const [templateData, setTemplateData] = useState([]);
  const [templateDataState, setTemplateDataState] = useState({});
  const [editmanageTemplate, seteditmanageTemplate] = useState(false);
  const [editTempData, setEditTempData] = useState({});
  const [templateEditTags, setTemplateEditTags] = useState(null);
  const [dateSelected, setDateSelected] = useState(() => {
    const today = new Date();
    const curtt =
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    return {
      date: new Date().toISOString().substring(0, 10),
      time: today.getHours() + ":" + curtt,
    };
  });
  const [deleteTempComfirmation, setDeleteTempComfirmation] = useState(false);
  const [onShowEmoji, setOnShowEmoji] = useState(false);
  const [onShowChatBotEmojiOpen, setOnShowChatBotEmojiOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showNewManageeTemplateModal, setNewShowManageeTemplateModal] =
    useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [scheduledData, setScheduledData] = useState({});
  const [showReScheduleModal, setShowReScheduleModal] = useState(false);
  const [reScheduleData, setReScheduleData] = useState({});
  const [cancelRescheDule, setCancelRescheDule] = useState(false);
  const [schedule, setSchedule] = useState(false);
  const [reScheduleItem, setReScheduleItem] = useState({});
  const [showReScheduleTitleModal, setShowReScheduleTitleModal] =
    useState(false);
  const [reScheduleTitle, setReScheduleTitle] = useState({});
  const [searchTemplateValue, setSearchTemplateValue] = useState("");

  const divRef = useRef(null);
  const textref = useRef(null);

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

  const handleNewMessage = () => {
    setOpenMessageModal(true);
    setErrors({});
    setPreview(false);
    setEmailMessage("");
    setLoading(false);
    setEmailSubject("");
    setOnShowEmoji(false);
    setSendEmailMessage("");
    setOnShowChatBotEmojiOpen(false);
  };

  const handleCloseMessageModal = () => {
    setOpenMessageModal(false);
    setErrors({});
    setEmailMessage("");
    setSelected([]);
    setLoading(false);
    setDateSelected(() => {
      const today = new Date();
      const curtt =
        today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
      return {
        date: new Date().toISOString().substring(0, 10),
        time: today.getHours() + ":" + curtt,
      };
    });
    setEmailSubject("");
    setSelectedImage(null);
    setOnShowEmoji(false);
    setOnShowChatBotEmojiOpen(false);
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

  const handleScheduleModal = () => {
    setShowScheduleModal(true);
    setOnShowEmoji(false);
    setOnShowChatBotEmojiOpen(false);
    setDateSelected(() => {
      const today = new Date();
      const curtt =
        today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
      return {
        date: new Date().toISOString().substring(0, 10),
        time: today.getHours() + ":" + curtt,
      };
    });
  };
  const handleCloseSchedultModal = () => {
    setShowScheduleModal(false);
    setDateSelected(() => {
      const today = new Date();
      const curtt =
        today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
      return {
        date: new Date().toISOString().substring(0, 10),
        time: today.getHours() + ":" + curtt,
      };
    });
  };

  const handleCreateTemplate = () => {
    setShowCreateTemplateModal(true);
    setTemplateName("");
    setTemplateName("");
    setTemplateMessage("");
    setErrors({});
    setSearchTemplateValue("");
  };
  const handleCloseCreateTemplateModal = () => {
    setShowCreateTemplateModal(false);
    setTemplateTags(null);
    setTemplateName("");
    setTemplateMessage("");
    setErrors({});
    setSearchTemplateValue("");
  };
  const handleManageTemplate = () => {
    setShowManageeTemplateModal(true);
    getEmailTemplate();
    seteditmanageTemplate(false);
    setSearchTemplateValue("");
  };

  const handleNewManageTemplate = () => {
    getEmailTemplate();
    setNewShowManageeTemplateModal(true);
    seteditmanageTemplate(false);
    setSearchTemplateValue("");
  };

  const handleNewCloseManageTemplateModal = () => {
    setNewShowManageeTemplateModal(false);
    seteditmanageTemplate(false);
    setSearchTemplateValue("");
  };

  const handleCloseManageTemplateModal = () => {
    setShowManageeTemplateModal(false);
    seteditmanageTemplate(false);
    setSearchTemplateValue("");
  };
  useEffect(() => {
    getTags();
    getEmailMessage();
    getData();
    getEmailTemplate();
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
      toast.success("Tag Edit Successfully");
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
      toast.success("Tag Deleted Successfully");
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

  const handleMessageChange = (data) => {
    setEmailMessage(data);
    setErrors({});
    setLoading(false);
  };

  const isSelectValid = () => {
    let formData = true;
    switch (true) {
      case selected.length == 0:
        setErrors({ selected: "Please Select a Contact Name" });
        formData = false;
        break;
      case !emailSubject:
        setErrors({ selected: "Please Enter Email Subject" });
        formData = false;
        break;
      default:
        formData = true;
    }
    return formData;
  };

  const handleSubjectChange = (e) => {
    setEmailSubject(e.target.value);
    setErrors({});
    setLoading(false);
  };

  const sendMessageClick = async () => {
    if (isSelectValid()) {
      setLoading(true);
      let contactid = selected.map((item) => item.value);
      const obj = {
        contactid: contactid,
        subject: emailSubject,
        message: emailMessage,
        schedule: schedule ? true : false,
      };
      if (scheduledData && scheduledData.date && scheduledData.time) {
        obj.dateSelected =
          scheduledData.date + " " + scheduledData.time + ":00";
      }
      var today = new Date().getHours();

      if (today >= 8 && today <= 20) {
        let res = await sendEmailMessageApi(obj);
        if (res && res.data && res.data.status === 200) {
          toast.success(" Message sent Successfully");
          setOpenMessageModal(false);
          setSelected([]);
          setEmailMessage("");
          setLoading(false);
          setDateSelected({});
          setShowReScheduleModal(false);
          setCancelRescheDule(false);
          setSchedule(false);
          setScheduledData({});
          setShowScheduleModal(false);
          setEmailSubject("");
        }
        getEmailMessage();
      } else {
        toast.error("Please Send Text between 8am - 9pm");
        setLoading(false);
      }
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
      let data = res.data.data
        .filter((val) => {
          if (val.email) {
            return val;
          }
        })
        .map(function (item) {
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
    if (
      res &&
      res.data &&
      res.data.status === 200 &&
      res.data.data.length != 0
    ) {
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
    setSendEmailMessage("");
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

  const onHandleChange = (data) => {
    setSendEmailMessage(data);
    setLoading(false);
  };

  const scrollToBottom = (e) => {
    const scroll = divRef.current.scrollHeight - divRef.current.clientHeight;
    divRef.current.scrollIntoView(0, scroll, { block: "end" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [emailChatMessages]);

  const onHandleClick = async () => {
    setLoading(true);
    const obj = {
      subject: selecteduser.subject,
      message: sendEmailMessage,
      contactid: selecteduser.contact && selecteduser.contact.contactid,
      schedule: schedule ? true : false,
    };
    if (scheduledData && scheduledData.date && scheduledData.time) {
      obj.dateSelected = scheduledData.date + " " + scheduledData.time + ":00";
    }
    var today = new Date().getHours();

    if (today >= 8 && today <= 20) {
      const res = await sendSingleEmailMessageApi(obj);

      if (res && res.data && res.data.status === 200) {
        setSendEmailMessage("");
        scrollToBottom();
        setLoading(false);
        setSchedule(false);
        setScheduledData({});
        setDateSelected({});
        setCancelRescheDule(false);
        setShowScheduleModal(false);
      }
      getEmailMessage();
    } else {
      toast.error("Please Send Text between 8am - 9pm");
      setLoading(false);
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
      getEmailMessage(false, true);
      selecteduser.contact.firstName = editContact.firstName;
      selecteduser.contact.lastName = editContact.lastName;
      selecteduser.contact.phoneSubs = editContact.phoneSubs;
      selecteduser.contact.emailSubs = editContact.emailSubs;
      setSelecteduser(selecteduser);
    }
    getData();
  };

  const handleCloseContactModal = () => {
    setOpenContactModal(false);
  };

  const handleMute = () => {};

  const handleOptOut = async (type) => {
    const editData = {
      firstName: selecteduser.contact.firstName,
      lastName: selecteduser.contact.lastName,
      phoneSubs: selecteduser.contact.phoneSubs,
      emailSubs: type,
    };
    const res = await updateContactApi(selecteduser._id, editData);
    if (res && res.data && res.data.status === 200) {
      toast.success(
        `${type == "opted-in" ? "Opted In" : "Opted Out"} Successfully`
      );
      getEmailMessage(false, true);
      selecteduser.contact.emailSubs = type;
      setSelecteduser(selecteduser);
    }
    getData();
  };

  const handleBlock = () => {};

  const handleTemplateName = (e) => {
    setTemplateName(e.target.value);
    setErrors({});
  };

  const handleTemplateTagChange = (e) => {
    setTemplateTags(e.target.value);
    setErrors({});
    setTemplateMessage(templateMessage + e.target.value);
  };

  const handleTempMessageChange = (e) => {
    setTemplateMessage(e.target.value);
  };

  const handleTemplateSubmit = async () => {
    if (isValidTemplate()) {
      const obj = {
        title: templateName,
        message: templateMessage,
      };
      let res = await sendEmailTemplate(obj);
      setLoading(true);
      if (res && res.data && res.data.status == 200) {
        toast.success(res.data.message);
        setShowCreateTemplateModal(false);
        setTemplateTags(null);
        setTemplateName("");
        setTemplateMessage("");
        setErrors({});
        let x = replacefunc(obj.message);
        setSendEmailMessage(x);
        setLoading(false);
      } else {
        toast.error(res.data.message);
      }
    }
    getEmailTemplate();
  };
  const replacefunc = (item) => {
    var x = "";
    const userData = JSON.parse(localStorage.getItem("userData"));
    let fName = userData.firstName;
    let lName = userData.lastName;
    if (
      userData &&
      userData.firstName &&
      selecteduser.contact &&
      selecteduser.contact.firstName
    ) {
      x =
        item &&
        item
          .replace("[Employee First Name]", fName)
          .replace("[Employee Last Name]", lName)
          .replace(
            "[Employee Full Name]",
            userData.firstName + " " + userData.lastName
          )
          .replace(
            "[Customer Full Name]",
            selecteduser.contact.firstName + " " + selecteduser.contact.lastName
          );
    }
    return x;
  };

  const getEmailTemplate = async () => {
    let res = await getEmailTemplateApi();
    if (res && res.data && res.data.status == 200) {
      setTemplateData(res.data.data);
      setEditTempData(res.data.data[0]);
      setTemplateDataState(res.data.data[0]);
    }
  };

  const handleEmailTempTitleClick = (item) => {
    let x = replacefunc(item.message);
    setSendEmailMessage(x);
  };

  const handleTempShowClick = (item) => {
    setEditTempData(item);
    setTemplateDataState(item);
  };

  const handleTempInsert = () => {
    let x = replacefunc(templateDataState.message);
    setSendEmailMessage(x);
    setShowManageeTemplateModal(false);
  };

  const handleNewTempTitleClick = (item) => {
    let x = replacefunc(item.message);
    setEmailMessage(x);
  };

  const handleSingleTempInsert = () => {
    setSendEmailMessage(templateDataState.message);
    setShowManageeTemplateModal(false);
    seteditmanageTemplate(false);
  };

  const handleEditTemplate = (item) => {
    setEditTempData(item);
    seteditmanageTemplate(true);
  };

  const handleTempEditCancel = () => {
    seteditmanageTemplate(false);
  };

  const handleEditTemplateTagChange = (e) => {
    setTemplateEditTags(e.target.value);
    setEditTempData({
      ...editTempData,
      message: editTempData.message + e.target.value,
    });
  };

  const handleEditTempChange = (e) => {
    setEditTempData({ ...editTempData, [e.target.name]: e.target.value });
  };

  const handleTempEditSave = async () => {
    const res = await updateEmailTemplate(templateDataState._id, editTempData);
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
    getEmailTemplate();
  };

  const handleTempRemove = async () => {
    const res = await deleteEmailTemplate(templateDataState._id);
    if (res && res.data && res.data.status == 200) {
      toast.success(res.data.message);
      setDeleteTempComfirmation(false);
      getEmailTemplate();
    } else {
      toast.error(res.data.message);
    }
  };

  const handleDateChange = (e) => {
    setDateSelected({ ...dateSelected, [e.target.name]: e.target.value });
  };

  const handleCloseDeleteTempModal = () => {
    setDeleteTempComfirmation(false);
  };

  const handleTempDelModal = () => {
    setDeleteTempComfirmation(true);
  };

  const handleEmojiOpen = () => {
    setOnShowEmoji(true);
  };

  const handleChatBotEmojiOpen = () => {
    setOnShowChatBotEmojiOpen(true);
  };

  const onEmojiClick = (e, emojiObject) => {
    const cursor = textref && textref.current && textref.current.selectionStart;
    const text =
      emailMessage.slice(0, cursor) +
      emojiObject.emoji +
      emailMessage.slice(cursor);

    setEmailMessage(text);
    // setEmailMessage(emailMessage + emojiObject.emoji);
  };

  const onChatBotEmojiClick = (event, emojiObject) => {
    setSendEmailMessage((prevInput) => prevInput + emojiObject.emoji);
  };

  const savelistToMessageClick = (e) => {
    let data = e.target.getAttribute("data-name");
    const cursor = textref && textref.current && textref.current.selectionStart;
    const text =
      emailMessage.slice(0, cursor) + data + emailMessage.slice(cursor);
    setEmailMessage(text);
  };

  const handleImageOpen = () => {
    setSelectedImage(true);
    setOnShowEmoji(false);
    setOnShowChatBotEmojiOpen(false);
  };

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const handleScheduleSubmit = () => {
    var dddd = new Date().toISOString().substring(0, 10);
    var ssss = today.getHours() + ":" + today.getMinutes();
    if (dateSelected.time <= ssss && dateSelected.date <= dddd) {
      toast.error("The date/time must be in the future");
    } else {
      setShowScheduleModal(false);
      setSchedule(true);
      setScheduledData(dateSelected);
    }
  };

  const handleReSchedule = (item) => {
    setReScheduleItem(item);
    let val = item.dateString.split(" ");
    setReScheduleData({ date: val[0], time: val[1] });
    setShowReScheduleModal(true);
    setCancelRescheDule(false);
  };

  const handleCloseReSchedultModal = () => {
    setShowReScheduleModal(false);
    setCancelRescheDule(false);
  };

  const handleReSchaduleChange = (e) => {
    setReScheduleData({ ...reScheduleData, [e.target.name]: e.target.value });
  };
  const handleReSubmit = async () => {
    const data = {
      ...reScheduleItem,
      dateSelected: reScheduleData.date + " " + reScheduleData.time,
    };

    var dddd = new Date().toISOString().substring(0, 10);
    var ssss = today.getHours() + ":" + today.getMinutes();

    if (reScheduleData.time <= ssss && reScheduleData.date <= dddd) {
      toast.error("The date/time must be in the future");
    } else {
      const res = await reScheduleEmailApi(data);
      if (res && res.data && res.data.status === 200) {
        toast.success(res.data.message);
        getEmailMessage();
        setShowReScheduleModal(false);
        setCancelRescheDule(false);
      }
    }
  };

  const handleCancelReSchedultModal = () => {
    setCancelRescheDule(true);
  };

  const handleNoReSchedultModal = () => {
    setShowReScheduleModal(true);
    setCancelRescheDule(false);
  };

  const handleDeleteReSchedultModal = async () => {
    setShowReScheduleModal(false);
    const res = await deleteReScheduleEmailApi(reScheduleItem.message_id);
    if (res && res.data && res.data.status === 200) {
      toast.success(res.data.message);
      getEmailMessage();
    }
  };

  const handleReSchaduleData = (item) => {
    setShowReScheduleTitleModal(true);
    setReScheduleTitle(item);
  };

  const CancelEmoji = () => {
    setOnShowChatBotEmojiOpen(false);
    setOnShowEmoji(false);
  };

  const handleCloseReSchedulTitle = () => {
    setShowReScheduleTitleModal(false);
  };

  const handleReSchaduleTChange = (e) => {
    setReScheduleTitle({ ...reScheduleTitle, [e.target.name]: e.target.value });
  };
  const handleDeleteRechaduletitleM = () => {
    setScheduledData({});
    setSchedule(false);
    setShowReScheduleTitleModal(false);
  };

  const handleReTitleSubmit = () => {
    setScheduledData({
      date: reScheduleTitle.date,
      time: reScheduleTitle.time,
    });
    setShowReScheduleTitleModal(false);
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
          loading={loading}
          handleBlock={handleBlock}
          handleOptOut={handleOptOut}
          handleMute={handleMute}
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
          handleEmailTempTitleClick={handleEmailTempTitleClick}
          handleSingleTempInsert={handleSingleTempInsert}
          handleTempShowClick={handleTempShowClick}
          templateDataState={templateDataState}
          editmanageTemplate={editmanageTemplate}
          handleEditTemplate={handleEditTemplate}
          handleTempEditCancel={handleTempEditCancel}
          editTempData={editTempData}
          handleEditTempChange={handleEditTempChange}
          handleTempEditSave={handleTempEditSave}
          handleTempRemove={handleTempRemove}
          templateEditTags={templateEditTags}
          handleEditTemplateTagChange={handleEditTemplateTagChange}
          replacefunc={replacefunc}
          dateSelected={dateSelected}
          handleDateChange={handleDateChange}
          handleTempDelModal={handleTempDelModal}
          handleCloseDeleteTempModal={handleCloseDeleteTempModal}
          showDeleteTempModal={deleteTempComfirmation}
          handleChatBotEmojiOpen={handleChatBotEmojiOpen}
          onShowChatBotEmojiOpen={onShowChatBotEmojiOpen}
          onChatBotEmojiClick={onChatBotEmojiClick}
          selectedImage={selectedImage}
          handleScheduleSubmit={handleScheduleSubmit}
          showReScheduleModal={showReScheduleModal}
          handleCloseReSchedultModal={handleCloseReSchedultModal}
          reScheduleData={reScheduleData}
          handleReSchedule={handleReSchedule}
          handleReSchaduleChange={handleReSchaduleChange}
          handleReSubmit={handleReSubmit}
          handleCancelReSchedultModal={handleCancelReSchedultModal}
          cancelRescheDule={cancelRescheDule}
          handleNoReSchedultModal={handleNoReSchedultModal}
          handleDeleteReSchedultModal={handleDeleteReSchedultModal}
          handleReSchaduleData={handleReSchaduleData}
          scheduledData={scheduledData}
          searchTemplateValue={searchTemplateValue}
          handleSearchTempChange={(e) => setSearchTemplateValue(e.target.value)}
          CancelEmoji={CancelEmoji}
          showReScheduleTitleModal={showReScheduleTitleModal}
          handleCloseReSchedulTitle={handleCloseReSchedulTitle}
          reScheduleTitle={reScheduleTitle}
          handleReSchaduleTChange={handleReSchaduleTChange}
          handleDeleteRechaduletitleM={handleDeleteRechaduletitleM}
          handleReTitleSubmit={handleReTitleSubmit}
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
        showScheduleModal={showScheduleModal}
        handleCloseSchedultModal={handleCloseSchedultModal}
        showCreateTemplateModal={showCreateTemplateModal}
        handleCloseCreateTemplateModal={handleCloseCreateTemplateModal}
        showManageeTemplateModal={showNewManageeTemplateModal}
        handleCloseManageTemplateModal={handleNewCloseManageTemplateModal}
        handleScheduleModal={handleScheduleModal}
        handleCreateTemplate={handleCreateTemplate}
        handleManageTemplate={handleNewManageTemplate}
        templateName={templateName}
        searchTemplateValue={searchTemplateValue}
        handleSearchTempChange={(e) => setSearchTemplateValue(e.target.value)}
        handleTemplateName={handleTemplateName}
        templateTags={templateTags}
        handleTemplateTagChange={handleTemplateTagChange}
        templateMessage={templateMessage}
        handleTempMessageChange={handleTempMessageChange}
        handleTemplateSubmit={handleTemplateSubmit}
        templateData={templateData}
        handleTempShowClick={handleTempShowClick}
        templateDataState={templateDataState}
        handleTempInsert={handleTempInsert}
        handleEmailTempTitleClick={handleNewTempTitleClick}
        handleEditTemplate={handleEditTemplate}
        editmanageTemplate={editmanageTemplate}
        handleTempEditCancel={handleTempEditCancel}
        editTempData={editTempData}
        handleEditTempChange={handleEditTempChange}
        handleTempEditSave={handleTempEditSave}
        handleTempRemove={handleTempRemove}
        templateEditTags={templateEditTags}
        searchValue={searchState}
        handleSearchChange={(e) => setSearchState(e.target.value)}
        handleEditTemplateTagChange={handleEditTemplateTagChange}
        replacefunc={replacefunc}
        dateSelected={dateSelected}
        handleDateChange={handleDateChange}
        handleTempDelModal={handleTempDelModal}
        handleCloseDeleteTempModal={handleCloseDeleteTempModal}
        showDeleteTempModal={deleteTempComfirmation}
        handleEmojiOpen={handleEmojiOpen}
        onShowEmojiOpen={onShowEmoji}
        emailSubject={emailSubject}
        handleSubjectChange={handleSubjectChange}
        onEmojiClick={onEmojiClick}
        savelistToMessageClick={savelistToMessageClick}
        textRef={textref}
        selecteduser={selecteduser}
        editorLoaded={editorLoaded}
        handleScheduleSubmit={handleScheduleSubmit}
        scheduledData={scheduledData}
        handleReSchaduleData={handleReSchaduleData}
        CancelEmoji={CancelEmoji}
      />
    </div>
  );
};
export default EmailPage;
