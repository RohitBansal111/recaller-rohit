import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import EditTagModal from "../settings/EditTagModal";
import CreateTagModal from "../../components/settings/createTagModal";
import DeleteTagsModal from "../../models/deleteTagsModal";

const ConversationTagModal = ({ open, handleCloseManageModal, ...props }) => {
  return (
    <>
      <Modal open={open} onClose={handleCloseManageModal} center>
        <div className="modal-header">
          <h3>Campaign Tags</h3>
        </div>
        <div className="modal-body">
          <form className="main-form">
            <div className="w-100 flexFull tagsField">
              <ul>
                {props.tags
                  ? props.tags.map((item) => (
                      <li>
                        <span
                          style={{ borderColor: item.color, color: item.color }}
                        >
                          {" "}
                          <LocalOfferIcon
                            style={{ fill: "green !important" }}
                          />{" "}
                          {item.name}
                        </span>
                        <div className="tags-actions">
                          <EditIcon
                            titleAccess="Edit"
                            onClick={() => props.handleEditTag(item)}
                          />
                          <DeleteIcon
                            titleAccess="Delete"
                            onClick={() => props.handleDelModal(item)}
                          />
                        </div>
                      </li>
                    ))
                  : []}
              </ul>
            </div>
            <div className="field-group flexFull text-center mt-3">
              <button
                type="button"
                className="btn btn-cancel me-3"
                onClick={handleCloseManageModal}
              >
                {" "}
                Dismiss{" "}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={props.handleCMModal}
              >
                {" "}
                Create Tag{" "}
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <EditTagModal
        open={props.openEditTagModal}
        handleCloseETModal={props.handleCloseETModal}
        handleChange={props.handleEditChange}
        handleEdit={props.handleEdit}
        editTags={props.editTags}
      />
      <CreateTagModal
        open={props.openCTM}
        handleCloseCTModal={props.handleCloseCTModal}
        addTags={props.addTags}
        handleChange={props.handleChange}
        handleClick={props.handleClick}
        errors={props.errors}
      />
      <DeleteTagsModal
        showDeleteTagModal={props.showDeleteTagModal}
        handleDeleteTagsData={props.handleDeleteTags}
        handleCloseDeleteModal={props.handleCloseDeleteModal}
      />
    </>
  );
};

export default ConversationTagModal;
