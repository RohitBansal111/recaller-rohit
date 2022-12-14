import { useEffect, useRef, useState } from "react";
import { Modal } from "react-responsive-modal";
import DeleteIcon from "@material-ui/icons/Delete";
import { getCompaignApi } from "../api/compaign";
import SelectCampaign from "../components/contacts/selectCampaign";

const EditContactModal = ({ open, handleCloseContactModal, ...props }) => {
  const [compaigns, setCompaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState({
    value: props.editContact.compaignId
      ? props.editContact.compaignId.name
      : "",
    label: props.editContact.compaignId
      ? props.editContact.compaignId.name
      : "",
  });
  const [show, setShow]=useState(false)

  useEffect(() => {
    getContactCompaign();
    console.log("selected campaign :::", selectedCampaign);
  }, [open]);

  useEffect(() => {
    console.log("selected campaign :::", selectedCampaign);
  }, [selectedCampaign]);
  console.log("edit contact data ::::::", props);
  const getContactCompaign = async () => {
    let res = await getCompaignApi();
    if (res && res.data && res.data.status === 200) {
      let data = res.data.data.map(function (item) {
        return {
          value: item.name,
          label: item.name,
        };
      });

      setCompaigns(data);
      setSelectedCampaign({
        value: props.editContact.compaignId
          ? props.editContact.compaignId.name
          : "",
        label: props.editContact.compaignId
          ? props.editContact.compaignId.name
          : "",
      });
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleCloseContactModal}
      center
      closeOnOverlayClick={false}
    >
      <div className="modal-header">
        <h3>Edit Contact Details</h3>
      </div>
      <div className="modal-body">
        <form className="main-form">
          <div className="field-group flex2">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter first name"
              name="firstName"
              value={props.editContact.firstName}
              onChange={props.handleEditContactChange}
            />
          </div>
          <div className="field-group flex2">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter first name"
              name="lastName"
              value={props.editContact.lastName}
              onChange={props.handleEditContactChange}
            />
          </div>
          <div className="field-group flex2">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={props.editContact.email}
              disabled={true}
              onChange={props.handleEditContactChange}
            />
          </div>
          <div className="field-group flex2">
            <label>Subscription</label>
            <div className="foem-field-inner">
              <select
                className="form-control"
                name="emailSubs"
                value={props.editContact.emailSubs}
                onChange={props.handleEditContactChange}
              >
                <option value={"opted-in"}>Opted In</option>
                <option value={"opted-out"}>Opted Out</option>
              </select>
            </div>
          </div>
          <div className="field-group flex2">
            <label>Phone</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter phone"
              name="phone"
              value={props.editContact.phone}
              disabled={true}
              onChange={props.handleEditContactChange}
            />
          </div>
          <div className="field-group flex2">
            <label>Campaign</label>
            <SelectCampaign
              isClearable={true}
              onChange={setSelectedCampaign}
              options={compaigns}
              value={selectedCampaign}
              
            />
            {console.log('qq',selectedCampaign)}

            {
              show && <span className="spanError">Please Select Campaign</span>
            }
           

            {/* <div className="foem-field-inner">
            <input
                type="text"
                className="form-control"
                placeholder="Enter Campaign"
                name="compaign"
                value={props.editContact?props.editContact.compaign?props.editContact.compaign:props.editContact.compaignId?props.editContact.compaignId.name:'' :''}
                onChange={props.handleEditContactChange}
              />
            </div> */}
          </div>
          <div className="field-group flexFull text-center mt-5">
            <button
              type="button"
              className="btn btn-cancel me-3"
              onClick={() => {
                setShow(false);
                handleCloseContactModal()}}
            >
              {" "}
              Dismiss{" "}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={(e) =>{
                console.log('qq',selectedCampaign)
                if (
                  selectedCampaign.value == "" &&
                  selectedCampaign.label == ""
                ) {
                  setShow(true);
                } else {
                  setShow(false);

                  props.handleConDataEdit(
                    e,
                    selectedCampaign ? selectedCampaign.value : ""
                  )
                }
               }
              }
            >
              {" "}
              Save{" "}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditContactModal;
