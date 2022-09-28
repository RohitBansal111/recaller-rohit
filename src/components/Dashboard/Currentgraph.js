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
import moment from "moment";
import { currentGraph } from "../../api/graph";
const datacurrentGraph = [
  {
    name: "1 Sep",
    uv: 10,
  },
  {
    name: "2 Sep",
    uv: 20,
  },
  {
    name: "3 Sep",
    uv: 80,
  },
  {
    name: "4 Sep",
    uv: 50,
  },
  {
    name: "5 Sep",
    uv: 90,
  },
  {
    name: "6 Sep",
    uv: 50,
  },
  {
    name: "7 Sep",
    uv: 90,
  },
];
const Currentgraph = () => {
  const [data, setData] = useState([]);
  const handleGetData = async () => {
    let res = await currentGraph();
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
          data={data || datacurrentGraph}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#f7b924" stopOpacity={1} />
              <stop offset="90%" stopColor="#f7b924" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#f7b924"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
export default Currentgraph;
