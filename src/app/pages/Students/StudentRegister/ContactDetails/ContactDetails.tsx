import React from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Textfield from '../../../../component/TextInput';
import CustomSelectInput from '../../../../component/ui/selecter/CustomSelectInput';

function ContactDetails() {
    return (
        <div className='mt-3'>
            <div className='bg-white borderForm p-3' >
                <h4 className='fs-5'   >Emergency Contact Details <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                </svg>
                </h4>
                <p className='text-sm' >
                    If your form layout allows it, you can swap the feedback classes form tooltip classes to display validation feedback in a styled tooltip. Be sure to have a parent with position: relativeon it for tooltip positioning.</p>
                <div>

                    <Row className="mb-3">
                        <Col xl={3} md={6} sm={6} xs={12}>
                            <Textfield
                                label=" name"
                                type="text"
                                placeholder="Enter  Name"
                                required
                                id="validationCustom01"
                                feedback="Please provide a valid city."
                                isInvalid={true}
                            />
                        </Col>

                        <Col xl={3} md={6} sm={6} xs={12}>
                            <Textfield
                                label="Contact Numbers"
                                type="number"
                                placeholder="Enter Contact Number"
                                required
                                id="validationCustom02"
                                feedback="Please provide a valid zip."
                                isInvalid={true}
                            />
                        </Col>
                        <Col xl={3} md={6} sm={6} xs={12}>
                            <Textfield
                                label="Phone Number"
                                type="number"
                                placeholder="Enter Phone Number"
                                required
                                id="validationCustom03"
                                feedback="Please provide a valid zip."
                                isInvalid={true}
                            />
                        </Col>
                        <Col xl={3} md={6} sm={6} xs={12}>
                            <Textfield
                                label="Email "
                                type="Email "
                                placeholder="Enter EmailID"
                                required
                                id="validationCustom03"
                                feedback="Please provide a valid zip."
                                isInvalid={true}
                            />
                        </Col>
                    </Row>
                </div>
            </div >
        </div>
    )
}

export default ContactDetails
