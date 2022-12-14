import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { yearGraph } from "../../api/graph";
const datayearGraph = [
  {
    name: "Sep",
    uv: 1000,
  },
  {
    name: "Oct",
    uv: 1500,
  },
  {
    name: "Nov",
    uv: 800,
  },
  {
    name: "Dec",
    uv: 2000,
  },
];
const Yeargraph = () => {
  const [data, setData] = useState([]);
  const handleGetData = async () => {
    let res = await yearGraph();
    if (res && res.data) {
      setData(res?.data?.data);
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);
  return (
    <div>
      <ResponsiveContainer width={"99.9%"} height={250}>
        <AreaChart
          width={310}
          height={250}
          data={data || datayearGraph}
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
          <XAxis padding={{ left: 40, right: 40 }} dataKey="name" />
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
