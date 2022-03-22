<<<<<<< HEAD
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import HomeIcon from '../../assets/svg-icons/home';
import ContactIcon from '../../assets/svg-icons/contact';
import Logo from '../../assets/images/logo.png';
import ProfileIcon from '../../assets/svg-icons/profileIcon';
import TextIcon from '../../assets/svg-icons/textIcon';
import SettingIcon from '../../assets/svg-icons/settingIcon';
import VoiceIcon from '../../assets/svg-icons/voiceIcon';
import SearchIcon from '../../assets/svg-icons/searchIcon';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
=======
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import HomeIcon from "../../assets/svg-icons/home";
import ContactIcon from "../../assets/svg-icons/contact";
import Logo from "../../assets/images/logo.png";
>>>>>>> b1f9752d17fc7287646b32415dbbb8fe685ac59a

const SideNavMenu = [
  {
    path: "/",
    menuIcon: <HomeIcon />,
    menuTitle: "Dashboard",
  },
  {
<<<<<<< HEAD
    path : "/text",
    menuIcon : <TextIcon />,
    menuTitle : "Text"
  },
  {
    path : "/voice",
    menuIcon : <VoiceIcon />,
    menuTitle : "Voice"
  },
  {
    path : "/search",
    menuIcon : <SearchIcon />,
    menuTitle : "Search"
  },
=======
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
>>>>>>> b1f9752d17fc7287646b32415dbbb8fe685ac59a
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
<<<<<<< HEAD
    path : "/settings",
    menuIcon : <SettingIcon />,
    menuTitle : "Settings"
  },
  {
    path : "/recallr-AI",
    menuIcon : <HomeIcon />,
    menuTitle : "RecallrAI"
  }
]
=======
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
>>>>>>> b1f9752d17fc7287646b32415dbbb8fe685ac59a

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
<<<<<<< HEAD
    <div className='inner-sidebar'>
        <div className='brand-logo'>
            <img src={Logo} alt="Recallr"/>
        </div>
        <ul className='sidebar-menu'>
            {
              SideNavMenu.map((item, index)=>{
                return(
                  <li key={index}>
                      <NavLink 
                      className={location === location.path ? 'active' : ''}
                      to={item.path}>
                        <div className='media-avtar'>
                          {item.menuIcon}
                        </div>
                        <span> {item.menuTitle} </span>
                      </NavLink>
                  </li>
                )
              })
            }
        </ul>
        <div>
          <button 
            type="button" 
            className="user-profile-btn"
            id="demo-positioned-button"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <span><ProfileIcon /> R Singh </span>
            <div class="nav-chevron-right">
              <ChevronRightIcon />
            </div>
          </button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
=======
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
>>>>>>> b1f9752d17fc7287646b32415dbbb8fe685ac59a
    </div>
  );
};

export default Sidebar;
