import React, { useState, useEffect } from "react";
import "../App.css";
import { Link, Outlet, json, useNavigate, useParams } from "react-router-dom";
import Pagination from "./Pagination";
import Search from "./Search";
import { useGlobalContext } from "../context/TransactionContext";

function Table(props) {
  const tabledData = props.tableRecords;

  const { transactionData, setTransactionData } = useGlobalContext();




  const [myLocalStorageData, setMyLocalStorageData] = useState(tabledData);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(3);
  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const records = [...myLocalStorageData].slice(firstIndex, lastIndex);

  const page = Math.ceil(myLocalStorageData.length / recordsPerPage);

  const [order, setOrder] = useState("ASC");

  let date = new Date();
  let year = date.getFullYear();
  const months = [
    `Jan ${year}`,
    `Feb ${year}`,
    `Mar ${year}`,
    `Apr ${year}`,
    `May ${year}`,
    `Jun ${year}`,
    `Jul ${year}`,
    `Aug ${year}`,
    `Sep ${year}`,
    `Oct ${year}`,
    `Nov ${year}`,
    `Dec ${year}`,
  ];


  console.log(records, "records");

  useEffect(()=>{
    setMyLocalStorageData(tabledData);
  },[tabledData])


  const handleDelete = (id) => {
    // differ();
    console.log(id,">");
    const cloneDelete = [...transactionData];
    const deletedData = cloneDelete.filter((value) => parseInt(value.id) !== parseInt(id));
    console.log(deletedData, ">>>>>>>>");
    setTransactionData(deletedData);
    // setCurrentPage(1);
};

  const sorting = (col) => {
    setCurrentPage(1);

    if (col === "monthYear") {
      let datanew = [...myLocalStorageData];

      if (order === "ASC") {
        console.log(months.indexOf("Jan 2023"));
        datanew.sort((a, b) => {
          return months.indexOf(a[col]) - months.indexOf(b[col]);
        });
        setOrder("DSC");
      } else if (order === "DSC") {
        datanew.sort((a, b) => {
          return months.indexOf(b[col]) - months.indexOf(a[col]);
        });
        setOrder("ASC");
      }
      setMyLocalStorageData(datanew);
    } else if (order === "ASC") {
      const sorted = [...myLocalStorageData].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setMyLocalStorageData(sorted);
      setOrder("DSC");
    } else if (order === "DSC") {
      const sorted = [...myLocalStorageData].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setMyLocalStorageData(sorted);
      setOrder("ASC");
    } else {
      setMyLocalStorageData(tabledData);
      setOrder(tabledData);
    }
  };

  return (
    <div>
      <Search
        myLocalStorageData={myLocalStorageData}
        setMyLocalStorageData={setMyLocalStorageData}
        tabledData={tabledData}
        setCurrentPage={setCurrentPage}
        lastIndex={lastIndex}
        firstIndex={firstIndex}
      />

      {/* <button type="button" className="backbtn" onClick={() => navigate(-1)}>
        Go back
      </button> */}

      <div className="TableDesign">
        <table className="table">
          <tr>
            {/* <th>id</th> */}
            <th onClick={() => sorting("transactionDate")}>Transaction Date</th>
            <th onClick={() => sorting("monthYear")}>Month Year</th>
            <th onClick={() => sorting("transactionType")}>Transaction Type</th>
            <th onClick={() => sorting("fromAccount")}>From Account</th>
            <th onClick={() => sorting("toAccount")}>To Account</th>
            <th onClick={() => sorting("amount")}>Amount</th>
            <th onClick={() => sorting("receipt")}>Receipt</th>
            <th onClick={() => sorting("notes")}>Notes</th>
            <th>View</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>

          {records.map((item, index) => (
            <tr key={index}>
              {/* <td>{item.id}</td> */}
              <td>{item.transactionDate}</td>
              <td>{item.monthYear}</td>
              <td>{item.transactionType}</td>
              <td>{item.fromAccount}</td>
              <td>{item.toAccount}</td>
              <td>
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "INR",
                }).format(item.amount)}
              </td>
              <td>
                <img src={item.receipt} alt="" height={50} width={50} />
              </td>
              <td>{item.notes}</td>
              <td>
                {" "}
                <Link
                  to={`/transaction/viewDetail/${item.id}`}
                  //state={item}
                  className="post"
                >
                  {" "}
                  View
                </Link>
              </td>
              <td>
                {" "}
                <Link to={`/add/${item.id}`} className="post">
                  Edit
                </Link>
              </td>
              <td>
                <button   className="post" onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </table>
        <nav>
          <Pagination
            totalposts={myLocalStorageData.length}
            postPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            // onPageChange={onPageChange}
          />
        </nav>
      </div>
    </div>
  );
}

export default Table;
