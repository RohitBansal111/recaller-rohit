import React from "react";
import { Button, Modal } from "react-bootstrap";
import makeAnimated from "react-select/animated";
import CreateTemplateModal from "./CreateTemplateModal";

const animatedComponents = makeAnimated();

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
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                >
                  <p>{props.templateDataState}</p>
                </div>
                <div
                  class="tab-pane fade"
                  id="v-pills-profile"
                  role="tabpanel"
                  aria-labelledby="v-pills-profile-tab"
                >
                  <p>
                    2 Hi . It's NH from Natures Harvest-Apparel. We would really
                    appreciate it if you could take a minute to respond to our
                    review request. Your feedback means a lot to us.
                  </p>
                </div>
                <div
                  class="tab-pane fade"
                  id="v-pills-messages"
                  role="tabpanel"
                  aria-labelledby="v-pills-messages-tab"
                >
                  <p>
                    3 Hi . It's NH from Natures Harvest-Apparel. We would really
                    appreciate it if you could take a minute to respond to our
                    review request. Your feedback means a lot to us.
                  </p>
                </div>
                <Modal.Footer>
                  <div className="manage-modal-action">
                    <Button
                      variant="secondary"
                      onClick={props.handleCloseManageTemplateModal}
                    >
                      Remove
                    </Button>
                    <div className="right-actions">
                      <Button
                        className="btn-primary-outline"
                        variant="outlined"
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
                </Modal.Footer>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ManageTemplateModal;
