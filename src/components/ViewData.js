import React, { useState, useEffect } from "react";
import "../App.css";
import { Link, Outlet, json, useNavigate } from "react-router-dom";

import Table from "./Table";

function ViewData() {
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
  const [myLocalStorageData, setMyLocalStorageData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(3);
  const [query, setQuery] = useState("");
  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const records = [...myLocalStorageData].slice(firstIndex, lastIndex);
  //const groupData = [...groupData].slice(firstIndex, lastIndex);

  const page = Math.ceil(myLocalStorageData.length / recordsPerPage);
  const numbers = [...Array(page + 1).keys()].slice(1);

  const [order, setOrder] = useState("ASC");

  console.log(records, "records");
  console.log(lastIndex, "lrecords");
  console.log(firstIndex, "frecords");

  const handleLogout = (id) => {
    localStorage.removeItem("token");
    // setInput((user) => {
    //   return user.filter((toDel) =>
    //   toDel.id !== id,
    //   localStorage.removeItem("token")
    //   );
    // });

    navigate("/public/login");
  };

  // const handleDelete = (outIndex) => {
  //   const val = myLocalStorageData.filter((data, inIndex) => {
  //     if (outIndex !== inIndex) {
  //       return data;
  //     }
  //   });
  //   setMyLocalStorageData(val);
  //   localStorage.setItem("key", JSON.stringify(val));
  // };

  // const sorting = (col) => {
  //   if (order === "ASC") {
  //     const sorted = [...myLocalStorageData].sort((a, b) =>
  //       a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
  //     );
  //     setMyLocalStorageData(sorted);
  //     setOrder("DSC");
  //   }
  //   if (order === "DSC") {
  //     const sorted = [...myLocalStorageData].sort((a, b) =>
  //       a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
  //     );
  //     setMyLocalStorageData(sorted);
  //     setOrder("ASC");
  //   }
  // };

  //sorting groupby
  const sortingG = (col) => {
    if (order === "ASC") {
      const sorted = [...groupData].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setGroupData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...groupData].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setGroupData(sorted);
      setOrder("ASC");
    }
  };

  const localData = JSON.parse(localStorage.getItem("key"));

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

  console.log(localData, "locaalll");
  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem("key"));
  //   console.log(data, "dattaaaa");
  //   //  setState(data)
  //   setMyLocalStorageData(data);
  // }, []);
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
