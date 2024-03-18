import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import ViewEmploye from "./pages/ViewEmploye";
import UdpdateEmloye from "./pages/updateEmploye";
import Attend from "./pages/Attend";
import Absent from "./pages/Absent";
import Dash from "./components/DashProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/attend" element={<Attend />} />

        <Route element={<PrivateRoute />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/view" element={<ViewEmploye />} />
          <Route path="/update-emp/:EploId" element={<UdpdateEmloye />} />
          <Route path="/absent" element={<Absent />} />
          <Route path="/profile" element={<Dash />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
