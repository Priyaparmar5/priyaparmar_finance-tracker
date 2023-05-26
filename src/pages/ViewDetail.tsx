import React, { useState, useEffect } from "react";
import "../App.css";
import { useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../redux/rootReducer";

const ViewDetail: React.FC = () => {
  interface tFormInputs {
    id: number;
    transactionDate: string;
    monthYear: string;
    transactionType: string;
    fromAccount: string;
    toAccount: string;
    amount: number;
    receipt: string;
    notes: string;
  }

  const { id } = useParams();
  const navigate = useNavigate();
  // const data = location.state;
  const [data, setData] = useState<tFormInputs | undefined>(undefined);
  const transactionData = useSelector(
    (state: RootState) => state.transactions.transaction
  );

  const retrivedata: any = transactionData;

  useEffect(() => {
    const foundData = retrivedata.find(
      (item: tFormInputs) => item.id === Number(id)
    );

    if (foundData) {
      setData(foundData);
      console.log(foundData, "foundData");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retrivedata, id]);
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
            {data && (
              <>
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
              </>
            )}
          </div>
        </table>
      </div>
    </>
  );
};
export default ViewDetail;
