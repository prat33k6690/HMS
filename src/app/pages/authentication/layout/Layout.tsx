import { Row, Col, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiEnvelope, BiPhone } from "react-icons/bi";
import { useSelector } from "react-redux";
import telco_logo from "../../../assests/images/telco_logo.png";
const packageJson = require("../../../../../package.json");

const Layout = ({ children, title }: any) => {
  const currentVersion = packageJson.version;
  const screenWidth = useSelector(
    (state: any) => state.layout.currentScreenWidth
  );
  return (
    <>
      <div className="bg-container">
        <div className="fullscreen-container login-card"></div>
        <Container fluid className="h-100" style={{ height: "100vh" }}>
          <Row
            className="h-100 rounded-3 border-1"
            style={{ minHeight: "100vh" }}
          >
            <Col lg={6} className="d-flex align-items-center justify-content-center bg-white">
              {" "}
              <p className="text-white ps-4"><img src="https://img.freepik.com/free-photo/3d-render-secure-login-password-illustration_107791-16640.jpg" alt="" /></p>
            </Col>

            <Col
              lg={6}
              className="d-flex justify-content-center align-items-center bg-white"
            >
              <Card
                className={`${screenWidth < 600 ? "w-100 h-100 border-0 me-3" : "border-0"
                  }`}
                style={{ width: "50%" }}
              >
                <Card.Body
                  className={
                    screenWidth < 600
                      ? "d-flex justify-content-center align-items-center border-0 flex-column"
                      : ""
                  }
                >
                  <Row>
                    <div className={`p-3 regitrasationFormContainer w-100 `}>
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <div>
                          <img
                            title="image"
                            src={telco_logo}
                            style={{ width: 100 }}
                          />
                        </div>
                        <div className="login-logo-divider" />
                      </div>

                      {title !== "" && (
                        <h3 className="text-lg text-muted text-center mb-1 mt-3 fw-bold">
                          {title}
                        </h3>
                      )}
                      {children}
                    </div>
                  </Row>

                  <div className="">
                    <p className="text-xs text-center mb-0"> Developed by{" "}
                      <Link to="https://suretytelco.com/" target="_blank"> SURETY-TELCO </Link>{" "}| Sales by{" "}
                      <Link to="https://soft-techsolutions.com/" target="_blank"> SOFT-TECH SOLUTION</Link>{" "}
                    </p>
                    <p className="text-xs text-center mb-1">
                      Copyrights © 2014 - {new Date().getFullYear()} | All Right
                      Reserved
                    </p>
                  </div>
                  <p className="mb-0 text-center" style={{ fontSize: "12px" }}>
                    Version <span className="fw-bold">{currentVersion}</span>
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Layout;
