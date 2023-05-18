import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Unauth from "./Services/Unauth";
import ProtectedRoutes from "./Services/ProtectedRoutes";
import { TransactionContext } from "../src/context/TransactionContext";
//import EditTransaction from './components/EditTransaction';

export default function App() {
  return (
    <TransactionContext>
      <BrowserRouter>
        <Routes>
          <Route path="/public/*" element={<Unauth />} />

          <Route path="*" element={<ProtectedRoutes />} />
        </Routes>
      </BrowserRouter>
    </TransactionContext>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
