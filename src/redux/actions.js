export const addNotification = (notification) => ({
    type: 'ADD_NOTIFICATION',
    payload: notification,
  });
  
  export const toggleNotifications = () => ({
    type: 'TOGGLE_NOTIFICATIONS',
  });