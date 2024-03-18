import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSilce";

const Mark = ({ onClose }) => {
  const [formData, setFormData] = useState({});
  console.log(formData);
  const [errorMessage, setErrorMessage] = useState(null);
  const [EmpId, setEmpId] = useState("");
  const [time] = useState("8.00Am-8.00Pm");
  const [price] = useState("2000");
  const [notification, setNotification] = useState(null);
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  //get chang every input valu
  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  //add employee
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const allDetails = {
        EmployeId: currentUser._id,
        time: time,
        price: price,
      };

      const res = await fetch("/api/employe/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(allDetails),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      if (res.ok) {
        setErrorMessage(false);

        setNotification("success");
        setTimeout(() => {
          handleSignout();
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  //add absent
  const handlSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/employe/absent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      if (res.ok) {
        setErrorMessage(false);

        setNotification("success");
        setTimeout(() => {
          handleSignout();
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-50 z-40"></div>

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 shadow-lg rounded-lg p-4 text-white  z-50">
        <div className="overflow-y-auto max-h-[350px]">
          <div className="mb-4">
            <form onSubmit={handleSubmit}>
              <div className="mt-4  ">
                <input
                  className=" bg-slate-100  text-black p-3 rounded-lg w-[460px] h-11 mb-4"
                  type="text"
                  placeholder="time"
                  id="time"
                  value={time}
                  readOnly
                />
              </div>

              <div className="mt-4  ">
                <input
                  className="bg-slate-100 text-black p-3 rounded-lg w-[460px] h-11 mb-4"
                  type="text"
                  placeholder="price"
                  id="price"
                  value={price}
                  readOnly
                />
              </div>

              <div className="flex justify-center items-center gap-6 ">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                  submit
                </button>
                <button
                  onClick={handleSignout}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Close
                </button>
              </div>
            </form>
            <form onSubmit={handlSubmit}>
              <div className="mt-4  ">
                <h1>Absent Form</h1>
                <input
                  className=" bg-slate-100  text-black p-3 rounded-lg w-[460px] h-11 mb-4"
                  type="email"
                  placeholder="Email"
                  id="Email"
                  onChange={handlchange}
                />
              </div>

              <div className="mt-4  ">
                <input
                  className="bg-slate-100 text-black p-3 rounded-lg w-[460px] h-11 mb-4"
                  type="text"
                  placeholder="Phone"
                  id="Phone"
                  onChange={handlchange}
                />
              </div>
              <div className="mt-4  ">
                <textarea
                  className="bg-slate-100 text-black p-3 rounded-lg w-[460px] h-11 mb-4"
                  type="text"
                  placeholder="descritpion"
                  id="desc"
                  onChange={handlchange}
                />
              </div>

              <div className="flex justify-center items-center gap-6 ">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                  submit
                </button>
                <button
                  onClick={handleSignout}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {notification && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-50 z-50"></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <div>
              <div className=" bg-white   w-60 h-56 rounded-md   ">
                <h1 className="text-slate-900 flex justify-center items-cente text-center py-[40%] font-serif text-3xl">
                  {notification}
                </h1>
              </div>
            </div>
          </div>
        </>
      )}

      <div className=" text-center">
        {errorMessage && (
          <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center ">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default Mark;
