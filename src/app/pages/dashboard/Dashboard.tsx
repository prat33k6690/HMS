import React, { useCallback, useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { getApiServiceMenu } from "../../apiService/commonApi";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../utils/apiRequest";
import * as urls from "../../utils/url";
import toastNotify from "../../utils/tostNotify";
import { imgLogo } from "./iconImg";

const Dashboard: React.FC = () => {
  const [updateSidebarMenu, setUpdateSidebarMenu] = useState<any>([]);
  const navigator = useNavigate();

  // Get Menu API service Sub Menu
  const getApiServiceSubMenu = useCallback(async () => {
    const result: any = await getApiServiceMenu();
    const serviceMenus: any = [];

    // Do seprate to service menus and store in serviceMenus variable
    result?.map((items: any) => {
      items?.details?.map((data: any) => {
        serviceMenus?.push(data);
      })
    })

    // ServiceMenus store in a state
    setUpdateSidebarMenu(serviceMenus);
  }, []);

  useEffect(() => {
    getApiServiceSubMenu();
  }, []);

  const getApiServiceInputs = async (data: any) => {
    try {
      const payload = {
        apiCd: data.apiCd,
      };
      const config = {};
      const result = await apiRequest("POST", urls.apiVerificationInput, payload, config);
      if (result.statusCode === 0) {
        // return result.data;
        navigator("/dashboard/apiservice", { state: { data: result.data, serviceNm: data.serviceNm, details: data } })
      } else {
        result.message !== "No data found" &&
          toastNotify(result.message, "error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };


  return (
    <>
      <div>
        <h6>API Service</h6>
      </div>
      <Card style={{ height: "calc(100vh - 230px)" }} className="overflow-auto">
        <Card.Body>
          <Row>
            {updateSidebarMenu.map((menus: any) => (
              <Col md={3}>
                <Card onClick={() => getApiServiceInputs(menus)} className="p-3 details_Card">
                  <Row>
                    <Col md={1}>
                      <img title="image" className="" style={{ height: "35px", width: "35px" }} src={imgLogo} />
                    </Col>
                    <Col className="ms-3">
                      <h6 className="fw-semibold text-start mb-1">  {menus.serviceNm} </h6>
                      <p className="text-sm api-description mb-0"> {menus.description}</p>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default Dashboard;
