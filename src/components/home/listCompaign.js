import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import { GrView } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { MdDeleteOutline, MdOutlineReport, MdApartment } from "react-icons/md";
import Addcompaign from "./addCompaign";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { toast } from "react-toastify";
import {
  addCompaignApi,
  updateCompaignApi,
  getCompaignApi,
} from "../../api/compaign";
const Campaignlist = (props) => {
  const [showAddCompaign, setshowAddCompaign] = useState(false);
  const [editCompaign, seteditCompaign] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({});
  const [camData, setCamData] = useState({});
  const [edit, setEdit] = useState("");
  const [compaigns, setCompaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState({});
  useEffect(() => {
    getContactCompaign();
  }, []);
  const getContactCompaign = async () => {
    let res = await getCompaignApi();
    if (res && res.data && res.data.status === 200) {
      let data = res.data.data.map(function (item) {
        return {
          value: item.value,
          label: item.name,
        };
      });
      setCompaigns(data);
    }
  };

  const handleCompaignShow = () => {
    setshowAddCompaign(true);
    seteditCompaign(false);
    setEdit("");
    // setCamData(false);
  };

  const handleCompaignClose = () => {
    setshowAddCompaign(false);
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({});
  };
  const handleEditClick = (data) => {
    console.log(data.label, "data");
    // setCamData(data.label);
    setData({ name: data.label });
    setEdit(data);
    setshowAddCompaign(true);
    seteditCompaign(true);
  };
  const iscampaignValid = () => {
    let formData = true;
    switch (true) {
      case !data.name:
        setErrors({ name: "Please Enter a Campaighn" });
        formData = false;
        break;
      default:
        formData = true;
    }
    return formData;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (iscampaignValid()) {
      const res = await addCompaignApi(data);
      if (res && res.data && res.data.status === 200) {
        toast.success("Campaign Addedd");
        handleCompaignClose(false);
        getContactCompaign();
      } else {
        toast.error(res.data.message);
      }
      setData("");
    }
  };
  const handleEdit = async () => {
    const res = await updateCompaignApi(edit.value, data);
    if (res && res.data && res.data.status === 200) {
      toast.success("Edit Compaign");
      handleCompaignClose(false);
      getContactCompaign();
    } else {
      toast.error(res.data.message);
    }
    setCamData("");
  };
  return (
    <div className="recaller-list">
      <div className="add-campaign-btn mb-2">
        <h1>Campaign</h1>{" "}
        <Button onClick={handleCompaignShow}>Add Campaign </Button>
      </div>
      {props.compaigns.map((data, i) => {
        return (
          <>
            <ul className="card-listingtabs">
              <li>
                <div className="card-tav-content">
                  {/* <p> Welcome to your Recallr Activity Feed </p> */}
                  <p>{data.label}</p>
                  <div className="more-action">
                    <span className="edit" data-tip="Edit">
                      <BiEdit onClick={() => handleEditClick(data)}>
                        {/* {console.log(data.value, "dattttttttttttttt")} */}
                        Edit Compaign
                      </BiEdit>
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
          </>
        );
      })}

      <Addcompaign
        editCompaign={editCompaign}
        showAddCompaign={showAddCompaign}
        handleCompaignClose={handleCompaignClose}
        handleCompaignShow={handleCompaignShow}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        data={data}
        errors={errors}
        camData={camData}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default Campaignlist;
