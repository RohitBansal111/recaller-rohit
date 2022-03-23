import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';

const SettingCards = [
    {
        title: "Autoresponder",
        description: "View and configure your autoresponder settings",
        path: '/'
    },
    {
        title: "Opt-In / Opt-Out",
        description: "View and configure your Opt-In and Opt-Out settings",
        path: '/'
    },
    {
        title: "Scheduled Messages",
        description: "View and manage your Scheduled Messages",
        path: '/'
    },
    {
        title: "Tags",
        description: "View and manage your Conversation Tags",
        path: '/'
    },
    {
        title: "Usage",
        description: "View your LocalMessages usage",
        path: '/'
    }
]
const LocalMessages = () => {
  return (
      <div className="content-page-layout">
        <div className="page-header subheading-bar">
            <h1>Settings</h1>
            <p>Setting / Local Messages</p>
        </div>
        <div className="setting-page-main">
            <div className="setting-card-listing">
                <ul>
                    {
                        SettingCards.map((item,index) => {
                            return(
                                <li>
                                    <Link to={item.path}>
                                        <div className="button-box-text">
                                            <h3>{item.title}</h3>
                                            <p> {item.description} </p>
                                        </div>
                                        <span class="button-box-arrow">
                                            <ChevronRightIcon />
                                        </span>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
      </div>
  )
}

export default LocalMessages 