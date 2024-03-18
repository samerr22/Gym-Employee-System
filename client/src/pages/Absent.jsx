import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

export default function Absent() {
  const { currentUser } = useSelector((state) => state.user);
  const [ABsnt, setABsnt] = useState([]);

  const [EmpIdToDelete, setempIdToDelete] = useState("");

  //get employee
  useEffect(() => {
    const fetchEmploy = async () => {
      try {
        const res = await fetch(`/api/employe/getabsent`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setABsnt(data.ABsnt);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchEmploy();
  }, []);

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <>
        <table className="w-full divide-y divide-gray-200 shadow-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Description
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ABsnt.map((Employe) => (
              <tr
                key={Employe._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <td className="px-6 py-4 whitespace-nowrap">{Employe.Email}</td>

                <td className="px-6 py-4 whitespace-nowrap">{Employe.Phone}</td>
                <td className="px-6 py-4 whitespace-nowrap  truncate w-[100px] ">
                  {Employe.desc}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-red-500 hover:underline cursor-pointer">
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    </div>
  );
}
