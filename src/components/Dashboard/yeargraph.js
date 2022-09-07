import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const datayearGraph = [
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
  },
];
const Yeargraph = () => {
  return (
    <div>
      <ResponsiveContainer width={"99.9%"} height={250}>
        <AreaChart
          width={310}
          height={250}
          data={datayearGraph}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#82ca9d" stopOpacity={1} />
              <stop offset="90%" stopColor="#82ca9d" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
export default Yeargraph;
