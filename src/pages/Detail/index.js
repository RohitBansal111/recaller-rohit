import React, { useState } from "react";
import DetailTabs from "../../components/Detail/Detailtabs";
const Detail = (props) => {
  return (
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
  );
};

export default Detail;
