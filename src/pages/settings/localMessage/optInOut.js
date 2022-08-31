import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  sendOptInOutRequest,
  getOptInOutRequest,
} from "../../../api/setting-Api/textOptSetting";
import { MdChevronRight } from "react-icons/md";
import Layout from "../../../components/layout";

const OPTInOut = () => {
  const [optkeyWordSetting, setOptkeyWordSetting] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setOptkeyWordSetting({
      ...optkeyWordSetting,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const data = {
      optInKeywords: optkeyWordSetting.optInKeywords,
      optoutKeywords: optkeyWordSetting.optoutKeywords,
      optInConfirmMessage: optkeyWordSetting.optInConfirmMessage,
      optOutConfirmMessage: optkeyWordSetting.optOutConfirmMessage,
    };
    let res = await sendOptInOutRequest(data);
    if (res && res.data && res.data.status === 200) {
      toast.success(res.data.message);
      getDataApi();
    }
  };
  const handleCancel = () => {
    navigate("/settings/text");
  };

  useEffect(() => {
    getDataApi();
  }, []);

  const getDataApi = async () => {
    const res = await getOptInOutRequest();
    if (res && res.data && res.data.status === 200) {
      setOptkeyWordSetting({
        optInKeywords: res.data.result.optInKeywords,
        optoutKeywords: res.data.result.optoutKeywords,
        optInConfirmMessage: res.data.result.optInConfirmMessage,
        optOutConfirmMessage: res.data.result.optOutConfirmMessage,
      });
    }
  };

  return (
    <Layout>
      <div className="content-page-layout">
        <div className="page-header subheading-bar">
          <div className="header-text">
            <h1>Settings</h1>
            <p>
              {<Link to={"/settings"}>Settings</Link>}
              <MdChevronRight />
              {<Link to={"/settings/text"}>Text</Link>}
              <MdChevronRight />
              Opt-In-Out
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
                    name="optInKeywords"
                    value={optkeyWordSetting.optInKeywords}
                    onChange={handleChange}
                  />
                </div>
                <div className="field-group flex2">
                  <label>Opt-Out Keywords</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter last name"
                    name="optoutKeywords"
                    value={optkeyWordSetting.optoutKeywords}
                    onChange={handleChange}
                  />
                </div>
                <div className="field-group flexFull">
                  <label>Opt-In Confirmation Message</label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="You have successfully been resubscribed to messages from this number. Reply HELP for help. Reply STOP to unsubscribe. Msg Data Rates May Apply"
                    name="optInConfirmMessage"
                    value={optkeyWordSetting.optInConfirmMessage}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="field-group flexFull">
                  <label>Opt-Out Confirmation Message</label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="You have successfully been unsubscribed. You will not receive any more messages from this number. Reply START to resubscribe"
                    name="optOutConfirmMessage"
                    value={optkeyWordSetting.optOutConfirmMessage}
                    onChange={handleChange}
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
    </Layout>
  );
};

export default OPTInOut;
