import React, { useContext, useState } from "react";
import { MdEdit } from "react-icons/md";

import EditFieldDialog from "./EditFieldDialog";
import { AuthContext } from "../../../../context/CLIENT/AuthContext";
import { useNotification } from "../../../../context/NotificationContext";

export default function Profile() {
  const { user, token, setUser } = useContext(AuthContext);
  const { showNotification } = useNotification();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [dialog, setDialog] = useState({
    open: false,
    field: "",
    label: "",
    value: "",
  });

  const handleOpenDialog = (field, label, value) => {
    setDialog({ open: true, field, label, value });
  };

  const handleCloseDialog = () => {
    setDialog({ ...dialog, open: false });
  };

  const handleSave = async (field, value) => {
    try {
      // Trim leading/trailing spaces
      const trimmedValue = value.trim();

      // Validation for phone number
      if (field === "phoneNumber") {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(trimmedValue)) {
          return showNotification(
            "Phone number must be exactly 10 digits and numeric only.",
            "warning"
          );
        }
        if (trimmedValue === (user?.phoneNumber || "")) {
          return showNotification(
            "New phone number must be different.",
            "info"
          );
        }
      }

      // Validation for name
      if (field === "name") {
        if (trimmedValue === (user?.name || "").trim()) {
          return showNotification("New name must be different.", "info");
        }
        if (trimmedValue.length < 3) {
          return showNotification(
            "Name must be at least 3 characters long.",
            "warning"
          );
        }
      }

      const res = await fetch(`${BASE_URL}/api/users/updateMe`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ [field]: value }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update failed.");
      }

      showNotification("Profile updated successfully!", "success");

      // update local user state
      setUser((prev) => ({ ...prev, [field]: value }));
    } catch (err) {
      showNotification(err.message, "error");
    }
  };

  return (
    <div className="pb-5 relative flex justify-center items-center bg-[#ecffed]">
      <div className="flex flex-col w-[85%] md:w-[80%] lg:max-w-[55%] rounded-[10px] mb-5 p-6 lg:p-10">
        <h2 className="text-success font-bold text-xl mt-3 md:text-3xl text-center mb-8 font-serif">
          My Profile
        </h2>

        <div className="overflow-x-auto md:m-2">
          <table className="min-w-full text-xs md:text-base border border-green-200 rounded overflow-hidden">
            <thead className="font-semibold">
              <tr>
                <th className="py-3 px-5 text-left">Field</th>
                <th className="py-3 px-5 text-left">Details</th>
                <th className="py-3 px-5 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-green-200">
                <td className="py-3 px-5">Name</td>
                <td className="py-3 px-5">{user?.name || "User"}</td>
                <td className="py-3 px-5">
                  <div
                    title="Edit Name"
                    onClick={() =>
                      handleOpenDialog("name", "Name", user?.name || "")
                    }
                  >
                    <MdEdit className="text-green-600 cursor-pointer hover:text-green-800" />
                  </div>
                </td>
              </tr>

              <tr className="border-t border-green-200">
                <td className="py-3 px-5">Email</td>
                <td className="py-3 px-5">{user?.email || "Not provided"}</td>
                <td className="py-3 px-5 text-gray-400">—</td>
              </tr>

              <tr className="border-t border-green-200">
                <td className="py-3 px-5">Mobile</td>
                <td className="py-3 px-5">
                  {user?.phoneNumber || "Not provided"}
                </td>
                <td className="py-3 px-5">
                  <div
                    title="Edit Phone Number"
                    onClick={() =>
                      handleOpenDialog(
                        "phoneNumber",
                        "Phone Number",
                        user?.phoneNumber || ""
                      )
                    }
                  >
                    <MdEdit className="text-green-600 cursor-pointer hover:text-green-800" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <EditFieldDialog
          open={dialog.open}
          onClose={handleCloseDialog}
          label={dialog.label}
          field={dialog.field}
          value={dialog.value}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
