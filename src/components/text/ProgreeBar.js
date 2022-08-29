import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

const Progressbar = () => {
  return (
    <div>
      <h1>
        <div className="">
          <h5>Voice</h5>
          <p>Voice</p>
          <ProgressBar variant="success" now={40} />
        </div>
        <div className="">
          <h5>Usage</h5>
          <p>Monthly Credits Deployes</p>
          <ProgressBar variant="info" now={20} />
        </div>
      </h1>
    </div>
  );
};

export default Progressbar;
