import React, {useState} from 'react'
import { Modal } from 'react-responsive-modal';
import NewEmailSelectTag from '../components/email/newEmailSelectTag';

const options = [
  { value: 'john.carter@gmail.comn', label: 'john.carter@gmail.comn' },
  { value: 'angelia.baith@gmail.com', label: 'angelia.baith@gmail.com'},
  { value: 'vihan.honki@gmail.com', label: 'vihan.honki@gmail.com' }
]

const EmailModal = ({open, handleCloseMessageModal}) => {
    const [selected, setSelected] = useState([]);
    const handleSelectChange = (values) => {
        setSelected(values);
    };
  return (
        <Modal open={open} onClose={handleCloseMessageModal} center>
            <div className="modal-header">
                <h3>New Email</h3>
            </div>
            <div className="modal-body">
                <form className="main-form">
                    <div className="field-group flexFull">
                        <label>Enter Contact Email</label>
                        <NewEmailSelectTag
                            onChange={handleSelectChange}
                            isMulti
                            options={options}
                            value={selected}
                        />
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

export default EmailModal