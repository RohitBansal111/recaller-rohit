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
  deleteReScheduleMessageApi,
  getMessageApi,
  getUserWithMessage,
  reScheduleMessageApi,
  resetBulkMessageApi,
  sendBulkMessageApi,
  sendMessageApi,
  sendSingleMessageApi,
  countMessageApi,
} from "../../api/textMessage";
import {
  deleteTemplate,
  getTemplateApi,
  sendTemplate,
  updateTemplate,
} from "../../api/template";
import axios from "axios";
import moment from "moment";
import { Dropdown } from "react-bootstrap";
import BulkMessageModal from "../../models/bulkMessageModal";
import { getCompaignApi } from "../../api/compaign";
import { changeTimeZone } from "../../helper/getTimeZone";
import date from "date-and-time";
import { socket } from "../../helper/socket";
import Layout from "../../components/layout";

import ProgressBar from "../../components/text/ProgreeBar";

const TextPage = () => {
  var today = new Date();
  const curTime = today.getHours() + ":" + today.getMinutes();

  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [openBulkMessageModal, setOpenBulkMessageModal] = useState(false);

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
  const [bulkSelected, setBulkSelected] = useState([]);

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
  const [showNewManageeTemplateModal, setNewShowManageeTemplateModal] =
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState({});
  const [selectedNewImage, setSelectedNewImage] = useState(null);
  const [scheduledData, setScheduledData] = useState(null);
  const [schedule, setSchedule] = useState(false);
  const [showReScheduleModal, setShowReScheduleModal] = useState(false);
  const [reScheduleData, setReScheduleData] = useState({});
  const [cancelRescheDule, setCancelRescheDule] = useState(false);
  const [reScheduleItem, setReScheduleItem] = useState({});
  const [selectedImageData, setSelectedImageData] = useState(null);
  const [selectedNewImageData, setSelectedNewImageData] = useState(null);
  const [showReScheduleTitleModal, setShowReScheduleTitleModal] =
    useState(false);
  const [reScheduleTitle, setReScheduleTitle] = useState({});
  const [searchTemplateValue, setSearchTemplateValue] = useState("");
  const [compaign, setCompaigns] = useState([]);
  const [countData, setCountData] = useState();

  const divRef = useRef(null);

  const handleNewMessage = () => {
    setOpenMessageModal(true);
    setSelectedNewImageData(null);
    setImageUrl({});
    setCancelRescheDule(false);
    setPreview(false);
    setErrors({});
    setLoading(false);
    setSelectedImageData(null);
    setOnShowEmoji(false);
    setOnShowChatBotEmojiOpen(false);
    setSelectedImage(null);
    setSendNewMessage("");
    setScheduledData({});
  };

  const getNotificationsEventHandler = () => {
    getMessage();
  };

  useEffect(() => {
    socket.on("getNotifications", getNotificationsEventHandler);
    // unsubscribe from event for preventing memory leaks
    return () => {
      socket.off("getNotifications", getNotificationsEventHandler);
    };
  }, []);

  const handleBulkMessageModal = () => {
    setOpenBulkMessageModal(true);
    setSelectedNewImageData(null);
    setImageUrl({});
    setCancelRescheDule(false);
    setPreview(false);
    setBulkSelected([]);
    setErrors({});
    setLoading(false);
    setSelectedImageData(null);
    setOnShowEmoji(false);
    setOnShowChatBotEmojiOpen(false);
    setSelectedImage(null);
    setScheduledData({});
    setSendNewMessage("");
  };
  const handleCloseBulkMessageModal = () => {
    setOpenBulkMessageModal(false);
    setBulkSelected([]);
    setSelectedNewImageData(null);
    setImageUrl({});
    setCancelRescheDule(false);
    setPreview(false);
    setErrors({});
    setLoading(false);
    setSelectedImageData(null);
    setOnShowEmoji(false);
    setSendNewMessage("");
    setOnShowChatBotEmojiOpen(false);
    setSelectedImage(null);
    setScheduledData({});
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
  const handleCloseMessageModal = () => {
    setOpenMessageModal(false);
    setCancelRescheDule(false);
    setSelectedNewImageData(null);
    setSelectedImageData(null);
    setSelected([]);
    setSendNewMessage("");
    setErrors({});
    setLoading(false);
    setSelectedImage(null);
    setImageUrl({});
    setScheduledData({});
    setDateSelected(() => {
      const today = new Date();
      const curtt =
        today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
      return {
        date: new Date().toISOString().substring(0, 10),
        time: today.getHours() + ":" + curtt,
      };
    });
    setOnShowChatBotEmojiOpen(false);
  };

  const handleScheduleModal = () => {
    setShowScheduleModal(true);
    setSendNewMessage("");
    setSelectedImage(false);
    setCancelRescheDule(false);
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
    setOnShowEmoji(false);
    setOnShowChatBotEmojiOpen(false);
    setCancelRescheDule(false);
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
    setOnShowEmoji(false);
    setOnShowChatBotEmojiOpen(false);
    setTemplateMessage("");
    setSearchTemplateValue("");
    setErrors({});
  };
  const handleCloseCreateTemplateModal = () => {
    setShowCreateTemplateModal(false);
    setTemplateTags(null);
    setTemplateName("");
    setTemplateMessage("");
    setSearchTemplateValue("");
    setErrors({});
  };
  const handleManageTemplate = () => {
    getTemplate();
    setShowManageeTemplateModal(true);
    seteditmanageTemplate(false);
    setSearchTemplateValue("");
  };

  const handleNewManageTemplate = () => {
    getTemplate();
    setNewShowManageeTemplateModal(true);
    setSearchTemplateValue("");
    seteditmanageTemplate(false);
  };
  const handleNewCloseManageTemplateModal = () => {
    setNewShowManageeTemplateModal(false);
    setSearchTemplateValue("");
    seteditmanageTemplate(false);
  };
  const handleCloseManageTemplateModal = () => {
    setShowManageeTemplateModal(false);
    seteditmanageTemplate(false);
    setSearchTemplateValue("");
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

  const isBulkValid = () => {
    let formData = true;
    switch (true) {
      case bulkSelected.length == 0:
        setErrors({ bulkSelected: "Please Select a Campaign" });
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
    getContactCompaign();
    getCountMessage();
  }, []);

  const handleClick = async () => {
    if (isTagValid()) {
      let res = await addTagsApi(addTags);
      if (res && res.data && res.data.status === 200) {
        toast.success("Tag Added Successfully");
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

  const getContactCompaign = async () => {
    let res = await getCompaignApi();
    if (res && res.data && res.data.status === 200) {
      let data = res.data.data.map(function (item) {
        return {
          value: item._id,
          label: item.name,
        };
      });

      setCompaigns(data);
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
      setOpenDelTagModal(false);
      toast.success("Tag Deleted Successfully");
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
    let obj = {
      message: sendMessage,
      contactid: selecteduser.contact && selecteduser.contact.contactid,
      selectedImage: imageUrl.url,
      type: imageUrl.url ? "MMS" : schedule ? "Schedule" : "SMS",
      schedule: schedule ? true : false,
    };
    if (scheduledData && scheduledData.date && scheduledData.time) {
      obj.dateSelected = scheduledData.date + " " + scheduledData.time + ":00";
    }
    let todayy = changeTimeZone(new Date(), "America/New_York");

    const estTime = date.format(todayy, "hh:mm A");
    const estTime1 = date.format(todayy, "hh:mm A", true);

    console.log("fhfhfhffhfhfhffhfhfh");
    console.log(selecteduser.contact);
    // if (estTime >= 8 && estTime <= 20) {
    const res = await sendSingleMessageApi(obj);

    if (res && res.data && res.data.status === 200) {
      setSendMessage("");
      scrollToBottom();
      setDateSelected({});
      setSchedule(false);
      setImageUrl({});
      setLoading(false);
      setSelectedImageData(null);
      setCancelRescheDule(false);
      setScheduledData({});
      setShowScheduleModal(false);
    }
    getMessage();
    // } else {
    //   toast.error("Please Send Text between 8am - 9pm");
    //   setLoading(false);
    // }
  };

  const getData = async () => {
    let res = await getContactApi();
    if (res && res.data && res.data.status === 200) {
      let data = res.data.data
        .filter((val) => {
          if (val.phone) {
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
        selectedImage: imageUrl.url,
        type: imageUrl.url ? "MMS" : schedule ? "Schedule" : "SMS",
        schedule: schedule ? true : false,
      };
      if (scheduledData && scheduledData.date && scheduledData.time) {
        obj.dateSelected =
          scheduledData.date + " " + scheduledData.time + ":00";
      }
      //  var today = new Date();
      // let todayy = changeTimeZone(new Date(), "America/New_York");

      // const estTime = date.format(todayy, "hh:mm A");
      // const estTime1 = date.format(todayy, "hh:mm A", true);

      // if (estTime >= 8 && estTime <= 20) {
      let res = await sendMessageApi(obj);
      if (res && res.data && res.data.status === 200) {
        toast.success(" Message sent Successfully");
        setOpenMessageModal(false);
        setSelected([]);
        setSelectedImage(null);
        setScheduledData({});
        setShowScheduleModal(false);
        setSelectedNewImageData(null);
        setDateSelected({});
        setSchedule(false);
        setImageUrl({});
        setCancelRescheDule(false);
        setSendNewMessage("");
        setLoading(false);
      }
      getMessage();
      // } else {
      //   toast.error("Please Send Text between 8am - 9pm");
      //   setLoading(false);
      // }
    }
  };

  const handleSendBulkClick = async () => {
    if (isBulkValid()) {
      setLoading(true);
      let compaignId = bulkSelected.value;
      console.log(compaignId, "compaignid");
      const obj = {
        compaignId: compaignId,
        message: sendNewMessage,
        selectedImage: imageUrl.url,
        type: imageUrl.url ? "MMS" : schedule ? "Schedule" : "SMS",
        schedule: schedule ? true : false,
      };
      if (scheduledData && scheduledData.date && scheduledData.time) {
        obj.dateSelected =
          scheduledData.date + " " + scheduledData.time + ":00";
      }
      let todayy = new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
      });
      // if (today >= 8 && today <= 20) {
      let res = await sendBulkMessageApi(obj);
      if (res && res.data && res.data.status === 200) {
        toast.success(" Message sent Successfully");
        setOpenMessageModal(false);
        setOpenBulkMessageModal(false);
        setSelected([]);
        setSelectedImage(null);
        setScheduledData({});
        setBulkSelected([]);
        setShowScheduleModal(false);
        setSelectedNewImageData(null);
        setDateSelected({});
        setSchedule(false);
        setImageUrl({});
        setCancelRescheDule(false);
        setSendNewMessage("");
        setLoading(false);
        getMessage();
      }
    }

    // } else {
    //   toast.error("Please Send Text between 8am - 9pm");
    //   setLoading(false);
    // }
  };

  const handleSelectChange = (values) => {
    setSelected(values);
    setErrors({});
    setLoading(false);
  };

  const handleBulkSelectChange = (values) => {
    setBulkSelected(values);
  };

  const getMessage = async (check = true, tagsCheck = false) => {
    const res = await getUserWithMessage();

    if (
      res &&
      res.data &&
      res.data.status === 200 &&
      res.data.data.length != 0
    ) {
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
    setSelectedImageData(null);
    setImageUrl({});
    setSelectedImage(false);
    setSendMessage("");
    //reset counter
    if (selecteduser.count > 0) {
      await resetBulkMessageApi(selecteduser._id);
      const res = await getUserWithMessage();
      if (
        res &&
        res.data &&
        res.data.status === 200 &&
        res.data.data.length != 0
      ) {
        setMessages(res.data.data);
      }
    }
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

  const handleConDataEdit = async (e, selectedCampaign) => {
    e.preventDefault();
    let editData = {
      firstName: editContact.firstName,
      lastName: editContact.lastName,
      phoneSubs: editContact.phoneSubs,
      emailSubs: editContact.emailSubs,
    };
    if (selectedCampaign) {
      editData.compaign = selectedCampaign;
    }
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
      toast.success(
        `${type == "opted-in" ? "Opted In" : "Opted Out"} Successfully`
      );
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
    setSendNewMessage(x + sendNewMessage);
    setShowManageeTemplateModal(false);
  };

  const handleSingleTempInsert = () => {
    let x = replacefunc(templateDataState.message);
    setSendMessage(x + sendMessage);
    setNewShowManageeTemplateModal(false);
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
  };

  const onChatBotEmojiClick = (event, emojiObject) => {
    setSendMessage((prevInput) => prevInput + emojiObject.emoji);
  };

  const savelistToMessageClick = (e) => {
    let data = e.target.getAttribute("data-name");
    setSendNewMessage(sendNewMessage + data);
  };

  const handleImageOpen = () => {
    setSelectedImage(true);
    setOnShowEmoji(false);
    setOnShowChatBotEmojiOpen(false);
  };

  const handleNewImageOpen = () => {
    if (selectedImageData == null) {
      setSelectedNewImage(true);
    }
  };

  const singleimgref = useRef();
  const imgref = useRef();

  const handleImageCancel = () => {
    singleimgref.current.value = "";
    setSelectedImage(false);
    setSelectedImageData(null);
    setImageUrl({});
  };

  const handleNewImageCancel = () => {
    imgref.current.value = null;
    setSelectedNewImage(false);
    setSelectedNewImageData(null);
    setImageUrl({});
  };

  const handleNewImageChange = async (event) => {
    let img = event.target.files[0];
    if (img != null) {
      setSelectedNewImageData(URL.createObjectURL(img));

      const formData = new FormData();
      formData.append("ckImage", event.target.files[0]);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/email/ckImageUpload`,
        formData
      );
      if (res && res.data && res.data.status) {
        setImageUrl(res.data);
      }
    }
  };

  const handleImageChange = async (event) => {
    if (event.target.files[0] !== null) {
      let img = event.target.files[0];
      setSelectedImageData(URL.createObjectURL(img));

      const formData = new FormData();
      formData.append("ckImage", event.target.files[0]);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/email/ckImageUpload`,
        formData
      );
      if (res && res.data && res.data.status) {
        setImageUrl(res.data);
      }
    }
  };

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
    let val = item && item.dateString.split(" ");
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
      const res = await reScheduleMessageApi(data);
      if (res && res.data && res.data.status === 200) {
        toast.success(res.data.message);
        getMessage();
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
    const res = await deleteReScheduleMessageApi(reScheduleItem.message_id);
    if (res && res.data && res.data.status === 200) {
      toast.success(res.data.message);
      getMessage();
      setShowReScheduleModal(false);
    }
  };

  const handleReSchaduleData = (item) => {
    setShowReScheduleTitleModal(true);
    setReScheduleTitle(item);
  };

  const handleDeleteRechaduletitle = async () => {
    setCancelRescheDule(false);
    setScheduledData({});
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
  const getCountMessage = async () => {
    let res = await countMessageApi();
    if (res && res.data && res.status == 200) {
      // console.log("qq", res.data);
      let totel_data = Number(res?.data?.deliver) + Number(res?.data?.failed);
      var del = ((Number(res?.data?.deliver) / totel_data) * 100).toFixed(0);
      var fail = ((Number(res?.data?.failed) / totel_data) * 100).toFixed(0);

      let data_value = {
        deliver: del,
        failed: fail,
      };
      setCountData(data_value);
    }
  };

  return (
    <Layout>
      <div className="content-page-layout text-page-content">
        {/* <div className="page-header justify-flex-end">
        <button
          type="button"
          className="btn btn-medium btn-primary"
          onClick={handleNewMessage}
        >
          New Message
        </button>
      </div> */}
        <div className="page-header justify-flex-end">
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="btn btn-medium btn-primary-dashboard"
            >
              New Message
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#" onClick={handleNewMessage}>
                Individual Message
              </Dropdown.Item>

              <Dropdown.Item href="#" onClick={handleNewMessage}>
                Recover Password
              </Dropdown.Item>

              <Dropdown.Item href="#" onClick={handleBulkMessageModal}>
                Bulk Campaign Message
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
            showManageeTemplateModal={showNewManageeTemplateModal}
            handleCloseManageTemplateModal={handleNewCloseManageTemplateModal}
            handleScheduleModal={handleScheduleModal}
            handleCreateTemplate={handleCreateTemplate}
            handleManageTemplate={handleNewManageTemplate}
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
            handleScheduleSubmit={handleScheduleSubmit}
            showReScheduleModal={showReScheduleModal}
            handleCloseReSchedultModal={handleCloseReSchedultModal}
            reScheduleData={reScheduleData}
            handleReSchedule={handleReSchedule}
            handleReSchaduleChange={handleReSchaduleChange}
            handleReSubmit={handleReSubmit}
            handleCancelReSchedultModal={handleCancelReSchedultModal}
            cancelRescheDule={cancelRescheDule}
            searchTemplateValue={searchTemplateValue}
            handleSearchTempChange={(e) =>
              setSearchTemplateValue(e.target.value)
            }
            handleNoReSchedultModal={handleNoReSchedultModal}
            handleDeleteReSchedultModal={handleDeleteReSchedultModal}
            scheduledData={scheduledData}
            handleReSchaduleData={handleReSchaduleData}
            openMessageModal={openMessageModal}
            handleDeleteRechaduletitle={handleDeleteRechaduletitle}
            CancelEmoji={CancelEmoji}
            selectedImageData={selectedImageData}
            singleimgref={singleimgref}
            showReScheduleTitleModal={showReScheduleTitleModal}
            handleCloseReSchedulTitle={handleCloseReSchedulTitle}
            reScheduleTitle={reScheduleTitle}
            handleReSchaduleTChange={handleReSchaduleTChange}
            handleDeleteRechaduletitleM={handleDeleteRechaduletitleM}
            handleReTitleSubmit={handleReTitleSubmit}
            countData={countData}
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
          searchTemplateValue={searchTemplateValue}
          handleSearchTempChange={(e) => setSearchTemplateValue(e.target.value)}
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
          selecteduser={selecteduser}
          handleImageOpen={handleNewImageOpen}
          selectedImage={selectedNewImage}
          handleNewImageCancel={handleNewImageCancel}
          handleImageChange={handleNewImageChange}
          handleScheduleSubmit={handleScheduleSubmit}
          scheduledData={scheduledData}
          handleReSchaduleData={handleReSchaduleData}
          CancelEmoji={CancelEmoji}
          selectedNewImageData={selectedNewImageData}
          imgref={imgref}
        />
        <BulkMessageModal
          open={openBulkMessageModal}
          handleCloseMessageModal={handleCloseBulkMessageModal}
          options={compaign}
          handleSendBulkClick={handleSendBulkClick}
          sendNewMessage={sendNewMessage}
          handleNewMChange={handleNewMChange}
          handleBulkSelectChange={handleBulkSelectChange}
          selected={bulkSelected}
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
          searchTemplateValue={searchTemplateValue}
          handleSearchTempChange={(e) => setSearchTemplateValue(e.target.value)}
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
          selecteduser={selecteduser}
          handleImageOpen={handleNewImageOpen}
          selectedImage={selectedNewImage}
          handleNewImageCancel={handleNewImageCancel}
          handleImageChange={handleNewImageChange}
          handleScheduleSubmit={handleScheduleSubmit}
          scheduledData={scheduledData}
          handleReSchaduleData={handleReSchaduleData}
          CancelEmoji={CancelEmoji}
          selectedNewImageData={selectedNewImageData}
          imgref={imgref}
        />
      </div>
    </Layout>
  );
};

export default TextPage;
