import React from 'react'
import { Modal } from 'react-responsive-modal';
import DeleteIcon from '@material-ui/icons/Delete';

const EditContactModal = ({open, handleCloseContactModal}) => {

  return (
        <Modal open={open} onClose={handleCloseContactModal} center>
            <div className="modal-header">
                <h3>Edit Contact Details</h3>
            </div>
            <div className="modal-body">
                <form className="main-form">
                    <div className="field-group flex2">
                        <label>First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter first name"
                            name="name"
                        />
                    </div>
                    <div className="field-group flex2">
                        <label>Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter first name"
                            name="name"
                        />
                    </div>
                    <div className="field-group flex2">
                        <label>Email</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter email"
                            name="name"
                        />
                    </div>
                    <div className="field-group flex2">
                        <label>Subscription</label>
                        <div className='foem-field-inner'>
                            <select className="form-control">
                                <option>subscription</option>
                                <option disabled>select subscription</option>
                            </select>
                            <DeleteIcon />
                        </div>
                    </div>
                    <div className="field-group flex2">
                        <label>Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter phone"
                            name="name"
                        />
                    </div>
                    <div className="field-group flex2">
                        <label>Subscription</label>
                        <div className='foem-field-inner'>
                            <select className="form-control">
                                <option>subscription</option>
                                <option disabled>select subscription</option>
                            </select>
                            <DeleteIcon />
                        </div>
                    </div>
                    <div className="field-group flexFull text-center mt-5">
                        <button type="button" className="btn btn-cancel me-3" onClick={() => handleCloseContactModal()} > Dismiss </button>
                        <button type="button" className="btn btn-primary"> Save </button>
                    </div>
                </form>
            </div>
        </Modal>
  )
}

export default EditContactModal