import React from "react";
import { Button, Form } from "react-bootstrap";
import { BiDownArrowAlt, BiEditAlt, BiTrash } from "react-icons/bi";
import { Datatable } from "../../../component/dataTable/Datatable";

const columns: any = [
    // {
    //     field: "serviceNm",
    //     header: "Service Name",
    //     width: "25%",
    //     sorting: true,
    //     align: "left",
    // },
    {
        field: "entryPcNm",
        header: "Entry PC Name",
        sorting: true,
        width: "25%",
        align: "left",
    },
    {
        field: "totalRows",
        header: "Total Record",
        width: "25%",
        sorting: true,
        align: "left",
    },

    {
        field: "entryBy",
        header: "Entry By",
        sorting: true,
        width: "25%",
        align: "left",
    },
    {
        field: "importStatus",
        header: "Import Status",
        sorting: true,
        width: "25%",
        align: "left",
    },
    {
        field: '',
        header: '',
        sorting: false
    },
];

interface bulkUploadedDtlTblProps {
    data: any;
    downloadUploadedBulkFile?: any;
}
const BulkUploadedDtlTbl: React.FC<bulkUploadedDtlTblProps> = ({ data, downloadUploadedBulkFile }) => {

    return (
        <Datatable
            data={data}
            columns={columns}
            tableNm="Uploaded File"
            pagination
            isSearchBar={false}
        >
            {(child: any) => (
                <>

                    {child.column.field === '' &&
                        <div className='d-flex justify-content-center gap-2'>
                            {child.row.importStatus === "SUCCESS" &&
                                <Button variant="save" className="btn-sm rounded-circle" onClick={() => downloadUploadedBulkFile(child.row)}><BiDownArrowAlt /></Button>
                            }
                        </div>}

                    {child.row[child.column.field]}
                </>
            )}
        </Datatable>
    );
};

export default BulkUploadedDtlTbl;
