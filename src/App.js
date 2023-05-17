import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./Services/ProtectedRoutes";
import Unauth from "./Services/Unauth";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/public/*" element={<Unauth />} />

          <Route path="*" element={<ProtectedRoutes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
