
// Purpose: API Request Screen
// Created by: Harish
// Created Date: 11-05-2025
// Description: USer can testing of API service and check response of API's

// Change history:
// 11-05-2025 / Harish // Create this screen
// 14-05-2025 / Yogesh // set API response and view  
// 15-05-2025 / Yogesh // Set Aadhaar card and Pan Card Design with details. applied Bulk Request API. Show JSON View and added Copied Button.   
// 16-05-2025 / Yogesh // Set Aadhaar card and Pan Card Design with details. applied Bulk Request API.  
//***********************/

import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Row, Tab, Table, Tabs } from "react-bootstrap";
import SelectField from "../../component/ui/selectBox/SelectField";
import { useLayout } from "../../provider/layout";
import { useLocation, useNavigate } from "react-router-dom";
import "../../layout/sidebar/Sidebar.css";
import Textfield from "../../component/TextInput";
import { BsDownload, BsFiletypeJson } from "react-icons/bs";
import Step from "../../component/ui/step/Step";
import RadioBtn from "../../component/ui/Button/RadioBtn";
import Datepicker from "../../component/ui/Datepicker/Datepicker";
import { BiArrowBack, BiLoader } from "react-icons/bi";
import { apiRequest, apiRequestMultiPart } from "../../utils/apiRequest";
import * as urls from "../../utils/url";
import { CgDetailsMore } from "react-icons/cg";
import AadharCardImg from "../../component/ui/AadharImgFormate/AadharCardImg";
import SwaggerDocMdl from "../../content/modal/apiService/SwaggerDocMdl";
import { SweetAlerts } from "../../utils/sweetAlert";
import ReactJson from 'react-json-view'
import Checkbox from "../../component/ui/checkBox/Checkbox";
import PanCardFormat from "../../component/ui/PanCardFormate/PanCardFormat";
import toastNotify from "../../utils/tostNotify";
import { downloadFiles } from "../../utils/helper";
import * as XLSX from "xlsx";
import BulkUploadedDtlTbl from "../../content/table/apiRequest/BulkUploadedDtlTbl";


