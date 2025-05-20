import React, { lazy, Suspense, useEffect, useState } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Form, Button, Row, Col } from "react-bootstrap";
import { AiOutlineBank } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlinePhone } from "react-icons/md";
import Layout from "../layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { IoReload } from "react-icons/io5";
import Textfield from "../../../component/TextInput";
import { getCaptchaCode } from "../../../apiService/commonApi";
import { apiRequest } from "../../../utils/apiRequest";
import * as urls from "../../../utils/url";
import toastNotify from "../../../utils/tostNotify";
import { setLocalToken, setLocalUserData } from "../../../utils/common";
import { BiLoader, BiRefresh } from "react-icons/bi";
const LoginLayout = lazy(() => import('../layout/Layout'));

interface FormValues {
  clientId: string;
  userName: string;
  mobileNo: string;
  captcha: string;
}

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
  const [captchaDtl, setCaptchaDtl] = useState<any>(null);
  const [isCaptchaLoader, setIsCaptchaLoader] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const getRegularCaptcha = async () => {
    setIsCaptchaLoader(true);
    const data = await getCaptchaCode();
    setCaptchaDtl(data);
    setIsCaptchaLoader(false);
  };

  const userForgotPassword = async (values: any, {resetForm}: any) => {
    try {
      const payload = {
        clientId: values.clientId,
        userName: values.userName,
        mobileNo: values.mobileNo,
        captchaCd: values.captcha,
        sessionId: captchaDtl.sessionId,
      };

      // console.log("Value payload", payload);
      const config = {};

      const result = await apiRequest("POST", urls.forgoatpassword, payload, config);
    
       if (result.statusCode === 2) {
        // Google Authentication verify is Active
        const { jwtToken, ...response } = result.data;

        // Store User data in session storange
        setLocalUserData(response);

        // Store Tokens in session storange
        setLocalToken(jwtToken);

        navigate("/optvarification", {
          state: { ...response, mobileNo: values.mobileNo, flag: "F" },
        });
        toastNotify(result.message, "success");
      }
      else if(result.statusCode === 1){
        toastNotify(result.message, "error");
        getRegularCaptcha();
        resetForm();

      }
      else{
        
      }
     
    } catch (error) { }
  };

  useEffect(() => {
    getRegularCaptcha();
  }, []);

  return (
    <Suspense>
      <LoginLayout>
        <Formik
          initialValues={{
            clientId: "",
            userName: "",
            mobileNo: "",
            captcha: "",
          }}
          validationSchema={ForgotPasswordSchema}
          onSubmit={userForgotPassword}
        >
          {({ values, handleSubmit, handleBlur, setFieldValue, handleChange }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <div className="mt-3 text-sm">Forgot to access KYC Services</div>
              <div className="mt-2">
                {/* Client ID */}
                <div>
                  <Textfield
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

                {/* Username */}
                <div>
                  <Textfield
                    label="Username"
                    name="userName"
                    id="userName"
                    placeholder="Username"
                    maxLength={30}
                    tabIndex={2}
                    required
                    value={values.userName}
                    onChange={(e) => setFieldValue("userName", e.target.value.trim())}
                    onBlur={handleBlur}
                    // onChange={handleChange}
                    IconProp={CgProfile}
                  />
                  <ErrorMessage name="userName" component="div" className="error-msg" />
                </div>
                <div>
                  <Textfield
                    label="Mobile No"
                    name="mobileNo"
                    type="text"
                    id="mobileNo"
                    size="sm"
                    placeholder="Please enter Mobile No."
                    tabIndex={3}
                    maxLength={10}
                    required
                    value={values.mobileNo}
                    onChange={(e: any) => {
                      e.preventDefault();
                      const { value } = e.target;
                      const regex = /^[0-9]*[.,-]?[0-9]*$/;
                      if (regex.test(value.toString())) {
                        setFieldValue("mobileNo", value.trim());
                      }
                    }}
                    onBlur={(e: any) => {
                      handleBlur(e);
                    }}
                    IconProp={MdOutlinePhone}
                  />
                  <ErrorMessage name="mobileNo" component="div" className="error-msg" />
                </div>

                {/* Back to Login Link */}
                <div className="d-flex mt-2 justify-content-end">
                  <Link
                    to="/"
                    className="text-end btn-secondary me-1"
                    style={{ fontSize: "12px" }}
                  >
                    Back To Login
                  </Link>
                </div>

                {/* CAPTCHA */}
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
                    <Textfield
                      label="Captcha"
                      name="captcha"
                      id="captcha"
                      placeholder="Captcha"
                      tabIndex={3}
                      maxLength={7}
                      required
                      value={values.captcha}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name="enterCaptcha" className='error-msg' component="div" />
                  </Col>
                </Row>
                {/* Submit Button */}
                <div className="mt-4">
                   <Button
                    type="submit"
                    variant="primary"
                    tabIndex={3}
                    className="w-100"
                    disabled={isLoading}
                  >
                    {!isLoading ? "Forget Password" :
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
        {/* </Layout> */}
      </LoginLayout>
    </Suspense>
  );
};

export default ForgotPassword;
