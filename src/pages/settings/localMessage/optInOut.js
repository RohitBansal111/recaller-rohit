import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const OPTInOut = () => {
  const [optkeyWordSetting, setOptkeyWordSetting] = useState({});
  const navigate = useNavigate();
  const handleOptkeyWordChnage = (e) => {
    setOptkeyWordSetting({
      ...optkeyWordSetting,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(optkeyWordSetting, "optkeyWordSetting");
  };

  const handleCancel = () => {
    navigate("/settings/text");
  };

  return (
    <div className="content-page-layout">
      <div className="page-header subheading-bar">
        <div className="header-text">
          <h1>Settings</h1>
          <p>
            {<Link to={"/settings"}>Settings</Link>} /
            {<Link to={"/settings/text"}>Text</Link>} / Opt-In-Out
          </p>
        </div>
      </div>
      <div className="setting-page-main">
        <div className="content-center-box">
          <div className="account-form">
            <form className="main-form">
              <div className="field-group flex2">
                <label>Opt-In Keywords</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter first name"
                  defaultValue={"help"}
                  name="optIn"
                  value={optkeyWordSetting.optIn}
                  onChange={handleOptkeyWordChnage}
                />
              </div>
              <div className="field-group flex2">
                <label>Opt-Out Keywords</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter last name"
                  defaultValue={"stop"}
                  name="optOut"
                  value={optkeyWordSetting.optOut}
                  onChange={handleOptkeyWordChnage}
                />
              </div>
              <div className="field-group flexFull">
                <label>Opt-In Confirmation Message</label>
                <textarea
                  type="text"
                  className="form-control"
                  defaultValue={"hlo"}
                  placeholder="You have successfully been resubscribed to messages from this number. Reply HELP for help. Reply STOP to unsubscribe. Msg Data Rates May Apply"
                  name="optInConfirmation"
                  value={optkeyWordSetting.optInConfirmation}
                  onChange={handleOptkeyWordChnage}
                ></textarea>
              </div>
              <div className="field-group flexFull">
                <label>Opt-Out Confirmation Message</label>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="You have successfully been unsubscribed. You will not receive any more messages from this number. Reply START to resubscribe"
                  defaultValue={"hlo"}
                  name="optOutConfirmation"
                  value={optkeyWordSetting.optOutConfirmation}
                  onChange={handleOptkeyWordChnage}
                ></textarea>
              </div>
              <div className="field-group btn-groups flexFull">
                <button
                  type="button"
                  className="btn btn-cancel"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OPTInOut;
