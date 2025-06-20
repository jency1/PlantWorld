const BASE_URL = import.meta.env.VITE_BASE_URL;

export default async function contactFormAction({ request }) {
  const formData = await request.formData();

  const data = {
    name: formData.get("username"),
    email: formData.get("email"),
    contactNumber: formData.get("contactNumber"),
    message: formData.get("message"),
  };

  try {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      return { error: "Failed to send message. Please try again later!" };
    }

    return { success: "Message sent successfully!" };
  } catch (err) {
    console.error("Contact Message error:", err);
    return { error: err.message || "Something went wrong." };
  }
}
