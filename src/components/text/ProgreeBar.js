import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

const Progressbar = () => {
  return (
    <div className="conversation-tags voice-progress-bar">
      <div className="mb-3 voice34">
        <h5 className="mb-0">Voice</h5>
        <p className="mb-1">Voice</p>
        <ProgressBar now={40} />
      </div>
      <div className="usage34">
        <h5 className="mb-0">Usage</h5>
        <p className="mb-1">Monthly Credits Deployes</p>
        <ProgressBar now={20} />
      </div>
    </div>
  );
};

export default Progressbar;
