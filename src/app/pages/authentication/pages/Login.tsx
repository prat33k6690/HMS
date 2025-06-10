// Purpose: Login Screen Template (UI Only)
// Created by: Harish
// Created Date: 09-05-2025
// Description: Login Admin and User UI only (API removed)

import React, { lazy, Suspense, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { FcGoogle } from "react-icons/fc";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import TextField from "../../../component/TextInput";
import { Button, Row, Col } from "react-bootstrap";
import { AiOutlineBank } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { TbLockPassword } from "react-icons/tb";
import { BiLoader, BiRefresh } from "react-icons/bi";
import CustomButton from "../../../component/ui/CustomButton/CustomButton";

const LoginLayout = lazy(() => import("../layout/Layout"));

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const LoginSchema = Yup.object().shape({
    clientId: Yup.number()
      .typeError("Client ID must be a number")
      .required("Client ID is required"),
    userName: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    captcha: Yup.string().required("Captcha is required"),
  });

  return (
    <Suspense>
      <LoginLayout title="Login Into Your Account">
        <p className="text-xs text-muted text-center">Welcome back ! Please enter your details</p>
        <Formik
          initialValues={{
            clientId: "",
            userName: "",
            password: "",
            captcha: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            console.log("Submitted:", values);
          }}
        >
          {({ values, setFieldValue, handleBlur, handleChange }) => (
            <Form className="p-3 ">
              <div className="mt-2">
                <TextField
                  label="Client Id"
                  name="clientId"
                  id="clientId"
                  placeholder="Client Id"
                  maxLength={4}
                  required
                  value={values.clientId}
                  onChange={(e: any) => {
                    const { value } = e.target;
                    const regex = /^[0-9]*$/;
                    if (regex.test(value.toString())) {
                      setFieldValue("clientId", value);
                    }
                  }}
                  onBlur={handleBlur}
                  IconProp={AiOutlineBank}
                />
                <ErrorMessage name="clientId" component="div" className="error-msg" />

                <TextField
                  label="Username"
                  name="userName"
                  id="userName"
                  placeholder="Username"
                  maxLength={30}
                  required
                  value={values.userName}
                  onChange={(e: any) => {
                    const { value } = e.target;
                    setFieldValue("userName", value.trim());
                  }}
                  onBlur={handleBlur}
                  IconProp={CgProfile}
                />
                <ErrorMessage name="userName" component="div" className="error-msg" />

                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  maxLength={30}
                  required
                  value={values.password}
                  onChange={(e: any) => {
                    const { value } = e.target;
                    setFieldValue("password", value.trim());
                  }}
                  onBlur={handleBlur}
                  IconProp={TbLockPassword}
                />
                <ErrorMessage name="password" component="div" className="error-msg" />

                <div className="d-flex justify-content-end mt-2">
                  <Link to="/forgotpwd" className="text-end text-xs btn-secondary me-1" >
                    Forgot password?
                  </Link>
                </div>
                <div className="mt-4">
                  <CustomButton
                    text={!isLoading ? "LOGIN" : (<><BiLoader className="bx-spin text-white text-lg me-2" />LOADING...</>)}
                    variant="danger"
                    className="w-100 py-2 mb-2"
                    disabled={isLoading} />
                </div>
                <CustomButton
                  variant="transparent"
                  text={!isLoading ? "Sign in with Google" : (<><BiLoader className="bx-spin text-white text-lg me-2" />LOADING...</>)}
                  icon={FcGoogle}
                  className="w-100 py-2 text-dark border"
                  disabled={isLoading} />
              </div>
            </Form>
          )}
        </Formik>
      </LoginLayout>
    </Suspense>
  );
};

export default Login;
