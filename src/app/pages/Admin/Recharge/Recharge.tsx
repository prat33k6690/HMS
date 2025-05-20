import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { IoIosAdd } from 'react-icons/io'
import RechargeModal from '../../../content/modal/RechargeModal/RechargeModal'
import RechageTbl from '../../../content/table/RechageTable/RechageTbl';

function Recharge() {
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
          <p className="fw-medium m-0 h6 ps-2">IP White <span className="fw-semibold text-primary"> Recharge</span></p>
        </div>
        <div>
          <Button variant="primary" className="btn-sm" onClick={handleOpenModal} > <IoIosAdd /> Add </Button>
        </div>
        </div>
        {/* //Table  */}
        <Card className="p-3 border-0 rounded-0">
          <RechageTbl />
        </Card> 
         {/* Modal  */}
         {showModal && (
        <RechargeModal
          show={showModal}
          handleClose={handleCloseModal}
          handleSubmit={handleSubmit}
        />
         )}
      </div>
    </>
  )
}

export default Recharge
