import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import { GrView } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import ReactTooltip from "react-tooltip";

const Campaignlist = (props) => {
  return (
    <div className="recaller-list">
      <div className="add-campaign-btn mb-2">
        <h1>Campaign</h1>{" "}
        <Button onClick={props.handleCompaignShow}>Add Campaign </Button>
      </div>
      {props.compaigns.map((data, i) => {
        return (
          <>
            <ul className="card-listingtabs">
              <li>
                <div className="card-tav-content">
                  <p>{data.label}</p>
                  <div className="more-action">
                    <span className="edit" data-tip="Edit">
                      <BiEdit onClick={() => props.handleEditClick(data)}>
                        Edit Compaign
                      </BiEdit>
                      <ReactTooltip />
                    </span>
                    <span className="view" data-tip="view">
                      <GrView onClick={() => props.viewContactCompaign(data)} />
                      <ReactTooltip />
                    </span>
                    <span className="report" data-tip="Report">
                      <TbReportAnalytics />
                      <ReactTooltip />
                    </span>
                    <span className="delete" data-tip="Delete">
                      <RiDeleteBinLine
                        onClick={() => props.handleDelete(data)}
                        Delete
                      />
                      <ReactTooltip />
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </>
        );
      })}
    </div>
  );
};

export default Campaignlist;
