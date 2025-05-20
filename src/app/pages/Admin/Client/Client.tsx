import React, { useEffect, useState } from "react";
import ClientModal from "../../../content/modal/User Master/ClientModal";
import { Button, Card } from "react-bootstrap";
import ClientTbl from "../../../content/table/Client Table/ClientTbl/ClientTbl";
import { IoIosAdd } from "react-icons/io";
import { SweetAlerts } from "../../../utils/sweetAlert";
import { apiRequest } from "../../../utils/apiRequest";
import * as urls from "../../../utils/url"

function Client() {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [data,setData] = useState<any>([])

    // Api Call // 
  const getClint = async() =>{
    try {
      const payload = {}
      const config = {}
      const result = await apiRequest("POST",urls.getClint ,payload,config);
      if(result.statusCode  !== 0){
            SweetAlerts("Error !", result.message, "error");
      }
      else{setData(result.data);}
      
    } catch (error :any) {
          console.log(error, "error");
    }
  }
  
  useEffect(() => {
    getClint();
  },[])

  return (
    <div>
      <div className="w-auto d-flex align-items-center justify-content-between ">
        <div>
          <p className="fw-medium m-0 h6 ps-2">
            Client <span className="fw-semibold text-primary">Manager</span>
          </p>
        </div>
        <div>
          <Button variant="primary" className="btn-sm" onClick={handleOpenModal}> <IoIosAdd /> Add Client</Button>
        </div>
      </div>

      {/* <ClientTbl/> */}
      {/* <div className="table-responsive mt-3" style={{ height: "calc(100vh - 120px)", overflow: "auto" }} > */}
        <Card className="p-3 border-0 rounded-0">
          <ClientTbl data={data}  />
        </Card>
      {/* </div> */}

      {showModal && (
        <ClientModal  show={showModal}  handleClose={handleCloseModal}/>
      )}
    </div>
  );
}

export default Client;
