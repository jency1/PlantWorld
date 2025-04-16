import { createContext, useState, useContext } from "react";

// NotificationContext with default values
export const NotificationContext = createContext({
  showNotification: (message, type) => {},
});

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);

  // Show a notification
  const showNotification = (message, type = "info") => {
    setNotification({ message, type });

    // Auto-dismiss the notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Context value to share the function with children
  const contextValue = {
    showNotification,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      {notification && (
        <div
          className={`fixed top-5 right-5 px-4 py-2 rounded-md shadow-md text-white z-50 transition-all duration-300
          ${
            notification.type === "error"
              ? "bg-red-500"
              : notification.type === "success"
              ? "bg-green-500"
              : "bg-blue-500"
          }`}
        >
          {notification.message}
        </div>
      )}
    </NotificationContext.Provider>
  );
}

// Custom hook to use NotificationContext
export function useNotification() {
  return useContext(NotificationContext);
}
