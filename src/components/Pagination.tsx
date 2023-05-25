import React, { useState, useEffect } from "react";

interface propsname{
  totalposts:any,
  postPerPage:any,
  currentPage:any,
  setCurrentPage:any,
}

const Pagination:React.FC<propsname> = ({
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
      
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);

    }
  };

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
//disabled={currentPage === 1}
// disabled={currentPage === pages.length}

  return (
    <div className="pagination">
      <a onClick={handlePrevClick} >
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
      <a onClick={handleNextClick}>
        Next
      </a>
    </div>
  );
};
export default Pagination;
