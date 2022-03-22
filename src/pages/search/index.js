import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import AboutTab from '../../components/search/aboutTab';
import AnalyticsTab from '../../components/search/analyticsTab';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>
          {children}
        </>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Search = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
      <div className="content-page-layout">
        <div className="page-header">
            <h1>Search</h1>
        </div>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Referrals" />
            <Tab label="Advocates" />
            <Tab label="Analytics" />
            <Tab label="About" />
          </Tabs>
          <div className="tab-content">
            <TabPanel value={value} index={0}>
              Referrals
            </TabPanel>
            <TabPanel value={value} index={1}>
              Advocates
            </TabPanel>
            <TabPanel value={value} index={2}>
                <AnalyticsTab />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <AboutTab />
            </TabPanel>
          </div>
        </Box>
      </div>
  )
}

export default Search 