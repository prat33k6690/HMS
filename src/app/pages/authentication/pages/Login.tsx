// Purpose: Login Screen Template (UI Only)
// Created by: Harish
// Created Date: 09-05-2025
// Description: Login Admin and User UI only (API removed)

import React, { lazy, Suspense, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import TextField from "../../../component/TextInput";
import { Button, Row, Col } from "react-bootstrap";
import { AiOutlineBank } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { TbLockPassword } from "react-icons/tb";
import { BiLoader, BiRefresh } from "react-icons/bi";

const LoginLayout = lazy(() => import("../layout/Layout"));

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCaptchaLoader, setIsCaptchaLoader] = useState(false);

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
      <LoginLayout title="Login">
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
            <Form>
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
                  <Link to="/forgotpwd" className="text-end btn-secondary me-1" style={{ fontSize: "12px" }}>
                    Forgot password?
                  </Link>
                </div>

                <Row>
                  <Col xs={6}>
                    <div className="d-flex mt-4">
                      <div className="form-control form-control-sm p-1 capcha-input"
                        style={{
                          borderTopRightRadius: 0,
                          borderBottomRightRadius: 0,
                          backgroundColor: "#f0f0f0",
                          height: 35,
                        }}
                      >
                        {/* Placeholder captcha image */}
                        <img src={"captcha-placeholder.png"} alt="captcha" className="w-100 h-100" />
                      </div>
                      <Button
                        variant="primary"
                        disabled={isCaptchaLoader}
                        type="button"
                        className="btn-sm"
                        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                      >
                        {isCaptchaLoader ? (
                          <BiLoader className="bx-spin text-white text-lg" />
                        ) : (
                          <BiRefresh className="text-white text-lg" />
                        )}
                      </Button>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <TextField
                      label="Captcha"
                      name="captcha"
                      id="captcha"
                      placeholder="Captcha"
                      maxLength={7}
                      required
                      disabled={isLoading}
                      value={values.captcha}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name="captcha" className="error-msg" component="div" />
                  </Col>
                </Row>
                <div className="mt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100"
                    disabled={isLoading}
                  >
                    {!isLoading ? "Login" : (
                      <>
                        <BiLoader className="bx-spin text-white text-lg me-2" />
                        Loading...
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </LoginLayout>
    </Suspense>
  );
};

export default Login;
