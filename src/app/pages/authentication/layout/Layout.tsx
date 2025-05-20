import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SwiperCarouselAuth from './SwiperCarouselAuth';
// import ProductIcon from '../../componants/icons/ProductIcon';
import { BiEnvelope, BiPhone, BiSolidMapPin } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import Soft_tech_logo from "../../../assests/images/logo3.png";
import telco_logo from "../../../assests/images/telco_logo.png";
import logo_api from "../../../assests/images/login/logo_api.png"
const packageJson = require("../../../../../package.json");


const Layout = ({ children, title, flag, data }: any) => {
  const currentVersion = packageJson.version;
  const screenWidth = useSelector((state: any) => state.layout.currentScreenWidth);
  return (
    <>
      <div id="main-wrapper">
        <div className="bg-login"></div>
        <div
          className={`d-flex justify-content-center align-items-center login-page flex-column `}
          style={{ height: "100vh" }}
        >
          <Card
            className={`${screenWidth < 600 ? "w-100 h-100" : ""}`}
            style={{ width: "50%" }}
          >
            <Card.Body className={screenWidth < 600 ? 'd-flex justify-content-center align-items-center flex-column' : ''}>
              <Row>
                <Col md={7} className='d-md-flex align-items-center justify-content-center d-none'>
                  {/* <div className="text-center login-carsouel">
                    <SwiperCarouselAuth />
                  </div> */}

                  {flag === "N"
                    ?
                    <div>
                      <div className="d-flex align-items-center justify-content-center flex-column">
                        <img
                          src={
                            data?.qrImage
                              ? `data:image/png;base64,${data?.qrImage}`
                              : "/assets/images/google-auth-qr.png"
                          }
                          alt="QR-code"
                          style={{ width: 250 }}
                        />
                        {data?.authKey && (
                          <div className="text-sm key-bg">
                            Key : {data?.authKey}
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-slate-500 mt-2 text-center">
                        Scan this QR using Google Authentication
                      </div>
                    </div>
                    :
                    <SwiperCarouselAuth />
                  }
                </Col>

                <Col md={5} className="d-flex justify-content-center align-items-center">
                  <div className={`p-3 regitrasationFormContainer w-100 `}>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <div>
                        <img src={logo_api} style={{ width: 220 }} />
                      </div>
                      <div className="login-logo-divider" />
                    </div>

                    {title !== "" && <h3 className="text-lg text-center mb-0 mt-2">{title}</h3>}

                    {children}
                  </div>
                </Col>
              </Row>
              <hr />
              <div className='d-flex align-items-center justify-content-center gap-2'>
                <img
                  src={Soft_tech_logo}
                  alt="company logo"
                  style={{ width: 100 }}
                />
                <div className='login-logo-divider'></div>
                <img
                  src={telco_logo}
                  alt="company logo"
                  style={{ width: 100 }}
                />
              </div>

              <div className="mb-0 text-xs text-slate-700 text-center mt-2">
                <strong>Contact Us</strong> : <BiPhone /> +91-9727788331 | <BiEnvelope />  contact@soft-techsolutions.com
              </div>
              <div className="mb-0 text-xs text-slate-700 text-center" >
                <BiSolidMapPin /> <strong>Registration Address</strong> : 806, Silver Radiance 4, Front of Bhavik Publication, S. G. Highway, Gota, Ahmedabad, Gujarat-380061
              </div>
              <div className="">
                <p className="text-xs text-center mb-0">
                  Developed by {" "}
                  <Link to="https://suretytelco.com/" target="_blank">
                    SURETY-TELCO
                  </Link>
                  {" "} | {" "}
                  Sales by {" "}
                  <Link to="https://soft-techsolutions.com/" target="_blank">
                    SOFT-TECH SOLUTION
                  </Link> {" "}
                  {/* Copyrights © 2014 - {new Date().getFullYear()}
                  {" "} | {" "}
                  All Right Reserved */}
                </p>
                <p className='text-xs text-center mb-1'>
                  Copyrights © 2014 - {new Date().getFullYear()}
                  {" "} | {" "}
                  All Right Reserved
                </p>
              </div>
              <p className="mb-0 text-center" style={{ fontSize: "12px" }}>
                Version <span className="fw-bold">{currentVersion}</span>
              </p>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Layout