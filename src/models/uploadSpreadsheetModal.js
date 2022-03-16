import React from 'react'
import { Modal } from 'react-bootstrap'
import ReactWizard from 'react-bootstrap-wizard';
import ConfirmUploadStep3 from '../components/contacts/wizard-form/ConfirmUploadStep3';
import PreparationStep1 from '../components/contacts/wizard-form/preparationStep1';
import PropertiesStep2 from '../components/contacts/wizard-form/PropertiesStep2';


var steps = [
  {
    stepName: "About",
    stepIcon: "tim-icons icon-single-02",
    component: PreparationStep1
  },
  {
    stepName: "Account",
    stepIcon: "tim-icons icon-settings-gear-63",
    component: PropertiesStep2
  },
  {
    stepName: "Address",
    stepIcon: "tim-icons icon-delivery-fast",
    component: ConfirmUploadStep3,
    stepProps: {
      prop1: true,
      prop2: "A string"
    }
  }
];

const UploadSpreadsheetModal = (props) => {
  const finishButtonClick = (allStates) => {
    console.log(allStates);
  };
  return (
    <>
          <Modal className="normal-modal" show={props.uploadModal} onHide={props.handleUploadClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add From Spreadsheet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ReactWizard
                steps={steps}
                navSteps
                headerTextCenter
                color="primary"
                finishButtonClick={finishButtonClick}
              />
            </Modal.Body>
          </Modal>
          </>
  )
}

export default UploadSpreadsheetModal