import React, { useState, useEffect } from "react";
import OnlineReviewIcon from "./../../assets/svg/icon-placeholder-online-reviews.svg";
import AnalyticsIcon from "./../../assets/svg/icon-placeholder-analytics.svg";
import PerformanceIcon from "./../../assets/svg/icon-placeholder-performance.svg";
import { useNavigate, useParams } from "react-router-dom";
import { BsFillRecordCircleFill } from "react-icons/bs";
import Layout from "../../components/layout";
import { Badge } from "react-bootstrap";
import Dasboardcmlist from "../../components/home/listCompaign";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import SelectCampaign from "../../componsetCheckedents/contacts/selectCampaign";
import Addcompaign from "../../components/home/addCompaign";
import { useDispatch, useSelector } from "react-redux";
import VoiceIcon from "../../assets/svg-icons/voiceIcon";
import TextIcon from "../../assets/svg-icons/textIcon";
import EmailIcon from "../../assets/svg-icons/emailIcon";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AdjustIcon from "@mui/icons-material/Adjust";
import {
  addCompaignApi,
  getCompaignApi,
  updateCompaignApi,
  deleteCompaignApi,
  contactCompaignApi,
} from "../../api/compaign";
import { GetSubscriptionData } from "../../api/plans";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import MMS from "../../../src/assets/icons/MMS-Icon.svg";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
// import ViewCompaign from "../../components/viewCompaign/ViewCompaign";
import Currentgraph from "../../components/Dashboard/Currentgraph";
import Lastgraph from "../../components/Dashboard/Lastgraph";
import Yeargraph from "../../components/Dashboard/yeargraph";
import moment from "moment";
const Dashboard = (props) => {
  const toastId = React.useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const [showAddCompaign, setshowAddCompaign] = useState(false);
  const [editCompaign, seteditCompaign] = useState(false);
  const [viewCompaign, setViewCompaign] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({});
  const [camData, setCamData] = useState({});
  const [edit, setEdit] = useState("");
  const [compaigns, setCompaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState({});
  const [checked, setChecked] = useState(false);
  const [view, setView] = useState();
  const [subData, setSubData] = useState({});
  const [allData, setAllData] = useState({});
  const userDataa = useSelector((state) => state.Login.userData);

  useEffect(() => {
    getContactCompaign();
  }, [props.show]);

  useEffect(() => {}, [selectedCampaign]);
  useEffect(() => {
    //  viewContactCompaign();
  }, [props.show]);

  const getContactCompaign = async () => {
    let res = await getCompaignApi();
    if (res && res.data && res.data.status === 200) {
      let data = res.data.data.map(function (item) {
        return {
          value: item._id,
          toggle: item.toggle == false ? false : true,
          label: item.name,
        };
      });
      setCompaigns(data);
    }
  };
  const viewContactCompaign = async (item) => {
    let res = await contactCompaignApi(item.value);
    if (res && res.data && res.data.status === 200) {
      let compaignId = res.data.data._id;
      setView(compaignId);
      // setshowAddCompaign(true);
      setViewCompaign(true);
      navigate(`/ViewCompaign/${item.value}`);
    }
  };
  const handleCompaignShow = () => {
    setshowAddCompaign(true);
    seteditCompaign(false);
    setEdit("");
    setData({});

    // setCamData(false);
  };

  const handleCompaignClose = () => {
    setshowAddCompaign(false);
    setErrors("");
  };
  const handleChange = (e) => {
    if (e.target.name == "toggle")
      setData({
        ...data,
        [e.target.name]: e.target.value == "true" ? false : true,
      });
    else {
      setData({ ...data, [e.target.name]: e.target.value });
      setErrors({});
    }
  };
  const handleEditClick = (data) => {
    // setCamData(data.label);
    setData({ ...data, name: data.label, toggle: data.toggle });
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
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.success("Campaign Added");
        }

        handleCompaignClose(false);
        getContactCompaign();
      } else {
        toast.error(res.data.message);
      }
      setData("");
      setErrors("");
    }
  };
  const handleEdit = async () => {
    const res = await updateCompaignApi(edit.value, data);
    if (res && res.data && res.data.status === 200) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Campaign updated successfully");
      }

      {
        // toast.success("Campaign updated successfully");
      }
      handleCompaignClose(false);
      getContactCompaign();
    } else {
      toast.error(res.data.message);
    }
    setCamData("");
  };

  const handleDelete = async (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#27dcbf",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteCompaignApi(data.value, data);
        if (res && res.data && res.data.status === 200) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          // toast.error("Delete Compaign");
          // handleCompaignClose(false);
          getContactCompaign();
        } else {
          toast.error(res.data.message);
        }
      }
    });

    // setCamData("");
  };

  // const handleView = async () => {
  //   navigate("/contacts");
  // };

  const voicepercentage = 72;
  const voicelatestpercentage = 15;

  const textpercentage = 6;
  const handleSubData = async () => {
    let res = await GetSubscriptionData();
    if (res && res.data && res.status == 200) {
      setAllData(res.data.graph);
      setSubData(res?.data?.data);
    }
  };

  useEffect(() => {
    handleSubData();
  }, []);

  return (
    <Layout>
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>
            Welcome To Your Recallr Dashboard{" "}
            <span> {userDataa ? userDataa.companyName : ""} </span>
          </h1>
        </div>
        <div className="dahboard-performace-card-box">
          <div className="performance-card">
            <div className="performance-header">
              <div className="card-media">
                <img src="/cloud-icon.svg" alt="cloud icon" />

                <h2 className="ml-1">Download Report</h2>
              </div>
              <div className="db-report-details">
                <ul className="nav nav-tabs" id="nav-tab" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="nav-current-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-current"
                      type="button"
                      role="tab"
                      aria-controls="nav-current"
                      aria-selected="true"
                    >
                      Current
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="nav-last-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-last"
                      type="button"
                      role="tab"
                      aria-controls="nav-last"
                      aria-selected="true"
                    >
                      Last
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="nav-year-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-year"
                      type="button"
                      role="tab"
                      aria-controls="nav-year"
                      aria-selected="true"
                    >
                      Year
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="nav-current"
                role="tabpanel"
                aria-labelledby="nav-current-tab"
              >
                <div className="performance-body text-value">
                  <div className="performance-value-box">
                    <div className="performance-value">
                      {/* <span className="circle">
                        <BsFillRecordCircleFill />
                      </span> */}
                      <span className="price-value">
                        <span className="month43">
                          {moment().format("MMMM")}
                        </span>
                        {Number(subData?.sms_cridit_used) +
                          Number(subData?.voice_cridit_used) +
                          Number(subData?.mms_cridit_used) || 0}
                        /
                        {Number(subData?.mms_cridit) +
                          Number(subData?.sms_cridit) +
                          Number(subData?.voice_cridit) +
                          Number(subData?.mms_topup_val) +
                          Number(subData?.sms_topup_val) +
                          Number(subData?.voice_topup_val) || 0}
                      </span>
                      <span className="text2">Credits Deployed</span>
                    </div>
                  </div>
                  <div className="value-graph">
                    <Currentgraph />
                  </div>
                  <div className="top-performance-field">
                    <h2>Credit Balance</h2>
                    <div className="per-field">
                      <div className="comp-pfield">
                        <ul>
                          <li>
                            <div className="pfield-content-wrapper">
                              <div className="pfield-progressbar">
                                <div className="progress-circle-wrapper">
                                  <TextIcon />
                                </div>
                                <div className="pfield-content-left">
                                  <div className="pfield-heading">
                                    <h4>Text</h4>
                                    <span>Credits Deployed</span>
                                  </div>
                                </div>
                              </div>
                              <div className="pfield-content-right">
                                <span>
                                  <small></small>
                                  {subData?.sms_cridit_used || 0}
                                  <span className="active-performance profit">
                                    <KeyboardArrowDownIcon />
                                  </span>
                                </span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="pfield-content-wrapper">
                              <div className="pfield-progressbar">
                                <div className="progress-circle-wrapper">
                                  <VoiceIcon />
                                </div>
                                <div className="pfield-content-left">
                                  <div className="pfield-heading">
                                    <h4>Voice</h4>
                                    <span>Credits Deployed</span>
                                  </div>
                                </div>
                              </div>
                              <div className="pfield-content-right">
                                <span>
                                  <small></small>{" "}
                                  {subData?.voice_cridit_used || 0}
                                  <span className="active-performance loss">
                                    <KeyboardArrowDownIcon />
                                  </span>
                                </span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="pfield-content-wrapper">
                              <div className="pfield-progressbar">
                                <div className="progress-circle-wrapper">
                                  <img src={MMS} style={{ width: "80%" }} />
                                </div>
                                <div className="pfield-content-left">
                                  <div className="pfield-heading">
                                    <h4>MMS</h4>
                                    <span>Credits Deployed</span>
                                  </div>
                                </div>
                              </div>
                              <div className="pfield-content-right">
                                <span className="d-flex align-items-center">
                                  <small></small>{" "}
                                  {subData?.mms_cridit_used || 0}
                                  <span className="active-performance zero">
                                    <i className="fa-solid fa-circle-dot"></i>
                                  </span>
                                </span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="nav-last"
                role="tabpanel"
                aria-labelledby="nav-last-tab"
              >
                <div className="performance-body text-value">
                  <div className="performance-value-box">
                    <div className="performance-value">
                      {/* <span className="circle">
                        <BsFillRecordCircleFill />
                      </span> */}
                      <span className="price-value">
                        <span className="month43">
                          {allData?.last_month?.month || ""}{" "}
                        </span>{" "}
                        {allData?.last_month?.cridit_used || 0}/{" "}
                        {allData?.last_month?.cridit_totel || 0}
                      </span>
                      <span className="text2">Credits Deployed</span>
                    </div>
                  </div>
                  <div className="last-value-graph">
                    <Lastgraph />
                  </div>

                  <div className="top-performance-field">
                    <h2>Last Month Highlights</h2>
                    <div className="per-field">
                      <div className="comp-pfield">
                        <ul>
                          <li>
                            <div className="pfield-content-wrapper">
                              <div className="pfield-progressbar">
                                <div className="progress-circle-wrapper">
                                  <TextIcon />
                                </div>
                                <div className="pfield-content-left">
                                  <div className="pfield-heading">
                                    <h4>Text</h4>
                                    <span>Credits Deployed</span>
                                  </div>
                                </div>
                              </div>
                              <div className="pfield-content-right">
                                <span>
                                  <small></small>{" "}
                                  {subData?.sms_cridit_used || 0}
                                  <span className="active-performance profit">
                                    <KeyboardArrowDownIcon />
                                  </span>
                                </span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="pfield-content-wrapper">
                              <div className="pfield-progressbar">
                                <div className="progress-circle-wrapper">
                                  <VoiceIcon />
                                </div>
                                <div className="pfield-content-left">
                                  <div className="pfield-heading">
                                    <h4>Voice</h4>
                                    <span>Credits Deployed</span>
                                  </div>
                                </div>
                              </div>
                              <div className="pfield-content-right">
                                <span>
                                  <small></small>{" "}
                                  {subData?.voice_cridit_used || 0}
                                  <span className="active-performance loss">
                                    <KeyboardArrowDownIcon />
                                  </span>
                                </span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="pfield-content-wrapper">
                              <div className="pfield-progressbar">
                                <div className="progress-circle-wrapper">
                                  <EmailIcon />
                                </div>
                                <div className="pfield-content-left">
                                  <div className="pfield-heading">
                                    <h4>MMS</h4>
                                    <span>Credits Deployed</span>
                                  </div>
                                </div>
                              </div>
                              <div className="pfield-content-right">
                                <span className="d-flex align-items-center">
                                  <small></small> {subData?.mms_cridit_used || 0}
                                  <span className="active-performance zero">
                                    <i className="fa-solid fa-circle-dot"></i>
                                  </span>
                                </span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="nav-year"
                role="tabpanel"
                aria-labelledby="nav-year-tab"
              >
                <div className="performance-body text-value">
                  <div className="performance-value-box">
                    <div className="performance-value">
                      {/* <span className="circle">
                      <BsFillRecordCircleFill />
                    </span> */}
                      <span className="price-value">
                        <span className="month43">
                          {allData?.year?.year || ""}{" "}
                        </span>{" "}
                        {allData?.year?.cridit_used || 0}/{" "}
                        {allData?.year?.cridit_totel || 0}
                      </span>
                      <span className="text2">Credits Deployed</span>
                    </div>
                  </div>
                  <div className="value-graph">
                    <Yeargraph />
                  </div>

                  <div className="top-performance-field">
                    <h2>Last Month Highlights</h2>
                    <div className="per-field">
                      <div className="comp-pfield">
                        <ul>
                          <li>
                            <div className="pfield-content-wrapper">
                              <div className="pfield-progressbar">
                                <div className="progress-circle-wrapper">
                                  <TextIcon />
                                </div>
                                <div className="pfield-content-left">
                                  <div className="pfield-heading">
                                    <h4>Text</h4>
                                    <span>Credits Deployed</span>
                                  </div>
                                </div>
                              </div>
                              <div className="pfield-content-right">
                                <span>
                                  <small></small>{" "}
                                  {subData?.sms_cridit_used || 0}
                                  <span className="active-performance profit">
                                    <KeyboardArrowDownIcon />
                                  </span>
                                </span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="pfield-content-wrapper">
                              <div className="pfield-progressbar">
                                <div className="progress-circle-wrapper">
                                  <VoiceIcon />
                                </div>
                                <div className="pfield-content-left">
                                  <div className="pfield-heading">
                                    <h4>Voice</h4>
                                    <span>Credits Deployed</span>
                                  </div>
                                </div>
                              </div>
                              <div className="pfield-content-right">
                                <span>
                                  <small></small>{" "}
                                  {subData?.voice_cridit_used || 0}
                                  <span className="active-performance loss">
                                    <KeyboardArrowDownIcon />
                                  </span>
                                </span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="pfield-content-wrapper">
                              <div className="pfield-progressbar">
                                <div className="progress-circle-wrapper">
                                  <EmailIcon />
                                </div>
                                <div className="pfield-content-left">
                                  <div className="pfield-heading">
                                    <h4>MMS</h4>
                                    <span>Credits Deployed</span>
                                  </div>
                                </div>
                              </div>
                              <div className="pfield-content-right">
                                <span className="d-flex align-items-center">
                                  <small></small> {subData?.mms_cridit_used || 0}
                                  <span className="active-performance zero">
                                    <i className="fa-solid fa-circle-dot"></i>
                                  </span>
                                </span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-multi-tabs">
          <Addcompaign
            editCompaign={editCompaign}
            showAddCompaign={showAddCompaign}
            viewCompaign={viewCompaign}
            handleCompaignClose={handleCompaignClose}
            handleCompaignShow={handleCompaignShow}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            data={data}
            errors={errors}
            camData={camData}
            handleEdit={handleEdit}
            checked={checked}
            // handleView={handleView}
          />
          <Dasboardcmlist
            compaigns={compaigns}
            handleCompaignShow={handleCompaignShow}
            handleEditClick={handleEditClick}
            handleDelete={handleDelete}
            viewContactCompaign={viewContactCompaign}
          />
          {/* <ViewCompaign editCompaign={editCompaign} /> */}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
