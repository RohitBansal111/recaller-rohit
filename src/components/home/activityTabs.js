import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import Addcompaign from "./addCompaign";
import { Link } from "react-router-dom";
const ActivityCardContent = (props) => {
  const [showAddCompaign, setshowAddCompaign] = useState(false);
  const handleCompaignShow = () => {
    setshowAddCompaign(true);
  };
  const handleCompaignClose = () => {
    setshowAddCompaign(false);
  };

  return (
    <div className="recaller-list">
      <div className="add-campaign-btn mb-2">
        <Button onClick={handleCompaignShow}>Add Campaign </Button>
      </div>
      <ul className="card-listingtabs">
        <li>
          <div className="card-tav-content">
            <p> Welcome to your Recallr Activity Feed </p>
            <div className="more-action">
            <Button
            className="re-dots btn-more-option dropdown-toggle"
            type="button"
            id="dropdownMenuButton2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span></span>
            <span></span>
            <span></span>
          </Button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton2"
              >
                <li>Rename the campaign</li>
                <li><Link  to="/viewcontacts">View Contacts</Link></li>
                <li>Fetch Reports</li>
              </ul>
            </div>
          </div>
        </li>
        <li>
          <div className="card-tav-content">
            <p>Recallr </p>
            <div className="more-action">
            <Button
            className="re-dots btn-more-option dropdown-toggle"
            type="button"
            id="dropdownMenuButton2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span></span>
            <span></span>
            <span></span>
          </Button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton2"
              >
                <li>Rename the campaign</li>
                <li><Link  to="/viewcontacts">View Contacts</Link></li>
                <li>Fetch Reports</li>
              </ul>
            </div>
          </div>
        </li>
        <li>
          <div className="card-tav-content">
            <p> Test </p>
            <div className="more-action">
            <Button
            className="re-dots btn-more-option dropdown-toggle"
            type="button"
            id="dropdownMenuButton2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span></span>
            <span></span>
            <span></span>
          </Button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton2"
              >
                <li>Rename the campaign</li>
                <li><Link  to="/viewcontacts">View Contacts</Link></li>
                <li>Fetch Reports</li>
              </ul>
            </div>
          </div>
        </li>
        <li>
          <div className="card-tav-content">
            <p> Honey Butter</p>
            <div className="more-action">
            <Button
            className="re-dots btn-more-option dropdown-toggle"
            type="button"
            id="dropdownMenuButton2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span></span>
            <span></span>
            <span></span>
          </Button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton2"
              >
                <li>Rename the campaign</li>
                <li><Link  to="/viewcontacts">View Contacts</Link></li>
                <li>Fetch Reports</li>
              </ul>
            </div>
          </div>
        </li>
        <li>
          <div className="card-tav-content">
            <p> Toyaota </p>
            <div className="more-action">
            <Button
            className="re-dots btn-more-option dropdown-toggle"
            type="button"
            id="dropdownMenuButton2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span></span>
            <span></span>
            <span></span>
          </Button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton2"
              >
                <li>Rename the campaign</li>
                <li><Link  to="/viewcontacts">View Contacts</Link></li>
                <li>Fetch Reports</li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
      <Addcompaign
        showAddCompaign={showAddCompaign}
        handleCompaignClose={handleCompaignClose}
        handleCompaignShow={handleCompaignShow}
      />
    </div>
  );
};

export default ActivityCardContent;
