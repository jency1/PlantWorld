import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { MdEdit } from "react-icons/md";

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="pb-5 relative flex justify-center items-center bg-[#ecffed]">
      <div className="flex flex-col w-[85%] md:w-[80%] lg:max-w-[55%] rounded-[10px] mt-10 md:mt-8 mb-5 p-6 lg:p-10">
        <h2 className="text-success font-bold text-xl md:text-3xl text-center mb-8 font-serif">
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
                  <div title="Edit Name">
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
                  <div title="Edit Phone Number">
                    <MdEdit className="text-green-600 cursor-pointer hover:text-green-800" />
                  </div>
                </td>
              </tr>

              <tr className="border-t border-green-200">
                <td className="py-3 px-5">Total Orders</td>
                <td className="py-3 px-5">{user?.orders?.length || 0}</td>
                <td className="py-3 px-5 text-gray-400">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
