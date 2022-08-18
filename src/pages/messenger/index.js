import Layout from '../../components/layout';
import CustomizationImage from './../../assets/images/customization-Image.svg';

const MessengerPage = () => {
    return (
      <Layout>
        <div className="content-page-layout">
          <div className="page-header coming-soon">
            <img src={CustomizationImage} alt="coming soon" />
          </div>
        </div>
        </Layout>
    )
  }
  
  export default MessengerPage 