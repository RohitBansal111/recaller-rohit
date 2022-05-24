import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";
import { useState } from "react";

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
    path: "/settings/text/",
    extraField: <Switch {...label} />,
  },
];
const LocalMessages = () => {
  const [checked, setChecked] = useState(false);

  function handleSwitchChange(event) {
    setChecked(event.target.checked);
  }

  return (
    <div className="content-page-layout">
      <div className="page-header subheading-bar">
        <div className="header-text">
          <h1>Settings</h1>
          <p>{<Link to={"/settings"}>Settings</Link>} / Text</p>
        </div>
      </div>
      <div className="setting-page-main">
        <div className="setting-card-listing">
          <ul>
            {SettingCards.map((item, index) => {
              return (
                <li key={index}>
                  <Link to={item.path}>
                    <div className="button-box-text">
                      <h3>{item.title}</h3>
                      <p> {item.description} </p>
                    </div>
                    {!item.extraField && (
                      <span className="button-box-arrow">
                        <ChevronRightIcon />
                      </span>
                    )}
                    {item.extraField && (
                      <span className="switch-button">
                        <Switch
                        checked={checked}
                          onChange={handleSwitchChange}
                          {...label}
                          defaultChecked
                        />
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LocalMessages;
