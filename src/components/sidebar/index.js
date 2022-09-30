import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "../../assets/svg-icons/home";
import ImportIcon from "../../assets/svg-icons/importIcon";
import Logo from "../../assets/images/logo.svg";
import SettingIcon from "../../assets/svg-icons/settingIcon";
import VoiceIcon from "../../assets/svg-icons/voiceIcon";
import TextIcon from "../../assets/svg-icons/textIcon";
import SearchIcon from "../../assets/svg-icons/searchIcon";
import ProfileIcon from "../../assets/svg-icons/profileIcon";
import smlogo from "../../assets/images/mlogo.png";
import MessengerIcon from "../../assets/svg-icons/messengerIcon";
import WhatsAppIcon from "../../assets/svg-icons/whatsAppIcon";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useDispatch, useSelector } from "react-redux";
import RecallrAIICon from "../../assets/svg-icons/recallrIcon";
import EmailIcon from "../../assets/svg-icons/emailIcon";
import { loginAction } from "../../redux/actions/loginAction";
import BroNotification from "../browserNotifications/index";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { MdMenu, MdClose } from "react-icons/md";
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
  // {
  //   path: "/email",
  //   menuIcon: <EmailIcon />,
  //   menuTitle: "Email",
  // },
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
  const [menuCollapse, setMenuCollapse] = useState(true);
  const menuToggle = () => {
    setMenuCollapse(!menuCollapse);
  };
  const userDataa = useSelector((state) => state.Login.userData);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (location.pathname === "/login") {
    return null;
  }

  const handleLogout = () => {
    localStorage.clear();
    dispatch(loginAction({}));
    navigate("/login");
  };

  return (
    <div className="sidemenu-bar">
      <ProSidebar className={menuCollapse ? null : "collapsed sidebar-menu"}>
        <Menu>
          <div className="page-sidebar">
            <div className="inner-sidebar">
              <div className="brand-logo">
                {menuCollapse ? (
                  <img src={Logo} alt="Recallr" />
                ) : (
                  <img src={smlogo} className="mobilelogo" alt="logo" />
                )}
                <button className="menubtn" onClick={menuToggle}>
                  {menuCollapse ? <MdMenu /> : <MdClose />}
                </button>
              </div>
              <ul className="sidebar-menu">
                <BroNotification />
                {SideNavMenu.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link
                        className={`menuitem ${
                          location === location.path ? "active" : ""
                        }`}
                        to={item.path}
                      >
                        <div className="media-avtar">{item.menuIcon}</div>
                        <span> {item.menuTitle} </span>
                      </Link>
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
                  <span>
                    {userDataa
                      ? userDataa.firstName + " " + userDataa.lastName
                      : "user name"}
                  </span>
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
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
        </Menu>
      </ProSidebar>
    </div>
  );
};

export default Sidebar;
