import React, { useState, useEffect } from "react";
import "../App.css";
import { Link, useNavigate, useParams } from "react-router-dom";

import Table from "./Table";
import { Cookies } from 'react-cookie';
import { useSelector } from "react-redux";
import { groupBySelect } from "../utils/constant";

function ViewData() {
  const navigate = useNavigate();
  const [myLocalStorageData, setMyLocalStorageData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [grpVal,setGrpVal] = useState("");


  const transactionData = useSelector((state) => state.transactions.value);
  //const [cookies, setCookie, removeCookie] = useCookies(['name']);
  console.log(transactionData,"transaredux");
  const cookies = new Cookies();

  const handleLogout = () => {
    cookies.remove('name')

    navigate("/public/login");
  };



  const localData = transactionData;

  useEffect(() => {
    if (grpVal) {
      const resultdata = {};
      const arr = [...localData];
      arr.forEach((item) => {
        const result = item[grpVal];
        resultdata[result] = resultdata[result] ?? [];
        resultdata[result].push(item);
      });
      setGroupData(resultdata); 
    } else {
      setGroupData([]); 
    }
  }, [localData, grpVal]);
  


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
            <Link to={"/add"} className="add-btn">
              Add transaction
            </Link>
            <select
              name="selectData"
              onChange={e => setGrpVal(e.target.value)}
              className="input-select"
            >
              {groupBySelect.map(item => <option value={item.value} key={item.value}>{item.label}</option>)}

            </select>
            {/* <Outlet /> */}

            {groupData.length === 0 ? (
              <>
                <Table tableRecords={localData}  />
                <br></br>
              </>
            ) : (
              Object.keys(groupData).map((data, i) => (
                <>
                  {data !== "undefined" ? (
                    <>
                      <h3> Group by: {data}</h3>
                      <Table tableRecords={groupData[data]}/>
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
