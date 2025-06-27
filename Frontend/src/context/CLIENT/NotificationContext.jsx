import { createContext, useState, useContext, useRef } from "react";

import {
  AiOutlineCheckCircle,
  AiOutlineInfoCircle,
  AiOutlineWarning,
  AiOutlineCloseCircle,
  AiOutlineClose,
} from "react-icons/ai";

// NotificationContext with default values
export const NotificationContext = createContext({
  showNotification: (message, type) => {},
});

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);
  const [progress, setProgress] = useState(100);
  const duration = 4000;

  const timerRef = useRef(null);
  const intervalRef = useRef(null);

  // Start progress countdown
  const startProgress = () => {
    let start = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(percent);
    }, 50);
  };

  // Clear timers
  const clearTimers = () => {
    clearTimeout(timerRef.current);
    clearInterval(intervalRef.current);
    setProgress(100);
  };

  const showNotification = (message, type = "info") => {
    clearTimers();
    setNotification({ message, type });
    startProgress();

    timerRef.current = setTimeout(() => {
      setNotification(null);
      setProgress(100);
    }, duration);
  };

  const closeNotification = () => {
    clearTimers();
    setNotification(null);
  };

  const contextValue = {
    showNotification,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      {notification && (
        <div
          key={notification.message}
          className={`fixed top-16 md:top-20 lg:top-24 right-3 md:right-5 w-56 md:w-64 lg:w-80 max-w-sm px-[0.5rem] md:px-[0.75rem] lg:px-[1rem] py-[0.6rem] lg:py-[0.8rem] rounded-md border border-black bg-white shadow-lg z-50 transition-opacity transform duration-300 opacity-100 translate-y-0 
            ${
              notification.type === "error"
                ? "text-red-500"
                : notification.type === "success"
                ? "text-green-500"
                : notification.type === "warning"
                ? "text-yellow-500"
                : "text-blue-500"
            }`}
        >
          {/* Top section: icon + message + close button */}
          <div className="flex justify-between items-center gap-2">
            {/* Image and text */}
            <div className="flex items-center gap-2">
              {/* icon */}
              {notification.type === "success" && (
                <AiOutlineCheckCircle className="text-green-500 w-5 h-5" />
              )}
              {notification.type === "info" && (
                <AiOutlineInfoCircle className="text-blue-500 w-5 h-5" />
              )}
              {notification.type === "warning" && (
                <AiOutlineWarning className="text-yellow-500 w-5 h-5" />
              )}
              {notification.type === "error" && (
                <AiOutlineCloseCircle className="text-red-500 w-5 h-5" />
              )}

              {/* <img src="/greenTick.jpg" alt="Success" className="w-auto h-5" /> */}

              {/* message */}
              <span className="flex-1 text-xs lg:text-sm font-medium break-words">
                {notification.message}
              </span>
            </div>

            {/* Close button */}
            <button
              onClick={closeNotification}
              className="text-black hover:text-gray-600 text-xs font-bold leading-none"
            >
              <AiOutlineClose className="w-4 h-4 lg:w-5 lg:h-5" />
              {/* <img
                src="/closeIcon.jpg"
                alt="Close"
                className="w-auto h-4 lg:h-5"
              /> */}
            </button>
          </div>

          {/* Progress bar */}
          <div className="w-full h-[2px] md:h-[3px] mt-2 bg-gray-200 rounded overflow-hidden">
            <div
              className={`h-full transition-all duration-100 ${
                notification.type === "error"
                  ? "bg-red-500"
                  : notification.type === "success"
                  ? "bg-green-500"
                  : notification.type === "warning"
                  ? "bg-yellow-500"
                  : "bg-blue-500"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}

// Custom hook
export function useNotification() {
  return useContext(NotificationContext);
}
