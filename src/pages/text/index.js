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
      console.log('newArrayStatefilterTag.length',filterTag)
      if(filterTag && filterTag.length > 0 ){
      const resData1 = res.data.data.filter(value =>  filterTag.filter(item => item._id == value._id).length==0);
      if(resData1.length == res.data.data.length){
        console.log(resData1,'resData1newArrayState',resData1.length == res.data.data.length);

        setConversationTags([]);
      }
      else{
        console.log(resData1,'resData1newArrayState133');
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
    console.log(newArrayState,'1222')
    setConversationTags(newArrayState);
    const obj = {
      tags: item._id,
      contactId: selecteduser.contact && selecteduser.contact._id,
    };
    const res = await addTagsToListApi(obj);
    if (res && res.data && res.data.status === 200) {
      getMessage(false,true);
    }
  };

  const handleSelectDel = async(item) => {
    let conversationdata = conversationTags;
    let data = [...selectedTags];
    data.splice(data.indexOf(item), 1);
    setSelectedTags(data);
    console.log(conversationdata,'hello');
    conversationdata.push(item);
    console.log(conversationdata,'hello1');
    setConversationTags(conversationdata);
    const obj = {
      tags: item._id,
      contactId: selecteduser.contact && selecteduser.contact._id,
    };
    const res = await removeTagsToListApi(obj);
    if (res && res.data && res.data.status === 200) {
      getMessage(false,true);
    }
  };

  const onHandleChange = (e) => {
    setSendMessage(e.target.value);
  };
  const onHandleClick = async () => {
    const obj = {
      message: sendMessage,
      contactid: selecteduser.contact && selecteduser.contact.contactid,
    };
    const res = await sendSingleMessageApi(obj);

    if (res && res.data && res.data.status === 200) {
      setSendMessage("");
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
      }
      else{
        console.log(res.data.data,'selecteduser',selecteduser)
       const objTag = res.data.data.find((item => item.contact._id == selecteduser._id))
       console.log('selecteduser111111',objTag)
       getTags(objTag.contact.tags)

        
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
      console.log(selecteduser);
      setSelecteduser(selecteduser);
      setSelectedTags(selecteduser.contact.tags)
      console.log(selecteduser.contact.tags.length,'length',tags)
      if(selecteduser.contact.tags && selecteduser.contact.tags.length > 0 ){
        
        const resData1 = tags.filter(value =>  selecteduser.contact.tags.filter(item => item._id == value._id).length==0);

            if(resData1.length == tags.length){
              setConversationTags([]);
            }
            else{
              setConversationTags(resData1);
            }
      }
      else{
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
    console.log(editContact, "editContact");
    // const res = await updateContactApi(editContact._id, editContact);
    // if (res && res.data && res.data.status === 200) {
    setOpenContactModal(false);
    //   getData();
    // }
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
          contactName={selecteduser}
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
