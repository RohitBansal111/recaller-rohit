import React from 'react'
import { Modal } from 'react-responsive-modal';
import SearchIcon from '@material-ui/icons/Search';

const MessageModal = ({open, handleCloseMessageModal}) => {
  return (
        <Modal open={open} onClose={handleCloseMessageModal} center>
            <div className="modal-header">
                <h3>New Message</h3>
            </div>
            <div className="modal-body">
                <form className="main-form">
                    <div className="field-group flexFull searchField">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter customer name, phone or conversation tag"
                            name="name"
                        />
                        <div className='search-field'>
                            <SearchIcon />
                        </div>
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