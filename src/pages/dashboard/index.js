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

      // seteditCompaign(true);
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
      name: "Page A",
      uv: 1500,
    },
    {
      name: "Page C",
      uv: 1400,
    },
    {
      name: "Page B",
      uv: 3000,
    },
    {
      name: "Page C",
      uv: 2400,
    },
    {
      name: "Page D",
      uv: 1800,
    },
    {
      name: "Page E",
      uv: 1100,
    },
    {
      name: "Page F",
      uv: 1100,
    },
    {
      name: "Page G",
      uv: 1900,
    },
    {
      name: "Page G",
      uv: 1600,
    },
    {
      name: "Page G",
      uv: 1700,
    },
    {
      name: "Page G",
      uv: 1100,
    },
    {
      name: "Page G",
      uv: 1900,
    },
    {
      name: "Page G",
      uv: 2100,
    },
    {
      name: "Page G",
      uv: 1500,
    },
    {
      name: "Page G",
      uv: 1800,
    },
    {
      name: "Page G",
      uv: 1100,
    },
    {
      name: "Page G",
      uv: 1400,
    },
    {
      name: "Page G",
      uv: 1100,
    },
    {
      name: "Page G",
      uv: 1500,
    },
  ];
  const voicepercentage = 72;
  const voicelatestpercentage = 15;

  const textpercentage = 6;

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
                <img src={AnalyticsIcon} alt="Analytics" />
                <h2>Email, Text, Voice</h2>
              </div>
              {/* <div className="voice-select">
                <select>
                  <option>select Campaign</option>
                  {compaigns.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div> */}
            </div>
            <div className="performance-body text-value">
              <div className="performance-value-box">
                <div className="performance-value">
                  {/* <span className="circle">
                    <BsFillRecordCircleFill />
                  </span> */}
                  <span className="price-value"><span className="month43">Aug.</span> 984</span>
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
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="15%"
                          stopColor="#f7b924"
                          stopOpacity={0.7}
                        />
                        <stop
                          offset="100%"
                          stopColor="#f7b924"
                          stopOpacity={0.2}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      strokeWidth={4}
                      dataKey="uv"
                      stroke="#f7b924"
                      fillOpacity={1}
                      fill="url(#colorUv)"
                    />
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
                                <span>Credit Deployed</span>
                              </div>
                            </div>
                          </div>
                          <div className="pfield-content-right">
                            <span>152 </span>
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
                                <span>Credit Deployed</span>
                              </div>
                            </div>
                          </div>
                          <div className="pfield-content-right">
                            <span>252</span>
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
                                <span>Credit Deployed</span>
                              </div>
                            </div>
                          </div>
                          <div className="pfield-content-right">
                            <span>252</span>
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
