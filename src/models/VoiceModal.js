import React, {useState} from 'react'
import { Modal } from 'react-responsive-modal';
import NewVoiceSelectTag from '../components/voice/newVoiceSelectTags';

const options = [
  { value: 'Voice One', label: 'Voice One' },
  { value: 'Voice Two', label: 'Voice Two'},
  { value: 'Voice Three', label: 'Voice Three' }
]

const VoiceModal = ({open, handleCloseMessageModal}) => {
    const [selected, setSelected] = useState([]);
    const handleSelectChange = (values) => {
        setSelected(values);
    };
  return (
        <Modal open={open} onClose={handleCloseMessageModal} center>
            <div className="modal-header">
                <h3>New Voice</h3>
            </div>
            <div className="modal-body">
                <form className="main-form">
                    <div className="field-group flexFull">
                        <label>Enter Contact Voice</label>
                        <NewVoiceSelectTag
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

export default VoiceModal