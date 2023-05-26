import { useEffect } from "react";
import {Outlet,Route,Routes, Navigate,useNavigate} from "react-router-dom";
import Login from '../pages/login/Login'
import Registration from '../pages/register/Registration'

const Unauth =() =>{
    const navigate = useNavigate();
    const authToken = localStorage.getItem("token");

    useEffect(() => {
        if (authToken) {
            navigate("/ViewData");
        }   
         //eslint-disable-next-line       
    }, []);

  return (
       <>
            {!authToken && (
                <Routes>
                    <Route path='/login' Component={Login} />
                    <Route path='/registration' Component={Registration} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            )}
        </>
    
  )
}

export default Unauth
