export const formatDateWithDay = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-GB", {
    weekday: "long", // e.g., Sunday
    day: "2-digit", // 22
    month: "2-digit", // 06
    year: "numeric", // 2025
  });
};
