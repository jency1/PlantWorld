const BASE_URL = import.meta.env.VITE_BASE_URL;

export default async function deliveryPartnerAction({ request }) {
  const formData = await request.formData();

  const name = formData.get("name")?.trim();
  const email = formData.get("email")?.trim();
  const phoneNumber = formData.get("phoneNumber")?.trim();

  // Frontend validation before request
  if (!name) return { error: "Full Name is required" };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { error: "Valid Email is required" };
  if (!phoneNumber || !/^\d{10}$/.test(phoneNumber))
    return { error: "Phone number must be 10 digits" };

  const data = {
    name,
    email,
    phoneNumber,
    password: "12345678", // default password
    passwordConfirm: "12345678",
  };

  try {
    const adminToken = localStorage.getItem("adminToken");

    const res = await fetch(`${BASE_URL}/api/users/add-delivery-partner`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      // Map backend errors to friendly messages
      if (
        result.message?.includes("duplicate") ||
        result.message?.includes("exists")
      ) {
        return { error: "Email or phone number already exists" };
      }
      return { error: result.message || "Failed to add delivery partner" };
    }

    return { success: "Delivery Partner added successfully!" };
  } catch (err) {
    console.error("Delivery Partner error:", err);
    return { error: err.message || "Something went wrong." };
  }
}
