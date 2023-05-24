import React, { useState, useEffect } from "react";
import "../App.css";
import { Link, Outlet, json, useNavigate, useParams } from "react-router-dom";
import Table from "./Table";
import { Cookies, useCookies } from 'react-cookie';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/rootReducer";

function ViewData() {
  const navigate = useNavigate();
  const [myLocalStorageData, setMyLocalStorageData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [grpVal,setGrpVal] = useState("");
  const dispatch = useDispatch();

  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;


  const transactionData = useSelector((state:RootState) => state.transactions.transaction);
  //const [cookies, setCookie, removeCookie] = useCookies(['name']);
  console.log(transactionData,"transaredux");
  const cookies = new Cookies();

  const handleLogout = () => {
    cookies.remove('name')

    navigate("/public/login");
  };

//   useEffect(() => {
//     handleGroupChange(grpVal)
// }, []);

  
 const { id } = useParams();
  
  // const handleDelete = (id) => {
  //   let updatedData = [];
  //   if (id) {

  //     console.log(id,">");

  //     if (transactionData) {
  //        const dlt=dispatch(deleteTransaction(id));
  //        console.log(dlt,"dlttt");
  //        //setMyLocalStorageData(dlt)
  //     }
  //     else {
  //       console.log("in elseeeee");
  //       const updatedgrpData ={}
  //       Object.keys(groupData).forEach((groupCol) => {
  //         updatedgrpData = updatedData.concat(
  //           groupData[groupCol] = groupData[groupCol].filter((item) => item.id !== id)
  //         )
  //         console.log(updatedData,"grpupdata....");
  //       });
  //       // setMyLocalStorageData((prevGrpData) => {
  //       //   const newGrpId = {};
  //       //   Object.keys(prevGrpData).forEach((groupCol) => {
  //       //     newGrpId[groupCol] = prevGrpData[groupCol].filter((item) => item.id !== id)
  //       //   });
  //       //   console.log("newgrpid",newGrpId);
  //       //   return newGrpId;
  //       // });
  //       setGroupData(updatedData);
     
  //     }
      
  //   }
  //   else {
  //     console.log("in elsesssss");
  //     updatedData = [...myLocalStorageData]
  //   }
  //   setMyLocalStorageData(updatedData)
  // }

  // const handleDelete = (id) => {
  //   if(id){
  //   dispatch(deleteTransaction(id));
  //   }// Remove the transaction from the group data
  // //   else{
  // //   setGroupData((prevGroupData) => {
  // //     const updatedGroupData = { ...prevGroupData };
  // //     Object.keys(updatedGroupData).forEach((groupKey) => {
  // //       updatedGroupData[groupKey] = updatedGroupData[groupKey].filter(
  // //         (transaction) => transaction.id !== id
  // //       );
  // //     });
  // //     return updatedGroupData;
  // //   });
  // //   setMyLocalStorageData((prevData) =>
  // //   prevData.filter((transaction) => transaction.id !== id)
  // // );
  // //   }
  // }

  // // const handleDelete = (id) => {
  // //   let updatedData = [];
  // //   if (id) {
  // //     if (transactionData) {
  // //       const dlt= dispatch(deleteTransaction(id));
  // //       console.log(dlt,"delete data");
  // //     }
  // //     else {
  // //       console.log("in else grp");
  // //       Object.keys(groupData).forEach((groupCol) => {
  // //         updatedData = updatedData.concat(
  // //           groupData[groupCol] = groupData[groupCol].filter((item) => item.id !== id)
  // //         )
  // //       });
  // //       setGroupData((prevGrpData) => {
  // //         const newGrpId = {};
  // //         Object.keys(prevGrpData).forEach((groupCol) => {
  // //           newGrpId[groupCol] = prevGrpData[groupCol].filter((item) => item.id !== id)
  // //         });
  // //         return newGrpId;
  // //       });
  // //       setGroupData(updatedData);
  // //     }
  // //   }
  // //   else {
  // //     updatedData = [...groupData]
  // //   }
  // //   setGroupData(updatedData)
  // // }



  const localData:any = transactionData;
  
  const handleGroupChange = (e:any) => {
    const resultdata:any = {};
   // const val = e.target.value;
    console.log(e.target.value, "grpval");
    const arr = [...localData];
    console.log(arr, "grparrrr");

    if(e.target){
    setGrpVal(e.target.value);
    if (e.target.value) {
      arr.forEach((item) => {
        const result = item[e.target.value];
        console.log(result, "grpatataaaaa");
        resultdata[result] = resultdata[result] ?? [];
        resultdata[result].push(item);
        //resultdata = item[val]
        console.log(resultdata[result], "grpresulttt");
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
    console.log(resultdata, "grpresulttttt");
  };

  console.log(Object.keys(groupData).length);

  // useEffect(() => {
    
  // setGroupData(transactionData);
  // }, [transactionData]);

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
            <Link to={"/add"} className="add-btn">
              Add transaction
            </Link>
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
                <Table tableRecords={localData}   />
                <br></br>
              </>
            ) : (
              Object.keys(groupData).map((data:any, i) => (
                <>
                  {data !== "undefined" ? (
                    <>
                      <h3> Group by: {data}</h3>
                      <Table tableRecords={groupData[data]}  />
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