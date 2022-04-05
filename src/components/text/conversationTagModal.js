import React, { useState } from 'react'
import { Modal } from 'react-responsive-modal';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import EditTagModal from '../settings/EditTagModal';

const ConversationTagModal = ({open, handleCloseManageModal}) => {
    const [openEditTag, setOpenEditTag] = useState(false)
    const handleEditTag = () => { setOpenEditTag(true) }
    const handleCloseETModal = () => {setOpenEditTag(false)}
  return (
      <>
        <Modal open={open} onClose={handleCloseManageModal} center>
            <div className="modal-header">
                <h3>Conversation Tags</h3>
            </div>
            <div className="modal-body">
                <form className="main-form">
                    <div className="field-group flexFull tagsField">
                        <ul>
                            <li>
                                <span> <LocalOfferIcon /> Good Customer</span>
                                <div className='tags-actions'>
                                    <EditIcon onClick={handleEditTag} />
                                    <DeleteIcon />
                                </div>
                            </li>
                            <li>
                                <span> <LocalOfferIcon /> New Customer</span>
                                <div className='tags-actions'>
                                    <EditIcon onClick={handleEditTag} />
                                    <DeleteIcon />
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="field-group flexFull text-center mt-3">
                        <button type="button" className="btn btn-cancel me-3" onClick={() => handleCloseManageModal()} > Dismiss </button>
                        <button type="button" className="btn btn-primary"> Create Tag </button>
                    </div>
                </form>
            </div>
        </Modal>
        <EditTagModal open={openEditTag} handleCloseETModal={handleCloseETModal} />
      </>
  )
}

export default ConversationTagModal