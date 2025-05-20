import React, { useState, useEffect, lazy, Suspense, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import OtpField from "../../components/ui/otpField/OtpField";
import { Link } from "react-router-dom";
import { BiLoader, BiRefresh } from "react-icons/bi";
// import * as urls from "../../utils/url";
import * as urls from "../../../utils/url"
// import { apiRequest } from "../../utils/apiRequest";
// import { setLocalUserData } from "../../utils/common";
// import { convertMinutesSeconds } from "../../utils/helper";
import { Button } from "react-bootstrap";
import toastNotify from "../../../utils/tostNotify";
import { convertMinutesSeconds } from "../../../utils/helper";
import { apiRequest } from "../../../utils/apiRequest";
import { setLocalUserData } from "../../../utils/common";
import OtpField from "../../../component/otpField/OtpField";
import Layout from "../layout/Layout";

// const Layout = lazy(() => import("./layout/Layout").then(({ default: Layout }) => ({ default: Layout })));
const LoginLayout = lazy(() => import('../layout/Layout'));

const Otp = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]); // in this store Mobile OTP OR G_AUTH OTP for both
  const [gotpValues, setGOtpValues] = useState(["", "", "", "", "", ""]); // in this only G_AUTH OTP if authFlag === "N"
  const [IsLoading, setIsLoading] = useState(false);


  // console.log("state",state);
  // Here generate single string to OTP
  const joinOTP = otpValues.join();
  const OTPValues = joinOTP.replace(/,/g, "");

  // Here generate single string to OTP
  const joinGOTP = gotpValues.join();
  const gOTPValues = joinGOTP.replace(/,/g, "");

  // OTP Resend Timer  
  const { convertedminutes, convertedseconds } = convertMinutesSeconds(120);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(60);

  // Here set Converted Minutes and second in seprate states
  useMemo(() => {
    setMinutes(convertedminutes);
    setSeconds(convertedseconds);
  }, [])

  // start timer for resend Mobile OTP
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [minutes, seconds]);


  async function handleOtpReset() {
    try {
      setIsLoading(true);
      // const payload = {
      //   OTP_TOKEN: state.OTP_TOKEN,
      //   // SESSION_ID: state.OTP_TOKEN,
      //   MOBILE_NO: state.MOBILE_NO,
      //   EMAIL: state.EMAIL,
      //   DOMAIN_NM: window.location.hostname,
      //   IP_ADDRESS: identifyData.ip
      // };
      // const checksum = computeCrc(JSON.stringify(payload));
      // await axios({
      //   method: "POST",
      //   url: urls.OtpResend,
      //   data: payload,
      //   headers: {
      //     "Content-Type": "application/json",
      //     Checksum: checksum,
      //     Authorization: AuthKey,
      //   },
      // }).then((result) => {
      //   if (result.data.STATUS === "0") {
      //     toastNotify(result.data.MESSAGE, "success");
      //     setSmsTimer(120);
      //     setIsSmsResend(false);
      //     setOtpValues(["", "", "", "", "", ""]);
      //   } else if (result.data.STATUS === "3") {
      //     navigate("/");
      //     toastNotify(result.data.MESSAGE, "error");
      //   } else {
      //     toastNotify(result.data.MESSAGE, "error");
      //     setOtpValues(["", "", "", "", "", ""]);
      //   }
      // });
    } catch (error) {
      // Ignore Case
    } finally {
      setIsLoading(false);
    }
  }


  // verify to Mobile OTP and G_AUTH OTP 
  async function handleOtpVerify() {
    try {
      setIsLoading(true);
      const payload = {
        otpToken: state.otpToken,
        otpCode: OTPValues,
      };
      const config = {};

      const result = await apiRequest("POST", urls.otpVerify, payload, config);
      if (result.statusCode === 0) {

        const sessionTkn = result.data.sessionToken;

        delete state.otpToken; // remove otptoken from login responce

        const updateUserData = { ...state, sessionToken: sessionTkn }; // send to state and set sessiontoek 

        setLocalUserData(updateUserData)  // and update session token on login user data
        navigate("/dashboard");

        toastNotify(result.message, 'success');

      } else {
        toastNotify(result.message, 'error');
       setOtpValues (["", "", "", "", "", ""]); // in this store Mobile OTP OR G_AUTH OTP for both

      }
    } catch (error) {
      // Ignore Case;
    } finally {
      setIsLoading(false);
    }
  }

  // Google Code Verify to OTP. this work only for active to G-auth on login time. after this was not worked 
  async function handleGoogleCodeVerify() {
    try {
      setIsLoading(true);
      const payload = {
        otpToken: state.otpToken,
        otpCode: OTPValues,
        googleOtpCode: gOTPValues,
      };
      const config = {};

      const result = await apiRequest("POST", urls.gAuthVerity, payload, config);
      if (result.statusCode === 0) {

        navigate("/");
        toastNotify(result.message, 'success');
      }
      else if (result.statusCode === 5) {
        toastNotify(result.message, 'error');
        
        navigate("/")
      }
      else {
        toastNotify(result.message, 'error');
      }
    } catch (error) {
      // Ignore Case;
    } finally {
      setIsLoading(false);
    }
  }

  // Verify to Forgot OTP 
  async function handleForgotOtpVerify() {
    try {
      setIsLoading(true);
      const payload = {
        otpToken: state.otpToken,
        otpCode: OTPValues,
      };
      const config = {};

      const result = await apiRequest("POST", urls.forgoatpassword, payload, config);
      if (result.statusCode === 0) {
        navigate("/");
        toastNotify(result.message, 'success');
      } else {
        toastNotify(result.message, 'error');
      }
    } catch (error) {
      // Ignore Case;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const validateOTP = () => {
      if (OTPValues.length < 6) {
        return false;
      } else if (state.flag === "G" && state.authStatus === "N") {

        // This worked on new generate G_AUTH
        // so this time both OTP are verify
        if (OTPValues.length === 6 && gOTPValues.length === 6) {
          handleGoogleCodeVerify();
        }

      } else {
        if ((state.flag === "O" || state.flag === "G") && state.authStatus !== "N") {
          // This worked for Both but single-single 
          // if worked Mobile OTP OR G_AUTH OTP
          handleOtpVerify();
        } else if (state.flag === "F") {
          // This worked for Forgot Password
          handleForgotOtpVerify();
        }
      }
    };
    validateOTP();
  }, [OTPValues.length, gOTPValues.length]);


  return (
    <>
      <Suspense>
        <Layout
          title={((state.flag === "O" || state.authStatus === "N") && "OTP Verification") || (state.flag === "F" && "Forgot Password Verification") || (state.flag === "G" && "Google Code Verification") || ""}
          data={state.flag === "G" ? state.googleQRResponse : null}
          flag={state.authStatus}
        >
          <div className="form-group mt-2">

            {(state?.twoFa === "OTP" || state.authStatus === "N") &&
              <p className="text-center mt-2 text-sm">OTP has been send on your registered mobile no. ******{state.mobileNo.substr(state.mobileNo.length - 4)}</p>
            }

            {(state?.twoFa === "OTP" || state.authStatus === "N") &&
              <div className="mt-3">
                <OtpField
                  name="OTP"
                  otpValues={otpValues}
                  setOtpValues={setOtpValues}
                />
              </div>
            }

            {(state.flag !== "G" || state.authStatus === "N") &&
              <div className="otptimer text-center mt-3">
                {(seconds > 0 || minutes > 0) ? (
                  <p className="text-center mt-3 text-xs">You can resend OTP after this {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
                ) : (
                  <Button variant="transparent" className="text-primary text-xs"><BiRefresh className='text-sm text-lg me-1' /> Resend OTP</Button>
                )}
              </div>
            }

            {(state?.twoFa === "GAUTH" && state.authStatus === "N") && <div className="mb-0 text-lg text-wrap text-center mt-3">Google Code Verification</div>}

            {state?.twoFa === "GAUTH" &&
              <div className="text-xs text-slate-500 text-center mt-2">
                Kindly authenticate yourself by entering 6-digit
                google authentication code. (Open Google
                Authenticator app to get 6-digit authentication code
                to the login.)</div>
            }

            {(state?.twoFa === "GAUTH") &&
              <div className="mt-3">
                <OtpField
                  name="OTP"
                  otpValues={state.flag === "G" && state.authStatus === "N" ? gotpValues : otpValues}
                  setOtpValues={state.flag === "G" && state.authStatus === "N" ? setGOtpValues : setOtpValues}
                />
              </div>
            }

            <div className="text-center mt-2">
              {!IsLoading ? '' : <><BiLoader className='bx-spin text-lg' /> Loading...</>}
            </div>
          </div>

          <div className="text-center text-primary  text-sm mt-3">
            <Link to="/" className='ms-1' >
               Back to login
            </Link>
          </div>
        </Layout>
      </Suspense >
    </>
  );
};

export default Otp;
