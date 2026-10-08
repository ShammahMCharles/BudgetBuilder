import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register.tsx";
import Dashboard from "./pages/Dashboard";
import Goals from "./pages/Goals";
// import FinancialProfile from "./pages/FinancialProfile";
// import PurchaseItems from "./pages/PurchaseItems";

function FinancialProfile() {
  return <h1>Financial Profile</h1>;
}

function PurchaseItems() {
  return <h1>Purchase Items</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/goals" element={<Goals />} />
          {/* <Route path="/financial-profile" element={<FinancialProfile />} />
          <Route path="/purchase-items" element={<PurchaseItems />} /> */}

          <Route path="/financial-profile" element={<FinancialProfile />} />
          <Route path="/purchase-items" element={<PurchaseItems />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
