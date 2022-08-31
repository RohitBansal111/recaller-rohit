import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { BsQuestionCircle } from "react-icons/bs";
import "react-datepicker/dist/react-datepicker.css";
const ValueCardContent = (props) => {
  return (
   
     <div className="percentage-column-box">
       <ul>
       <li>
        <div className="detail-percentage">
          <h1>95.1%</h1>
          <p>Delivery Rate <BsQuestionCircle/></p>
        </div>
       </li>
       <li>
       <div className="detail-percentage">
         <h1>4.9%</h1>
         <p>Bounce Rate <BsQuestionCircle/></p>
       </div>
      </li>
      <li>
      <div className="detail-percentage">
        <h1>9.5%</h1>
        <p>Reply Rate <BsQuestionCircle/></p>
      </div>
     </li>
     <li>
     <div className="detail-percentage">
       <h1>1.2%</h1>
       <p>Click Rate <BsQuestionCircle/></p>
     </div>
    </li>
    <li>
    <div className="detail-percentage">
      <h1>1.6%</h1>
      <p>Unsubscribe Rate <BsQuestionCircle/></p>
    </div>
   </li>
       </ul>
     </div>

  );
};

export default ValueCardContent;
