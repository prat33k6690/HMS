
import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Textfield from '../../../../component/TextInput';
import CustomSelectInput from '../../../../component/ui/selecter/CustomSelectInput';

function Address() {
    return (
        <div>
            <div className='bg-white borderForm p-3 mt-3' >
                <h4 className='FSR'    >Address <svg xmlns="http://www.w3.org/2000/svg" style={{ height: "16px" }} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>

                </h4>
                <p className='text-sm' >
                    If your form layout allows it, you can swap the feedback classes form tooltip classes to display validation feedback in a styled tooltip. Be sure to have a parent with position: relativeon it for tooltip positioning.</p>
                <Row className="mb-3">
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
                    <Col md={3} className="mt-0 position-relative">
                        <Form.Group>
                            < CustomSelectInput label="Country" name="currentCountryCd" options={[]} value={null} isDisabled={false} onChange={() => { }} />
                        </Form.Group>
                    </Col>

                    <Col md={3} className="mt-0 position-relative">
                        <Form.Group>
                            < CustomSelectInput label="State" name="currentStateCd" options={[]} value={null} isDisabled={false} onChange={() => { }} />

                        </Form.Group>
                    </Col>

                    <Col md={3} className="mt-0 position-relative">
                        <Form.Group>
                            < CustomSelectInput label="City" name="currentCityCd" options={[]} value={null} isDisabled={false} onChange={() => { }} />

                        </Form.Group>
                    </Col>

                    <Col md={3} className="mt-0 position-relative">
                        <Form.Group>
                            <Textfield
                                label={"Pincode"}
                                name="currentPinCode"
                                placeholder="Pincode"
                                value={null}
                                disabled={true}

                            />
                        </Form.Group>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Address
