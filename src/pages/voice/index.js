import { useEffect, useState } from "react";
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
  };
  const handleCloseMessageModal = () => {
    setOpenMessageModal(false);
    setErrors({});
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
  }, []);

  const handleClick = async () => {
    if (isValid()) {
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
  };

  useEffect(() => {
    let intervalId;

    if (isActive) {
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
  }, [isActive, counter]);

  function stopTimer() {
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
  console.log("deed", mediaBlobUrl);

  return (
    <div className="content-page-layout text-page-content">
      <div className="page-header justify-flex-end">
        <button
          type="button"
          className="btn btn-medium btn-primary"
          onClick={handleNewMessage}
        >
          New Voice
        </button>
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
          minute={minute}
          second={second}
          startRecording={startRecording}
          isActive={isActive}
          stopRecording={stopRecording}
          setIsActive={setIsActive}
          stopTimer={stopTimer}
        />
      </div>
      <VoiceModal
        open={openMessageModal}
        handleCloseMessageModal={handleCloseMessageModal}
        handleSelectChange={handleSelectChange}
        selected={selected}
      />
    </div>
  );
};

export default Voice;
