import React from 'react'
import { Datatable } from '../../../component/dataTable/Datatable'


const columns: any = [
  {
    field: "ipType",
    header: "IP Type",
    width: "25%",
    sorting: true,
    align: "left",
  },
  {
    field: "ipName",
    header: "IP Name",
    sorting: true,
    width: "25%",
    align: "left",
  },

  {
    field: "remark",
    header: "Remark",
    sorting: true,
    width: "25%",
    align: "left",
  },
];

const data = [
  {
    ipType: "IPV4",
    ipName: "192.168.1.200",
    remark: "This ip is server Computer",
  },
];

function IpwhitelistTbl() {
  return (
    
    <Datatable
    data={data}
      columns={columns}
      tableNm="IpWhiteLIst"
      pagination
      isSearchBar
    >
          {(child: any) => (
        <>
          {child.column.field === "User" && (
            <div>
              <div className="FormikMessage">{child.row.clientNm}</div>
              <div className="text-xs text-slate-500">
                Code : {child.row.clientId}
              </div>
            </div>
          )}

       
          {child.column.field === "Prepaid / PostPaid" && (
            <span
              style={{ backgroundColor: "rgb(150 240 150 / 37%)" }}
              className="badge rounded-4 text-success"
            >
              {child.row.isPostpaid}
            </span>
          )}
          {child.column.field === "ModifyAction" && (
            <div className="fontSize">
              {" "}
              <p className="textColor">
                CreateBY :{" "}
                <span className="text-dark fw-light">
                  {" "}
                  {child.row.modifyBy}{" "}
                </span>
              </p>
              <p className="textColor">
                modifyDt :{" "}
                <span className="text-dark fw-light">
                  {" "}
                  {child.row.modifyDt}{" "}
                </span>
              </p>
            </div>
          )}
          {child.column.field === "CreateUserLImit" && (
            <div className=" d-flex gap-1  align-items-cneter ">
              <p style={{ marginBottom: "0px" }}> Limit 10</p>
              <p style={{ marginBottom: "0px" }}>
                {" "}
                <a href="visit">visit</a>
              </p>
            </div>
          )}

      
        

          {child.column.field !== "Branch" && child.row[child.column.field]}
        </>
      )}
    </Datatable>
  )
}

export default IpwhitelistTbl
