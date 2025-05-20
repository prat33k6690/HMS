import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import UserModal from '../../../content/modal/User Master/UserModal';
import UserTbl from '../../../content/table/UserTable/UserTbl';
import { IoIosAdd } from "react-icons/io";
import { apiRequest } from "../../../utils/apiRequest";
import * as urls from "./../../../utils/url"
import { SweetAlerts } from '../../../utils/sweetAlert';

const UserMaster = () => {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [data,setData] = useState<any>([])

  // Api Call // 
const getUser = async() =>{
  try {
     const payload = {}
        const config = {}
        const result = await apiRequest("POST",urls.getUser ,payload,config);
         if(result.statusCode  !== 0){
                    SweetAlerts("Error !", result.message, "error");
              }
              else{setData(result.data);}
  } catch (error) {
    console.log(error, "error");
  }
} 
  
useEffect(() => {
  getUser();
},[])

  return (
    <div>
      <div className='d-flex justify-content-between'>
           <div>
          <p className="fw-medium m-0 h6 ps-2">
          User <span className="fw-semibold text-primary">Master</span>
          </p>
        </div>

        <div>
          <Button className=' rounded-1' size='sm' onClick={handleOpenModal}>
            <IoIosAdd /> Add User
          </Button>
        </div>
      </div>
        <Card className="p-3 border-0">
          <UserTbl  data={data}  />
        </Card>
      {showModal && (
      <UserModal show={showModal} handleClose={handleCloseModal}  />
      )}
      </div>
  );
};

export default UserMaster;
