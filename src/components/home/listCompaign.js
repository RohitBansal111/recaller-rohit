import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import { GrView } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import ReactTooltip from "react-tooltip";
import Tooltip from "@mui/material/Tooltip";

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
                    <Tooltip
                      title="Edit"
                      placement="top"
                      componentsProps={{
                        tooltip: {
                          sx: {
                            color: "white",
                            backgroundColor: "black",
                            fontSize: "18px",
                            padding: "15px",
                          },
                        },
                      }}
                      arrow
                    >
                      <span className="edit">
                        <BiEdit onClick={() => props.handleEditClick(data)}>
                          Edit Compaign
                        </BiEdit>
                      </span>
                    </Tooltip>

                    <Tooltip
                      title="View"
                      placement="top"
                      componentsProps={{
                        tooltip: {
                          sx: {
                            color: "white",
                            backgroundColor: "black",
                            fontSize: "18px",
                            padding: "15px",
                          },
                        },
                      }}
                      arrow
                    >
                      <span className="view">
                        <BiEdit onClick={() => props.viewContactCompaign(data)}>
                          View Compaign
                        </BiEdit>
                      </span>
                    </Tooltip>

                    <Tooltip
                      title="Report"
                      placement="top"
                      componentsProps={{
                        tooltip: {
                          sx: {
                            color: "white",
                            backgroundColor: "black",
                            fontSize: "18px",
                            padding: "15px",
                          },
                        },
                      }}
                      arrow
                    >
                      <span className="report">
                        <TbReportAnalytics />
                      </span>
                    </Tooltip>

                    <Tooltip
                      title="Delete"
                      placement="top"
                      componentsProps={{
                        tooltip: {
                          sx: {
                            color: "white",
                            backgroundColor: "black",
                            fontSize: "18px",
                            padding: "15px",
                          },
                        },
                      }}
                      arrow
                    >
                      <span className="delete">
                        <BiEdit onClick={() => props.handleDelete(data)}>
                          Delete Compaign
                        </BiEdit>
                      </span>
                    </Tooltip>
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
