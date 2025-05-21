import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/authentication/pages/Login";
import User from "./pages/Admin/User Master/User";
import Configuration from "./pages/Admin/Configuration/Configuration";
import ApiLog from "./pages/Admin/ApiLog/ApiLog";
import IpWhiteList from "./pages/Admin/IPWhiteList/IpWhiteList";
import Services from "./pages/Admin/Services/Services";
import Recharge from "./pages/Admin/Recharge/Recharge";
import Application from "./pages/Api Setup/Application/Application";
import Subscribe from "./pages/Api Setup/Subscribe/Subscribe";
import APIApproval from "./pages/Api Setup/API Approval/APIApproval";
import KYCVerification from "./pages/KYC Verification/KYCVerification";
import TodayReport from "./pages/Report/Today Report/TodayReport";
import DayWiseReport from "./pages/Report/Day Wise Report/DayWiseReport";
import ApprovedAPIReport from "./pages/Report/Approved API Report/ApprovedAPIReport";
import RechargeReport from "./pages/Report/Recharge Report/RechargeReport";
import ForgotPassword from "./pages/authentication/pages/ForgotPassword";
import OtpVerification from "./pages/authentication/pages/OtpVerification";
import Client from "./pages/Admin/Client/Client";
import ChangePass from "./pages/Setting/Change Password/ChangePass";
import Profile from "./pages/Setting/Profile/Profile";
import { setGeoLocation } from "./utils/geoLocation";
import { setIdentityData } from "./utils/common";
import { toast, ToastContainer } from "react-toastify";
import ApiService from "./pages/apiService/ApiService";
import Setting from "./pages/Setting/Setting";
import Admin from "./pages/Admin/Admin";

function App() {
  // const isDark = useSelector((state: any) => state.layout.isDark);
  const [isLocationGranted, setIsLocationGranted] = useState<boolean>(false); // this store Location Status (location is true and false)

  useEffect(() => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then((PermissionStatus) => {
        // Check Permission of Location
        if (PermissionStatus.state === "denied") {
          setIsLocationGranted(false);
        } else {
          setIsLocationGranted(true);
          setGeoLocation();
        }
      });

    // get Ip Address and set in local storange
    setIdentityData();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgotpwd" element={<ForgotPassword />} />
          <Route path="/optvarification" element={<OtpVerification />} />

          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/apiservice" element={<ApiService />} />
            // Admin
            <Route path="admin" element={<Admin/>} />
            {/* <Route path="user" element={<User />} />
            <Route path="client" element={<Client />} /> */}
            <Route path="apilog" element={<ApiLog />} />
            <Route path="Configuration" element={<Configuration />} />
            <Route path="ipwhitelist" element={<IpWhiteList />} />
            <Route path="services" element={<Services />} />
            <Route path="recharge" element={<Recharge />} />
            //Api Setup
            <Route path="Application" element={<Application />} />
            <Route path="student/register" element={<Subscribe />} />
            <Route path="APIApproval" element={<APIApproval />} />
            //KYC-Verification
            <Route path="KYC-Verification" element={<KYCVerification />} />
            //Report
            <Route path="todayreport" element={<TodayReport />} />
            <Route path="daywisereport" element={<DayWiseReport />} />
            <Route path="ApprovedAPIReport" element={<ApprovedAPIReport />} />
            <Route path="RechargeReport" element={<RechargeReport />} />
            //Setting
            <Route path="setting" element={<Setting/>} />
            <Route path="changePassword" element={<ChangePass />} />
            <Route path="Profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
