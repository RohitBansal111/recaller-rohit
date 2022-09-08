// import React from "react";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// const datacurrentGraph = [
//   {
//     name: "1 Sep",
//     uv: 700,
//   },
//   {
//     name: "2 Sep",
//     uv: 400,
//   },
//   {
//     name: "3 Sep",
//     uv: 800,
//   },
//   {
//     name: "4 Sep",
//     uv: 500,
//   },
//   {
//     name: "5 Sep",
//     uv: 900,
//   },
//   {
//     name: "6 Sep",
//     uv: 500,
//   },
//   {
//     name: "7 Sep",
//     uv: 990,
//   },
// ];
// const Currentgraph = () => {
//   return (
//     <div>
//       {" "}
//       <ResponsiveContainer width={"99.9%"} height={250}>
//         <AreaChart
//           width={310}
//           height={250}
//           data={datacurrentGraph}
//           margin={{
//             top: 5,
//             right: 0,
//             left: 0,
//             bottom: 5,
//           }}
//         >
//           <defs>
//             <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="10%" stopColor="#f7b924" stopOpacity={1} />
//               <stop offset="90%" stopColor="#f7b924" stopOpacity={0.2} />
//             </linearGradient>
//           </defs>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Area
//             type="monotone"
//             dataKey="uv"
//             stroke="#f7b924"
//             fillOpacity={1}
//             fill="url(#colorUv)"
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };
// export default Currentgraph;

import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const Currentgraph = () => {
  const [graph, setGraph] = useState({
    series: [
      {
        name: "series1",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        labels: {
          format: {
            year: "dd/MM",
          },
        },
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={graph.options}
          series={graph.series}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
};

export default Currentgraph;
