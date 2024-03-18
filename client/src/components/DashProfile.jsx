import "react-circular-progressbar/dist/styles.css";
import { signoutSuccess } from "../redux/user/userSilce";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function DashProfile() {
  const dispatch = useDispatch();

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
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>

      <div className="flex gap-9">
        <Link to="/sign-up" className="text-blue-500">
          Add Employee
        </Link>
        <Link to="/view" className="text-blue-500">
          View All Employe
        </Link>
        <Link to="/absent" className="text-blue-500">
          absent all
        </Link>
      </div>

      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={handleSignout} className="cursor-pointer">
          Sign Out
        </span>
      </div>
    </div>
  );
}
