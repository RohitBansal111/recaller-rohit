import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import HomeIcon from '../../assets/svg-icons/home';
import Logo from '../../assets/images/logo.png';



const SideNavMenu = [
  {
    path : "/",
    menuIcon : <HomeIcon />,
    menuTitle : "Dashboard"
  },
  {
    path : "/contacts",
    menuIcon : <HomeIcon />,
    menuTitle : "Contacts"
  },
  {
    path : "/text",
    menuIcon : <HomeIcon />,
    menuTitle : "Text"
  },
  {
    path : "/voice",
    menuIcon : <HomeIcon />,
    menuTitle : "Voice"
  },
  {
    path : "/search",
    menuIcon : <HomeIcon />,
    menuTitle : "Search"
  },
  {
    path : "/local-site",
    menuIcon : <HomeIcon />,
    menuTitle : "Local Site"
  },
  {
    path : "/local-seo",
    menuIcon : <HomeIcon />,
    menuTitle : "Local SEO"
  },
  {
    path : "/local-ads",
    menuIcon : <HomeIcon />,
    menuTitle : "Local Ads"
  },
  {
    path : "/settings",
    menuIcon : <HomeIcon />,
    menuTitle : "Settings"
  }
]

const Sidebar = () => {
  const location = useLocation();
  return (
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
    </div>
  )
}

export default Sidebar