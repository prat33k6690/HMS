import React from "react";
import { BiSearch } from "react-icons/bi";
// import "./Datatable.css";
import "./Datatable.css"
import { Form } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";

interface searchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ searchTerm, setSearchTerm }: searchBarProps) => {
  return (
    // <div className="searchable-data">
    //   <div className="position-relative w-100">
    //     <input
    //       type="text"
    //       name="searchAgentGroup"
    //       className="searchTableRecord position-absolute"
    //       placeholder="Search"
    //       value={searchTerm}
    //       onChange={(e: any) => setSearchTerm(e.target.value)}
    //     />
    //     <div
    //       className="d-flex justify-content-center align-items-center position-absolute"
    //       style={{ width: 40, height: 40 }}
    //     >
    //       <BiSearch />
    //     </div>
    //   </div>
    // </div>
    <div style={{ position: "relative", maxWidth: 400 }}>
      <CiSearch
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          fontSize: "1.15rem",
          color: "#6c757d",
          pointerEvents: "none",
        }}
      />
      <Form.Control
        type="text"
        placeholder="Search…"
        value={searchTerm}
        onChange={(e: any) => setSearchTerm(e.target.value)}
        style={{
          paddingLeft: "2.2rem",
          height: "30px",
          fontSize: "13px",
          boxShadow: "none",
        }}
      />
    </div>
  );
};

export default SearchBar;
