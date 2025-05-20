import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { Formik, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import Textfield from "../../../component/TextInput";
import { apiRequest } from "../../../utils/apiRequest";
import * as urls from "../../../utils/url";
import toastNotify from "../../../utils/tostNotify";
import { BiLoader } from "react-icons/bi";
import { SweetAlerts } from "../../../utils/sweetAlert";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  personNm: Yup.string().required("Person name is required"),
  mobileNumber: Yup.string()
    .required("Mobile Number is required")
    .matches(/^[0-9]{10}$/, "Mobile Number must be 10 digits"),
  email: Yup.string()
    .required("Email ID is required")
    .email("Invalid email format"),
});

interface UserModalProps {
  show: boolean;
  handleClose: () => void;
  handleSubmit?: (formData: any) => void;
}


const UserModal: React.FC<UserModalProps> = ({show,handleClose,handleSubmit,}) => {
const [isLoading, setIsLoading] = useState(false);
const [customeUserNm , setCustomeUserId] = useState<string>("")


//Api Call 

// Get User Id 
const getUserId = async() =>{
  try {
    const payload = {}
    const config = {}
    const result = await apiRequest("POST",urls.getUserId ,payload,config);
    setCustomeUserId(result.data);
    if(result.statusCode !== 0){
      SweetAlerts("Error !", result.message, "error");
    }
  } catch (error :any) {
        toastNotify(error, "error");
  }
}
// User Add Api Call // 
const addUser = async(values:any) =>{
  setIsLoading(true);
  try {
    const payload = {
      customUserNm: customeUserNm ,
      personNm: values.personNm,
      mobileNumber: values.mobileNumber,
      email : values.email
    }
    const config = {}
    const result = await apiRequest("POST",urls.addUser ,payload,config);
    if(result.statusCode === 0){
      SweetAlerts("Success !", result.message, "success");
      handleClose();
    }
    else{
      SweetAlerts("Error !", result.message, "error");
    }
  } catch (error) {
    SweetAlerts("Error !" + "error");
  }
  finally{
    setIsLoading(false)
  }
}
  useEffect(() => {
    getUserId();
  }, []);
  
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header className="px-3 py-2" closeButton>
        <Modal.Title>User Information</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          username: customeUserNm,
          personNm: "",
          mobileNumber: "",
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={addUser}
      >
        {({ handleChange, handleBlur, values, setFieldValue }) => (
          <FormikForm>
            <Modal.Body>
              <Row>
                <Col md={6}>
                  <Textfield
                    label="Username"
                    name="username"
                    type="text"
                    size="sm"
                    tabIndex={1}
                    maxLength={20}
                    placeholder="Enter username"
                    required
                    value={values.username}
                    onChange={(e) =>
                      setFieldValue("username", e.target.value.trim())
                    }
                    onBlur={handleBlur}
                  />
                 <ErrorMessage name="username" component="div" className="error-msg" />
                </Col>

                <Col md={6}>
                  <Textfield
                    label="Person Name"
                    name="personNm"
                    type="text"
                    size="sm"
                    tabIndex={2}
                    maxLength={20}
                    placeholder="Enter Person name"
                    required
                    value={values.personNm}
                    onChange={(e) =>setFieldValue("personNm", e.target.value.trim())                    }
                    onBlur={handleBlur}
                  />
                 <ErrorMessage name="personNm" component="div" className="error-msg" />
                </Col>
                 <Col md={6}>
                  <Textfield
                    label="Email"
                    name="email"
                    type="text"
                    size="sm"
                    tabIndex={3}
                    maxLength={20}
                    placeholder="Enter email"
                    required
                    value={values.email}
                    onChange={(e) =>setFieldValue("email", e.target.value.trim())                    }
                    onBlur={handleBlur}
                  />
                 <ErrorMessage name="email" component="div" className="error-msg" />
                </Col> 
                <Col md={6}>
                  <Textfield
                    label="Mobile No"
                    name="mobileNumber"
                    type="text"
                    size="sm"
                    tabIndex={4}
                    maxLength={10}
                    placeholder="Enter mobile number"
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
              </Row>
            </Modal.Body>
            <Modal.Footer className="p-2">
              <Button
                className="px-3 border"
                size="sm"
                variant="outline-secondary"
                onClick={handleClose}
              >
                Close
              </Button>
              {/* <Button className="Btn-color px-3" size="sm" type="submit"> */}
              <Button disabled={isLoading} type="submit" variant="primary" tabIndex={5} size="sm" >
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

export default UserModal;
