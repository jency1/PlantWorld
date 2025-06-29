import { createContext, useContext, useEffect, useState } from "react";
import { NotificationContext } from "./NotificationContext";
import { AdminAuthContext } from "./ADMIN/AdminAuthContext";

export const FaqContext = createContext({
  faqs: [],
  addFaq: ({ question, answer }) => {},
  fetchAllFaqs: () => {},
});

export function FaqContextProvider({ children }) {
  const [faqs, setFaqs] = useState([]);
  const { showNotification } = useContext(NotificationContext);
  const { adminToken, isAdminAuthenticated } = useContext(AdminAuthContext);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Fetch All FAQs
  const fetchAllFaqs = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/faqs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        showNotification("Failed to fetch FAQs.", "error");
        throw new Error(data.message || "Failed to fetch FAQs.");
      }

      setFaqs(data?.data?.faqs || []);
    } catch (err) {
      console.error("Error fetching FAQs:", err);
      showNotification("Error fetching FAQs.", "error");
    }
  };

  // Add FAQ
  const addFaq = async ({ question, answer }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/faqs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ question, answer }),
      });

      const data = await response.json();
      //   console.log("Faqs Data: ", data);

      if (!response.ok) {
        showNotification("Failed to add FAQ.", "error");
        throw new Error(data.message || "Failed to add FAQ.");
      }

      showNotification("FAQ added successfully.", "success");
      fetchAllFaqs();
    } catch (err) {
      console.error("Error adding FAQ:", err);
      showNotification("Error adding FAQ.", "error");
    }
  };

  // Fetch FAQs on mount if authenticated
  useEffect(() => {
    if (isAdminAuthenticated) {
      fetchAllFaqs();
    }
  }, [isAdminAuthenticated]);

  return (
    <FaqContext.Provider value={{ faqs, addFaq, fetchAllFaqs }}>
      {children}
    </FaqContext.Provider>
  );
}
