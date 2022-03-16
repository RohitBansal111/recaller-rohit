import React from 'react'
import { Button, Modal } from 'react-bootstrap'


const ContactModal = (props) => {

  return (
    <>
          <Modal className="normal-modal" show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>New Contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className='main-form'>
                    <div className='field-group flexFull'>
                        <label>Name</label>
                        <input type="text" className='form-control' placeholder='Enter Contact Name' name="name" onChange={props.onChange}/>
                        <span className="spanError">{props.errors.name}</span>
                    </div>
                    <div className='field-group flex2'>
                        <label>Phone</label>
                        <input type="text" className='form-control' placeholder='Enter Phone' name="phone" onChange={props.onChange}/>
                        <span className="spanError">{props.errors.phone}</span>
                    </div>
                    <div className='field-group flex2'>
                        <label>Email</label>
                        <input type="email" className='form-control' placeholder='Enter Email' name="email" onChange={props.onChange}/>
                        <span className="spanError">{props.errors.email}</span>

                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.handleClose}>
                Dismiss
              </Button>
              <Button variant="primary" onClick={props.handleSubmit}>
                Add Contact
              </Button>
            </Modal.Footer>
          </Modal>
          </>
  )
}

export default ContactModal