import React, { useState } from 'react'
import InfoIcon from '@material-ui/icons/Info';
import ClearIcon from '@material-ui/icons/Clear';

const NotificationBar = () => {
    const [notification, setNotification] = useState(true)
    const handleHideNotification = () => {
        setNotification(false)
    }
  return (
      <>
      {
        notification &&
        <div className='notification-bar'>
            <InfoIcon />
            <span>Click here to enable desktop notifications for OneLocal.</span>
            <ClearIcon onClick={handleHideNotification} />
        </div>
      }
      </>
  )
}

export default NotificationBar