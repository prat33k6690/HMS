// Purpose: Login Screen
// Created by: Harish
// Created Date: 09-05-2025
// Description: Login Admin and User and Clicnt  authenticate  

// Change history:
// 09-05-2025 / Harish // Create this screen
//***********************/



import React, { lazy, Suspense, useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import * as urls from "../../../utils/url";
import toastNotify from "../../../utils/tostNotify";
import { removeLoginSession } from "../../../utils/common";
import TextField from "../../../component/TextInput";
import { Button, Row, Col } from "react-bootstrap";
import { getCaptchaCode } from "../../../apiService/commonApi";
import { BiEnvelope, BiLoader, BiPhone, BiRefresh } from "react-icons/bi";
// import FullScreenLoader from "../../componants/loader/FullScreenLoader";
import { setLocalToken, setLocalUserData } from "../../../utils/common";
import { apiRequest } from "../../../utils/apiRequest";
import { AiOutlineBank } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { TbLockPassword } from "react-icons/tb";
const LoginLayout = lazy(() => import('../layout/Layout'));
// import LoginLayout from '../layout/Layout'

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isFullLoader, setIsFullLoader] = useState(false);
  const [isCaptchaLoader, setIsCaptchaLoader] = useState<boolean>(false);
  const [captchaDtl, setCaptchaDtl] = useState<any>(null);


  const LoginSchema = Yup.object().shape({
    clientId: Yup.number()
      .typeError("Client ID must be a number")
      .required("Client ID is required"),
    userName: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    captcha: Yup.string().required("Captcha is required"),
  });


  useEffect(() => {
    setIsFullLoader(true);
    setTimeout(() => {
      setIsFullLoader(false);
      sessionStorage.setItem("reloadflag", "0");
    }, 3000);
  }, []);

  // 
  const getRegularCaptcha = async () => {
    setIsCaptchaLoader(true);
    const data = await getCaptchaCode();
    setCaptchaDtl(data);
    setIsCaptchaLoader(false);
  };


  // ** API Calling start **

  const userLogin = async (values: any, { resetForm }: any) => {
    try {
      setIsLoading(true);
      const payload = {
        clientId: values.clientId,
        userName: values.userName,
        password: values.password,
        captchaCd: values.captcha,
        sessionId: captchaDtl.sessionId,
      };
      const config = {};

      const result = await apiRequest("POST", urls.login, payload, config);
      if (result.statusCode === 0) {
        const { jwtToken, ...response } = result.data;

        // Store User data in session storange
        setLocalUserData(response);

        // Store Tokens in session storange
        setLocalToken(jwtToken);

        navigate("/dashboard");
      } else if (result.statusCode === 2) {
        // Mobile OTP verify is Active

        const { jwtToken, ...response } = result.data;
        // console.log("result.data", response);
        // Store User data in session storange
        setLocalUserData(response);

        // Store Tokens in session storange
        setLocalToken(jwtToken);

        navigate("/optvarification", {
          state: { ...response, flag: response.twoFa === "GAUTH" ? "G" : "O" },
        });
        toastNotify(result.message, "success");
      } else if (result.statusCode === 5) {
        // Google Authentication verify is Active
        const { jwtToken, ...response } = result.data;

        // Store User data in session storange
        setLocalUserData(response);

        // Store Tokens in session storange
        setLocalToken(jwtToken);

        navigate("/optvarification", { state: { ...response, flag: "G" } });

        toastNotify(result.message, "success");
      } else {
        getRegularCaptcha();
        toastNotify(result.message, "error");
        resetForm();
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRegularCaptcha();
    removeLoginSession();
  }, []);


  return (
    <>
      {/* {!isFullLoader ? */}
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
            onSubmit={userLogin}
          >
            {({ values, setFieldValue, handleBlur, handleChange }) => (
              <Form>
                {/* <div className="mt-3 text-sm text-center">Login to access KYC Services</div>*/}
                <div className="mt-2">

                  <div>
                    <TextField
                      label="Client Id"
                      name="clientId"
                      id="clientId"
                      placeholder="Client Id"
                      maxLength={4}
                      tabIndex={1}
                      required
                      value={values.clientId}
                      onChange={(e: any) => {
                        const { value } = e.target;
                        const regex = /^[0-9]*[.,]?[0-9]*$/;
                        if (regex.test(value.toString())) {
                          setFieldValue("clientId", value);
                        }
                      }}
                      onBlur={handleBlur}
                      IconProp={AiOutlineBank}

                    />
                    <ErrorMessage name="clientId" component="div" className="error-msg" />
                  </div>
                  <div>
                    <TextField
                      label="Username"
                      name="userName"
                      id="userName"
                      placeholder="Username"
                      maxLength={30}
                      tabIndex={2}
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
                  </div>
                  <div>
                    <TextField
                      label="Password"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      maxLength={30}
                      tabIndex={3}
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
                  </div>

                  {/* Forgot Password Link */}
                  <div className="d-flex justify-content-end mt-2">
                    <Link to="/forgotpwd" className="text-end btn-secondary me-1" style={{ fontSize: "12px" }}>
                      Forgot password?
                    </Link>
                  </div>

                  <Row className="">
                    <Col xs={6}>
                      <div className="d-flex mt-4">
                        <div className="form-control form-control-sm p-1 capcha-input"
                          style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, backgroundColor: "#f0f0f0", height: 35 }}>
                          <img src={captchaDtl?.captchaImage ? "data:image/jpeg;base64," + captchaDtl?.captchaImage : ""} alt="captcha" className="w-100 h-100" />
                        </div>
                        <Button variant='primary' disabled={isCaptchaLoader} type="button" className="btn-sm" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                          onClick={() => {
                            getRegularCaptcha();
                          }}>
                          {isCaptchaLoader ? <BiLoader className="bx-spin text-white text-lg" /> : <BiRefresh className='text-white text-lg' />}
                        </Button>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <TextField
                        label="Captcha"
                        name="captcha"
                        id="captcha"
                        placeholder="Captcha"
                        tabIndex={4}
                        maxLength={7}
                        required
                        disabled={isLoading}
                        value={values.captcha}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage name="enterCaptcha" className='error-msg' component="div" />
                    </Col>
                  </Row>

                  <div className="mt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      tabIndex={5}
                      className="w-100"
                      disabled={isLoading}
                    >
                      {!isLoading ? "Login" :
                        <>
                          <BiLoader className="bx-spin text-white text-lg me-2" />{" "}
                          Loading...
                        </>
                      }
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </LoginLayout>
      </Suspense >
      {/* //   :
      //   <FullScreenLoader />
      // } */}
    </>
  );
};

export default Login;
