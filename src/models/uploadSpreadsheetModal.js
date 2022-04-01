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
  const [selectedType, setSelectedType] = useState(null);
  const [selectMapValue, setSelectMapValue] = useState(null);
  const [selectedName, setSelectedName] = useState("name");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [mapArray, setMapArray] = useState("");
  const [errors, setErrors] = useState({});
  const [errorsSelectMap, setSelectMapErrors] = useState({});

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

  const onRadioChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleClose = () => {
    setStep(1);
    setCsvFile(null);
    setSelectedPhone(null);
    setSelectedEmail(null);
    setSelectedName(null);
    props.handleUploadClose();
  };

  const handleSelectChange = (e) => {
    setSelectMapValue(e.target.value);
    setSelectMapErrors({});
  };

  const handleCsvdataCheck = () => {
    const arr = [];
    csvData.map((item) => {
      const obj = {
        [selectedName]: item.name,
        [selectedPhone]: item.phone,
        [selectedEmail]: item.email,
      };
      return arr.push(obj);
    });
    setMapArray(arr);
  };

  const isValid = () => {
    let formData = true;
    switch (true) {
      case selectedName &&
        (selectedName === selectedPhone || selectedName === selectedEmail):
        toast.error("Cannot map multiple columns to the same property ");
        formData = false;
        break;
      case selectedPhone &&
        (selectedPhone === selectedName || selectedPhone === selectedEmail):
        toast.error("Cannot map multiple columns to the same property ");
        formData = false;
        break;
      case selectedEmail &&
        (selectedEmail === selectedName || selectedEmail === selectedPhone):
        toast.error("Cannot map multiple columns to the same property ");
        formData = false;
        break;
      case !selectedPhone:
        setErrors({ selectedPhone: "please fill out this field" });
        formData = false;
        break;
      case !selectedEmail:
        setErrors({ selectedEmail: "please fill out this field" });
        formData = false;
        break;
      case selectedEmail && selectMapValue === null:
        setSelectMapErrors({
          selectMapErrors:
            "Please fill out this field. Options are available once required fields are mapped above.",
        });
        formData = false;
        break;
      default:
        formData = true;
    }
    return formData;
  };

  const handleSubmit = () => {
    handleCsvdataCheck();
    if (isValid()) {
      setStep(step + 1);
    }
  };

  const handleNameChange = (e) => {
    setSelectedName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setSelectedEmail(e.target.value);
    setErrors({});
  };
  const handlePhoneChange = (e) => {
    setSelectedPhone(e.target.value);
    setErrors({});
  };

  const nextStep = () => {
    setStep(step + 1);
    setSelectedPhone(null);
    setSelectedEmail(null);
    setSelectedName(null);
  };

  const backStep = () => {
    setStep(step - 1);
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
                  nextStep={nextStep}
                />
              )}
              {step === 2 && (
                <Properties
                  step={step}
                  setStep={setStep}
                  tableData={csvData}
                  onRadioChange={onRadioChange}
                  handleSelectChange={handleSelectChange}
                  handleNameChange={handleNameChange}
                  handlePhoneChange={handlePhoneChange}
                  handleEmailChange={handleEmailChange}
                  selectedEmail={selectedEmail}
                  selectedName={selectedName}
                  selectedPhone={selectedPhone}
                  errors={errors}
                  errorsSelectMap={errorsSelectMap}
                  handleSubmit={handleSubmit}
                />
              )}
              {step === 3 && (
                <ConfirmUpload
                  step={step}
                  setStep={setStep}
                  fileName={csvFile}
                  handleFinish={props.handleFinish}
                  handleCsvState={handleCsvState}
                  data={csvData}
                  contactType={selectedType}
                  contactProperty={selectMapValue}
                  backStep={backStep}
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
