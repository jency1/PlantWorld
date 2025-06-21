export default async function resetPasswordAction({ request, params }) {
  const token = params.token;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const formData = await request.formData();
  const password = formData.get("password");
  const passwordConfirm = formData.get("passwordConfirm");

  if (password !== passwordConfirm) {
    return { error: "Passwords do not match" };
  }

  try {
    const response = await fetch(
      `${BASE_URL}/api/users/resetPassword/${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, passwordConfirm }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || "Reset failed. Try again later!" };
    }

    return { success: true };
  } catch (error) {
    return { error: "Something went wrong. Try again later!" };
  }
}