const ApiService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<any>([]); // in this store selected menu
  const { screenWidth, apiServiceSelectedMenus }: any = useLayout();
  const [apiServieStep, setApiServiceStep] = useState<number>(0);
  const [apiServiceInputs, setApiServiceInput] = useState([]);
  const [apiRefCode, setApiRefCode] = useState<string>("");
  const [modifyApiResponse, setModifymodifyApiResponse] = useState<any>(null)
  const [isSwaggerDocMdl, setIsSwaggerDocMdl] = useState<boolean>(false);
  const { state } = useLocation(); // in this get API Service Data
  const navigate = useNavigate();
  const [isShowJsonView, setIsShowJsonView] = useState<boolean>(false); // this help to show JSON view
  const [rowJsonApiResponse, setRowJsonApiResponse] = useState<any>(null);
  const [isShowCopyPop, setIsShowCopyPop] = useState<boolean>(false);
  const [selectedBulkFile, setSelectedBulkFile] = useState<any>(null);
  const [isDownloadFileLoader, setIsDownloadFileLoader] = useState<boolean>(false);
  const [uploadedFileData, setUploadedFileData] = useState<any>([]);
  const [activeTab, setActiveTab] = useState<string>("single")

  // Helper for Open Swagger Documatation Modal
  const handleSwaggerDocMdl = (): void => {
    setIsSwaggerDocMdl(!isSwaggerDocMdl);
  }

  useEffect(() => {
    // In Inputs Array added Input Value
    const updateVal = state.data[apiServieStep].input.map((items: any) => ({
      ...items,
      inputValue: "",
    }))
    setApiServiceInput(updateVal);
  }, [state, apiServieStep])

  useEffect(() => {
    setSelectedId(apiServiceSelectedMenus?.details[0]);
  }, [apiServiceSelectedMenus])

  const getDynamicColumn = (data: any, id: number) => {
    switch (data.inputType) {
      case "COMBO":
        return <SelectField
          placeholder={data.LabelName}
          tabIndex={id + 1}
          options={
            [{ value: "", label: `Select ${data.LabelName}`, ColumnVal: "" }, ...data.ComboOption.map((items: any) => ({
              value: items.SrCode, label: items.LabelName, ColumnVal: items.ColumnVal
            }))]
          }
          required={data.Required === "Y"}
        // onChange={(e: any) => {
        //     (data.flag === "F" || flag === "R") ? getDynamicInputColumnValue(data.ColumnCode, e.ColumnVal) : fetchSubDynamicColumn(data.ColumnCode, e.value, e.ColumnVal, "D");
        // }}
        />;

      case "TEXT":
        return <Textfield
          label={data.inputLabelNm}
          name={data.inputLabelNm}
          type="text"
          id={data.inputLabelNm}
          placeholder={"Enter " + data.inputLabelNm}
          size="sm"
          tabIndex={id + 1}
          pattern={new RegExp(`${data.inputPattern}`)}
          minLength={data.minLength}
          maxLength={data.maxLength}
          value={data.inputValue}
          required={data.required}
          onChange={(e: any) => {
            const { value } = e.target;
            var newValaue: any = [...apiServiceInputs]
            newValaue[id].inputValue = value;
            setApiServiceInput(newValaue);
          }}
        />;

      case "NUMBER":
        return <Textfield
          label={data.inputLabelNm}
          name={data.inputLabelNm}
          id={data.inputLabelNm}
          placeholder={"Enter " + data.inputLabelNm}
          size="sm"
          tabIndex={id + 1}
          pattern={data.inputPattern}
          minLength={data.minLength}
          maxLength={data.maxLength}
          value={data.ColumnValue}
          required={data.required}
          onChange={(e: any) => {
            var newValaue: any = [...apiServiceInputs]
            newValaue[id].inputValue = e.target.value;
            setApiServiceInput(newValaue);
          }}

        // onChange={(e:any) => {data.inputValue, e.target.value;}}
        />;
      // case "TEXT":
      //   return <TextArea
      //     label={data.LabelName}
      //     name={data.LabelName}
      //     id={data.LabelName}
      //     size="small"
      //     tabIndex={3}
      //     minLength={Number(data.MinLength)}
      //     maxLength={Number(data.MaxLength)}
      //     value={data.ColumnValue}
      //     required={data.Required === "Y"}
      //   // onChange={(e) => {
      //   //     getDynamicInputColumnValue(data.ColumnCode, e.target.value);
      //   // }}
      //   />;
      case "CHECK":
        return
      //  <Checkbox
      // label={data.LabelName}
      // name={data.LabelName}
      // value={data.ColumnValue}
      // checked={data.ColumnValue === "Y"}
      // onChange={(e: any) => {
      //     const value = e.target.checked ? "Y" : "N"
      //     getDynamicInputColumnValue(data.ColumnCode, value);
      // }}
      // />;
      // case "NUMBER":
      //   return <Textfield
      //     label={data.inputLabelNm}
      //     name={data.LabelName}
      //     id={data.LabelName}
      //     pattern={data.inputPattern}
      //     type={data.inputType}
      //     size="sm"
      //     tabIndex={3}
      //     minLength={data.minLength}
      //     maxLength={data.maxLength}
      //     value={data.ColumnValue}
      //     required={data.required}
      //     onChange={(e: any) => {
      //       const { value } = e.target;
      //       const regex = /^[0-9]*[.,]?[0-9]*$/;
      //       if (regex.test(value.toString())) {
      //         var newValaue: any = [...apiServiceInputs]
      //         newValaue[id].inputValue = value;
      //         setApiServiceInput(newValaue);
      //       }
      //     }}
      //   />;
      case "RADIO":
        return <div>
          <label className={`form-label text-xs ${data.Required === "Y" && "required"}`}> {data.LabelName} </label>
          < div className="d-flex mt-1" >
            {
              data.ComboOption.map((items: any, index: number) => {
                return (
                  <RadioBtn
                    key={index}
                    label={items.LabelName}
                    name={data.ColumnCode}
                    id={items.ColumnCode}
                    className="me-3"
                    value={data.ColumnValue}
                    checked={items.ColumnVal === data.ColumnValue}
                    onChange={(e: any) => {
                      // flag !== "R" ? fetchSubDynamicColumn(data.ColumnCode, items.SrCode, items.ColumnVal, "D") : getDynamicInputColumnValue(data.ColumnCode, items.ColumnVal);
                    }
                    }
                  />
                )
              })}
          </div>
        </div>;
      case "DATE":
        return <div>
          <Datepicker
            label={data.LabelName}
            className="form-control"
            size="small"
            tabIndex={3}
            // options={{
            //     dateFormat: "d-m-Y",
            //     minDate: moment().subtract(Number(data.MinLength), 'days').format('DD-MM-YYYY'),
            //     maxDate: moment().add(Number(data.MaxLength), 'days').format('DD-MM-YYYY'),
            // }}
            // placeholder={data.LabelName}
            name='dateRange'
            value={data.ColumnValue}
          // onChange={(e: any) => {
          //     getDynamicInputColumnValue(data.ColumnCode, e[0]);
          // }}
          />
        </div>;
    }
  };

  function copyResponseJSON(data: any) {
    navigator.clipboard.writeText(data).then(() => {
      setIsShowCopyPop(true)
      setTimeout(() => {
        setIsShowCopyPop(false)
      }, 1000);
    }).catch(err => {
      //  Ingore Case
    });
  }


  function isPlainObject(value: any) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  };

  // This function is marge subobject value in single object 
  const arrangemodifyApiResponseData = (val?: any) => {
    let updateArray = {};

    Object.keys(val).map((items: any) => {
      updateArray = !isPlainObject(val[items]) ? {
        ...updateArray,
        [items]: val[items],
      } : { ...updateArray, ...arrangemodifyApiResponseData(val[items]) };
    })
    return updateArray;
  }


  // Help to replace to data Key with input value and referance numbers
  const getDynamicInputValue = (inputData: any, item: any) => {
    if (item.jsonValue === "%RefNumber%") {
      return apiRefCode;
    } else {
      return inputData.find((data: any) => data.replaceKey === item.jsonValue)?.inputValue
    }
  }

  // ** API Calling start **

  // Service API Request.
  const getApiVerification = useCallback(async (data: any, inputData: any) => {

    for (let i = 0; i < inputData.length; i++) {
      if (inputData[i].required && inputData[i].inputValue === "" && inputData[i].replaceKey !== "%RefNumber%") {
        return SweetAlerts("Validation Error", `${inputData[i].inputLabelNm} is required field.`, "error");
      }

      // Check Regex validatation
      const regex = new RegExp(`${inputData[i].inputPattern}`);
      if (!regex.test(inputData[i].inputValue.toString())) {
        return SweetAlerts("Validation Error", `Invalid ${inputData[i].inputLabelNm}.`, "error");
      }
    }

    // reaplce payload data and arrange in signale object value.
    let payloadObj: any = {};
    data.payload.map((item: any) => {
      payloadObj = {
        ...payloadObj,
        [item.jsonKey]: item.jsonValue.replace(item.jsonValue, getDynamicInputValue(inputData, item))
      }
    });

    try {
      setIsLoading(true);
      const payload = {
        apiCd: data.apiCd,
        apiDtlCd: data.apiDtlCd,
        payload: payloadObj,
        refId: apiRefCode
      };
      const config = {};
      const result = await apiRequest("POST", urls.apiverification, payload, config);
      if (result.statusCode === 0) {

        // Ref code in state
        setApiRefCode(result.refId);

        // if if Steps are multiple so this help to move next after success
        if (state.data.length > 1 && state.data.length - 1 !== apiServieStep) {
          setApiServiceStep(apiServieStep + 1)
          setApiServiceInput([]);
          toastNotify(result.message, "success");
        } else {
          const updateData = arrangemodifyApiResponseData(result.data);
          setRowJsonApiResponse(result.data);
          setModifymodifyApiResponse(updateData);
          SweetAlerts("Success !", result.message, "success");
        }
      } else {
        SweetAlerts("Error !", result.message, "error");
      }
    } catch (error) {
      // Ignore Case
    }
    finally {
      setIsLoading(false);
    }
  }, [apiRefCode]);


  // Get Bulk XLSX File Format
  const getBulkXlsxFileFormat = useCallback(async () => {
    try {
      setIsDownloadFileLoader(true);
      const payload = {
        apiCd: state.details.apiCd,
      };

      const result = await apiRequest("POST", urls.downloadXLSXFormat, payload, {});
      if (result.statusCode === 0) {
        var mediaType = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,";
        // Download Sample File
        downloadFiles(mediaType + result.data.fileBase64, result.data.fileNm)
      } else {
        result.message !== "No data found" && toastNotify(result.message, "error");
      }
    } catch (error) {
      // Ingore Case
    } finally {
      setIsDownloadFileLoader(false);
    }
  }, [])

  // Get Bulk XLSX File Format
  const downloadUploadedBulkFile = useCallback(async (data: any) => {
    try {
      setIsDownloadFileLoader(true);
      const payload = {
        apiCd: state.details.apiCd,
        fileCd: data.fileCd
      };

      const result = await apiRequest("POST", urls.downloadBulkFile, payload, {});
      if (result.statusCode === 0) {
        var mediaType = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,";
        // Download Sample File
        downloadFiles(mediaType + result.data.fileBase64, result.data.fileNm)
      } else {
        SweetAlerts("Error !", result.message, "error");
      }
    } catch (error) {
      // Ingore Case
    } finally {
      setIsDownloadFileLoader(false);
    }
  }, [])


  const validationRecordLength = (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const data = e.target.result;
        const workBook = XLSX.read(data, { type: "binary" });
        const sheetName = workBook.SheetNames[0];
        const sheet = workBook.Sheets[sheetName];
        const parsedData: any[] = XLSX.utils.sheet_to_json(sheet);

        if (parsedData.length === 0) {
          SweetAlerts("Error!", "No records found in uploaded file.", "error");
        } else {
          resolve();
        }
      };

      reader.readAsBinaryString(file);
    });
  };

  // Bulk API Request 
  const bulkApiRequest = useCallback(async () => {
    try {
      setIsLoading(true);

      // Validate Record Length in Uploaded file
      await validationRecordLength(selectedBulkFile[0]);

      const payload = {
        UploadFile: selectedBulkFile[0],
        apiCd: state.details.apiCd,
      };

      const result = await apiRequestMultiPart("POST", urls.bulkRequest, payload, {});
      if (result.statusCode === 0) {
        SweetAlerts("Success !", result.message, "success");
        getUploadedBulkData();
      } else {
        SweetAlerts("Error !", result.message, "error");
      }
    } catch (error) {
      // Ignore Case
    } finally {
      setIsLoading(false);
    }
  }, [selectedBulkFile])

  // Get Bulk XLSX File Format
  const getUploadedBulkData = useCallback(async () => {
    try {
      // setIsDownloadFileLoader(true);

      const payload = {
        apiCd: state.details.apiCd,
      };

      const result = await apiRequest("POST", urls.getBulkFile, payload, {});
      if (result.statusCode === 0) {
        setUploadedFileData(result.data)
      } else {
        result.message !== "No data found" && toastNotify(result.message, "error");
      }
    } catch (error) {
      // Ingore Case
    } finally {
      // setIsDownloadFileLoader(false);
    }
  }, [])

  useEffect(() => {
    if (state.details.isAllowBulkVerify && activeTab === "bulk") {
      getUploadedBulkData()
    }
  }, [getUploadedBulkData, state, activeTab])


  return (
    <div className="m-2 m-md-0 ">
      {screenWidth <= 875 && (
        <div className="d-flex align-items-center mb-2">
          <div className="page-heading ">
            <h3 className="text-base mb-0 fw-semibold">
              {selectedId?.miscLabelNm}
            </h3>
          </div>
        </div>
      )}
      <div className={`mis-table-section w-100  ${screenWidth <= 875 && "w-100"}`}>
        <div className=" mt-0 d-flex justify-content-between">
          <div>
            <h6 className="mb-0 ">{state.serviceNm}</h6>
            <div className="d-flex gap-2" >
              <h6 className="text-sm mb-0" style={{ fontSize: "12px" }}> <span className="text-primary">{state.details.apiType}</span> </h6>
              <h6 className="text-sm mb-0" style={{ fontSize: "12px" }}> - <span className="text-primary">{state.details.version}</span> </h6>
            </div>
          </div>
          <div className="d-flex gap-2">
            <Button variant="primary" className="btn-sm" onClick={handleSwaggerDocMdl}>API Document</Button>
            <Button className="btn-sm " variant="warning" onClick={() => navigate("/dashboard")}>  <BiArrowBack /> Back</Button>
          </div>
        </div>
        <div className=" mt-3">
          <Card style={{ height: "calc(100vh - 230px)" }} className="overflow-auto">
            <Card.Body>

              <Row className="">
                {!modifyApiResponse ?
                  <>
                    {/* ______________________________________________________________________________________________________________ */}
                    {/* Input Section For Service Wise API Request */}

                    <Col md={5}>
                      <Tabs
                        defaultActiveKey="single"
                        id="uncontrolled-tab-example"
                        className={`mb-3 ${!state.details.isAllowBulkVerify ? "hide-tab" : ""}`}
                        onSelect={(tab: any) => setActiveTab(tab)}
                      >
                        <Tab eventKey="single" title="Single">
                          <div>
                            {state.data.length > 1 ? <Step steps={state.data} stepNumber={apiServieStep} Type="V" /> : ""}
                            {apiServiceInputs.map((items: any, id: number) => (
                              <div>{getDynamicColumn(items, id)}</div>
                            ))}
                          </div>

                          <div className="mt-2 justify-content-end">
                            <Button
                              type="submit"
                              variant="primary"
                              className="btn-sm"
                              disabled={isLoading}
                              tabIndex={apiServiceInputs.length + 1}
                              onClick={() => getApiVerification(state.data[apiServieStep], apiServiceInputs)}>
                              {!isLoading ? "Submit" :
                                <>
                                  <BiLoader className="bx-spin text-white text-lg me-2" />{" "}
                                  Loading...
                                </>}
                            </Button>
                          </div>
                        </Tab>
                        {state.details.isAllowBulkVerify &&
                          <Tab eventKey="bulk" title="Bulk">
                            <div>
                              <input
                                name="selectFolder"
                                type="file"
                                tabIndex={1}
                                className={`form-control form-control-sm`}
                                accept=".xlsx"
                                onChange={(e: any) => {
                                  setSelectedBulkFile(e.target.files);
                                }}
                              />
                              <div className="d-flex justify-content-end">
                                {!isDownloadFileLoader ?
                                  <Button variant='transparent' className="btn-sm text-primary" tabIndex={2} onClick={getBulkXlsxFileFormat}><BsDownload className="me-2" />Download Sample File</Button>
                                  :
                                  <>
                                    <BiLoader className="bx-spin text-lg me-2" />{" "}
                                    Loading...
                                  </>
                                }
                              </div>
                            </div>

                            <div className="mt-2 d-flex gap-3">
                              <Button type="submit" variant="primary" className="btn-sm" disabled={isLoading} onClick={bulkApiRequest}>
                                {!isLoading ? "Submit" : <><BiLoader className="bx-spin text-white text-lg me-2" />{" "}Loading...</>}
                              </Button>
                              <Button type="button" variant="transparent" className="btn-sm" disabled={isDownloadFileLoader} onClick={getBulkXlsxFileFormat}>
                                {!isDownloadFileLoader ? <><BsDownload className="me-2" /> Download Sample File</> : <><BiLoader className="bx-spin text-lg me-2" />{" "}Loading...</>}
                              </Button>
                            </div>
                          </Tab>
                        }
                      </Tabs>
                    </Col>

                    <Col md={7}>
                      <div className="api_service_details d-md-block d-none mt-3">
                        <div className="d-flex align-items-center justify-content-between border-bottom  px-2 py-3" >
                          <h6 className="text-primary mb-0"> <span><CgDetailsMore className="me-2" /></span>Details</h6>
                        </div>
                        <div className="p-2">
                          <p>{state.details.description}</p>
                        </div>
                      </div>
                    </Col>

                    {state.details.isAllowBulkVerify && activeTab === "bulk" &&
                      <Col md={12}>
                        <hr />
                        <div className="text-base fw-semibold">Uploaded Bulk File Details</div>
                        <BulkUploadedDtlTbl
                          data={uploadedFileData}
                          downloadUploadedBulkFile={downloadUploadedBulkFile}
                        />
                      </Col>
                    }
                  </>
                  :
                  <>
                    {/* ______________________________________________________________________________________________________________ */}
                    {/* Response View Section */}
                    {(state.details.apiFlag === "AADHAAR_SV" || state.details.apiFlag === "PAN_SV") &&
                      <Col md={5}>
                        {/* Aadhaar Card View */}
                        {state.details.apiFlag === "AADHAAR_SV" &&
                          <div style={{ marginTop: "35px" }}>
                            <AadharCardImg
                              name={modifyApiResponse.full_name}
                              gender={modifyApiResponse.gender}
                              dob={modifyApiResponse.dob}
                              aadharNumber={modifyApiResponse.aadhaar_number}
                              profileAadharCard={modifyApiResponse.profile_image}
                            />
                          </div>
                        }

                        {/* Pan Card View */}
                        {state.details.apiFlag === "PAN_SV" &&
                          <div style={{ marginTop: "35px" }}>
                            <PanCardFormat data={modifyApiResponse} />
                          </div>
                        }
                      </Col>
                    }

                    <Col md={(state.details.apiFlag === "AADHAAR_SV" || state.details.apiFlag === "PAN_SV") ? 7 : 12}>
                      <div className="d-flex align-items-center">
                        <div className="text-base fw-semibold">{state.serviceNm}</div>

                        <div className="ms-auto d-flex align-items-center gap-2">
                          <Checkbox
                            label="Show JSON View"
                            checked={isShowJsonView}
                            onChange={(e: any) => setIsShowJsonView(e.target.checked)}
                          />

                          {isShowJsonView &&
                            <>
                              <Button variant="secondary" className="btn-sm btn" onClick={() => copyResponseJSON(JSON.stringify(rowJsonApiResponse))}><BsFiletypeJson className="me-2" /> Copy</Button>
                              {isShowCopyPop &&
                                <div className="tooltip">
                                  Copied !!
                                </div>
                              }
                            </>
                          }
                        </div>
                      </div>

                      <div className="mt-3">
                        {isShowJsonView ?
                          <div style={{ height: "420px ", overflow: "scroll" }}>
                            <ReactJson src={rowJsonApiResponse} />
                          </div>
                          :
                          <div style={{ height: "420px ", overflow: "scroll" }}>
                            <Table bordered hover size="sm" className="api-response-table">
                              <tbody>
                                {Object.keys(modifyApiResponse).map((key: string) => (
                                  <tr key={key}>
                                    <td style={{ fontWeight: "600" }}>{key}</td>
                                    <td>
                                      <div style={{
                                        width: 500,
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap"
                                      }}>
                                        {String(modifyApiResponse[key])}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </div>
                        }
                      </div>
                    </Col>
                  </>
                }
              </Row>
            </Card.Body>
          </Card>
        </div>
      </div >

      {/* Swagger Documatation Modal */}
      {
        isSwaggerDocMdl &&
        <SwaggerDocMdl
          show={isSwaggerDocMdl}
          handleClose={handleSwaggerDocMdl}
          docApiUrl={"https://api.soft-techsolutions.com/api-v1/api-docs/Aadhaar%20Verify%20API"}
        />
      }

    </div >
  );
};

export default ApiService;
