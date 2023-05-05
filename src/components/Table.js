import React, { useState, useEffect } from "react";
import "../App.css";
import { Link, Outlet, json, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Pagination from "./Pagination";
import Search from "./Search";

function Table(props) {
  const tabledData = props.tableRecords;

  const [state, setState] = useState({
    transactionDate: "",
    monthYear: "",
    transactionType: "",
    fromAccount: "",
    toAccount: "",
    amount: "",
    receipt: "",
    notes: "",
  });

  const navigate = useNavigate();

  const [myLocalStorageData, setMyLocalStorageData] = useState(tabledData);
  const [groupData, setGroupData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(3);
  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;


  const records = [...myLocalStorageData].slice(firstIndex, lastIndex);
  //const groupData = [...groupData].slice(firstIndex, lastIndex);

  const page = Math.ceil(myLocalStorageData.length / recordsPerPage);
  const numbers = [...Array(page + 1).keys()].slice(1);

  const [order, setOrder] = useState("ASC");

  let date = new Date();
  let year = date.getFullYear();
  const months = [`Jan ${year}`, `Feb ${year}`, `Mar ${year}`, `Apr ${year}`, `May ${year}`, `Jun ${year}`, `Jul ${year}`, `Aug ${year}`, `Sep ${year}`, `Oct ${year}`, `Nov ${year}`, `Dec ${year}`]


  console.log(records, "records");
  console.log(lastIndex, "lrecords");
  console.log(firstIndex, "frecords");

  const handleDelete = (outIndex) => {
    const val = myLocalStorageData.filter((data, inIndex) => {
      if (outIndex !== inIndex) {
        return data;
      }
    });
    setMyLocalStorageData(val);
    localStorage.setItem("key", JSON.stringify(val));
  };

  // const sortingMonth = (col) => {
  //   if (col === "monthYear") {
  //     const sortedData = [...myLocalStorageData];

  //     sortedData.sort((a, b) => {
  //       const dateA = new Date(a["monthYear"]);
  //       const dateB = new Date(b["monthYear"]);
  //       if (dateA < dateB) {
  //         return order === "asc" ? -1 : 1;
  //       }
  //       if (dateA > dateB) {
  //         return order === "asc" ? 1 : -1;
  //       }
  //       return 0;
  //     });

  //     //setMyLocalStorageData(sortedData);
  //     //setOrder("DSC");
  //   }
  // };

  
  const sorting = (col) => {
     setCurrentPage(1);
    if(order === "normal"){
      setMyLocalStorageData(tabledData)
      setOrder(tabledData)
    }
    else if (col === "monthYear") {
      let datanew = [...myLocalStorageData]

      if (order === 'ASC') {
          console.log(months.indexOf('Jan 2023'));
          datanew.sort((a, b) => {
              return months.indexOf(a[col]) - months.indexOf(b[col])
          })
          setOrder("DSC");
      } else if (order === 'DSC') {
          datanew.sort((a, b) => {

              return months.indexOf(b[col]) - months.indexOf(a[col])
          })
          setOrder("ASC");
      }
      setMyLocalStorageData(datanew)
  }
   else if (order === "ASC") {
      const sorted = [...myLocalStorageData].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setMyLocalStorageData(sorted);
      setOrder("DSC");
    }
   else if (order === "DSC") {
      const sorted = [...myLocalStorageData].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setMyLocalStorageData(sorted);
      setOrder("ASC");
    }
  };


  
  return (
    <div>
      <Search myLocalStorageData={myLocalStorageData}
        setMyLocalStorageData={setMyLocalStorageData}
        tabledData={tabledData}
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
                  <EditIcon></EditIcon>
                </Link>
              </td>
              <td>
                <DeleteIcon onClick={() => handleDelete(index)}></DeleteIcon>
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
  )
}

export default Table
