import { useEffect } from "react";
import {Outlet, Navigate,useNavigate,Route,Routes} from "react-router-dom";
import Login from '../components/Login'
import TransactionForm from '../components/TransactionForm';
import ViewData from '../components/ViewData';
import ViewDetail from '../components/ViewDetail.js';
import Pagination from '../components/Pagination';
import Registration from '../components/Registration';
import Search from '../components/Search';

const ProtectedRoutes = () => {
    const navigate = useNavigate();
    const authToken = localStorage.getItem("token");

    useEffect(() => {
        if (!authToken) {
          navigate("/public/login");
        }
      }, []);
      return (
        <>
             {authToken && (
                 <Routes>
                      
                      <Route path="/add" element={<TransactionForm />}/>
                      <Route path='/add/:id' element={<TransactionForm />}/>
                      <Route path="/search" element={<Search />}/>
                      <Route path="/ViewData" element={<ViewData />}/>
                      <Route path="/transaction/viewDetail" element={<ViewDetail />}/>
                      <Route path="/page?" element={<Pagination />}/>
                      <Route path="/*" element={<Navigate to="/ViewData" replace />} />
                 </Routes>
             )}
         </>
     
   )
    // return authToken ? <Outlet /> : <Navigate to={"/ViewData"} />
}
export default ProtectedRoutes