import React, { useState, useEffect } from "react";
import "../App.css";
import { Link, Outlet, json, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import { RootState } from "../redux/rootReducer";
import { deleteTransaction } from "../redux/ducks/TransactionReducer";
//import { useGlobalContext } from "../context/TransactionContext";

interface propsName {
 // props :any;
 // tabledData : any;
  tableRecords : any;
}

const Table: React.FC<propsName> = ({tableRecords})=> {
  
  const tabledData = tableRecords;
 // const handleDelete = props.handleDelete;
  const dispatch = useDispatch();
  const users = useSelector((state:RootState) => state.transactions);
  //const { transactionData, setTransactionData } = useGlobalContext(tabledData);

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
  
  const myLocal = [...myLocalStorageData];

  const records = myLocal.slice(firstIndex, lastIndex);
  //const groupData = [...groupData].slice(firstIndex, lastIndex);

  const page = Math.ceil(myLocalStorageData.length / recordsPerPage);
  //const numbers = [...Array(page + 1).keys()].slice(1);

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

  const { id } = useParams();

  console.log(records, "records");

//   const showToastMessage = () => {
//     toast.success('Deleted Successfully !', {
//         position: toast.POSITION.TOP_CENTER
//     });
//   };

useEffect(()=>{
  setMyLocalStorageData(tabledData);
},[tabledData])

 
  const handleDelete = (id:any) => {
      console.log(id,"idddd");
      const dlt = dispatch(deleteTransaction({id}))
      console.log(dlt,"dltttt");
   // setMyLocalStorageData(dlt)
   
};

  const sorting = (col:any) => {
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
          {/* <ToastContainer /> */}
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
                  to={`/view/${item.id}`}
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
                <button className="post" onClick={() => handleDelete(item.id)}>delete</button>
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