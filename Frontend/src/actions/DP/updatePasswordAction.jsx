const BASE_URL = import.meta.env.VITE_BASE_URL;

export default async function updatePasswordAction({ request }) {
  const formData = await request.formData();

  const data = {
    passwordCurrent: formData.get("passwordCurrent"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
  };

  // Validation
  if (!data.passwordCurrent || !data.password || !data.passwordConfirm) {
    return { error: "All fields are required!" };
  }

  if (data.password.length < 8) {
    return { error: "New password must be at least 8 characters long!" };
  }

  if (data.password === data.passwordCurrent) {
    return { error: "New password and current password should be different!" };
  }

  if (data.password !== data.passwordConfirm) {
    return { error: "New password and confirm password do not match!" };
  }

  try {
    const dpToken = localStorage.getItem("dpToken");

    const res = await fetch(`${BASE_URL}/api/users/updateMyPassword`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${dpToken}`,
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json();

    if (!res.ok) {
      return { error: resData.message || "Failed to update password!" };
    }

    return { success: "Password updated successfully!" };
  } catch (err) {
    console.error("Update Password Error:", err);
    return { error: err.message || "Something went wrong!" };
  }
}
