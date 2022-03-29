import { useCallback, useState } from "react";
import { Modal } from "react-bootstrap";
import ConfirmUpload from "../components/contacts/wizard-form/ConfirmUpload";
import Preparation from "../components/contacts/wizard-form/Preparation";
import Properties from "../components/contacts/wizard-form/Properties";
import Papa from "papaparse";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

const UploadSpreadsheetModal = (props) => {
  const [step, setStep] = useState(1);
  const [csvFile, setCsvFile] = useState(null);
  const [csvData, setCsvData] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    var formData = new FormData();
    formData.append("file", acceptedFiles[0].name);
    formData.get("file");
    Papa.parse(acceptedFiles[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setCsvData(results.data);
      },
    });
    if (acceptedFiles[0].type !== "text/csv") {
      toast.error("Sorry, thats not a valid CSV file");
      setIsFilePicked(false);
    } else {
      setCsvFile(acceptedFiles[0].name);
      setIsFilePicked(true);
    }
  }, []);

  const handleCsvState = () => {
    setCsvFile(null);
  };

  const handleClose = () => {
    setStep(1);
    setCsvFile(null);
    props.handleUploadClose();
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <Modal
        className="normal-modal"
        show={props.uploadModal}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add From Spreadsheet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="spreedsheet-steps">
            <div className="spreadsheet-header">
              <div id="progress-bar-container">
                <ul>
                  <li
                    className={
                      step === 1 || step === 2 || step === 3
                        ? "step active"
                        : "step"
                    }
                  >
                    <div className="step-inner">Preparation</div>
                  </li>
                  <li
                    className={
                      step === 2 || step === 3 ? "step active" : "step"
                    }
                  >
                    <div className="step-inner">Properties</div>
                  </li>
                  <li className={step === 3 ? "step active" : "step"}>
                    <div className="step-inner">Confirm & Upload</div>
                  </li>
                </ul>
                <div id="line">
                  <div
                    id="line-progress"
                    className={
                      step === 1
                        ? "onethirdPart"
                        : step === 2
                        ? "halfPart"
                        : "fullBarPart"
                    }
                  ></div>
                </div>
              </div>
            </div>
            <div className="spreed-sheet-content">
              {step === 1 && (
                <Preparation
                  step={step}
                  closeModal={props.handleUploadClose}
                  setStep={setStep}
                  getInputProps={getInputProps()}
                  getRootProps={getRootProps()}
                  csvFile={csvFile}
                  isFilePicked={isFilePicked}
                />
              )}
              {step === 2 && (
                <Properties step={step} setStep={setStep} tableData={csvData} />
              )}
              {step === 3 && (
                <ConfirmUpload
                  step={step}
                  setStep={setStep}
                  fileName={csvFile}
                  handleFinish={props.handleFinish}
                  handleCsvState={handleCsvState}
                />
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UploadSpreadsheetModal;
