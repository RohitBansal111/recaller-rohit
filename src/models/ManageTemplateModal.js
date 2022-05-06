import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import makeAnimated from "react-select/animated";
import LoadingButton from "@mui/lab/LoadingButton";

const ManageTemplateModal = (props) => {
  return (
    <>
      <Modal
        className="normal-modal manageTem-modal"
        show={props.showManageeTemplateModal}
        onHide={props.handleCloseManageTemplateModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Message Templates</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="manage-template-body">
            <div class="d-flex align-items-start">
              <div
                class="nav flex-column nav-pills me-3"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <form class="main-form">
                  <div class="field-group flexFull searchField">
                    <input
                      type="text"
                      name="search"
                      class="form-control"
                      placeholder="Search by Template Name"
                      value=""
                    />
                    <div class="search-field"></div>
                  </div>
                </form>
                {props.templateDataTitle &&
                  props.templateDataTitle.map((item) => (
                    <button
                      class="nav-link active"
                      id="v-pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-home"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-home"
                      aria-selected="true"
                      onClick={() => props.handleTempShowClick(item)}
                    >
                      {item.title}
                    </button>
                  ))}
                <div className="create_new">
                  <button
                    type="button"
                    onClick={props.handleCreateTemplate}
                    className="btn"
                  >
                    + Create Message Template
                  </button>
                </div>
              </div>
              <div class="tab-content" id="v-pills-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="v-pills-messages"
                  role="tabpanel"
                  aria-labelledby="v-pills-messages-tab"
                >
                  {!props.editmanageTemplate ? (
                    <div
                      class="tab-pane fade show active"
                      id="v-pills-home"
                      role="tabpanel"
                      aria-labelledby="v-pills-home-tab"
                    >
                      <h2>{props.templateDataState.title}</h2>
                      <p>{props.templateDataState.message}</p>
                    </div>
                  ) : (
                    <div className="edit-manage-template">
                      <form className="main-form">
                        <div className="field-group flexFull">
                          <label>Template Name*</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter name"
                            name="title"
                            value={props.editTempData.title}
                            onChange={props.handleEditTempChange}
                          />
                          <span className="sort-hint">
                            e.g. Appointment Reminder
                          </span>
                          <span className="spanError"></span>
                        </div>
                        <div className="field-group flexFull">
                          <label>Select Dynamic Tag</label>
                          <select
                            className="form-control"
                            name="tempTags"
                            value={props.templateTags}
                            onChange={props.handleTemplateTagChange}
                          >
                            <option value={""}></option>
                            <option value={"[Employee First Name]"}>
                              [Employee First Name]
                            </option>
                            <option value={"[Employee Last Name]"}>
                              [Employee Last Name]
                            </option>
                          </select>
                        </div>
                        <div className="field-group flexFull">
                          <label>Message*</label>
                          <textarea
                            type="text"
                            className="form-control"
                            name="message"
                            value={props.editTempData.message}
                            onChange={props.handleEditTempChange}
                          ></textarea>
                          <span className="spanError"></span>
                        </div>
                      </form>
                    </div>
                  )}

                  <Modal.Footer>
                    {!props.editmanageTemplate ? (
                      <div className="manage-modal-action">
                        <Button
                          variant="secondary"
                          onClick={props.handleTempRemove}
                        >
                          Remove
                        </Button>
                        <div className="right-actions">
                          <Button
                            className="btn-primary-outline"
                            variant="outlined"
                            onClick={() =>
                              props.handleEditTemplate(props.templateDataState)
                            }
                          >
                            Edit
                          </Button>
                          <Button
                            variant="primary"
                            onClick={props.handleTempInsert}
                          >
                            Insert
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="page-footer">
                        <Button
                          variant="primary"
                          onClick={props.handleTempEditCancel}
                        >
                          Cancel
                        </Button>
                        <LoadingButton
                          type="button"
                          loadingPosition="center"
                          loading={props.loading}
                          className="btn btn-primary"
                          variant="contained"
                          onClick={props.handleTempEditSave}
                        >
                          Save
                        </LoadingButton>
                      </div>
                    )}
                  </Modal.Footer>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ManageTemplateModal;
