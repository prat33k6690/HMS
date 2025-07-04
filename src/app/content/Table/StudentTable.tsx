import React from 'react'
import { Datatable } from '../../component/dataTable/Datatable'
import { Button } from 'react-bootstrap'

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
        <div className='bg-white p-3 rounded-1'>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ height: "16px" }} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>

                                </Button>
                                <Button
                                    variant="delete"
                                    className="btn-sm rounded-circle"
                                    onClick={() => handleDeleteRecord?.(child.row)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ height: "16px" }} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>

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
