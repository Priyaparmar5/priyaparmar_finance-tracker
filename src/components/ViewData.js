import React, { useState, useEffect } from "react";
import "../App.css";
import { Link, Outlet, json, useNavigate } from "react-router-dom";
import { useTransactionContext } from "../context/TransactionContext";
import Table from "./Table";

function ViewData() {

  const navigate = useNavigate();
  const [myLocalStorageData, setMyLocalStorageData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const records = [...myLocalStorageData].slice(firstIndex, lastIndex);
  //const groupData = [...groupData].slice(firstIndex, lastIndex);

  const page = Math.ceil(myLocalStorageData.length / recordsPerPage);

  const {transactionData,setTransactionData} = useTransactionContext();

  const handleLogout = (id) => {
    localStorage.removeItem("token");

    navigate("/public/login");
  };

  //const localData = JSON.parse(localStorage.getItem("key"));  
  const localData = transactionData;  

  const handleGroupChange = (e) => {
    const resultdata = {};
    const val = e.target.value;
    console.log(val, "valll");
    const arr = [...localData];
    console.log(arr, "arrrr");

    if (val) {
      arr.forEach((item) => {
        const result = item[val];
        console.log(result, "datataaaaa");
        resultdata[result] = resultdata[result] ?? [];
        resultdata[result].push(item);
        //resultdata = item[val]
        console.log(resultdata[result], "resulttt");
      });
      setGroupData(resultdata);
    } else {
      setGroupData([]);
    }
    console.log(resultdata, "resulttttt");
  };


  console.log(Object.keys(groupData).length);
  return (
    <>
      <div>
        <div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
        {/* <h1 className="h1">Transaction Data</h1> */}
      </div>
      {localData ? (
        <>
          <>
          <Link to={'/add'} className="add-btn" >Add transaction</Link>
            <select
              name="selectData"
              onChange={handleGroupChange}
              className="input-select"
            >
              <option value={""}>None </option>
              <option value={"monthYear"}>Month Year </option>
              <option value={"transactionType"}>Transaction Type </option>
              <option value={"fromAccount"}>From Account </option>
              <option value={"toAccount"}>To Account </option>
            </select>
            {/* <Outlet /> */}

            {groupData.length === 0 ? (
              <>
                <Table tableRecords={localData} />
                <br></br>
              </>
            ) : (
              Object.keys(groupData).map((data, i) => (
                <>
                  {data !== "undefined" ? (
                    <>
                      <h3> Group by: {data}</h3>
                      <Table tableRecords={groupData[data]} />
                    </>
                  ) : null}
                </>
              ))
            )}
          </>
        </>
      ) : (
        <>
          <h1>No Data Found</h1>
        </>
      )}
    </>
  );
}
export default ViewData;
