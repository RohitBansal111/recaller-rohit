import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import BusinessHourModal from "../../../components/settings/businessHourModal";
import { Link } from "react-router-dom";
import {
  getAutoResRequest,
  sendAutoResRequest,
} from "../../../api/setting-Api/autoResPonder";
import { toast } from "react-toastify";

const Autoresponder = () => {
  const [businessHourModal, setBusinessHourModal] = useState(false);
  const [addIncomeDuringSet, setAddIncomeDuringSet] = useState(false);
  const [addWidgetDuringSet, setAddWidgetDuringSet] = useState(false);
  const [addIncomeOutsideSet, setAddIncomeOutsideSet] = useState(false);
  const [addWidgetOutsideSet, setAddWidgetOutsideSet] = useState(false);
  const [businessData, setBusinessData] = useState({});
  const [widgetRes, setwidgetRes] = useState("");
  const [addAutoResponse, setaddAutoResponse] = useState("");
  const [addWidgetAutoRes, setaddWidgetAutoRes] = useState("");
  const [inComingAutoRes, setInComingAutoRes] = useState("");
  const [autoResData, setAutoResData] = useState([]);
  const AddIncomeDuringSMS = () => {
    setAddIncomeDuringSet(true);
  };
  const AddWidgetDuringSMS = () => {
    setAddWidgetDuringSet(true);
  };
  const AddIncomeOutsideSMS = () => {
    setAddIncomeOutsideSet(true);
  };
  const AddWidgetOutsideSMS = () => {
    setAddWidgetOutsideSet(true);
  };
  const addBusinessHourModal = () => {
    setBusinessHourModal(true);
  };
  const handleModalClose = () => {
    setBusinessHourModal(false);
  };
  const handleModalShow = () => {};
  const handleProceed = () => {};

  const handleBusinessChnage = (e) => {
    setBusinessData({ ...businessData, [e.target.name]: e.target.value });
  };

  const handleSaveHours = async () => {
    const obj = {
      businessHours: businessData,
      duringHoursAutoResponse: inComingAutoRes,
      duringHoursWidget: addAutoResponse,
      outsideHoursAutoResponse: widgetRes,
      outsideHoursWidget: addWidgetAutoRes,
    };
    const res = await sendAutoResRequest(obj);
    if (res && res.data && res.data.status === 200) {
      toast.success(res.data.message);
    }
  };

  const handleAutIncomingResChnage = (e) => {
    setInComingAutoRes(e.target.value);
  };
  const handleAutoResponseChnage = (e) => {
    setaddAutoResponse(e.target.value);
  };
  const handleWidgetResChnage = (e) => {
    setwidgetRes(e.target.value);
  };
  const handleaddWidgetResChnage = (e) => {
    setaddWidgetAutoRes(e.target.value);
  };

  const handleIARCancel = () => {
    setAddIncomeDuringSet(false);
  };

  const handleARCancel = () => {
    setAddWidgetDuringSet(false);
  };
  const handleCancelWidget = () => {
    setAddIncomeOutsideSet(false);
  };
  const handleCancelAddWidget = () => {
    setAddWidgetOutsideSet(false);
  };

  const handleSaveClick = async () => {
    const obj = {
      businessHours: businessData,
      duringHoursAutoResponse: inComingAutoRes,
      duringHoursWidget: addAutoResponse,
      outsideHoursAutoResponse: widgetRes,
      outsideHoursWidget: addWidgetAutoRes,
    };
    const res = await sendAutoResRequest(obj);
    if (res && res.data && res.data.status === 200) {
      toast.success(res.data.message);
      getAutoResData();
    }
  };

  useEffect(() => {
    getAutoResData();
  }, []);

  const getAutoResData = async () => {
    const res = await getAutoResRequest();
    if (res && res.data && res.data.status === 200) {
      setAutoResData(res.data.result);
    }
  };

  console.log(autoResData, "autoResData");

  return (
    <div className="content-page-layout">
      <div className="page-header subheading-bar">
        <div className="header-text">
          <h1>Settings</h1>
          <p>
            {<Link to={"/settings"}>Settings</Link>}/{" "}
            {<Link to={"/settings/text"}>Text</Link>}/ Autoresponder
          </p>
        </div>
      </div>
      <div className="setting-message-container">
        <div className="setting-inner-container">
          <div className="add-business-hour">
            <h3>Business Hours</h3>
            {autoResData &&
              autoResData.businessHours &&
              autoResData.businessHours.businesshours}
            <p>
              {autoResData &&
                autoResData.businessHours &&
                autoResData.businessHours.businessTime +
                  "-" +
                  autoResData.businessHours.businesTimeHours}
            </p>
            <div className="addAuto-response-bar">
              <div className="auto-response-list">
                <button
                  type="button"
                  className="btn btn-autoReply"
                  onClick={addBusinessHourModal}
                >
                  {" "}
                  <AddIcon /> Add Business hour{" "}
                </button>
              </div>
            </div>
          </div>
          <div className="auto-reply-business-hour">
            <div className="heading-info">
              <h3>
                Auto-Reply During Business Hours
                <Tooltip title="Configure auto responses for incoming texts, and widget messages during business hours">
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </h3>
            </div>
            <div className="addAuto-response-bar">
              <div className="auto-response-list">
                {!addIncomeDuringSet ? (
                  <button
                    type="button"
                    className="btn btn-autoReply"
                    onClick={AddIncomeDuringSMS}
                  >
                    {" "}
                    <AddIcon /> Add Incoming SMS Auto-Response
                  </button>
                ) : (
                  <div className="autoresponder-input-field">
                    <div className="main-form">
                      <label>Incoming SMS Auto-Response</label>
                      <div className="field-group">
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={
                            "Hey! Thanks for texting Natures Harvest-Apparel. We'll get back to you as soon as we can."
                          }
                          name="inComingAutoRes"
                          value={inComingAutoRes.inComingAutoRes}
                          onChange={handleAutIncomingResChnage}
                        />
                        <button
                          type="buton"
                          className="btn btn-icon"
                          onClick={handleIARCancel}
                        >
                          {" "}
                          <DeleteIcon />{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {!addWidgetDuringSet ? (
                  <button
                    type="button"
                    className="btn btn-autoReply"
                    onClick={AddWidgetDuringSMS}
                  >
                    {" "}
                    <AddIcon /> Add Widget Auto-Response{" "}
                  </button>
                ) : (
                  <div className="autoresponder-input-field">
                    <div className="main-form">
                      <label>Widget Auto-Response</label>
                      <div className="field-group">
                        <input
                          type="text"
                          className="form-control"
                          name="autoResponse"
                          defaultValue={
                            "Hey! Thanks for texting Natures Harvest-Apparel. We'll get back to you as soon as we can."
                          }
                          value={addAutoResponse.autoResponse}
                          onChange={handleAutoResponseChnage}
                        />
                        <button
                          type="buton"
                          className="btn btn-icon"
                          onClick={handleARCancel}
                        >
                          {" "}
                          <DeleteIcon />{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="auto-reply-business-hour">
            <div className="heading-info">
              <h3>
                Auto-Reply Outside Business Hours
                <Tooltip title="Configure auto responses for incoming texts, and widget messages outside business hours">
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </h3>
            </div>
            <div className="addAuto-response-bar">
              <div className="auto-response-list">
                {!addIncomeOutsideSet ? (
                  <button
                    type="button"
                    className="btn btn-autoReply"
                    onClick={AddIncomeOutsideSMS}
                  >
                    {" "}
                    <AddIcon /> Add Incoming SMS Auto-Response
                  </button>
                ) : (
                  <div className="autoresponder-input-field">
                    <div className="main-form">
                      <label>Missed Call Auto-Response</label>
                      <div className="field-group">
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={
                            "Hey! Thanks for texting Natures Harvest-Apparel. We'll get back to you as soon as we can."
                          }
                          name="widgetRes"
                          value={widgetRes.widgetRes}
                          onChange={handleWidgetResChnage}
                        />
                        <button
                          type="buton"
                          className="btn btn-icon"
                          onClick={handleCancelWidget}
                        >
                          {" "}
                          <DeleteIcon />{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {!addWidgetOutsideSet ? (
                  <button
                    type="button"
                    className="btn btn-autoReply"
                    onClick={AddWidgetOutsideSMS}
                  >
                    {" "}
                    <AddIcon /> Add Widget Auto-Response{" "}
                  </button>
                ) : (
                  <div className="autoresponder-input-field">
                    <div className="main-form">
                      <label>Widget Auto-Response</label>
                      <div className="field-group">
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={
                            "Hey! Thanks for texting Natures Harvest-Apparel. We'll get back to you as soon as we can."
                          }
                          name="widgetRes"
                          value={addWidgetAutoRes.widgetRes}
                          onChange={handleaddWidgetResChnage}
                        />
                        <button
                          type="buton"
                          className="btn btn-icon"
                          onClick={handleCancelAddWidget}
                        >
                          {" "}
                          <DeleteIcon />{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button type="button" onClick={handleSaveClick}>
              Save
            </button>
          </div>
        </div>
        <BusinessHourModal
          businessHourModal={businessHourModal}
          handleModalClose={handleModalClose}
          handleModalShow={handleModalShow}
          handleProceed={handleProceed}
          businessData={businessData}
          handleBusinessChnage={handleBusinessChnage}
          handleSaveHours={handleSaveHours}
        />
      </div>
    </div>
  );
};

export default Autoresponder;
