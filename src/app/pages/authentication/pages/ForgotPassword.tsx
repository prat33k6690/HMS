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
          <h4 className="mb-3">Forgot Password</h4>

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
            placeholder="Enter 10-digit Mobile No"
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
            <Link to="/" className="text-end btn-secondary me-1" style={{ fontSize: "12px" }}>
              Back To Login
            </Link>
          </div>

          <Row className="mt-4">
            <Col xs={6}>
              <div className="d-flex align-items-center">
                <div
                  className="form-control form-control-sm p-1 capcha-input"
                  style={{
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    backgroundColor: "#f0f0f0",
                    height: 35,
                  }}
                >
                  <img
                    src="https://via.placeholder.com/100x30?text=Captcha"
                    alt="captcha"
                    className="w-100 h-100"
                  />
                </div>
                <Button
                  type="button"
                  variant="primary"
                  className="btn-sm"
                  style={{
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}
                >
                  <BiRefresh className="text-white" />
                </Button>
              </div>
            </Col>
            <Col xs={6}>
              <Textfield
                label="Captcha"
                name="captcha"
                id="captcha"
                placeholder="Enter Captcha"
                maxLength={7}
                required
                value={values.captcha}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage name="captcha" component="div" className="error-msg" />
            </Col>
          </Row>

          <div className="mt-4">
            <Button type="submit" variant="primary" className="w-100">
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPassword;
