// Purpose: User table Screen
// Created by: Harish
// Created Date: 13-05-2025
// Description:  All user show  in table


// Change history:
// 12-05-2025 / Harish // Create this screen

//***********************/



import React from "react";
import { Datatable } from "../../../component/dataTable/Datatable";
import { Button } from "react-bootstrap";
import { BiEditAlt, BiTrash } from "react-icons/bi";


const columns: any = [
  {
    field: "User",
    header: "client Id ",
    width: 200,
    sorting: true,
    align: "left",
  },

  {
    field: "ContectDtl",
    header: "Contect Details",
    sorting: true,
    width: 400,
    align: "left",
  },
 
  {
    field: "UserType",
    header: "role",
    sorting: true,
    align: "left",
  },

  {
    field: "lastLogin",
    header: "last login ",
    sorting: true,
    align: "left",
  },
  {
    field: "lastChangePassword",
    header: "  last change password  ",
    sorting: true,
    align: "left",
  },
  {
    field: "isLock",
    header: "Lock status ",
    sorting: true,
    align: "left",
  },
  {
    field: "isActive",
    header: "   reset password",
    sorting: true,
    align: "left",
  },
  {
    field: '',
    header: '',
    sorting: false
  },
];


interface userTableProps {
  data: any;
  handleDeleteRecord?: any;
  handleEditableData?: any;
}

const UserTbl: React.FC<userTableProps> = ({ handleDeleteRecord, data ,handleEditableData}) => {


  return (
    <Datatable
      data={data}
      columns={columns}
      tableNm="User"
      pagination
      isSearchBar
    >
      {(child: any) => (
        <>
        
          {child.column.field === 'User' && <div> <div>{child.row.personNm}</div><div className='text-xs text-slate-500'>{child.row.customUserNm}</div></div>}
          {child.column.field === "UserType" && <div>{child.row.role}</div>}
          {child.column.field === 'ContectDtl' && <div> <div>{child.row.mobileNo}</div><div className='text-xs text-slate-500'>{child.row.email}</div></div>}
          {child.column.field === "lastChangePassword" && <div>{child.row.lastPwdChange}</div>}
          {child.column.field === "isLock" && <div>{child.row.isLock}</div>}
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

export default UserTbl;
