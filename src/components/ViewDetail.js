import React, { useState, useEffect } from "react";
import "../assets/styles/common.css";
import { useGlobalContext } from "../context/TransactionContext";

import { useNavigate, useParams } from "react-router-dom";

function ViewDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const { transactionData, setTransactionData } = useGlobalContext();

  const retrivedata = transactionData;
  useEffect(() => {
    for (const key in retrivedata) {
      if (parseInt(retrivedata[key].id) === parseInt(id)) {
        setdata(retrivedata[key]);
        console.log(retrivedata[key], "key");
        break;
      }
    }
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <button type="button" className="backbtn" onClick={() => navigate(-1)}>
        Go back
      </button>

      <div>
        <h1 className="h1">Transaction Data</h1>
      </div>

      <div className="TableDesign">
        <table className="table-detail">
          <div>
            <tr>
              <td>Id </td>
              <td>{data.id}</td>
            </tr>
            <tr>
              <td>Transaction Date </td>
              <td>{data.transactionDate}</td>
            </tr>
            <tr>
              <td>Month year:</td>
              <td>{data.monthYear}</td>
            </tr>
            <tr>
              <td>Transaction Type:</td>
              <td>{data.transactionType}</td>
            </tr>

            <tr>
              <td>From Account:</td>
              <td>{data.fromAccount}</td>
            </tr>

            <tr>
              <td>To Account:</td>
              <td>{data.toAccount}</td>
            </tr>

            <tr>
              <td>Amount:</td>
              <td>
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "INR",
                }).format(data.amount)}
              </td>
            </tr>
            <tr>
              <td>Receipt:</td>
              <td>
                <img src={data.receipt} alt="" height={50} width={50}></img>
              </td>
            </tr>
            <tr>
              <td>Notes:</td>
              <td>{data.notes}</td>
            </tr>
          </div>
        </table>
      </div>
    </>
  );
}
export default ViewDetail;
