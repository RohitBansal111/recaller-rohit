import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';

const SettingCards = [
    {
        title: "LocalMessages",
        description: "View your LocalMessages account settings",
        path : "/settings/local-messages"
    }
]
const Setting = () => {
  return (
      <div className="content-page-layout">
        <div className="page-header">
            {/* <h1>Settings</h1> */}
        </div>
        <div className="setting-page-main">
            <div className="setting-card-listing">
                <ul>
                    {
                        SettingCards.map((item,index) => {
                            return(
                                <li key={index}>
                                    <Link to={item.path}>
                                        <div className="button-box-text">
                                            <h3>{item.title}</h3>
                                            <p> {item.description} </p>
                                        </div>
                                        <span className="button-box-arrow">
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

export default Setting 