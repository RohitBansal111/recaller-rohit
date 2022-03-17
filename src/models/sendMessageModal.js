import React from 'react'
import { Button, Modal } from 'react-bootstrap'


const SendMessageModal = (props) => {

  return (
    <>
          <Modal className="normal-modal" show={props.showSendMSGModal} onHide={props.handleCloseSendModal}>
            <Modal.Header closeButton>
              <Modal.Title>New Bulk Message</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3># of Contacts that will receive the message: &nbsp; &nbsp; 1</h3>
                <form className='main-form'>
                    <div className='field-group flexFull'>
                        <label>Message *</label>
                        <textarea type="text" className='form-control' placeholder='Enter your note here..' name="notes"></textarea>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.handleCloseSendModal}>
                Dismiss
              </Button>
              <Button variant="primary" onClick={props.handleSendMessage}>
                Send
              </Button>
            </Modal.Footer>
          </Modal>
          </>
  )
}

export default SendMessageModal