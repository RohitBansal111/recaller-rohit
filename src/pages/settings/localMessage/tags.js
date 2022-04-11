import { useState } from "react";
import CreateTagModal from "../../../components/settings/createTagModal"
import ConversationTagsTable from "../../../components/settings/tags-table"

const ConversationTags = () => {
    const [openCreateTagModal, setOpenCreateTagModal] = useState(false);

    const openCTModal = () => { setOpenCreateTagModal(true) }
    const handleCloseCTModal = () => { setOpenCreateTagModal(false) }

  return (
    <div className="content-page-layout">
        <div className="page-header subheading-bar">
            <div className="header-text">
                <h1>Settings</h1>
                <p>Setting / Text / Conversation Tags</p>
            </div>
            <div className="header-action">
                <button type="button" className="btn btn-primary" onClick={openCTModal}>Create Tag</button>
            </div>
        </div>
        <div className="setting-page-main">
            <ConversationTagsTable />
        </div>
        <CreateTagModal open={openCreateTagModal} handleCloseCTModal={handleCloseCTModal} />
    </div>
  ) 
}

export default ConversationTags