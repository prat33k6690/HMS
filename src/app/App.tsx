import React, { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loading from "./component/ui/Loading/Loading";

// Lazy-loaded components
const Layout = lazy(() => import("./layout/Layout"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Login = lazy(() => import("./pages/authentication/pages/Login"));
const ForgotPassword = lazy(() => import("./pages/authentication/pages/ForgotPassword"));
const RegisterStudent = lazy(() => import("./pages/Students/RegisterStudent"));

function App() {

  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/forgotpwd" element={<ForgotPassword />} />
            <Route path="/" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="registerStudent" element={<RegisterStudent />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
