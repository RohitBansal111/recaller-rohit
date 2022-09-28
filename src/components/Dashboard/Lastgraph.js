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
const datalastGraph = [
  {
    name: "1 Aug",
    uv: 1500,
  },
  {
    name: "2 Aug",
    uv: 1400,
  },
  {
    name: "3 Aug",
    uv: 2400,
  },
  {
    name: "4 Aug",
    uv: 1800,
  },
  {
    name: "5 Aug",
    uv: 1100,
  },
  {
    name: "6 Aug",
    uv: 1800,
  },
  {
    name: "7 Aug",
    uv: 1100,
  },
  {
    name: "8 Aug",
    uv: 1600,
  },
  {
    name: "9 Aug",
    uv: 1900,
  },
  {
    name: "10 Aug",
    uv: 1400,
  },
  {
    name: "11 Aug",
    uv: 2200,
  },
  {
    name: "12 Aug",
    uv: 1600,
  },
  {
    name: "13 Aug",
    uv: 1900,
  },
  {
    name: "14 Aug",
    uv: 1300,
  },
  {
    name: "15 Aug",
    uv: 1000,
  },
  {
    name: "16 Aug",
    uv: 1400,
  },
  {
    name: "17 Aug",
    uv: 1700,
  },
  {
    name: "18 Aug",
    uv: 1100,
  },
  {
    name: "19 Aug",
    uv: 1500,
  },
  {
    name: "20 Aug",
    uv: 1600,
  },
  {
    name: "21 Aug",
    uv: 1100,
  },
  {
    name: "22 Aug",
    uv: 2300,
  },
  {
    name: "23 Aug",
    uv: 2000,
  },
  {
    name: "24 Aug",
    uv: 1700,
  },
  {
    name: "25 Aug",
    uv: 1300,
  },
  {
    name: "26 Aug",
    uv: 1600,
  },
  {
    name: "27 Aug",
    uv: 1800,
  },
  {
    name: "28 Aug",
    uv: 2200,
  },
  {
    name: "29 Aug",
    uv: 1200,
  },
  {
    name: "30 Aug",
    uv: 1800,
  },
  {
    name: "31 Aug",
    uv: 2300,
  },
];
const Lastgraph = () => {
  return (
    <div className="lastmonth-value">
      <ResponsiveContainer width={"99.9%"} height={250}>
        <AreaChart
          width={1800}
          height={250}
          data={datalastGraph}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#da624a" stopOpacity={1} />
              <stop offset="90%" stopColor="#da624a" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#da624a"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
export default Lastgraph;
