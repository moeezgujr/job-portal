// reducer.js
const initialState = {
    notifications: [],
    showNotifications: false,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_NOTIFICATION':
        return {
          ...state,
          notifications: [...state.notifications, action.payload],
        };
      case 'TOGGLE_NOTIFICATIONS':
        return {
          ...state,
          showNotifications: !state.showNotifications,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  