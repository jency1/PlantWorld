import React, { useState } from "react";
import UpdatePassword from "./UpdatePassword";
import DeleteAccount from "./DeleteAccount";
import LockResetIcon from "@mui/icons-material/LockReset";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function Settings() {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="pb-2 relative flex justify-center items-center bg-[#ecffed]">
      <div className="flex flex-col w-[85%] md:w-[80%] lg:max-w-[55%] rounded-[10px] mb-[2rem] p-6 lg:p-10">
        <h2 className="text-success font-bold text-xl mt-3 md:text-3xl text-center mb-10 font-serif">
          Account Settings
        </h2>

        {/* Options */}
        <div className="flex justify-center gap-4 mt-2 mb-10 flex-wrap">
          {/* Update Password */}
          <button
            onClick={() =>
              setSelectedOption((prev) =>
                prev === "password" ? "" : "password"
              )
            }
            className={`flex items-center gap-2 px-3 py-2 rounded-md border transition-all text-sm md:text-base font-medium ${
              selectedOption === "password"
                ? "bg-success text-white"
                : "bg-green-200 text-green-800 hover:bg-green-300"
            }`}
          >
            <LockResetIcon fontSize="small" />
            Update Password
          </button>

          {/* Delete Account */}
          <button
            onClick={() =>
              setSelectedOption((prev) => (prev === "delete" ? "" : "delete"))
            }
            className={`flex items-center gap-2 px-3 py-2 rounded-md border transition-all text-sm md:text-base font-medium ${
              selectedOption === "delete"
                ? "bg-danger text-white"
                : "bg-red-100 text-red-800 hover:bg-red-200"
            }`}
          >
            <DeleteForeverIcon fontSize="small" />
            Delete Account
          </button>
        </div>

        {/* Render selected section */}
        {selectedOption === "password" && <UpdatePassword />}

        {selectedOption === "delete" && <DeleteAccount />}

        {!selectedOption && (
          <p className="text-center text-gray-500 text-xs md:text-sm lg:text-base">
            Please select an option above to manage your account.
          </p>
        )}
      </div>
    </div>
  );
}
