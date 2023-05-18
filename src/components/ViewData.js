import React, { useState, useEffect } from "react";
import "../App.css";
import { Link, Outlet, json, useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../context/TransactionContext";
import Table from "./Table";
import { groupBy } from "lodash";

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
  const [grpVal,setGrpVal] = useState("");

  const {transactionData,setTransactionData} = useGlobalContext();

  const handleLogout = (id) => {
    localStorage.removeItem("token");

    navigate("/public/login");
  };

  useEffect(() => {
    setTransactionData(transactionData);
}, [transactionData]);

  // const handleDelete = (outIndex) => {
  //   console.log(transactionData,"ttttt");
  //   console.log(outIndex,"tttttn");
  //   let val = myLocalStorageData.filter((data, inIndex) => {
  //     if (outIndex !== inIndex) {
  //       console.log(outIndex, "out");
  //       console.log(inIndex, "in");
  //       console.log(data, "data");
        
  //       return data;  
  //     }
  //   });

  //   setMyLocalStorageData(val);
  //   console.log(val,"vallll");
  //   //localStorage.setItem("key", JSON.stringify(val));
  // };

//   useEffect(() => {
//     handleGroupChange(grpVal)
// }, []);

  const {id} = useParams();

  const handleDelete = (id) => {
    let updatedData = [];
    if (id) {

      console.log(id,">");
//     const deleteData = [...myLocalStorageData];
//     const deletedData = deleteData.filter((value) => parseInt(value.id) !== parseInt(id));
//     console.log(deletedData, ">>>>>>>>");
//     setMyLocalStorageData(deletedData);
      if (myLocalStorageData) {
        const deleteData = [...transactionData];
        console.log(deleteData,"deleteDddd");
        updatedData = deleteData.filter((obj) => parseInt(obj.id) !== parseInt(id));
        console.log(updatedData, ">>>>>>>>");
        setTransactionData(updatedData);
      }
      else {
        Object.keys(groupData).forEach((groupCol) => {
          updatedData = updatedData.concat(
            groupData[groupCol] = groupData[groupCol].filter((item) => item.id !== id)
          )
        });
        setGroupData((prevGrpData) => {
          const newGrpId = {};
          Object.keys(prevGrpData).forEach((groupCol) => {
            newGrpId[groupCol] = prevGrpData[groupCol].filter((item) => item.id !== id)
          });
          return newGrpId;
        });
        setGroupData(updatedData);
      }
    }
    else {
      updatedData = [...groupData]
    }
    setTransactionData(updatedData)
  }

  //const localData = JSON.parse(localStorage.getItem("key"));  
  const localData = transactionData;  

  const handleGroupChange = (e) => {
    const resultdata = {};
    const val = e.target.value;
    console.log(val, "valll");
    const arr = [...localData];
    console.log(arr, "arrrr");
    if(e.target){
      setGrpVal(e.target.value)
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
  }
  else{
    if(e){
      arr.forEach((item) => {
        const result = item[e];
        console.log(result, "grpatataaaaa");
        resultdata[result] = resultdata[result] ?? [];
        resultdata[result].push(item);
        //resultdata = item[val]
        console.log(resultdata[result], "grpresulttt");
      });
      setGroupData(resultdata);
    }
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
                <Table tableRecords={localData}  handleDelete={handleDelete}/>
                <br></br>
              </>
            ) : (
              Object.keys(groupData).map((data, i) => (
                <>
                  {data !== "undefined" ? (
                    <>
                      <h3> Group by: {data}</h3>
                      <Table tableRecords={groupData[data]}  handleDelete={handleDelete} />
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
