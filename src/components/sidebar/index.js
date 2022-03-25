import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import HomeIcon from "../../assets/svg-icons/home";
import ContactIcon from "../../assets/svg-icons/contact";
import Logo from "../../assets/images/logo.png";
import SettingIcon from "../../assets/svg-icons/settingIcon";
import VoiceIcon from "../../assets/svg-icons/voiceIcon";
import TextIcon from "../../assets/svg-icons/textIcon";
import SearchIcon from "../../assets/svg-icons/searchIcon";
import ProfileIcon from "../../assets/svg-icons/profileIcon";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useSelector } from "react-redux";

const SideNavMenu = [
  {
    path: "/",
    menuIcon: <HomeIcon />,
    menuTitle: "Dashboard",
  },
  {
    path: "/contacts",
    menuIcon: <ContactIcon />,
    menuTitle: "Contacts",
  },
  {
    path: "/text",
    menuIcon: <TextIcon />,
    menuTitle: "Text",
  },
  {
    path: "/voice",
    menuIcon: <VoiceIcon />,
    menuTitle: "Voice",
  },
  {
    path: "/search",
    menuIcon: <SearchIcon />,
    menuTitle: "Search",
  },
  {
    path: "/settings",
    menuIcon: <SettingIcon />,
    menuTitle: "Settings",
  },
  {
    path: "/recallr-AI",
    menuIcon: <ContactIcon />,
    menuTitle: "RecallrAI",
  },
];

const Sidebar = () => {
  const userDataa = useSelector((state) => state.Login.userData);
  const location = useLocation();

  return (
    <div className="inner-sidebar">
      <div className="brand-logo">
        <img src={Logo} alt="Recallr" />
      </div>
      <ul className="sidebar-menu">
        {SideNavMenu.map((item, index) => {
          return (
            <li key={index}>
              <NavLink className={location === location.path ? "active" : ""} to={item.path}>
                <div className="media-avtar">{item.menuIcon}</div>
                <span> {item.menuTitle} </span>
              </NavLink>
            </li>
          );
        })}
      </ul>
      <div className="user-profile-btn">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <ProfileIcon />
          {userDataa ? userDataa.firstName + " " + userDataa.lastName : 'User Name'}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <Link class="dropdown-item" to="/admin/account">
              {" "}
              <AccountBoxIcon /> My Account
            </Link>
          </li>
          <li>
            <Link class="dropdown-item" to="/">
              {" "}
              <ExitToAppIcon /> Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
