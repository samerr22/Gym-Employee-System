import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [Empp, setEmpp] = useState([]);
  console.log(Empp);
  const [EmpId, setEmpId] = useState("");
  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false);
  const [EmpIdToDelete, setempIdToDelete] = useState("");
  const [Employe, setEmploye] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  //total salary
  useEffect(() => {
    let sum = 0;
    Employe.forEach((detail, index) => {
      sum += detail.price;
      if (
        (index >= 29 && (index - 29) % 30 === 0) ||
        index === Employe.length - 1
      ) {
        // Display total price every 30th index or at the end of the array
        console.log(`Total price for ${index + 1} details: ${sum}`);
      }
    });
    setTotalPrice(sum);
  }, [Employe]);

  //get salary
  const EmployeId = EmpId ? EmpId : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/employe/getEmp/${EmployeId}`);
        const data = await response.json();
        console.log(data);

        if (response.ok) {
          setEmploye(data.Employe);
        } else {
          setEmploye([]);
        }
      } catch (error) {
        console.error("Error fetching bid data:", error);
      }
    };

    fetchData();
  }, [EmployeId]);

  //get employee
  useEffect(() => {
    const fetchEmploy = async () => {
      try {
        const res = await fetch(`/api/employe/getEmploye`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setEmpp(data.Empp);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchEmploy();
  }, []);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/employe/deletemp/${EmpIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setEmpp((prev) =>
          prev.filter((Employe) => Employe._id !== EmpIdToDelete)
        );
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //add popup window
  const handleCheckout = (id) => {
    setShowCheckoutPopup((prev) => ({
      ...prev,
      [id]: true,
    }));
    setEmpId(id);
  };

  // popup close
  const handleClosePopup = () => {
    setShowCheckoutPopup(false);
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <>
        <table className="w-full divide-y divide-gray-200 shadow-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Password
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Show Attendance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Edit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Empp.map((Employe) => (
              <tr
                key={Employe._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={Employe.profilePicture}
                    className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                  />
                </td>

                <td className="px-6 py-4 whitespace-nowrap">{Employe.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {Employe.password}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="px-6 py-4 whitespace-nowrap"
                    onClick={() => handleCheckout(Employe._id)}
                  >
                    show Attendanse
                  </button>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/update-emp/${Employe._id}`}
                    className="text-teal-500 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    onClick={() => {
                      setempIdToDelete(Employe._id);
                      handleDeleteUser();
                    }}
                    className="text-red-500 hover:underline cursor-pointer"
                  >
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>

      {showCheckoutPopup && (
        <div>
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-50 z-40"></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 shadow-lg rounded-lg p-4 text-white z-50">
            <div className="overflow-y-auto max-h-[350px]">
              {/* Popup window content */}
              {Employe.map((detail, index) => (
                <div className=" gap-6" key={index}>
                  <p>
                    Date:{" "}
                    {moment(detail.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </p>
                  <p>DayPirce: {detail.price}</p>
                  {index >= 29 && (index - 29) % 30 === 0 && (
                    <p className="text-red-600">This month:{totalPrice}</p>
                  )}

                  {index >= 29 && (index - 29) % 30 === 0 && (
                    <p className="text-red-600">next month</p>
                  )}

                  <hr className="bg-white w-full" />
                </div>
              ))}

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ml-16"
                onClick={handleClosePopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
