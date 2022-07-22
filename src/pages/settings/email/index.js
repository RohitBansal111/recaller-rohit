import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import { MdChevronRight } from "react-icons/md";
import Layout from "../../../components/layout";

const label = { inputProps: { "aria-label": "Switch demo" } };

const SettingCards = [
  {
    title: "Email Sender",
    description: "View and configure your email sender settings",
    path: "/settings/email/email-sender",
  },
];
const EmailSetting = () => {
  return (
    <Layout>
    <div className="content-page-layout">
      <div className="page-header subheading-bar">
        <div className="header-text">
          <h1>Settings</h1>
          <p>
            <Link to={"/settings"}>Setting</Link>
            <MdChevronRight /> Email
          </p>
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
                      <span className="switch-button">{item.extraField}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default EmailSetting;
