import { useEffect } from "react";
import {Outlet,Route,Routes, Navigate,useNavigate} from "react-router-dom";
import Login from '../pages/login/Login'
import Registration from '../pages/register/Registration'
import { Cookies } from 'react-cookie';


const Unauth =() =>{
    const navigate = useNavigate();
    const cookies = new Cookies();
    const authToken =  cookies.get('name') ;

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
                    <Route path='/login' element={<Login/>} />
                    <Route path='/registration' element={<Registration/>} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            )}
        </>
    
  )
}

export default Unauth
