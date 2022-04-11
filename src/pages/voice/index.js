import { useState } from "react"
import ChatBoot from "../../components/text/chatBoot";
import VoiceModal from "../../models/VoiceModal";


const Voice = () => {
  const [openMessageModal, setOpenMessageModal] = useState(false)
  const handleNewMessage = () => { setOpenMessageModal(true) }
  const handleCloseMessageModal = () => { setOpenMessageModal(false) }
  return (
      <div className="content-page-layout text-page-content">
        <div className="page-header justify-flex-end">
            <button type="button" className="btn btn-medium btn-primary" onClick={handleNewMessage}>New Voice</button>
        </div> 
        <div className="text-main-section">
          <ChatBoot />
        </div>
        <VoiceModal  
          open={openMessageModal} 
          handleCloseMessageModal={handleCloseMessageModal} 
        />
      </div>
  )
}

export default Voice 