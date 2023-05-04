import React, { useState, useEffect } from "react";

const Pagination = ({
  totalposts,
  postPerPage,
  currentPage,
  setCurrentPage,
}) => {
  let pages = [];
  const totalPages = Math.ceil(totalposts / postPerPage);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      //  onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      //   onPageChange(currentPage + 1);
    }
  };

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <a onClick={handlePrevClick} disabled={currentPage === 1}>
        Previous
      </a>
      {pages.map((page, index) => {
        return (
          <a
            href="#"
            key={index}
            className={currentPage === index + 1 ? "active" : " "}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </a>
        );
      })}
      <a onClick={handleNextClick} disabled={currentPage === pages.length}>
        Next
      </a>
    </div>
  );
};
export default Pagination;
