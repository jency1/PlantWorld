import React, { useContext } from "react";
import { DP_AuthContext } from "../../context/DP/DP_AuthContext";

export default function DP_Profile() {
  const { dp } = useContext(DP_AuthContext);

  return (
    <>
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
                  <td className="py-3 px-5">
                    {dp?.name || "Delivery Partner"}
                  </td>
                </tr>

                <tr className="border-t border-green-200">
                  <td className="py-3 px-5">Email</td>
                  <td className="py-3 px-5">{dp?.email || "Not provided"}</td>
                </tr>

                <tr className="border-t border-green-200">
                  <td className="py-3 px-5">Mobile</td>
                  <td className="py-3 px-5">
                    {dp?.phoneNumber || "Not provided"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Default Password Note */}
      <div className="w-full mx-auto max-w-lg md:max-w-2xl lg:max-w-3xl p-3 border border-yellow-300 bg-yellow-50 rounded-lg text-center md:text-left">
        <p className="text-xs md:text-base text-yellow-800 leading-relaxed">
          ⚠️ <span className="font-semibold">Important:</span> Your default
          password is{" "}
          <span className="font-mono bg-yellow-200 px-1 rounded">12345678</span>
          . For your security, please update it as soon as possible.
        </p>
      </div>
    </>
  );
}
