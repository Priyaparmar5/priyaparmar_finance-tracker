import { useEffect } from "react";
import { Outlet, Navigate, useNavigate, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import ViewData from "../pages/ViewData";
//import ViewDetail from "../pages/ViewDetail";
import AddTransaction from "../pages/AddTransaction";
import Table from "../pages/Table";
import { Cookies } from "react-cookie";

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const authToken = cookies.get("name");

  useEffect(() => {
    if (!authToken) {
      navigate("/public/login");
    }
  }, []);
  return (
    <>
      {authToken && (
        <Routes>
          <Route path="/ViewData" element={<ViewData />}></Route>
          {/* <Route path="/table" element={<Table />}></Route> */}
          {/* <Route path="/view/:id" element={<ViewDetail />}></Route> */}
          <Route path="/add" element={<AddTransaction />}></Route>
          <Route path="/add/:id" element={<AddTransaction />}></Route>
          
          <Route path="/*" element={<Navigate to="/ViewData" replace />} />
        </Routes>
      )}
    </>
  );
  // return authToken ? <Outlet /> : <Navigate to={"/ViewData"} />
};
export default ProtectedRoutes;
