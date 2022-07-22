import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";
import { useEffect, useState } from "react";
import { MdChevronRight } from "react-icons/md";
import { toast } from "react-toastify";
import Layout from "../../../components/layout";

const label = { inputProps: { "aria-label": "Switch demo" } };

const SettingCards = [
  {
    title: "Autoresponder",
    description: "View and configure your autoresponder settings",
    path: "/settings/text/autoresponder",
  },
  {
    title: "Opt-In / Opt-Out",
    description: "View and configure your Opt-In and Opt-Out settings",
    path: "/settings/text/opt-in-out",
  },
  {
    title: "Scheduled Messages",
    description: "View and manage your Scheduled Messages",
    path: "/settings/text/scheduled-messages",
  },
  {
    title: "Tags",
    description: "View and manage your Conversation Tags",
    path: "/settings/text/conversation-tags",
  },
  {
    title: "Usage",
    description: "View your Text usage",
    path: "/settings/text/usage",
  },
  {
    title: "Notification",
    description: "Enable Desktop Notifications  Yes / No",
    path: "",
    extraField: <Switch {...label} />,
  },
];

const LocalMessages = () => {
  const [checked, setChecked] = useState(false);

  const handleSwitchChange = (event) => {
    setChecked(event.target.checked);
    // if (event.target.checked == true) {
    //   toast.success("Desktop Notification Enable Successfully");
    // } else {
    //   toast.success("Desktop Notification Disable Successfully");
    // }
  };

  return (
    <Layout>
    <div className="content-page-layout">
      <div className="page-header subheading-bar">
        <div className="header-text">
          <h1>Settings</h1>
          <p>
            {<Link to={"/settings"}>Settings</Link>}
            <MdChevronRight />
            Text
          </p>
        </div>
      </div>
      <div className="setting-page-main">
        <div className="setting-card-listing">
          <ul>
            {SettingCards.map((item, index) => {
              return (
                <li key={index}>
                  <div className="notification-div">
                    <div className="notification-toggle">
                      <Link to={item.path}>
                        <div className="button-box-text">
                          <h3>{item.title}</h3>
                          <p> {item.description} </p>
                        </div>
                        <div className="rightChevronIcon">
                          {!item.extraField && (
                            <span className="button-box-arrow">
                              <ChevronRightIcon />
                            </span>
                          )}
                        </div>
                      </Link>
                      <div>
                        {item.extraField && (
                          <span className="switch-button">
                            <Switch
                              checked={checked}
                              onChange={handleSwitchChange}
                              defaultChecked
                              {...label}
                            />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default LocalMessages;
