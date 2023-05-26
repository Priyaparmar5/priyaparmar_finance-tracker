import React, { useState, useEffect } from "react";
import "../App.css";
import { Link, Outlet, json, useNavigate, useParams } from "react-router-dom";
import Table from "./Table";
import { Cookies, useCookies } from 'react-cookie';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { groupBySelect } from "../utils/constant";

const ViewData: React.FC =()=> {
  const navigate = useNavigate();
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


  const localData:any = transactionData;
  

  console.log(Object.keys(groupData).length);

  useEffect(() => {
    if (grpVal) {
      const resultdata:any = {};
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
             // onChange={handleGroupChange}
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