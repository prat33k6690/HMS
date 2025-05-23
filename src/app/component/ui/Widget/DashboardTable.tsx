import React from "react";
import { RxDotsVertical } from "react-icons/rx";
import '../../dataTable/Datatable.css'

interface StudentData {
    name: string;
    fromDate: string;
    toDate: string;
    mobile: string;
}

const students: StudentData[] = [
    { name: "Ravi Kumar", fromDate: "2024-06-01", toDate: "2025-05-30", mobile: "9876543210" },
    { name: "Anjali Sharma", fromDate: "2023-08-15", toDate: "2024-08-14", mobile: "9123456780" },
    { name: "Amit Verma", fromDate: "2022-01-10", toDate: "2023-01-09", mobile: "9000011122" },
    { name: "Sneha Reddy", fromDate: "2021-09-20", toDate: "2022-09-19", mobile: "9888777666" },
];

const StudentTable: React.FC = () => {
    return (
        <div className="card p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">All Students</h5>
                <input type="text" className="form-control w-auto" placeholder="search..." />
            </div>

            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th className="text-md">Student Name</th>
                            <th className="text-md">From Date</th>
                            <th className="text-md">To Date</th>
                            <th className="text-md">Contact Details</th>
                            <th className="text-md">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td className="d-flex align-items-center">
                                    <img
                                        src={"https://admin.pixelstrap.net/miami/assets/images/dashboard/profile.png"}
                                        alt="Profile"
                                        className="rounded-circle me-2"
                                        width={30}
                                        height={30}
                                        style={{ objectFit: "none" }}
                                    />
                                    {student.name}
                                </td>
                                <td>{new Date(student.fromDate).toLocaleDateString()}</td>
                                <td>{new Date(student.toDate).toLocaleDateString()}</td>
                                <td>{student.mobile}</td>
                                <td>
                                    <button title="button" className="btn btn-link text-muted p-0">
                                        <RxDotsVertical />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentTable;
