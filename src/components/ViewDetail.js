import React, { useState, useEffect } from "react";
import "../App.css";
import { Link, Outlet,useNavigate,useLocation,useParams } from "react-router-dom";

function ViewDetail() {

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
 // const data = location.state;
  const [data , setdata] = useState([])
 
    // useEffect(()=> {
     
    //   const data =JSON.parse(localStorage.getItem('key'));
    //   console.log(data,"dattaaaa");
    //   setState(data)
    //   setMyLocalStorageData(data)
     
    // },[])
    const retrivedata = JSON.parse(localStorage.getItem('key'))
    useEffect(() => {
      for (const key in retrivedata) {

          if (parseInt(retrivedata[key].id) === parseInt(id)) {
              setdata(retrivedata[key])
              console.log(retrivedata[key],"key");
              break;
          }
      }
      
      //eslint-disable-next-line
  }, [])
  return (
    <>
     <button type="button" className="backbtn" onClick={() => navigate(-1)}>Go back</button>
        
      <div>
        <h1 className="h1">User Data</h1>
        <ul>
          <li>
            <Link to="/Forms">Form</Link>
          </li>
         
        </ul>
      </div>
      <Outlet />
      {/* {loading && <h2>A moment please...</h2>} */}

     
        <div className="TableDesign">
          <table className="table">
         
          <div>
            <label>Transaction Date:{data.transactionDate}</label>
            <label>Month year:{data.monthYear}</label>
            <label>Transaction Type:{data.transactionType}</label>
            <label>From Account:{data.fromAccount}</label>
            <label>To Account:{data.toAccount}</label>
            <label>Amount:{Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "INR",
                        }).format(data.amount)}</label>
            <label>Receipt:<img src={data.receipt} alt="" height={50} width={50}></img></label>
            <label>Notes:{data.notes}</label>
          </div>
          
          
          </table>
        </div>
    
    </>
  );
}
export default ViewDetail;
