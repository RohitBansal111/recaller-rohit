import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import { GrView } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { MdDeleteOutline, MdOutlineReport, MdApartment } from "react-icons/md";
import Addcompaign from "./addCompaign";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
const Campaignlist = (props) => {
  const [showAddCompaign, setshowAddCompaign] = useState(false);
  const handleCompaignShow = () => {
    setshowAddCompaign(true);
  };
  const handleCompaignClose = () => {
    setshowAddCompaign(false);
  };

  return (
    <div className="recaller-list">
      <div className="add-campaign-btn mb-2">
        <h1>Campaign</h1>{" "}
        <Button onClick={handleCompaignShow}>Add Campaign </Button>
      </div>
      <ul className="card-listingtabs">
        <li>
          <div className="card-tav-content">
            <p> Welcome to your Recallr Activity Feed </p>
            <div className="more-action">
              <span className="edit" data-tip="Edit">
                <BiEdit />
                <ReactTooltip />
              </span>
              <span className="view" data-tip="view">
                <GrView />
                <ReactTooltip />
              </span>
              <span className="report" data-tip="Report">
                <TbReportAnalytics />
                <ReactTooltip />
              </span>
              <span className="delete" data-tip="Delete">
                <RiDeleteBinLine />
                <ReactTooltip />
              </span>
            </div>
          </div>
        </li>
        <li>
          <div className="card-tav-content">
            <p>Recallr </p>
            <div className="more-action">
              <span className="edit" data-tip="Edit">
                <BiEdit />
                <ReactTooltip />
              </span>
              <span className="view" data-tip="view">
                <GrView />
                <ReactTooltip />
              </span>
              <span className="report" data-tip="Report">
                <TbReportAnalytics />
                <ReactTooltip />
              </span>
              <span className="delete" data-tip="Delete">
                <RiDeleteBinLine />
                <ReactTooltip />
              </span>
            </div>
          </div>
        </li>
        <li>
          <div className="card-tav-content">
            <p> Test </p>
            <div className="more-action">
              <span className="edit" data-tip="Edit">
                <BiEdit />
                <ReactTooltip />
              </span>
              <span className="view" data-tip="view">
                <GrView />
                <ReactTooltip />
              </span>
              <span className="report" data-tip="Report">
                <TbReportAnalytics />
                <ReactTooltip />
              </span>
              <span className="delete" data-tip="Delete">
                <RiDeleteBinLine />
                <ReactTooltip />
              </span>
            </div>
          </div>
        </li>
        <li>
          <div className="card-tav-content">
            <p> Honey Butter</p>
            <div className="more-action">
              <span className="edit" data-tip="Edit">
                <BiEdit />
                <ReactTooltip />
              </span>
              <span className="view" data-tip="view">
                <GrView />
                <ReactTooltip />
              </span>
              <span className="report" data-tip="Report">
                <TbReportAnalytics />
                <ReactTooltip />
              </span>
              <span className="delete" data-tip="Delete">
                <RiDeleteBinLine />
                <ReactTooltip />
              </span>
            </div>
          </div>
        </li>
        <li>
          <div className="card-tav-content">
            <p> Toyaota </p>
            <div className="more-action">
              <span className="edit" data-tip="Edit">
                <BiEdit />
                <ReactTooltip />
              </span>
              <span className="view" data-tip="view">
                <GrView />
                <ReactTooltip />
              </span>
              <span className="report" data-tip="Report">
                <TbReportAnalytics />
                <ReactTooltip />
              </span>
              <span className="delete" data-tip="Delete">
                <RiDeleteBinLine />
                <ReactTooltip />
              </span>
            </div>
          </div>
        </li>
      </ul>
      <Addcompaign
        showAddCompaign={showAddCompaign}
        handleCompaignClose={handleCompaignClose}
        handleCompaignShow={handleCompaignShow}
      />
    </div>
  );
};

export default Campaignlist;
