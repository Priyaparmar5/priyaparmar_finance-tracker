import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Unauth from './Services/Unauth';
import { TransactionContext } from './context/TransactionContext';
import ProtectedRoutes from "./Services/ProtectedRoutes";
import {  UsersContext } from "./context/UsersContext";

function App() {
  return (
    <>
   <UsersContext>
    <TransactionContext>
      <BrowserRouter>
        <Routes>
          <Route path="/public/*" element={<Unauth />} />

          <Route path="*" element={<ProtectedRoutes />} />
        </Routes>
      </BrowserRouter>
    </TransactionContext>
    </UsersContext>
  </>
  );
}

export default App;
