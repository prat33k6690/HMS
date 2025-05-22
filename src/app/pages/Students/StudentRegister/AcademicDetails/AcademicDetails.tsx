import React from 'react'
import Textfield from '../../../../component/TextInput'
import { Col, Row } from 'react-bootstrap'
import CustomSelectInput from '../../../../component/ui/selecter/CustomSelectInput'

function AcademicDetails() {
    return (
        <div>
            <div className='bg-white borderForm p-3 mt-3' >
                <h4 className='FSR'   >Academic Details <svg xmlns="http://www.w3.org/2000/svg" style={{ height: "16px" }} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                </svg>
                </h4>
                <p className='text-sm' >
                    If your form layout allows it, you can swap the feedback classes form tooltip classes to display validation feedback in a styled tooltip. Be sure to have a parent with position: relativeon it for tooltip positioning.</p>
                <div>

                    <Row className="mb-3">
                        <Col xl={3} md={6} sm={6} xs={12}>
                            <Textfield
                                label="University/College Name"
                                type="text"
                                placeholder="Enter University/College Name"
                                required
                                id="validationCustom01"
                                feedback="Please provide a valid city."
                                isInvalid={true}
                            />
                        </Col>

                        <Col xl={3} md={6} sm={6} xs={12}>
                            <Textfield
                                label="Course Name"
                                type="text"
                                placeholder="Enter Course Name"
                                required
                                id="validationCustom02"
                                feedback="Please provide a valid zip."
                                isInvalid={true}
                            />
                        </Col>
                        <Col xl={3} md={6} sm={6} xs={12}>
                            <Textfield
                                label="Roll Number / Student ID (Text)"
                                type="text"
                                placeholder="Enter Roll Number / Student ID (Text)"
                                required
                                id="validationCustom03"
                                feedback="Please provide a valid zip."
                                isInvalid={true}
                            />
                        </Col>
                        <Col xl={3} md={6} sm={6} xs={12}>
                            <CustomSelectInput label="Year/Semeste " name="Year/Semeste " options={[]} value={null} isDisabled={false} onChange={() => { }} />
                        </Col>

                    </Row>
                </div>
            </div >
        </div>
    )
}

export default AcademicDetails
