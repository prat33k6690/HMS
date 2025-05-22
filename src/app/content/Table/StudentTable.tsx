import React from 'react'
import { Datatable } from '../../component/dataTable/Datatable'
import { Button } from 'react-bootstrap'
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import { TbTemplate } from 'react-icons/tb';

const columns = [
    {
        field: "TemplateName",
        header: "Template Name",
        sorting: true,
        width: "25%",
        align: "left",
    },
    {
        field: "TemplateType",
        header: "Template Type",
        sorting: true,
        width: "25%",
        align: "center",
    },
    {
        field: "CreatedDate",
        header: "Created Date",
        sorting: true,
        width: "25%",
        align: "left",
    },
    {
        field: "Updateby",
        header: "Update by",
        sorting: true,
        width: "25%",
        align: "left",
    },
    {
        field: "Action",
        header: "Action",
        sorting: false,
        width: "25%",
        align: "center",
    },
];

interface StudentTableProps {
    data?: any[];
    handleDeleteRecord?: (item: any) => void;
    handleEditableData?: (item: any) => void;
    SetShow: any;
    Show: boolean;
}
const StudentTable: React.FC<StudentTableProps> = ({ data, handleDeleteRecord, handleEditableData, SetShow, Show }) => {
    return (
        <div className='bg-white p-3'  >
            <div className='d-flex justify-content-between'>
                <div>
                    <p className="fw-medium m-0 h6 ">
                        Student Regiter Table <svg xmlns="http://www.w3.org/2000/svg" style={{ height: "16px" }} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
                        </svg>

                    </p>
                </div>
                <Button variant="success" type="button" className="text-sm mb-3 " onClick={() => SetShow(!Show)} >Add Student</Button>
            </div>

            <Datatable
                data={data}
                columns={columns}
                tableNm="Template"
                pagination
                isSearchBar
            >
                {(child: any) => (
                    <>
                        {child.column.field === 'TemplateName' && <div> <div className='text-xs text-slate-500'> {child.row.TemplateName}</div>
                            <div className='text-xs text-slate-500'> {child.row.TemplateType}</div>

                        </div>}
                        {child.column.field === 'TemplateType' && <div> <div className='text-xs text-slate-500'> {child.row.TemplateType}</div></div>}
                        {child.column.field === 'CreatedDate' && <div> <div className='text-xs text-slate-500'>{child.row.CreatedDate}</div></div>}
                        {child.column.field === 'Updateby' && <div><div className='text-xs text-slate-500'>{child.row.Updateby}</div></div>}

                        {child.column.field === 'Action' && (
                            <div className="d-flex justify-content-center gap-2">
                                <Button
                                    variant="edit"
                                    className="btn-sm rounded-circle"
                                    onClick={() => handleEditableData?.(child.row)}
                                >
                                    <BiEditAlt />
                                </Button>
                                <Button
                                    variant="delete"
                                    className="btn-sm rounded-circle"
                                    onClick={() => handleDeleteRecord?.(child.row)}
                                >
                                    <BiTrash />
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </Datatable>
        </div>
    )
}

export default StudentTable
