import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import HomeIcon from "../../assets/svg-icons/home";
import ContactIcon from "../../assets/svg-icons/contact";
import Logo from "../../assets/images/logo.png";

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
    menuIcon: <HomeIcon />,
    menuTitle: "Text",
  },
  {
    path: "/voice",
    menuIcon: <HomeIcon />,
    menuTitle: "Voice",
  },
  {
    path: "/search",
    menuIcon: <HomeIcon />,
    menuTitle: "Search",
  },
  // {
  //   path : "/local-site",
  //   menuIcon : <HomeIcon />,
  //   menuTitle : "Local Site"
  // },
  // {
  //   path : "/local-seo",
  //   menuIcon : <HomeIcon />,
  //   menuTitle : "Local SEO"
  // },
  // {
  //   path : "/local-ads",
  //   menuIcon : <HomeIcon />,
  //   menuTitle : "Local Ads"
  // },
  {
    path: "/settings",
    menuIcon: <HomeIcon />,
    menuTitle: "Settings",
  },
  {
    path: "/recallr-AI",
    menuIcon: <HomeIcon />,
    menuTitle: "RecallrAI",
  },
];

const Sidebar = () => {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
    </div>
  );
};

export default Sidebar;
