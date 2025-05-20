import React, { useCallback, useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { getApiServiceMenu } from '../../apiService/commonApi';

function KYCVerification() {
    const [updateSidebarMenu, setUpdateSidebarMenu] = useState<any>([]);

console.log("updateSidebarMenu updateSidebarMenu",updateSidebarMenu);

      // Get Menu API service Sub Menu
      const getApiServiceSubMenu = useCallback(async () => {
        const result: any = await getApiServiceMenu();
         console.log("result",result);
        setUpdateSidebarMenu(result);
      }, []);
  
      useEffect(() =>{
        getApiServiceSubMenu();
      }
      ,[])
  return (
    <>
    <div>KYC-Verification</div>
    <Row> 
        <Col>
          <Card>
            <Card.Body>
              <Row>
                {updateSidebarMenu.map((menus: any) => (
                  <Col md={3}>
                    <Card  className="p-3 details_Card">
                      <Row>
                        <Col md={1}>
                          <img className="" style={{ height: "35px", width: "35px" }}  />
                        </Col>
                        <Col className="ms-3">
                          <h6 className="fw-semibold text-start mb-1">  {menus.groupNm} </h6>
                          <p className="text-sm api-description mb-0"> {menus.description}</p>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
        </>
  )
}

export default KYCVerification
