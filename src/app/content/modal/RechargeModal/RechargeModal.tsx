import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { Formik, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import RadioBtn from '../../../component/ui/Button/RadioBtn';
import Textfield from '../../../component/TextInput';
import { BiLoader } from 'react-icons/bi';
import SelectField from '../../../component/ui/selectBox/SelectField';
import { apiRequest } from '../../../utils/apiRequest';
import toastNotify from '../../../utils/tostNotify';
import * as urls from "./../../../utils/url";
import OtpField from '../../../component/otpField/OtpField';
import { SweetAlerts } from '../../../utils/sweetAlert';

// Yup validation schema
const validationSchema = Yup.object({
    rechargeAmount: Yup.string().required("Recharge Amount is required"),
    clientCode: Yup.string().required("Client selection is required"),
});

// Props interface
interface ReachargModalProps {
    show: boolean;
    handleClose: () => void;
    handleSubmit: (formData: any) => void;
}

const RechargeModal: React.FC<ReachargModalProps> = ({ show, handleClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [clientList, setClientList] = useState<any[]>([]);
    const [isOtpField, setIsOtpField] = useState<boolean>(false);
    const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]); // in this store Mobile OTP OR G_AUTH OTP for both
    const [clientRechargeData, setClientRechargeData] = useState<any>()
    const [rechargeClientCd, setRechargeClientcd] = useState<Number>()

    // Here generate single string to OTP
    const joinOTP = otpValues.join();
    const OTPValues = joinOTP.replace(/,/g, "");

    // Fetch clients
    const getClients = async () => {
        try {
            const result = await apiRequest("POST", urls.getClint, {}, {});
            if (result.statusCode !== 0) {
                 SweetAlerts("Error !", result.message, "error");

            } else {
                setClientList(result.data);
            }
        } catch (error: any) {
            toastNotify(error.message || "Error fetching clients", "error");
        }
    };

    // Recharge Api 
    const clientRecharge = async (values: any, { resetForm }: any) => {
        try {
            setIsLoading(true);
            const payload = {
                rechargeClientCd: values.clientCode,
                drCr: values.drCr,
                rechargeUnit: Number(values.rechargeAmount)
            };
            const config = {};
            const result = await apiRequest("POST", urls.clientRecharge, payload, config);
            setClientRechargeData(result.data);
            if (result.statusCode === 0) {
                SweetAlerts("Success !", result.message, "success");
                setIsOtpField(true)
                resetForm();
            }
            else {
                 SweetAlerts("Error !", result.message, "error");
            }
        } catch (error: any) {
            toastNotify(error.message || "Recharge failed", "error");
        } finally {
            setIsLoading(false);
        }
    };
    // verify to Mobile OTP and G_AUTH OTP 
    async function handleOtpVerify() {
        setIsLoading(true);
        try {
            const payload = {
                otpCode: OTPValues,
                otpToken: clientRechargeData.otpToken,
                rechargeId: clientRechargeData.rechargeId,
                reqRefNo: clientRechargeData.reqRefNo,
                rechargeClientCd: rechargeClientCd,
            };
            const config = {};
            const result = await apiRequest("POST", urls.clientOtpVerify, payload, config);
            if (result.statusCode === 0) {
                SweetAlerts("Success !", result.message, "success");
                handleClose()
                setIsOtpField(false)
            }
            else {
                SweetAlerts("Error !", result.message, "error");
            }
        } catch (error: any) {
            toastNotify(error.message || "Recharge failed", "error");
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const validateOTP = () => {
            if (OTPValues.length < 6) {
                return false;
            }
            handleOtpVerify();
        }
        validateOTP();
    }, [OTPValues.length])

    useEffect(() => {
        getClients();
    }, [])
    return (
        <Formik
            initialValues={{
                rechargeAmount: '',
                clientCode: '',
                clientLabel: '',
                drCr: 'CR'
            }}
            validationSchema={validationSchema}
            onSubmit={!isOtpField ? clientRecharge : handleOtpVerify}
        >
            {({ setFieldValue, values, handleBlur, handleSubmit }) => (
                <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Recharge Screen</Modal.Title>
                    </Modal.Header>
                    <FormikForm onSubmit={handleSubmit}>
                        <Modal.Body>
                            {isOtpField === true ? (

                                <OtpField
                                    name="OTP"
                                    otpValues={otpValues}
                                    setOtpValues={setOtpValues}
                                />
                            ) : (
                                <Row>
                                    <Col md={12}>
                                        <SelectField
                                            label='Client'
                                            placeholder='Select Client'
                                            name='clientCode'
                                            required
                                            onBlur={handleBlur}
                                            tabIndex={1}
                                            options={[
                                                // { value: "", label: "" },
                                                ...clientList.map((item: any) => ({
                                                    value: item.clientCd,
                                                    label: item.clientNm,
                                                }))
                                            ]}
                                            value={{
                                                value: values.clientCode,
                                                label: values.clientLabel,
                                            }}
                                            onChange={(e: any) => {
                                                setFieldValue("clientCode", e?.value);
                                                setFieldValue("clientLabel", e?.label);
                                                setRechargeClientcd(e.value);
                                            }}
                                        />
                                        <ErrorMessage name="clientCode" component="div" className="error-msg" />
                                    </Col>
                                    <Col md={6}>
                                        <div className="d-flex gap-4 mt-4">
                                            <RadioBtn
                                                label="Credit"
                                                checked={values.drCr === "CR"}
                                                name="drCr"
                                                onChange={() => setFieldValue("drCr", "CR")}
                                            />
                                            <RadioBtn
                                                label="Debit"
                                                checked={values.drCr === "DR"}
                                                name="drCr"
                                                onChange={() => setFieldValue("drCr", "DR")}
                                            />
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <Textfield
                                            label='Recharge Amount'
                                            name="rechargeAmount"
                                            size="sm"
                                            placeholder="Enter Amount"
                                            tabIndex={2}
                                            maxLength={7}
                                            required
                                            value={values.rechargeAmount}
                                            onChange={(e: any) => {
                                                const { value } = e.target;
                                                const regex = /^[0-9]*[.,]?[0-9]*$/;
                                                if (regex.test(value.toString())) {
                                                    setFieldValue("rechargeAmount", value);
                                                }
                                            }}
                                            onBlur={handleBlur}
                                        />
                                        <ErrorMessage name="rechargeAmount" component="div" className="error-msg" />
                                    </Col>
                                </Row>
                            )}

                        </Modal.Body>
                            {!isOtpField ? 
                             <Modal.Footer className="p-2">
                             <Button className="px-3 border" size="sm" variant="outline-secondary" onClick={handleClose}>
                                 Close
                             </Button>
                             {/* {!isOtpField ? */}
                                 <Button disabled={isLoading} type="submit" variant="primary" tabIndex={6} size="sm">
                                     {!isLoading ? "Recharge" : (
                                         <>
                                             <BiLoader className="bx-spin text-white text-lg me-2" />
                                             Loading...
                                         </>
                                     )}
 
                                 </Button>
                         </Modal.Footer>
                        : ""
                        }
                    </FormikForm>
                </Modal>
            )}
        </Formik>
    );
};

export default RechargeModal;
