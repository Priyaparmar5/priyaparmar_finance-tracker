import { useEffect } from "react";
import {Outlet, Navigate,useNavigate,Route,Routes} from "react-router-dom";
import TransactionForm from '../components/TransactionForm';
import ViewData from '../components/ViewData';
import ViewDetail from '../components/ViewDetail.js';
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
                      <Route path="/transaction/viewDetail/:id" element={<ViewDetail />}/>
                    
                      <Route path="/*" element={<Navigate to="/ViewData" replace />} />
                 </Routes>
             )}
         </>
     
   )
    // return authToken ? <Outlet /> : <Navigate to={"/ViewData"} />
}
export default ProtectedRoutes
