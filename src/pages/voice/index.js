import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  addTagsApi,
  deleteTagApi,
  getTagsApi,
  updateTagsApi,
} from "../../api/tag";
import VoiceChatBoot from "../../components/voice/voiceChatBoot";
import VoiceModal from "../../models/VoiceModal";
import { useReactMediaRecorder } from "react-media-recorder";
import {
  addTagsToListApi,
  getContactApi,
  removeTagsToListApi,
  updateContactApi,
} from "../../api/contact";
import {
  getUploadVoiceMessageApi,
  getUserWithVoiceMessage,
  uploadSingleVoiceMessageApi,
  uploadVoiceMessageApi,
} from "../../api/voiceMessage";
import { Dropdown } from "react-bootstrap";
import VoiceUploadModal from "../../models/uploadVoiceModal";

const Voice = () => {
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
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);
  const [rowsData, setRowsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isNewVoiceActive, setIsNewVoiceActive] = useState(false);
  const [voiceMessage, setVoiceMessages] = useState([]);
  const [selecteduser, setSelecteduser] = useState("");
  const [voiceChatData, setVoiceChatData] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [editContact, setEditContact] = useState({});
  const [openContactModal, setOpenContactModal] = useState(false);
  const [editContactName, setEditContactName] = useState(false);
  const [editCName, setEditCName] = useState({});
  const [searchState, setSearchState] = useState("");
  const [isShowLoading, setIsShowLoading] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [audioFileName, setAudioFileName] = useState(null);
  const [blobState, setBlobState] = useState(null);
  const [playing, setPlaying] = useState(false);

  const divRef = useRef(null);

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

  const isSelectValid = () => {
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
  const handleNewMessage = () => {
    setOpenMessageModal(true);
    setErrors({});
    setIsNewVoiceActive(false);
    stopTimer();
    setSelected([]);
    setLoading(false);
  };
  const handleCloseMessageModal = () => {
    setOpenMessageModal(false);
    setErrors({});
    stopTimer();
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
    getData();
    getVoiceMessage();
  }, []);

  const handleClick = async () => {
    if (isValid()) {
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
      getVoiceMessage(false, true);
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
      getVoiceMessage(false, true);
    }
  };

  const handleSelectChange = (values) => {
    setSelected(values);
    setErrors({});
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
  }, [voiceChatData]);

  useEffect(() => {
    let intervalId;

    if (isActive || isNewVoiceActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);
        let computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        let computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);

        setCounter((counter) => counter + 1);
      }, 650);
    }

    return () => clearInterval(intervalId);
  }, [isActive, isNewVoiceActive, counter]);

  function stopTimer() {
    setIsNewVoiceActive(false);
    setIsActive(false);
    setCounter(0);
    setSecond("00");
    setMinute("00");
  }

  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    {
      video: false,
      audio: true,
      echoCancellation: true,
    }
  );

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

  const handleSendClick = async () => {
    if (isSelectValid()) {
      console.log(mediaBlobUrl, "mediaBlobUrl");
      await fetch(mediaBlobUrl)
        .then((res) => res.blob())
        .then(async (myBlob) => {
          console.log(myBlob, "mediaBlobUrl111111");
          var file = new File([myBlob], "name.wav");
          console.log(file, "mediaBlobUrl2222");
          var formData = new FormData();
          let contactid = selected.map((item) => item.value);
          formData.append("voice", file);
          formData.append("contactid", JSON.stringify(contactid));
          setIsShowLoading(true);
          setLoading(true);
          let res = await uploadVoiceMessageApi(formData);
          if (res && res.data && res.data.status === 200) {
            toast.success("Voice Message sent Successfully");
            stopTimer();
            setOpenMessageModal(false);
            setSelected([]);
            setLoading(false);
            setIsNewVoiceActive(false);
            setIsActive(false);
            setIsShowLoading(false);
          }
          getVoiceMessage();
        });
    }
  };

  const handleSendSingleContactVoice = async () => {
    if (true) {
      setLoading(true);
      stopRecording();
      console.log(mediaBlobUrl, "mediaBlobUrl");
      await fetch(mediaBlobUrl)
        .then((res) => res.blob())
        .then(async (myBlob) => {
          var file = new File([myBlob], "name.m4a");
          console.log(file, "mediaBlobUrl2222");
          console.log(myBlob, "mediaBlobUrl111111");
          var formData = new FormData();
          let contactid = selecteduser.contact.contactid;
          formData.append("voice", file);
          formData.append("contactid", contactid);
          setLoading(true);
          let res = await uploadSingleVoiceMessageApi(formData);
          if (res && res.data && res.data.status === 200) {
            toast.success("Voice Message sent Successfully");
            setSelected([]);
            stopTimer();
            scrollToBottom();
            setLoading(false);
            setIsNewVoiceActive(false);
            setIsActive(false);
          } else {
            toast.error(res.data.message);
          }
          getVoiceMessage();
        });
    }
  };

  const getVoiceMessage = async (check = true, tagsCheck = false) => {
    const res = await getUserWithVoiceMessage();
    if (
      res &&
      res.data &&
      res.data.status === 200 &&
      res.data.data.length != 0
    ) {
      setVoiceMessages(res.data.data);
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
    const res = await getUploadVoiceMessageApi(id);
    if (res && res.data && res.data.status === 200) {
      setVoiceChatData(res.data.data);
    }
    if (check) {
      const selecteduser = voiceMessage.find((c) => c._id == id);
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

  const handleConDataEdit = async () => {
    const editData = {
      firstName: editContact.firstName,
      lastName: editContact.lastName,
      phoneSubs: editContact.phoneSubs,
      emailSubs: editContact.emailSubs,
    };
    const res = await updateContactApi(editContact._id, editData);
    if (res && res.data && res.data.status === 200) {
      setOpenContactModal(false);
      getVoiceMessage(false, true);
      selecteduser.contact.firstName = editContact.firstName;
      selecteduser.contact.lastName = editContact.lastName;
      selecteduser.contact.phoneSubs = editContact.phoneSubs;
      selecteduser.contact.emailSubs = editContact.emailSubs;

      setSelecteduser(selecteduser);
    }
    getData();
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

  const handleUserNameEdit = (e) => {
    setEditCName({ ...editCName, [e.target.name]: e.target.value });
  };

  const handleOptOut = async (type) => {
    const editData = {
      firstName: selecteduser.contact.firstName,
      lastName: selecteduser.contact.lastName,
      voiceSubs: type,
      phoneSubs: selecteduser.contact.phoneSubs,
      emailSubs: selecteduser.contact.emailSubs,
    };
    const res = await updateContactApi(selecteduser._id, editData);
    if (res && res.data && res.data.status === 200) {
      toast.success(
        `${type == "opted-in" ? "Opted In" : "Opted Out"} Successfully`
      );
      getVoiceMessage(false, true);
      selecteduser.contact.voiceSubs = type;
      setSelecteduser(selecteduser);
    }
    getData();
  };

  const handleOpenUploadModal = () => {
    setUploadOpen(true);
    setFileName(null);
    setSelected([]);
    setErrors({});
    setLoading(false);
  };

  const handleCloseUploadModal = () => {
    setUploadOpen(false);
    setFileName(null);
    setSelected([]);
    setErrors({});
    setLoading(false);
  };

  const onVoiceUploadChange = (e) => {
    if (e.target.files[0]) {
      if (e.target.files[0].type == "audio/mpeg" || "audio/wav") {
        setFileName(e.target.files[0]);
      } else {
        toast.error("Sorry, thats not a valid Audio file");
        setFileName(null);
        setLoading(false);
      }
    }
  };

  const onVoiveUpload = async () => {
    if (isSelectValid()) {
      var formData = new FormData();
      let contactid = selected.map((item) => item.value);
      formData.append("voice", fileName);
      formData.append("contactid", JSON.stringify(contactid));
      // setIsShowLoading(true);
      setLoading(true);
      let res = await uploadVoiceMessageApi(formData);
      if (res && res.data && res.data.status === 200) {
        toast.success("Voice Message sent Successfully");
        setUploadOpen(false);
        getVoiceMessage();
        setErrors({});
      }
    }
  };

  const onSingleVoiceUploadChange = (e) => {
    if (e.target.files[0]) {
      if (e.target.files[0].type == "audio/mpeg" || "audio/wav") {
        setAudioFileName(e.target.files[0]);
      } else {
        toast.error("Sorry, thats not a valid Audio file");
        setAudioFileName(null);
      }
    }
  };

  const handleSingleVoiceUpload = async () => {
    var formData = new FormData();
    let contactid = selecteduser.contact.contactid;
    formData.append("voice", audioFileName);
    formData.append("contactid", contactid);
    setLoading(true);
    let res = await uploadSingleVoiceMessageApi(formData);
    if (res && res.data && res.data.status === 200) {
      toast.success("Voice Message sent Successfully");
      scrollToBottom();
      setLoading(false);
      setAudioFileName(null);
    } else {
      toast.error(res.data.message);
    }
    getVoiceMessage();
  };

  const clearUploadData = () => {
    setAudioFileName(null);
  };

  const handleLoadMetadata = (meta) => {
    const { duration } = meta.target;
  };

  const clearUploading = () => {
    setFileName(null);
  };

  const handlePlay = () => {
    // setBlobState(mediaBlobUrl);
    if (second > 0) {
      setPlaying(true);
      // stopRecording()
      const tmp = new Audio(mediaBlobUrl);
      console.log(tmp, "tmp");
      tmp.play();
    }
  };

  return (
    <div className="content-page-layout text-page-content">
      <div className="page-header justify-flex-end">
        <Dropdown>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            className="btn btn-medium btn-primary"
          >
            New Voice
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#" onClick={handleOpenUploadModal}>
              Upload File
            </Dropdown.Item>
            <Dropdown.Item href="#" onClick={handleNewMessage}>
              Record Voice
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="text-main-section">
        <VoiceChatBoot
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
          searchValue={searchState}
          handleSearchChange={(e) => setSearchState(e.target.value)}
          minute={minute}
          second={second}
          startRecording={startRecording}
          isActive={isActive}
          loading={loading}
          stopRecording={stopRecording}
          setIsActive={setIsActive}
          stopTimer={stopTimer}
          contactVoiceList={voiceMessage}
          voiceChatData={voiceChatData}
          openChatClick={openChatClick}
          selecteduser={selecteduser}
          openContactModal={openContactModal}
          handleConDataEdit={handleConDataEdit}
          handleEditContactChange={handleEditContactChange}
          handleCloseContactModal={handleCloseContactModal}
          handleContactEditModal={handleContactEditModal}
          editContact={editContact}
          editContactName={editContactName}
          editCName={editCName}
          handleEditUserName={handleEditUserName}
          handleUserNameEdit={handleUserNameEdit}
          handleOptOut={handleOptOut}
          divRef={divRef}
          handleSendSingleContactVoice={handleSendSingleContactVoice}
          isShowLoading={isShowLoading}
          onSingleVoiceUploadChange={onSingleVoiceUploadChange}
          audioFileName={audioFileName}
          handleSingleVoiceUpload={handleSingleVoiceUpload}
          clearUploadData={clearUploadData}
          handleLoadMetadata={handleLoadMetadata}
          isNewVoiceActive={isNewVoiceActive}
        />
      </div>
      <VoiceModal
        open={openMessageModal}
        handleCloseMessageModal={handleCloseMessageModal}
        handleSelectChange={handleSelectChange}
        selected={selected}
        options={rowsData}
        handleSendClick={handleSendClick}
        loading={loading}
        minute={minute}
        second={second}
        isNewVoiceActive={isNewVoiceActive}
        setIsNewVoiceActive={setIsNewVoiceActive}
        startRecording={startRecording}
        stopRecording={stopRecording}
        errors={errors}
        stopTimer={stopTimer}
        handlePlay={handlePlay}
        playing={playing}
      />
      <VoiceUploadModal
        uploadOpen={uploadOpen}
        handleCloseUploadModal={handleCloseUploadModal}
        options={rowsData}
        handleSelectChange={handleSelectChange}
        selected={selected}
        onVoiceUploadChange={onVoiceUploadChange}
        onVoiveUpload={onVoiveUpload}
        errors={errors}
        loading={loading}
        fileName={fileName}
        clearUploading={clearUploading}
      />
    </div>
  );
};

export default Voice;
