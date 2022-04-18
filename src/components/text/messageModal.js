import React from 'react'
import { Modal } from 'react-responsive-modal';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

const options = [
  { value: 'John Carter', label: 'John Carter' },
  { value: 'Anglina Baith', label: 'Anglina Baith' },
  { value: 'Vihaan Honki', label: 'Vihaan Honki' }
]

const MessageModal = ({open, handleCloseMessageModal}) => {
    
  return (
        <Modal open={open} onClose={handleCloseMessageModal} center>
            <div className="modal-header">
                <h3>New Message</h3>
            </div>
            <div className="modal-body">
                <form className="main-form">
                    <div className="field-group flexFull">
                        <label>Enter Contact Name</label>
                        <Select options={options} isMulti />
                    </div>
                    <div className="field-group flexFull">
                        <label>Message</label>
                        <textarea
                            type="text"
                            className="form-control"
                            placeholder="Type your message"
                            name="name"
                        />
                    </div>
                    <div className="field-group flexFull text-center mt-3">
                        <button type="button" className="btn btn-cancel me-3" onClick={() => handleCloseMessageModal()} > Dismiss </button>
                        <button type="button" className="btn btn-primary"> Save </button>
                    </div>
                </form>
            </div>
        </Modal>
  )
}

export default MessageModal