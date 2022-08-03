import React, { useState, useEffect } from "react";
import OnlineReviewIcon from "./../../assets/svg/icon-placeholder-online-reviews.svg";
import AnalyticsIcon from "./../../assets/svg/icon-placeholder-analytics.svg";
import PerformanceIcon from "./../../assets/svg/icon-placeholder-performance.svg";
import { Link } from "react-router-dom";
import { BsFillRecordCircleFill } from "react-icons/bs";
import Layout from "../../components/layout";
import { Badge } from "react-bootstrap";
import Dasboardcmlist from "../../components/home/listCompaign";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SelectCampaign from "../../components/contacts/selectCampaign";
import { getCompaignApi } from "../../api/compaign";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = (props) => {
  const [compaigns, setCompaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState({});
  useEffect(() => {
    getContactCompaign();
  }, [props.show]);

  useEffect(() => {}, [selectedCampaign]);

  const getContactCompaign = async () => {
    let res = await getCompaignApi();
    if (res && res.data && res.data.status === 200) {
      let data = res.data.data.map(function (item) {
        return {
          value: item._id,
          label: item.name,
        };
      });
      setCompaigns(data);
    }
  };

  const data = [
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
            Welcome To Your Recallr Dashboard <span> {"Company Name"} </span>
          </h1>
        </div>
        <div className="dahboard-performace-card-box">
          <div className="performance-card">
            <div className="performance-header">
              <div className="card-media">
                <img src={OnlineReviewIcon} alt="Online Reviews" />
                <h2>Voice</h2>
              </div>
              <div className="voice-select">
                <SelectCampaign
                  onChange={setSelectedCampaign}
                  options={compaigns}
                  // defaultValue={{ label: "Select compaigns", compaigns: 0 }}
                  // placeholder="Select Side"
                  value={selectedCampaign}
                />
              </div>
            </div>
            <div className="performance-body voice-value">
              <div className="performance-value-box">
                <h2>Credit Usage</h2>
                <div className="performance-value">
                  <span className="circle">
                    <BsFillRecordCircleFill />
                  </span>
                  <span className="price-value">984</span>
                </div>
              </div>
              <div className="value-graph">
                <ResponsiveContainer width={"99.9%"} height={150}>
                  <AreaChart
                    width={310}
                    height={120}
                    data={data}
                    margin={{
                      top: 5,
                      right: 0,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <defs>
                      <linearGradient
                        id="colorvoice"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="15%"
                          stopColor="#3ac47d"
                          stopOpacity={0.7}
                        />
                        <stop
                          offset="100%"
                          stopColor="#3ac47d"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      strokeWidth={4}
                      dataKey="uv"
                      stroke="#3ac47d"
                      fillOpacity={1}
                      fill="url(#colorvoice)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="top-performance-field">
                <h2>Recent campaigns performance</h2>
                <div className="per-field">
                  <div className="comp-pfield">
                    <ul>
                      <li>
                        <div className="pfield-content-wrapper">
                          <div className="pfield-progressbar">
                            <div className="progress-circle-wrapper">
                              <CircularProgressbar
                                value={voicepercentage}
                                text={`${voicepercentage}%`}
                                styles={{
                                  path: {
                                    stroke: "#1b00ff",
                                    textcolor: "cadetblue",
                                  },
                                  text: {
                                    fill: "cadetblue",
                                    fontSize: "25px",
                                    fontWeight: "500",
                                  },
                                }}
                              />
                            </div>

                            <div className="pfield-content-left">
                              <div className="pfield-heading">Delivered</div>
                              <div className="pfield-subheading">
                                <Badge bg="secondary">$152</Badge>
                              </div>
                            </div>
                          </div>
                          <div className="pfield-content-right">
                            <span>752</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="pfield-content-wrapper">
                          <div className="pfield-progressbar">
                            <div className="progress-circle-wrapper">
                              <CircularProgressbar
                                value={voicelatestpercentage}
                                text={`${voicelatestpercentage}%`}
                                styles={{
                                  path: {
                                    stroke: "#d92550",
                                  },
                                  text: {
                                    fill: "cadetblue",
                                    fontSize: "25px",
                                    fontWeight: "500",
                                  },
                                }}
                              />
                            </div>

                            <div className="pfield-content-left">
                              <div className="pfield-heading">failed</div>
                              <div className="pfield-subheading">
                                <Badge bg="secondary">$132</Badge>
                              </div>
                            </div>
                          </div>
                          <div className="pfield-content-right">
                            <span>552</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="performance-card">
            <div className="performance-header">
              <div className="card-media">
                <img src={AnalyticsIcon} alt="Analytics" />
                <h2>text</h2>
              </div>
              <div className="voice-select">
                <select>
                  <option>select Campaign</option>
                  <option value="2">2</option>
                </select>
              </div>
            </div>
            <div className="performance-body text-value">
              <div className="performance-value-box">
                <h2>Credit Usage</h2>
                <div className="performance-value">
                  <span className="circle">
                    <BsFillRecordCircleFill />
                  </span>
                  <span className="price-value">984</span>
                </div>
              </div>
              <div className="value-graph">
                <ResponsiveContainer width={"99.9%"} height={150}>
                  <AreaChart
                    width={310}
                    height={150}
                    data={data}
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
                <h2>Recent campaigns performance</h2>
                <div className="per-field">
                  <div className="comp-pfield">
                    <ul>
                      <li>
                        <div className="pfield-content-wrapper">
                          <div className="pfield-progressbar">
                            <div className="progress-circle-wrapper">
                              <CircularProgressbar
                                value={voicepercentage}
                                text={`${voicepercentage}%`}
                                styles={{
                                  path: {
                                    stroke: "#1b00ff",
                                  },
                                  text: {
                                    fill: "cadetblue",
                                    fontSize: "25px",
                                    fontWeight: "500",
                                  },
                                }}
                              />
                            </div>

                            <div className="pfield-content-left">
                              <div className="pfield-heading">Delivered</div>
                              <div className="pfield-subheading">
                                <Badge bg="secondary">$102</Badge>
                              </div>
                            </div>
                          </div>
                          <div className="pfield-content-right">
                            <span>152</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="pfield-content-wrapper">
                          <div className="pfield-progressbar">
                            <div className="progress-circle-wrapper">
                              <CircularProgressbar
                                value={voicelatestpercentage}
                                text={`${voicelatestpercentage}%`}
                                styles={{
                                  path: {
                                    stroke: "#d92550",
                                  },
                                  text: {
                                    fill: "cadetblue",
                                    fontSize: "25px",
                                    fontWeight: "500",
                                  },
                                }}
                              />
                            </div>

                            <div className="pfield-content-left">
                              <div className="pfield-heading">failed</div>
                              <div className="pfield-subheading">
                                <Badge bg="secondary">$132</Badge>
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

          <div className="performance-card">
            <div className="performance-header">
              <div className="card-media">
                <img src={PerformanceIcon} alt="Performance" />
                <h2>Email</h2>
              </div>
              <div className="voice-select">
                <select>
                  <option>select Campaign</option>
                  <option value="2">2</option>
                </select>
              </div>
            </div>
            <div className="performance-body Email-value">
              <div className="performance-value-box">
                <h2>Credit Usage</h2>
                <div className="performance-value">
                  <span className="circle">
                    <BsFillRecordCircleFill />
                  </span>
                  <span className="price-value">984</span>
                </div>
              </div>
              <div className="value-graph">
                <ResponsiveContainer width={"99.9%"} height={150}>
                  <AreaChart
                    width={310}
                    height={150}
                    data={data}
                    margin={{
                      top: 5,
                      right: 0,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <defs>
                      <linearGradient
                        id="colorEmail"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="15%"
                          stopColor="#655beb"
                          stopOpacity={0.7}
                        />
                        <stop
                          offset="100%"
                          stopColor="#655beb"
                          stopOpacity={0.2}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      strokeWidth={4}
                      dataKey="uv"
                      stroke="#655beb"
                      fillOpacity={1}
                      fill="url(#colorEmail)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="top-performance-field">
                <h2>Recent campaigns performance</h2>
                <div className="per-field">
                  <div className="comp-pfield">
                    <ul>
                      <li>
                        <div className="pfield-content-wrapper">
                          <div className="pfield-progressbar">
                            <div className="progress-circle-wrapper">
                              <CircularProgressbar
                                value={voicepercentage}
                                text={`${voicepercentage}%`}
                                styles={{
                                  path: {
                                    stroke: "#1b00ff",
                                    textcolor: "cadetblue",
                                  },
                                  text: {
                                    fill: "cadetblue",
                                    fontSize: "25px",
                                    fontWeight: "500",
                                  },
                                }}
                              />
                            </div>

                            <div className="pfield-content-left">
                              <div className="pfield-heading">Delivered</div>
                              <div className="pfield-subheading">
                                <Badge bg="secondary">$152</Badge>
                              </div>
                            </div>
                          </div>
                          <div className="pfield-content-right">
                            <span>752</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="pfield-content-wrapper">
                          <div className="pfield-progressbar">
                            <div className="progress-circle-wrapper">
                              <CircularProgressbar
                                value={voicelatestpercentage}
                                text={`${voicelatestpercentage}%`}
                                styles={{
                                  path: {
                                    stroke: "#d92550",
                                  },
                                  text: {
                                    fill: "cadetblue",
                                    fontSize: "25px",
                                    fontWeight: "500",
                                  },
                                }}
                              />
                            </div>

                            <div className="pfield-content-left">
                              <div className="pfield-heading">failed</div>
                              <div className="pfield-subheading">
                                <Badge bg="secondary">$132</Badge>
                              </div>
                            </div>
                          </div>
                          <div className="pfield-content-right">
                            <span>552</span>
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
          <Dasboardcmlist compaigns={compaigns} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
