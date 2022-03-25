
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';


const Autoresponder = () => {
    const [addIncomeSet, setAddIncomeSet] = useState(false)
    const AddIncomeSMS = () => {
        setAddIncomeSet(true)
    }
    
  return (
      <div className="content-page-layout">
        <div className="page-header subheading-bar">
            <div className="header-text">
                <h1>Settings</h1>
                <p>Setting / Local Messages / Autoresponder</p>
            </div>
        </div>
        <div className="setting-message-container">
            <div className="setting-inner-container">
                <div className="add-business-hour">
                    <h3>Business Hours</h3>
                    <div className="addAuto-response-bar">
                        <div className="auto-response-list">
                            <button type="button" className="btn btn-autoReply"> <AddIcon /> Add Business hour </button>
                        </div>
                    </div>
                </div>
                <div className="auto-reply-business-hour">
                    <div className="heading-info">
                        <h3>Auto-Reply During Business Hours 
                        <Tooltip title="Configure auto responses for incoming texts, and widget messages during business hours">
                            <IconButton>
                                <InfoIcon />
                            </IconButton>
                        </Tooltip>
                        </h3>
                    </div>
                    <div className="addAuto-response-bar">
                        <div className="auto-response-list">
                            <button type="button" className="btn btn-autoReply" onClick={AddIncomeSMS}> <AddIcon /> Add Incoming SMS Auto-Response</button>
                            <button type="button" className="btn btn-autoReply"> <AddIcon /> Add Widget Auto-Response </button>
                        </div>
                    </div>
                </div>
                <div className="auto-reply-business-hour">
                    <div className="heading-info">
                        <h3>Auto-Reply Outside Business Hours   
                        <Tooltip title="Configure auto responses for incoming texts, and widget messages outside business hours">
                            <IconButton>
                                <InfoIcon />
                            </IconButton>
                        </Tooltip>
                        </h3>
                    </div>
                    <div className="addAuto-response-bar">
                        <div className="auto-response-list">
                            <button type="button" className="btn btn-autoReply"> <AddIcon /> Add Incoming SMS Auto-Response</button>
                            <button type="button" className="btn btn-autoReply"> <AddIcon /> Add Widget Auto-Response </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
  )
}

export default Autoresponder 