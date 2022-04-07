import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "../../assets/svg-icons/home";
import ImportIcon from "../../assets/svg-icons/importIcon";
import Logo from "../../assets/images/logo.svg";
import SettingIcon from "../../assets/svg-icons/settingIcon";
import VoiceIcon from "../../assets/svg-icons/voiceIcon";
import TextIcon from "../../assets/svg-icons/textIcon";
import SearchIcon from "../../assets/svg-icons/searchIcon";
import ProfileIcon from "../../assets/svg-icons/profileIcon";
import MessengerIcon from "../../assets/svg-icons/messengerIcon";
import WhatsAppIcon from "../../assets/svg-icons/whatsAppIcon";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useSelector } from "react-redux";
import RecallrAIICon from "../../assets/svg-icons/recallrIcon";
import EmailIcon from "../../assets/svg-icons/emailIcon";

const SideNavMenu = [
  {
    path: "/",
    menuIcon: <HomeIcon />,
    menuTitle: "Dashboard",
  },
  {
    path: "/contacts",
    menuIcon: <ImportIcon />,
    menuTitle: "Contacts",
  },
  {
    path: "/text",
    menuIcon: <TextIcon />,
    menuTitle: "Text",
  },
  {
    path: "/email",
    menuIcon: <EmailIcon />,
    menuTitle: "Email",
  },
  {
    path: "/voice",
    menuIcon: <VoiceIcon />,
    menuTitle: "Voice",
  },
  {
    path: "/messenger",
    menuIcon: <MessengerIcon />,
    menuTitle: "Messenger",
  },
  {
    path: "/whats-app",
    menuIcon: <WhatsAppIcon />,
    menuTitle: "Whatsapp",
  },
  {
    path: "/search",
    menuIcon: <SearchIcon />,
    menuTitle: "Search",
  },
  {
    path: "/recallr-AI",
    menuIcon: <RecallrAIICon />,
    menuTitle: "RecallrAI",
  },
  {
    path: "/settings",
    menuIcon: <SettingIcon />,
    menuTitle: "Settings",
  },
];

const Sidebar = () => {
  const userDataa = useSelector((state) => state.Login.userData);
  const location = useLocation();
  const navigate = useNavigate();
  if (location.pathname === "/login") {
    return null;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="page-sidebar">
      <div className="inner-sidebar">
        <div className="brand-logo">
          <img src={Logo} alt="Recallr" />
        </div>
        <ul className="sidebar-menu">
          {SideNavMenu.map((item, index) => {
            return (
              <li key={index}>
                <NavLink
                  className={location === location.path ? "active" : ""}
                  to={item.path}
                >
                  <div className="media-avtar">{item.menuIcon}</div>
                  <span> {item.menuTitle} </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
        <div className="user-profile-btn">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <ProfileIcon />
            {userDataa
              ? userDataa.firstName + " " + userDataa.lastName
              : "user name"}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <Link className="dropdown-item" to="/admin/account">
                {" "}
                <AccountBoxIcon /> My Account
              </Link>
            </li>
            <li>
              <button className="dropdown-item" onClick={handleLogout}>
                {" "}
                <ExitToAppIcon /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
