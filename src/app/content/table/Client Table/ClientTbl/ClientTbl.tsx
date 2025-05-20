import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { Datatable } from "../../../../component/dataTable/Datatable";
import { MdOutlineLocalPhone, MdOutlineMailOutline, MdOutlineLogin, } from "react-icons/md";

const columns: any = [
  {
    field: "User",
    header: "Client",
    width: "25%",
    sorting: true,
    align: "left",
  },

  {
    field: "ContectDtl",
    header: "Contect Details",
    sorting: true,
    width: "25%",
    align: "left",
  },

  {
    field: "PrepaidPostPaid",
    header: "Prepaid / PostPaid",
    sorting: true,
    width: "25%",
    align: "left",
  },
  {
    field: "isNegativeBalance",
    header: "Nagitive Balance ",
    sorting: true,
    width: "25%",
    align: "center",
  },
  {
    field: "isAllowAnyIp",
    header: "Allow Any IP ",
    sorting: true,
    width: "25%",
    align: "center",
  },
  {
    field: "isActive",
    header: "Active",
    sorting: true,
    width: "25%",
    align: "center",
  },
  {
    field: "CreateUserLImit",
    header: "User LImit ",
    width: "25%",
    align: "left",

  },
  {
    field: "ModifyAction",
    header: "Modify Action ",
    width: 350,
    align: "center",
  },
  {
    field: '',
    header: '',
    sorting: false
  },
];

interface clientTableProps {
  data: any;
  handleDeleteRecord?: any;
  handleEditableData?: any;
}
const ClientTbl: React.FC<clientTableProps> = ({ handleDeleteRecord, data, handleEditableData }) => {



  return (
    <Datatable
      data={data}
      columns={columns}
      tableNm="Clint"
      pagination
      isSearchBar
    >
      {(child: any) => (
        <>
          {child.column.field === 'User' && <div> <div>{child.row.clientNm}</div><div className='text-xs text-slate-500'>Code : {child.row.clientId}</div></div>}

          {child.column.field === 'ContectDtl' && <div> <div>{child.row.mobileNo}</div><div className='text-xs text-slate-500'>{child.row.email}</div></div>}

          {child.column.field === "PrepaidPostPaid" && <span style={{ backgroundColor: "rgb(150 240 150 / 37%)" }} className="badge rounded-4 text-success"> {child.row.isPostpaid} </span>}

          {child.column.field === 'ModifyAction' && <div> <div className="text-xs text-slate-500 ">CreateBY : <span>{child.row.entryBy}</span></div><div className='text-xs text-slate-500'>modifyDt :{child.row.modifyDt}</div></div>}

          {child.column.field === "isNegativeBalance" && <div className="text-danger"><Form.Check type="switch" id="custom-switch" /></div>}

          {child.column.field === "CreateUserLImit" && <div className=" d-flex gap-1  align-items-cneter ">{child.row.createUserLimit}</div>}

          {child.column.field === "isAllowAnyIp" && <div className="text-danger"><Form.Check type="switch" id="custom-switch" /></div>}

          {child.column.field === "isActive" && <div><Form.Check type="switch" id="custom-switch" /></div>}

          {child.column.field === '' &&
            <div className='d-flex justify-content-center gap-2'>
              <Button variant="edit" className="btn-sm rounded-circle" onClick={() => handleEditableData(child.row)}><BiEditAlt /></Button>
              <Button variant="delete" className="btn-sm rounded-circle" onClick={() => handleDeleteRecord(child.row)}><BiTrash /></Button>
            </div>}
        </>
      )}
    </Datatable>
  );
};

export default ClientTbl;
