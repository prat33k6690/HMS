
import StudentInformation from './StudentRegister/StudentInformation';
import ContactDetails from './StudentRegister/ContactDetails/ContactDetails';
import AcademicDetails from './StudentRegister/AcademicDetails/AcademicDetails';
import Address from './StudentRegister/Address/Address';
// import { Formik } from 'formik';
// import * as Yup from "yup";
// import { Form } from 'react-router-dom';
function RegisterStudent() {



  return (
    <>
      <StudentInformation />
      <Address />
      <AcademicDetails />
      <ContactDetails />

    </>
  );
}

export default RegisterStudent;
