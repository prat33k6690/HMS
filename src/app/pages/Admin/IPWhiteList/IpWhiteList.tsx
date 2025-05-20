import React, { useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { IoIosAdd } from 'react-icons/io'
import IpWhiteListModal from '../../../content/modal/IP White List/IpWhiteListModal';
import IpwhitelistTbl from '../../../content/table/IpwhiteListTbl/IpwhitelistTbl';

function IpWhiteList() {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleSubmit = (formData: any) => {
    console.log("Form Submitted:", formData);
  };
  return (
    <>
    <div>
      <div className="w-auto d-flex align-items-center justify-content-between ">
        <div>
          <p className="fw-medium m-0 h6 ps-2">IP White <span className="fw-semibold text-primary"> List</span></p>
        </div>
        <div>
          <Button variant="primary" className="btn-sm" onClick={handleOpenModal} > <IoIosAdd /> Add </Button>
        </div>
        </div>
        {/* //Table  */}
        <Card className="p-3 border-0 rounded-0">
          <IpwhitelistTbl />
        </Card>
        {/* Modal  */}
        <IpWhiteListModal
          show={showModal}
          handleClose={handleCloseModal}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  )
}

export default IpWhiteList
