import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import CreateNewFilter from './Create-new-filter'


const FilterTabs = () => {
  return (
      <div className="filter-tabs">
        <Tabs
          defaultActiveKey="all"
          transition={false}
          id="noanim-tab-example"
          className="mb-3"
        >
          <Tab eventKey="all" title="All(234)">
          </Tab>
          <Tab eventKey="filter" title="New Filter">
              <CreateNewFilter />
          </Tab>
        </Tabs>
      </div>
  )
}

export default FilterTabs