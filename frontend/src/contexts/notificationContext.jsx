import React, { createContext, useState, useContext, useMemo } from 'react';
const NotificationContext = createContext()
import PropTypes from 'prop-types'

export const useNotificationContext = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const handleNotification = (message) => {
    setNotification({
        message: message.details,
        type: message.type
    });
  };

  const clearNotification = () => {
    setNotification(null);
  };

  const contextValue = useMemo(
    () => ({ notification, handleNotification, clearNotification }),
    [notification]
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};
