import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { BsQuestionCircle } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DetailValue from "./Valuetabs";

const DetailCardContent = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const data = [
    {
      name: 'June 20',
      uv: 100,
    },
    {
      name: 'June 21',
      uv:200,
    },
    {
      name: 'June 22',
      uv: 300,
    },
    {
      name: 'June 23',
      uv: 700,
    },
    {
      name: 'June 24',
      uv: 500,
    },
    {
      name: 'June 25',
      uv: 600,
    },
    {
      name: 'June 26',
      uv:900
    },
  ];
  return (
    <div className="Detail-content-layout">
     <div className="heading">
     <h1>10,000 Sent Messages</h1>
     <div className="datepicker"><span className="date-icon"><MdDateRange/></span><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
     </div>
     </div>

      <DetailValue/>


     <div className="Detail-chart">
     <ResponsiveContainer  width={'99%'} height={300}>
     <LineChart
       width={'100%'}
       height={300}
       data={data}
       margin={{
         top: 5,
         right: 30,
         left: 20,
         bottom: 5,
       }}
     >
       <CartesianGrid strokeDasharray="3 3" />
       <XAxis dataKey="name" />
       <YAxis />
       <Tooltip />
       <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
     </LineChart>
   </ResponsiveContainer>
     </div>
 

     <div className="Detail-rate-desc">
       <ul>
        <li>
          <div className="rate-description">
            <h1>Convert More & Reduce Bounce Rate</h1>
            <p>Take these steps to avoid sending your message to invaild number</p>
            <Button>Learn More</Button>
          </div>
        </li>
        <li>
        <div className="rate-description">
          <h1>Increase Engagement Using Links</h1>
          <p>Take these steps to avoid sending your message to invaild number</p>
          <Button>Learn More</Button>
        </div>
      </li>
      <li>
      <div className="rate-description">
        <h1>Prevent Opt Outs with best practices</h1>
        <p>Take these steps to avoid sending your message to invaild number</p>
        <Button>Learn More</Button>
      </div>
    </li>
       </ul>
     </div>
    </div>
  );
};

export default DetailCardContent;
