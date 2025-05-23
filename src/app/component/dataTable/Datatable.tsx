import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import Pagination from "./Pagination";
import "./Datatable.css";
import SearchBar from "./SearchBar";

type dataProps = {
  data?: any;
  columns?: any;
  dataPerpage?: any;
  checkbox?: boolean;
  isSearchBar?: boolean;
  children: (child: any) => any;
  rowClick?: () => void;
  selectData?: any;
  setSelectData?: any;
  isLoader?: boolean;
  tableNm?: string;
  pagination?: boolean;
  tableBtn?: any;
  footerSection?: any;
};

export const Datatable: React.FC<dataProps> = ({
  data,
  columns,
  checkbox,
  isSearchBar,
  children,
  rowClick,
  selectData,
  setSelectData,
  isLoader,
  tableNm,
  pagination,
  tableBtn,
  footerSection,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [sortColumn, setSortColumn] = useState<any>(null);
  const [sortDirection, setSortDirection] = useState<string | null>(null);

  // Function to handle sorting
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection((prevDirection: string | null) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Helper function to filter the data based on the HiOutlineSearch term
  const filterData = (data: string[]) => {
    return isSearchBar
      ? data.filter((item) =>
        Object.values(item).some((value) =>
          value !== null
            ? value
              .toString()
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
            : null
        )
      )
      : data;
  };

  // Sort the filtered data
  const sortedData = sortColumn
    ? filterData(data).sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    })
    : filterData(data);

  // Get total number of pages
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Get current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pagination
    ? sortedData.slice(indexOfFirstItem, indexOfLastItem)
    : sortedData;

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((n: any) => n.id);
      setSelectData(newSelected);
      return;
    }
    setSelectData([]);
  };

  const isSelected = (id: number) => selectData?.indexOf(id) !== -1;

  const handleClick = (event: React.MouseEvent<unknown>, row: any) => {
    const selectedIndex = selectData?.indexOf(row);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectData, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectData?.slice(1));
    } else if (selectedIndex === selectData?.length - 1) {
      newSelected = newSelected.concat(selectData?.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectData?.slice(0, selectedIndex),
        selectData.slice(selectedIndex + 1)
      );
    }
    setSelectData(newSelected);
  };

  return (
    <div>
      <>
        <div className="overflow-x-auto">
          <div className="inline-block w-100 align-middle">

            {isSearchBar && (
              <div className="d-flex align-items-center ">
                <SearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
                {tableBtn}
              </div>
            )}
            {/* style={{ height: "calc(100vh - 300px)" }} */}
            <div className=" border rounded  mt-3">
              <Table hover responsive size="sm" className="mb-2 text-nowrap data-table">
                <thead>
                  <tr className="  fw-medium text-secondary ps-2 ">
                    {checkbox && (
                      <th className="p-2" style={{ fontSize: "12px", whiteSpace: "nowrap", zIndex: "2" }}>
                        <div className="d-flex justify-content-center ms-1">
                          {/* <Checkbox checked={sortedData.length > 0 && selectData?.length === sortedData.length} onChange={(e: any) => handleSelectAllClick(e)} /> */}
                        </div>
                      </th>
                    )}
                    {columns.map((column: any, index: number) => {
                      return (
                        <th
                          style={{ whiteSpace: "nowrap" }}
                          key={index}
                          onClick={() =>
                            column.sorting && handleSort(column.field)
                          }
                          className="p-2 text-sm text-center  "

                        >
                          <div
                            className={`d-flex ${column.align === "center"
                              ? "justify-content-center "
                              : "justify-content-between"
                              } align-items-center text-sm text-nowrap fw-semibold text-slate-700`
                            }
                          >
                            {column.header}
                            {sortColumn === column.field && column.sorting && (
                              <span className="ms-auto">
                                {sortDirection === "asc" ? (
                                  <HiOutlineChevronDown />
                                ) : (
                                  <HiOutlineChevronUp />
                                )}
                              </span>
                            )}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {currentItems.map((row: any, rowIndex: number) => {
                    const isItemSelected = isSelected(row.id);
                    return (
                      <tr key={rowIndex} style={{ cursor: "pointer" }}>
                        {checkbox && (
                          <td className="p-2">
                            <div className="d-flex justify-content-center ms-1">
                              {/* <Checkbox
                                                                checked={isItemSelected}
                                                                value={isItemSelected}
                                                                onChange={(event: any) => {
                                                                    handleClick(event, row.id);
                                                                }}
                                                            /> */}
                            </div>
                          </td>
                        )}
                        {columns.map((column: any, colIndex: number) => {
                          return (
                            <td
                              key={colIndex}
                              className="p-2 text-sm"
                              onClick={rowClick}
                              style={{ textAlign: column.align || "left" }}
                            >
                              {children({
                                row: row,
                                column: column,
                                rowIndex: rowIndex,
                              })}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                  {currentItems.length === 0 && !isLoader && (
                    <tr>
                      <td colSpan={columns.length}>
                        <div
                          className="d-flex align-items-center justify-content-center flex-column"
                          style={{ height: "40vh" }}
                        >
                          <img
                            // src="/images/svg/55024593_9264820.svg"
                            src="/images/Notfound.avif"
                            alt="no data found"
                            style={{ width: 200 }}
                          />
                          <h1 className="text-base text-center">
                            No {tableNm} found
                          </h1>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
                {footerSection && <tfoot>{footerSection}</tfoot>}
              </Table>
            </div>

            {pagination && (
              <Pagination
                itemsPerPage={itemsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                setItemsPerPage={setItemsPerPage}
                totalPages={totalPages}
              />
            )}
          </div>
        </div>
      </>
    </div>
  );
};
