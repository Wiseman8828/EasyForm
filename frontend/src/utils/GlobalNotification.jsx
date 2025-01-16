import React from 'react';
import { useNotificationContext } from '../contexts/notificationContext';
import { FaTimesCircle } from 'react-icons/fa'; // Import icon
import "../styles/Notification.css"

const GlobalNotification = () => {
  const { notification, clearNotification } = useNotificationContext();

  if (!notification) return null;

  return (
    <div className={`notification-popup popup-${notification.type}`}>
      <div className="notification-content">
        <p className="notification-message">{notification.message}</p>
        <button onClick={clearNotification} className="notification-close-btn">
          <FaTimesCircle size={20} />
        </button>
      </div>
    </div>
  );
};

export default GlobalNotification;

