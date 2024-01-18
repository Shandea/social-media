import React from 'react'
import "./NotificationModal.css"
import Notification from '../../pages/mainContainer/body/notification/NotificationView'

const NotificationModal = () => {
  return (
  <>
  <div className="notificationmodalmain">
    <div className="notificationmodalheader"><h1>Notifications</h1></div>
<Notification /> 
  </div>
  </>
  )
}

export default NotificationModal
