const BASE_URL = import.meta.env.VITE_BASE_URL;

export default async function loginAction({ request }) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await fetch(`${BASE_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        error: data.message || "Login failed. Please check your credentials.",
      };
    }

    const { token, data: userData } = data;
    const user = userData?.user;

    if (!token || !user) {
      return { error: "Invalid server response. Try again." };
    }

    return { success: true, token, user };
  } catch (error) {
    console.error("Login error:", error);
    return {
      error: error.message || "Something went wrong. Please try again.",
    };
  }
}
