import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BiCheck, BiLoader, BiX } from "react-icons/bi";
import Textfield from "../../../component/TextInput";
import { useLocation } from "react-router-dom";

const   ChangePass = () => {
  const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  const [passwordPolicy, setPasswordPolicy] = useState({
    isCharacter8: false,
    isUpperCase: false,
    isLowerCase: false,
    isNumber: false,
    isSpecialChar: false,
  });



  useEffect(() => {
    setPasswordPolicy({
      isCharacter8: password.length >= 8,
      isUpperCase: /[A-Z]/.test(password),
      isLowerCase: /[a-z]/.test(password),
      isNumber: /[0-9]/.test(password),
      isSpecialChar: /[@$!%*?&]/.test(password),
    });
  }, [password]);

  const validationSchema = Yup.object().shape({
    OldPassword: Yup.string().required("Old password is required"),
    NewPassword: Yup.string()
      .required("New password is required")
      .min(8, "Must be at least 8 characters")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      .matches(/[0-9]/, "Must contain at least one number")
      .matches(/[@$!%*?&]/, "Must contain at least one special character"),
    ConfirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("NewPassword")], "Passwords must match"),
  });

  
  return (
    <div className="p-2">
      <div className="d-flex justify-content-between mb-2">
        <div>
          <h6 className="mb-0 fs-6  fw-bold"> Change <span className="text-primary">Password</span> </h6>
          <p className="mb-0 text-sm"> Manage your account password</p>
        </div>
      </div>

      <Card className="border-0">
        <Row>
          <Col lg={12}>
            <Formik
              initialValues={{ OldPassword: "", NewPassword: "", ConfirmPassword: "",}}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => { resetForm();}}
            > 
              {({ handleSubmit,handleBlur, values,setFieldValue,  }) => (
                <Form onSubmit={handleSubmit}>
                  <Card.Body className="p-0">
                    <Row>
                      <Col sm={4}>
                        <Textfield
                          label="Old Password"
                          name="OldPassword"
                          placeholder="Enter Old Password"
                          type="password"
                          size="sm"
                          tabIndex={1}
                          maxLength={20}
                          required
                          value={values.OldPassword}
                          onChange={(e) => setFieldValue("OldPassword", e.target.value.trim())}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name="OldPassword" component="div" className="error-msg"/>
                        <Textfield
                          label="New Password"
                          name="NewPassword"
                          placeholder="Enter New Password"
                          type="password"
                          size="sm"
                          tabIndex={2}
                          maxLength={20}
                          required
                          value={values.NewPassword}
                          onChange={(e) => { const newValue = e.target.value; setFieldValue("NewPassword", newValue); setPassword(newValue);}}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name="NewPassword" component="div" className="error-msg" />
                        <Textfield
                          label="Confirm Password"
                          placeholder="Confirm New Password"
                          name="ConfirmPassword"
                          type="password"
                          size="sm"
                          tabIndex={3}
                          maxLength={20}
                          required
                          value={values.ConfirmPassword}
                          onChange={(e) => setFieldValue( "ConfirmPassword",e.target.value.trim())}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage  name="ConfirmPassword" component="div" className="error-msg" />
                      </Col>

                      <Col sm={8}>
                        <div className="ms-5 mt-4">
                          <h5 className="fw-semibold text-primary ms-4 h5 mb-0 ">
                            Password Policy
                          </h5>
                          <ul className="mb-0">
                            <li className="d-flex align-items-center">
                              {passwordPolicy.isCharacter8 ? (
                                <BiCheck className="fs-6 text-success" />
                              ) : (
                                <BiX className="fs-6 text-danger" />
                              )}
                              <span className="text-muted ms-2">
                                At least 8 characters
                              </span>
                            </li>
                            <li className="d-flex align-items-center">
                              {passwordPolicy.isUpperCase ? (
                                <BiCheck className="fs-6 text-success" />
                              ) : (
                                <BiX className="fs-6 text-danger" />
                              )}
                              <span className="text-muted ms-2">
                                At least one uppercase letter
                              </span>
                            </li>
                            <li className="d-flex align-items-center">
                              {passwordPolicy.isLowerCase ? (
                                <BiCheck className="fs-6 text-success" />
                              ) : (
                                <BiX className="fs-6 text-danger" />
                              )}
                              <span className="text-muted ms-2">
                                At least one lowercase letter
                              </span>
                            </li>
                            <li className="d-flex align-items-center">
                              {passwordPolicy.isNumber ? (
                                <BiCheck className="fs-6 text-success" />
                              ) : (
                                <BiX className="fs-6 text-danger" />
                              )}
                              <span className="text-muted ms-2">
                                At least one number
                              </span>
                            </li>
                            <li className="d-flex align-items-center">
                              {passwordPolicy.isSpecialChar ? (
                                <BiCheck className="fs-6 text-success" />
                              ) : (
                                <BiX className="fs-6 text-danger" />
                              )}
                              <span className="text-muted ms-2">
                                At least one special character (@$!%*?&)
                              </span>
                            </li>
                          </ul>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>

                  <hr className="my-0 mt-2" />
                  <div className="mt-2">
                    <Button 
                      type="submit"
                      variant="primary"
                      tabIndex={4}  
                      className="btn btn-sm"                  
                    >
                     {!isLoading ? " Change Password" :
                     <>
                     <BiLoader className="bx-spin text-white text-lg me-2" />{" "}
                       Loading...
                     </>}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ChangePass;
