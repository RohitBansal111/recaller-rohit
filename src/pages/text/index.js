import { useState } from "react"
import MessageModal from "../../components/text/messageModal"
import ChatBoot from "../../components/text/chatBoot";


const TextPage = () => {
  const [openMessageModal, setOpenMessageModal] = useState(false)
  const handleNewMessage = () => { setOpenMessageModal(true) }
  const handleCloseMessageModal = () => { setOpenMessageModal(false) }
  return (
      <div className="content-page-layout">
        <div className="page-header">
            <h1>Text</h1>
            <button type="button" className="btn btn-medium btn-primary" onClick={handleNewMessage}>New Message</button>
        </div> 
        <div className="text-main-section">
          <ChatBoot />
        </div>
        <MessageModal 
          open={openMessageModal} 
          handleCloseMessageModal={handleCloseMessageModal} 
        />
      </div>
  )
}

export default TextPage 