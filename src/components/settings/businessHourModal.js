import React from 'react'
import { Modal } from 'react-responsive-modal';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const BusinessHourModal = ({businessHourModal, handleModalClose}) => {
  return (
        <Modal open={businessHourModal} onClose={handleModalClose} center>
            <div className="modal-header">
                <h3>Add Business Hours </h3>
            </div>
            <div className="modal-body">
                <p className='timeZone'>Your timezone is America/Toronto 
                <Tooltip title="To update your timezone, please email support@recallr.com">
                    <InfoIcon />
                </Tooltip>
                </p>
                <form className="main-form align-items-center">
                    <div className="field-group flexOne me-2">
                        <label>Select a day</label>
                        <select className="form-control">
                            <option>Every Day</option>
                            <option>Week End</option>
                            <option>Weekdays</option>
                            <option>Monday</option>
                            <option>Tuesday</option>
                            <option>Wednesday</option>
                            <option>Thrusday</option>
                            <option>Friday</option>
                            <option>Saturday</option>
                            <option>Sunday</option>
                        </select>
                    </div>
                    <div className="field-group flexOne me-2">
                        <label>Select hours (From)</label>
                        <input
                            type="time"
                            className="form-control"
                            placeholder="Enter Name"
                            name="name"
                        />
                    </div>
                    <div className="field-group flexOne me-2">
                        <label>Select hours (To)</label>
                        <input
                            type="time"
                            className="form-control"
                            placeholder="Enter Contact Name"
                            name="name"
                        />
                    </div>
                    <div className="field-group flexOneFour">
                        <DeleteIcon />
                    </div>
                    <div className="field-group flexFull">
                        <button type="button" className="btn btn-icon active-text"> <AddIcon /> Add Time Slot </button>
                    </div>
                    <div className="field-group flexFull text-center mt-3">
                        <button type="button" className="btn btn-cancel me-3" onClick={() => handleModalClose()} > Cancel </button>
                        <button type="button" className="btn btn-primary"> Save </button>
                    </div>
                </form>
            </div>
        </Modal>
  )
}

export default BusinessHourModal