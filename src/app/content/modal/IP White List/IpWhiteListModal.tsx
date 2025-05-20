import { Formik, Form as FormikForm, ErrorMessage } from "formik";
import React, { useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap';
import Textfield from '../../../component/TextInput';
import { BiLoader } from "react-icons/bi";
import * as Yup from "yup";
import RadioBtn from "../../../component/ui/Button/RadioBtn";
import TextArea from "../../../component/ui/Input/TextArea";



// Yup validation schema
const validationSchema = Yup.object({
    IP: Yup.string().required("IP  required"),
    remark: Yup.string().required("remark is required"),
});

// Props interface
interface IpWhiteListProps {
    show: boolean;
    handleClose: () => void;
    handleSubmit: (formData: any) => void;
}


const IpWhiteListModal: React.FC<IpWhiteListProps> = ({ show, handleClose, handleSubmit }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header className="px-3 py-2" closeButton>
                <Modal.Title>
                    Client <span className="text-primary">Information</span>
                </Modal.Title>
            </Modal.Header>
            <Formik
                initialValues={{
                    IP: "",
                    remark: "",
                }}

                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleBlur, values, setFieldValue }) => (
                    <FormikForm>
                        <Modal.Body>
                            <Row>
                                <Col >
                                    <label className="text-xs">IP Type</label>
                                    <div className=" d-flex gap-5">
                                        <RadioBtn label="IPV4" name="ipv4" />
                                        <RadioBtn label="IPV6" name="ipv6" />
                                    </div>
                                </Col>
                                {/* Client Name */}
                                <Col md={12}>
                                    <Textfield
                                        label="IP Name"
                                        name="IP"
                                        type="text"
                                        size="sm"
                                        placeholder="Enter IP Name"
                                        tabIndex={1}
                                        maxLength={25}
                                        required
                                        value={values.IP}
                                        onChange={(e) => setFieldValue("IP", e.target.value)}
                                        onBlur={handleBlur}
                                    />
                                    <ErrorMessage name="IP" component="div" className="error-msg" />
                                </Col>
                                <Col md={12}>
                                    <TextArea
                                        label="Remark"
                                        placeholder="Remark"
                                        tabIndex={2}
                                        maxLength={100}
                                        name="remark"
                                        value={values.remark}
                                        onChange={(e) => setFieldValue("remark", e.target.value)}
                                        onBlur={handleBlur}
                                    />
                                    <ErrorMessage name="remark" component="div" className="error-msg" />

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
    )
}

export default IpWhiteListModal
