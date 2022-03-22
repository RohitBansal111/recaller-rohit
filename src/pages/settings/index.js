import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const SettingCards = [
    {
        title: "Billing",
        description: "View & Manage Billing Details"
    },
    {
        title: "Contact Fields",
        description: "View and manage your custom LocalContacts fields"
    },
    {
        title: "Email",
        description: "View & manage your email settings"
    },
    {
        title: "Integrations",
        description: "View your automation Workflows and Connected Accounts"
    },
    {
        title: "LocalMessages",
        description: "View your LocalMessages account settings"
    },
    {
        title: "Login Tracking",
        description: "Track login and logout details for Users for the last 7 days"
    },
    {
        title: "Users & Roles",
        description: "Setup and administer your user accounts"
    },
]
const Setting = () => {
  return (
      <div className="content-page-layout">
        <div className="page-header">
            <h1>Settings</h1>
        </div>
        <div className="setting-page-main">
            <div className="setting-card-listing">
                <ul>
                    {
                        SettingCards.map((item,index) => {
                            return(
                                <li>
                                    <div className="button-box-text">
                                        <h3>{item.title}</h3>
                                        <p> {item.description} </p>
                                    </div>
                                    <span class="button-box-arrow">
                                        <ChevronRightIcon />
                                    </span>
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