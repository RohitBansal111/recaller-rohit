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
import { toast } from "react-toastify";
import Swal from "sweetalert2";

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

const Dashboard = (props) => {
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

  const userDataa = useSelector((state) => state.Login.userData);

  useEffect(() => {
    getContactCompaign();
  }, [props.show]);

  useEffect(() => {}, [selectedCampaign]);
  useEffect(() => {
    viewContactCompaign();
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
    // console.log("togglessss", res.label);
  };
  const viewContactCompaign = async (item) => {
    console.log(item, "kkkkkkkkkkkkk");
    let res = await contactCompaignApi(item.value);
    if (res && res.data && res.data.status === 200) {
      console.log(res.data.data, "res.data.data");
      let compaignId = res.data.data._id;
      setView(compaignId);
      // setshowAddCompaign(true);
      setViewCompaign(true);
      navigate(`/ViewCompaign/${item.value}`);

    }
    console.log("view contactCompaign", res);
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
  };
  const handleChange = (e) => {
    console.log("data::::", { ...data, [e.target.name]: e.target.value });
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
    console.log(data.label, "data");
    console.log(data.toggle, "togglehandle click");

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
    console.log(edit.label, "label");
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
  const dataGraph = [
    {

      name: "Jan",
      uv: 1500,
    },
    {
      name: "Feb",
      uv: 1400,
    },
    {
      name: "Mar",
      uv: 3000,
    },
    {
      name: "Apr",
      uv: 2400,
    },
    {
      name: "May",
      uv: 1800,
    },
    {
      name: "Jun",
      uv: 1100,
    },
    {
      name: "Jul",

      uv: 1100,
    },
    {
      name: "Aug",
      uv: 1600,
    },
    {
      name: "Sep",
      uv: 1700,
    },
    {
      name: "Oct",
      uv: 1100,
    },
    {
      name: "Nov",
      uv: 1900,
    },
    {
      name: "Dec",
      uv: 2100,
    }

  ];
  const voicepercentage = 72;
  const voicelatestpercentage = 15;

  const textpercentage = 6;

  return (
    <Layout>
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>
            {console.log(userDataa)}
            Welcome To Your Recallr Dashboard{" "}
            <span> {userDataa ? userDataa.companyName : ""} </span>
          </h1>
          {console.log(userDataa.companyName, "companyName")}
        </div>
        <div className="dahboard-performace-card-box">
          <div className="performance-card">
            <div className="performance-header">
              <div className="card-media">


                <img src="/cloud-icon.svg" />

                <h2 className="ml-1">Download Report</h2>
              </div>
              <div className="db-report-details">
                <ul class="nav nav-tabs" id="nav-tab" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link active" id="nav-current-tab" data-bs-toggle="tab" data-bs-target="#nav-current" type="button" role="tab" aria-controls="nav-current" aria-selected="true">
                      Current
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                       class="nav-link" id="nav-last-tab" data-bs-toggle="tab" data-bs-target="#nav-last" type="button" role="tab" aria-controls="nav-last" aria-selected="true">

                      Last
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="tab-content" id="nav-tabContent">
              <div class="tab-pane fade show active" id="nav-current" role="tabpanel" aria-labelledby="nav-current-tab">

                <div className="performance-body text-value">
                  <div className="performance-value-box">
                    <div className="performance-value">
                      {/* <span className="circle">
                        <BsFillRecordCircleFill />
                      </span> */}
                      <span className="price-value">

                        <span className="month43">Aug.</span> 984/1000


                      </span>
                      <span className="text2">Credits Deployed</span>
                    </div>
                  </div>
                  <div className="value-graph">
                    <ResponsiveContainer width={"99.9%"} height={150}>
                      <AreaChart
                        width={310}
                        height={150}
                        data={dataGraph}
                        margin={{
                          top: 5,
                          right: 0,
                          left: 0,
                          bottom: 5,
                        }}
                      >

                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="uv" stroke="#f7b924" fill="#f7b924 " />
                    </AreaChart>

                    </ResponsiveContainer>
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

                                  <small></small> 152


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


                                  <small></small> 252


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
                                    <h4>Email</h4>
                                    <span>Credits Deployed</span>
                                  </div>
                                </div>
                              </div>
                              <div className="pfield-content-right">
                                <span className="d-flex align-items-center">


                                  <small></small> 252

                                  <span className="active-performance zero">
                                    <i class="fa-solid fa-circle-dot"></i>

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

              <div class="tab-pane fade" id="nav-last" role="tabpanel" aria-labelledby="nav-last-tab">
              <div className="performance-body text-value">

                  <div className="performance-value-box">
                    <div className="performance-value">
                      {/* <span className="circle">
                        <BsFillRecordCircleFill />
                      </span> */}
                      <span className="price-value">


                        <span className="month43">July. </span> 59/1000


                      </span>
                      <span className="text2">Credits Deployed</span>
                    </div>
                  </div>
                  <div className="value-graph">

                    <ResponsiveContainer width={"99.9%"} height={150} >


                      <AreaChart
                        width={310}
                        height={150}
                        data={dataGraph}
                        margin={{
                          top: 5,
                          right: 0,
                          left: 0,
                          bottom: 5,
                        }}
                      >

                         <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="uv" stroke="#da624a" fill="#da624a " />
                    </AreaChart>


                    </ResponsiveContainer>
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

                                  <small></small> 152

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

                                  <small></small> 25

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
                                    <h4>Email</h4>
                                    <span>Credits Deployed</span>
                                  </div>
                                </div>
                              </div>
                              <div className="pfield-content-right">
                                <span className="d-flex align-items-center">


                                  <small></small> 252
                                  <span className="active-performance zero">
                                    <i class="fa-solid fa-circle-dot"></i>

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
