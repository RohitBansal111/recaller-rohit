import React from "react";
import CardMedia1 from "./../../assets/images/card-icon1.png";
import CardMedia2 from "./../../assets/images/card-icon2.svg";
import BroNotifcation from "../browserNotifications/index";

const ActivityCardContent = () => {
  return (
<<<<<<< HEAD
    <ul className='card-listingtabs'>
        <li>
          <div className="card-tab-media">
            <img src={CardMedia1} alt="Card Media 1" />
          </div>
          <div className="card-tav-content">
              <p> Welcome to your Recallr Activity Feed </p>
          </div>
        </li>
        <hr className='listBreak'/>
        <li>
          <div className="card-tab-media">
            <img src={CardMedia2} alt="Card Media 2" />
          </div>
          <div className="card-tav-content">
              <p> Visit our Help Centre </p>
          </div>
          {/* <BroNotifcation /> */}
        </li>
=======
    <ul className="card-listingtabs">
      <li>
        <div className="card-tab-media">
          <img src={CardMedia1} alt="Card Media 1" />
        </div>
        <div className="card-tav-content">
          <p> Welcome to your Recallr Activity Feed </p>
        </div>
      </li>
      <hr className="listBreak" />
      <li>
        <div className="card-tab-media">
          <img src={CardMedia2} alt="Card Media 2" />
        </div>
        <div className="card-tav-content">
          <p> Visit our Help Centre </p>
        </div>
        <BroNotifcation />
      </li>
>>>>>>> 5cd51a6c60b123840c10aed7a1943eb923b32c23
    </ul>
  );
};

export default ActivityCardContent;
