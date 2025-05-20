import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { Formik, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import Textfield from "../../../component/TextInput";
import { BiLoader } from "react-icons/bi";
import { apiRequest } from "../../../utils/apiRequest";
import * as urls from "../../../utils/url";
import toastNotify from "../../../utils/tostNotify";
import { SweetAlerts } from "../../../utils/sweetAlert";
import Checkbox from "../../../component/ui/checkBox/Checkbox";


// Yup validation schema
const validationSchema = Yup.object({
  customUserNm: Yup.string().required("User Name is required"),
  clientname: Yup.string().required("Client Name is required"),
  userlimit: Yup.string().required("User Limit is required"),
  mobileNumber: Yup.string()
    .required("Mobile Number is required")
    .matches(/^[0-9]{10}$/, "Mobile Number must be 10 digits"),
  emailId: Yup.string()
    .required("Email ID is required")
    .email("Invalid email format"),
});

// Props interface
interface ClientModalProps {
  show: boolean;
  handleClose: () => void;
}

const ClientModal: React.FC<ClientModalProps> = ({ show, handleClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [clientId, setClintId] = useState<string>()
  const [customUserId, setCustomUsertId] = useState<string>()

  console.log("customUserId", customUserId);
  //Api call 

  // Get Clint Id 
  const getClintId = async () => {
    try {
      const payload = {}
      const config = {}
      const result = await apiRequest("POST", urls.getClintId, payload, config);
      if (result.statusCode === 1) {
        toastNotify(result.message, "error")
      }
      else {
        setClintId(result.data);
      }
    } catch (error: any) {
      toastNotify(error, "error");
    }
  }

  // Get User Id 
  const getUserId = async () => {
    try {
      const payload = {}
      const config = {}
      const result = await apiRequest("POST", urls.getUserId, payload, config);
      setCustomUsertId(result.data);

    } catch (error: any) {
      toastNotify(error, "error");
    }
  }

  // Add Clint Api 
  const addClint = async (valuea: any) => {
    setIsLoading(true);
    try {
      const payload = {
        clientId,
        customUserNm: valuea.customUserNm,
        clientNm: valuea.clientname,
        createUserLimit: valuea.userlimit,
        mobileNo: valuea.mobileNumber,
        email: valuea.emailId,
        isPostpaid: valuea.isPrepaid,
        isNegativeBalance: valuea.isNegativeBalance,
        isActive: true,
        isAllowAnyIp: true,
        allowMaxNegativeBalance: 0
      }
      const config = {};
      const result = await apiRequest("POST", urls.addClint, payload, config);
      if (result.statusCode === 0) {
        handleClose();
        SweetAlerts("Success !", result.message, "success");
      }
      else {
        SweetAlerts("Error !", result.message, "error");
      }
    } catch (error) {
      // toastNotify(result.message, "error");
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getClintId();
    getUserId();
  }, []);


  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header className="px-3 py-2" closeButton>
        <Modal.Title>
          Client <span className="text-primary">Information</span>
        </Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          clientId: clientId,
          customUserNm: customUserId,
          clientname: "",
          userlimit: "",
          mobileNumber: "",
          emailId: "",
          isPrepaid: false,
          isNegativeBalance: false,
        }}

        validationSchema={validationSchema}
        onSubmit={addClint}
      >
        {({ handleBlur, values, setFieldValue }) => (
          <FormikForm>
            <Modal.Body>
              <Row>
                {/* Client ID */}
                <Col md={6}>
                  <Textfield
                    label="Client Id"
                    name="clientId"
                    type="text"
                    disabled
                    size="sm"
                    placeholder="Client ID"
                    tabIndex={1}
                    maxLength={6}
                    required
                    value={clientId}
                    onChange={(e) => setFieldValue("clientId", e.target.value.trim())}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage name="clientId" component="div" className="error-msg" />

                </Col>

                {/* Login ID */}
                <Col md={6}>
                  <Textfield
                    label="User Name"
                    name="customUserNm"
                    type="text"
                    size="sm"
                    placeholder="Enter your Login ID"
                    tabIndex={2}
                    maxLength={8}
                    required
                    value={values.customUserNm}
                    onChange={(e) => setFieldValue("customUserNm", e.target.value.trim())}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage name="customUserNm" component="div" className="error-msg" />
                </Col>

                {/* Client Name */}
                <Col md={12}>
                  <Textfield
                    label="Client Name"
                    name="clientname"
                    type="text"
                    size="sm"
                    placeholder="Enter client name"
                    tabIndex={3}
                    maxLength={25}
                    required
                    value={values.clientname}
                    onChange={(e) => setFieldValue("clientname", e.target.value)}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage name="clientname" component="div" className="error-msg" />
                </Col>

                {/* Email */}
                <Col md={12}>
                  <Textfield
                    label="Email"
                    name="emailId"
                    type="email"
                    size="sm"
                    placeholder="Please enter email"
                    tabIndex={4}
                    maxLength={25}
                    required
                    value={values.emailId}
                    onChange={(e) => setFieldValue("emailId", e.target.value.trim())}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage name="emailId" component="div" className="error-msg" />
                </Col>

                {/* Mobile Number */}
                <Col md={6}>
                  <Textfield
                    label="Mobile No"
                    name="mobileNumber"
                    type="text"
                    size="sm"
                    placeholder="Please enter mobile number"
                    tabIndex={5}
                    maxLength={10}
                    required
                    value={values.mobileNumber}
                    onChange={(e: any) => {
                      const { value } = e.target;
                      const regex = /^[0-9]*[.,]?[0-9]*$/;
                      if (regex.test(value.toString())) {
                        setFieldValue("mobileNumber", value);
                      }
                    }}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage name="mobileNumber" component="div" className="error-msg" />
                </Col>

                {/* User Limit */}
                <Col md={6}>
                  <Textfield
                    label="Create Sub-User Limit"
                    name="userlimit"
                    type="text"
                    size="sm"
                    placeholder="User Limit"
                    tabIndex={6}
                    maxLength={6}
                    required
                    value={values.userlimit}
                    onChange={(e: any) => {
                      const { value } = e.target;
                      const regex = /^[0-9]*[.,]?[0-9]*$/;
                      if (regex.test(value.toString())) {
                        setFieldValue("userlimit", value);
                      }
                    }}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage name="userlimit" component="div" className="error-msg" />
                </Col>

                {/* Checkboxes */}
                <Col md={6} className="d-grid gap-3 mt-3">
                  <div className="d-flex align-items-center gap-2">
                    <Checkbox
                      checked={values.isPrepaid}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("isPrepaid", e.target.checked);
                      }}
                    />
                    <label className="text-xs Dropdown-custome mt-1">Postpaid Client</label>
                  </div>
                </Col>
                <Col md={6} className="gap-3 mt-3">
                  <div className="d-flex align-items-center gap-2">
                    <Checkbox
                      checked={values.isNegativeBalance}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("isNegativeBalance", e.target.checked);
                      }}
                    />
                    <label className="text-xs Dropdown-custome mt-1">Allow Negative Balance</label>
                  </div>
                </Col>
              </Row>
            </Modal.Body>

            <Modal.Footer className="p-2">
              <Button className="px-3 border" size="sm" variant="outline-secondary" onClick={handleClose}>
                Close
              </Button>
              <Button disabled={isLoading} type="submit" variant="primary" tabIndex={6} size="sm" >
                {!isLoading ? "Submit" : (
                  <>
                    <BiLoader className="bx-spin text-white text-lg me-2" />
                    Loading...
                  </>
                )}
              </Button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};

export default ClientModal;
