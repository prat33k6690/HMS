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
                        Student Regiter Table
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
