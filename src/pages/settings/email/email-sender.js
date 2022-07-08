import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import EmailSenderModal from "../../../models/EmailSenderModal";
import { useState } from "react";
import { MdChevronRight } from "react-icons/md";
import {createEmailSenderApi,getEmailSenderListApi} from '../../../api/emailMessage';

const EmailSender = () => {
  const [show, setShow] = useState(false);
  const [addEmailSender, setaddEmailSender] = useState({});
  const [errors, setErrors] = useState({});
  const isValid = () => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const phoneRegex = /^\d{10}$/;
    const num = /^[0-9]+$/;
    let formData = true;
    switch (true) {
      case !addEmailSender.fromEmail:
        setErrors({ fromEmail: "From Email is required!" });
        formData = false;
        break;
      // case !addEmailSender.fromName:
      //   setErrors({ lastName: "Last Name is required!" });
      //   formData = false;
      //   break;


      default:
        formData = true;
    }
    return formData;
  };

  const handleAddSender = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    if(isValid()){
      const response =  await createEmailSenderApi(addEmailSender)
      console.log("response::::",response)
    }

  };

  const handleChangeEmailSender = (e) => {
    setaddEmailSender({ ...addEmailSender, [e.target.name]: e.target.value });
  };

  return (
    <div className="content-page-layout">
      <div className="page-header subheading-bar">
        <div className="header-text">
          <h1>Settings</h1>
          <p>
            <Link to={"/settings"}>Setting</Link>
            <MdChevronRight />
            <Link to={"/settings/email"}>Email</Link>
            <MdChevronRight />
            Email Sender
          </p>
        </div>
        <div className="header-action">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddSender}
          >
            Add New Sender
          </button>
        </div>
      </div>
      <div className="email-main-section">
        <div className="chatbox-warpper">
          <div className="inner-chatbox-area">
            <div className="chat-user-list">
              <div className="chat-list-filter">
                <form className="main-form">
                  <div className="field-group flexFull searchField">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="search by nickname, domain or sender"
                      name="name"
                    />
                    <div className="search-field">
                      <SearchIcon />
                    </div>
                  </div>
                </form>
                <ul className="user-list-main"></ul>
              </div>
            </div>
            <div className="email-sender-content">
              <h2>Add An Email Sender</h2>
              <p>
                Increase deliverabiltiy & response rates by signing outgoing
                emails with your email address
              </p>
              <h4> It's Simple </h4>
              <ul>
                <li>Click on "Add New Sender" in the top right cornor</li>
                <li>Submit your email information</li>
                <li>
                  Confirm your email address by clicking on a confirmation link
                </li>
              </ul>
              <p>
                Questions ? <Link to="/">Contact us</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <EmailSenderModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        handleSubmit={handleSubmit}
        errors={errors}
        handleChangeEmailSender={handleChangeEmailSender}
        addEmailSender={addEmailSender}
      />
    </div>
  );
};

export default EmailSender;
