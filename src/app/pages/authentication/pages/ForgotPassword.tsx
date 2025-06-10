import React from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Form, Button, Row, Col } from "react-bootstrap";
import { AiOutlineBank } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlinePhone } from "react-icons/md";
import { BiLoader, BiRefresh } from "react-icons/bi";
import { Link } from "react-router-dom";
import Textfield from "../../../component/TextInput";
import LoginLayout from '../layout/Layout'
import CustomButton from "../../../component/ui/CustomButton/CustomButton";

const ForgotPasswordSchema = Yup.object().shape({
  clientId: Yup.number()
    .typeError("Client ID must be a number")
    .required("Client ID is required"),
  userName: Yup.string().required("Username is required"),
  mobileNo: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number")
    .required("Mobile number is required"),
  captcha: Yup.string().required("Captcha is required"),
});

const ForgotPassword = () => {
  const handleFormSubmit = (values: any, { resetForm }: any) => {
    console.log("Form Submitted:", values);
    resetForm();
  };

  return (
    <LoginLayout title="Forget Password">
      <p className="text-xs text-muted text-center">Welcome back ! Please enter your details</p>
      <Formik
        initialValues={{
          clientId: "",
          userName: "",
          mobileNo: "",
          captcha: "",
        }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={handleFormSubmit}
      >
        {({ values, handleSubmit, handleBlur, setFieldValue, handleChange }) => (
          <Form noValidate onSubmit={handleSubmit} className="p-3">

            <Textfield
              label="Client Id"
              name="clientId"
              id="clientId"
              placeholder="Client Id"
              maxLength={4}
              required
              value={values.clientId}
              onChange={(e: any) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setFieldValue("clientId", value);
                }
              }}
              onBlur={handleBlur}
              IconProp={AiOutlineBank}
            />
            <ErrorMessage name="clientId" component="div" className="error-msg" />

            <Textfield
              label="Username"
              name="userName"
              id="userName"
              placeholder="Username"
              maxLength={30}
              required
              value={values.userName}
              onChange={(e) => setFieldValue("userName", e.target.value.trim())}
              onBlur={handleBlur}
              IconProp={CgProfile}
            />
            <ErrorMessage name="userName" component="div" className="error-msg" />

            <Textfield
              label="Mobile No"
              name="mobileNo"
              id="mobileNo"
              placeholder="Enter Mobile No"
              maxLength={10}
              required
              value={values.mobileNo}
              onChange={(e: any) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setFieldValue("mobileNo", value);
                }
              }}
              onBlur={handleBlur}
              IconProp={MdOutlinePhone}
            />
            <ErrorMessage name="mobileNo" component="div" className="error-msg" />

            <div className="d-flex justify-content-end mt-2">
              <Link to="/" className="text-end text-xs btn-secondary me-1">
                Back To Login
              </Link>
            </div>

            <div className="mt-4">
              <CustomButton text="SUBMIT" type="submit" variant="primary" className="w-100 py-2"/>
            </div>
          </Form>
        )}
      </Formik>
    </LoginLayout>
  );
};

export default ForgotPassword;
