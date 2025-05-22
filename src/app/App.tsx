import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/authentication/pages/Login";
import ForgotPassword from "./pages/authentication/pages/ForgotPassword";
import { ToastContainer } from "react-toastify";
import RegisterStudent from "./pages/Students/RegisterStudent";
import StudentTable from "./content/Table/StudentTable";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgotpwd" element={<ForgotPassword />} />
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="registerStudent" element={<RegisterStudent />} />


          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
