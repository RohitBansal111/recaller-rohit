import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import EnhancedTable from '../../components/contacts/data-table'
import FilterTabs from '../../components/contacts/Filtertabs'
import ContactModal from '../../models/contactModel'
import UploadSpreadsheetModal from '../../models/uploadSpreadsheetModal'


const Contacts = () => {
  const [show, setShow] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [addContact, setAddContact] = useState({});
  const [errors, setErrors] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleUploadShow = () => setUploadModal(true);
  const handleUploadClose = () => setUploadModal(false);
  const isValid = ()=>{
    // console.log('email')
    const regex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let formData = true;
    // console.log( !regex.addContact.email,'sss')
    switch(true) {
      case (!addContact.name):
        setErrors({name:"Name field is required!"});
        formData = false;
        break;
      case (!addContact.phone):
        setErrors({phone:"Phone field is required!"});

        formData = false;
        break;
      case (!addContact.email):
        setErrors({email:"Email field is required!"});
        formData = false;
        break;
      case (addContact.email && !regex.test(addContact.email)):
          setErrors({email:"Please enter valid email address!"});
          formData = false;
          break;
      default:
        formData = true;
    }
    return formData;

  }
  const handleSubmit = () => {
    if(isValid())
    {
      console.log(addContact,'contact')
    }
  }
  const handleProceed = () => {
    
  }
  const onChange = (e) => {
    const {name,value} = e.target
    setAddContact(prevTime => {
      return {
         ...prevTime,
         [name]: value
      }  
    })
    setErrors({});

  }
  return (
    <>
          <div className='page-header'>
              <h1>Local Contacts</h1>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" className='btn btn-medium btn-primary'>
                  Add Contact
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#" onClick={handleUploadShow}>Upload Spreadsheet</Dropdown.Item>
                  <Dropdown.Item href="#" onClick={handleShow}>Manual Entry</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
          </div>
          <div className='filter-by-option'>
            <h3>Filter By:</h3>
            <FilterTabs />
          </div>
          <div className='contact-data-table-main'>
              <EnhancedTable />
          </div>

          <ContactModal 
            show={show} 
            handleClose={handleClose} 
            handleShow={handleShow}
            handleSubmit={handleSubmit}
            onChange={onChange}
            errors={errors}/>
            
            <UploadSpreadsheetModal
              uploadModal={uploadModal} 
              handleUploadClose={handleUploadClose} 
              handleUploadShow={handleUploadShow}
              handleProceed={handleProceed}
              onChange={onChange}
              errors={errors}
            />
          </>
  )
}

export default Contacts