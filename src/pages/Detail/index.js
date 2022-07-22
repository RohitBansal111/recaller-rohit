import React, { useState } from "react";
import DetailTabs from "../../components/Detail/Detailtabs";
import Layout from "../../components/layout";
const Detail = (props) => {
  return (
    <Layout>
    <div className="Detail-content">
      <div className="Detail-header">
        <h1>
          Voice Detail
        </h1>
      </div>
      <div className="Detail-multi-tabs">
        <DetailTabs />
      </div>
     
    </div>
    </Layout>
  );
};

export default Detail;
