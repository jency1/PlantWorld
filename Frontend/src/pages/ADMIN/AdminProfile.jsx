import React, { useContext } from "react";
import { AdminAuthContext } from "../../context/ADMIN/AdminAuthContext";

export default function AdminProfile() {
  const { admin } = useContext(AdminAuthContext);

  return (
    <div className="pb-5 relative flex items-center">
      <div className="flex flex-col w-[85%] md:w-[80%] lg:max-w-[55%] rounded-[10px] mb-5 p-6 lg:p-10">
        <div className="overflow-x-auto md:m-2">
          <table className="min-w-full text-xs md:text-base border border-green-200 rounded overflow-hidden">
            <thead className="font-semibold">
              <tr>
                <th className="py-3 px-5 text-left">Field</th>
                <th className="py-3 px-5 text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-green-200">
                <td className="py-3 px-5">Name</td>
                <td className="py-3 px-5">{admin?.name || "Admin"}</td>
              </tr>

              <tr className="border-t border-green-200">
                <td className="py-3 px-5">Email</td>
                <td className="py-3 px-5">{admin?.email || "Not provided"}</td>
              </tr>

              <tr className="border-t border-green-200">
                <td className="py-3 px-5">Mobile</td>
                <td className="py-3 px-5">
                  {admin?.phoneNumber || "Not provided"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
