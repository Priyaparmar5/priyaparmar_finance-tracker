import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./Services/ProtectedRoutes";
import Unauth from "./Services/Unauth";
import { ErrorBoundary } from "react-error-boundary";


function App() {
  return (
    <>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/public/*" element={<Unauth />} />

          <Route path="*" element={<ProtectedRoutes />} />
        </Routes>
      </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}

export default App;
