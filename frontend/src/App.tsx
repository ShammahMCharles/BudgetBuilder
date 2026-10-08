
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

function Login() {
  return <h1>Login Page</h1>;
}

function Register() {
  return <h1>Register Page</h1>;
}

function Dashboard() {
  return <h1>BudgetBuilder Dashboard</h1>;
}

function Goals() {
  return <h1>Budget Goals</h1>;
}

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
          <Route
            path="/financial-profile"
            element={<FinancialProfile />}
          />
          <Route path="/purchase-items" element={<PurchaseItems />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;