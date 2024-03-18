import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { EploId } = useParams();

  useEffect(() => {
    try {
      const fetchouse = async () => {
        const res = await fetch(`/api/employe/getEmploye?eploId=${EploId}`);
        const data = await res.json();
        console.log("data", data);

        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          const selectedemp = data.Empp.find(
            (Employe) => Employe._id === EploId
          );
          if (selectedemp) {
            setFormData(selectedemp);
          }
        }
      };
      fetchouse();
    } catch (error) {
      console.log(error.message);
    }
  }, [EploId]);

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/employe/updateEmploye/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.message);
        return;
      }

      if (res.ok) {
        setErrorMessage(null);
        navigate(`/view`);
      }
    } catch (error) {
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <h3 className="font-semibold text-slate-400 ml-1">Email</h3>
              <input
                className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handlchange}
                value={formData.email}
              />
            </div>
            <div>
              <h3 className="font-semibold text-slate-400 ml-1">Password</h3>
              <input
                className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="password"
                placeholder="Password"
                id="password"
                onChange={handlchange}
                value={formData.password}
              />
            </div>
            <button
              className=" bg-blue-700 text-white p-3 rounded-lg w-[460px] h-11 hover:opacity-90"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <sapn className="pl-3">Loading...</sapn>
                </>
              ) : (
                "Add Employee"
              )}
            </button>
          </form>

          {errorMessage && (
            <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center ">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
