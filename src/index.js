import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';

import Unauth from './Services/Unauth'
import ProtectedRoutes from './Services/ProtectedRoutes';
import {TransactionContext} from "../src/context/TransactionContext"
//import EditTransaction from './components/EditTransaction';


export default function App()
{
  return(
    <TransactionContext>
    <BrowserRouter>
    <Routes>
    <Route path="/public/*" element={<Unauth/>} />

    
    {/* <Route path="/login" element={<Login />}/>
    <Route path="/registration" element={<Registration />}/> */}

    <Route path='*' element={<ProtectedRoutes/>} />

        {/* <Route path="/" element={<Home />}/>
        <Route path="/add" element={<TransactionForm />}/>
        <Route path='/add/:id' element={<TransactionForm />}/>
        <Route path="/search" element={<Search />}/>
        <Route path="/ViewData" element={<ViewData />}/>
        <Route path="/transaction/viewDetail" element={<ViewDetail />}/>
        <Route path="/page?" element={<Pagination />}/> */}
   
    {/* <Route path="/transaction/edit" element={<EditTransaction />}/> */}

    </Routes>
    </BrowserRouter>
    </TransactionContext>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
    <App />
);


