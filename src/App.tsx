import React from 'react';
import logo from './logo.svg';
import './App.css';
import Registration from './pages/register/Registration';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import AddTransaction from './pages/AddTransaction';
import ViewData from './pages/ViewData';
//import ViewDetail from './pages/ViewDetail';
//import { useNavigate } from 'react-router-dom';


const App :React.FC =() =>{
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Registration />} />    
    <Route path="/login" element={<Login />} />    
    <Route path="/add" element={<AddTransaction />} /> 
    <Route path="/add/:id" element={<AddTransaction />} />   
    {/* <Route path="/view/:id" element={<ViewDetail />} />      */}
    <Route path="/ViewData" element={<ViewData />} />   
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
