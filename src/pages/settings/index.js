import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import Layout from "../../components/layout";

const SettingCards = [
  {
    title: "Text",
    description: "View your text account settings",
    path: "/settings/text",
  },
  {
    title: "Email",
    description: "View your email account settings",
    path: "/settings/email",
  },
];
const Setting = () => {
  return (
    <Layout>
    <div className="content-page-layout">
      <div className="page-header">{/* <h1>Settings</h1> */}</div>
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
                    <span className="button-box-arrow">
                      <ChevronRightIcon />
                    </span>
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

export default Setting;
