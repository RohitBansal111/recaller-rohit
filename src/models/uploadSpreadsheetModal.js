import { useState } from "react";
import { Modal } from "react-bootstrap";
import ConfirmUpload from "../components/contacts/wizard-form/ConfirmUpload";
import Preparation from "../components/contacts/wizard-form/Preparation";
import Properties from "../components/contacts/wizard-form/Properties";

const UploadSpreadsheetModal = (props) => {
  const [step, setStep] = useState(1);

  return (
    <>
      <Modal
        className="normal-modal"
        show={props.uploadModal}
        onHide={props.handleUploadClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add From Spreadsheet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="spreedsheet-steps">
            <div className="spreadsheet-header">
              <div id="progress-bar-container">
                <ul>
                  <li className={step === 1 || step === 2 || step === 3 ? "step active" : "step"}>
                    <div className="step-inner">Preparation</div>
                  </li>
                  <li className={step == 2 || step === 3 ? "step active" : "step"}>
                    <div className="step-inner">Properties</div>
                  </li>
                  <li className={step === 3 ? "step active" : "step"}>
                    <div className="step-inner">Confirm & Upload</div>
                  </li>
                </ul>
                <div id="line">
                  <div id="line-progress"></div>
                </div>
              </div>
            </div>
            <div className="spreed-sheet-content">
              {step === 1 && (
                <Preparation
                  step={step}
                  closeModal={props.handleUploadClose}
                  setStep={setStep}
                />
              )}
              {step === 2 && <Properties step={step} setStep={setStep} />}
              {step === 3 && <ConfirmUpload step={step} setStep={setStep} />}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UploadSpreadsheetModal;
