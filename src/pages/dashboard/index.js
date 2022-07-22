import React, { useState } from "react";
import ActivityTabs from "../../components/home/tabs";
import OnlineReviewIcon from "./../../assets/svg/icon-placeholder-online-reviews.svg";
import AnalyticsIcon from "./../../assets/svg/icon-placeholder-analytics.svg";
import PerformanceIcon from "./../../assets/svg/icon-placeholder-performance.svg";
import { Link } from "react-router-dom";
import { BsFillRecordCircleFill } from "react-icons/bs";
import Layout from "../../components/layout";
import { Badge } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
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
                <select>
                  <option>select compaigns</option>
                  <option value="2">2</option>
                </select>
              </div>
            </div>
            <div className="performance-body">
              <div className="performance-value-box">
                <h2>Credit Usage</h2>
                <div className="performance-value">
                  <span className="circle">
                    <BsFillRecordCircleFill />
                  </span>
                  <span className="price-value">$984</span>
                  <span className="percentage-value">+14</span>
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
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="15%"
                          stopColor="#f7b924"
                          stopOpacity={0.7}
                        />
                        <stop
                          offset="80%"
                          stopColor="#ffe3a2"
                          stopOpacity={0.5}
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
                              <div className="pfield-heading">Recaller</div>
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
                              <div className="pfield-heading">test</div>
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
                <option>select compaigns</option>
                <option value="2">2</option>
              </select>
            </div>
          </div>
          <div className="performance-body">
            <div className="performance-value-box">
              <h2>Credit Usage</h2>
              <div className="performance-value">
                <span className="circle">
                  <BsFillRecordCircleFill />
                </span>
                <span className="price-value">$984</span>
                <span className="percentage-value failed">+6%</span>
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
                        offset="80%"
                        stopColor="#f7b924"
                        stopOpacity={0.5}
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
                              value={textpercentage}
                              text={`${textpercentage}%`}
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
                            <div className="pfield-heading">Recaller</div>
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
                            <div className="pfield-heading">test</div>
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
              <option>select compaigns</option>
              <option value="2">2</option>
            </select>
          </div>
        </div>
        <div className="performance-body">
          <div className="performance-value-box">
            <h2>Credit Usage</h2>
            <div className="performance-value">
              <span className="circle">
                <BsFillRecordCircleFill />
              </span>
              <span className="price-value">$984</span>
              <span className="percentage-value">+14</span>
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
                      offset="80%"
                      stopColor="#f7b924"
                      stopOpacity={0.5}
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
                          <div className="pfield-heading">Recaller</div>
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
                          <div className="pfield-heading">test</div>
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
          <ActivityTabs />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
