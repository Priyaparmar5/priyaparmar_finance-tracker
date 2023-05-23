import "../App.css";
import { useState, useEffect, React } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { validateFiles, validateForms } from './validation';

import {
  monthYearList,fromAccountList,toAccountList,transactionTypeList
} from '../utils/constant';

function TransactionForm() {

  const [formError, setFormError] = useState({});

  let date = new Date();
  let year = date.getFullYear();

  const initialValues = {
    transactionDate: "",
    monthYear: "",
    transactionType:"",
    fromAccount:"",
    toAccount:"",
    amount: "",
    receipt: "",
    notes: "",
  };

  const [formData, setFormData] = useState(initialValues);

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onabort = (formError) => reject(formError);
      reader.readAsDataURL(file);
    });
  };

  const handleImg = (event) => {
    let err = {};

    console.log(event, "eventt");
    const file = event.target.files[0];

    const data = new FileReader();
    data.addEventListener("load", () => {
      const val = { ...formData, receipt: data };
      setFormData(val);
    });
    data.readAsDataURL(file);

    getBase64(file).then((base64) => {
      const val = { ...formData, receipt: base64 };
      console.log("val", val);

      setFormData(val);
      // localStorage["receipt"] = base64;
      console.debug("file store", base64);
      console.log("fiel", base64);
    });
    if (file && validateFiles(file)) {
      setFormData({ ...formData, receipt: file });
      setFormError('')
    } else {
      setFormData({ ...formData, receipt: null });
      err.receipt='Invalid file. Please select a JPEG or JPG file with a maximum size of 1 MB.';

    }
   

    setFormError({ ...err });
  };

  


  const onChangeHandler = (event) => {
    const { name, value } = event.target;
  //  setFormData({ ...formData, [name]: value });
  let newErrors = { ...formError };

  switch (name) {
    case 'transactionDate':
      if (!value) {
        newErrors[name] = 'transactionDate is required';
      } else {
        delete newErrors[name];
      }
      break;
    case 'transactionType':
      if (!value) {
        newErrors[name] = 'transactionType is required';
      }else {
        delete newErrors[name];
      }
      break;
    case 'monthYear':
        if (!value) {
          newErrors[name] = 'Month year is required';
        } else {
          delete newErrors[name];
        }
        break;
    case 'fromAccount':
        if (!value) {
          newErrors[name] = 'From account is required';
        } else {
          delete newErrors[name];
        }
        break;
    case 'toAccount':
          if (!value) {
            newErrors[name] = 'to account is required';
          } else {
            delete newErrors[name];
          }
          break;
    case 'amount':
          if (!value) {
            newErrors[name] = 'amount is required';
          } else {
            delete newErrors[name];
          }
          break;
    case 'reciept':
          if (!value) {
            newErrors[name] = 'receipt is required';
          } else {
            delete newErrors[name];
          }
          break;
    case 'notes':
          if (!value) {
            newErrors[name] = 'notes is required';
          } else {
            delete newErrors[name];
          }
            break;
      default:
        break;
    }
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
    setFormError(newErrors);

  };

  const retrivedata = JSON.parse(localStorage.getItem("key")) || [];
  const navigate = useNavigate();


  const validateForm = (e) => {
    let err = {};
   
    const data = { ...formData };
    const errors = validateForms(formData);

    if (Object.keys(errors).length === 0) {
      console.log("hello");
      if (localStorage.getItem("key")) {
        const retrivedata = JSON.parse(localStorage.getItem("key")) || [];
        console.log("id", id);
        if (id) {
          for (const e in retrivedata) {
            if (parseInt(retrivedata[e].id) === parseInt(id)) {
              data["id"] = id;
              retrivedata[e] = data;
            }
          }
          console.log(retrivedata, "data");
          alert("update successfully");
        } else {
          const previd = retrivedata[retrivedata.length - 1].id;
          data["id"] = parseInt(previd) + 1;
          retrivedata.push(data);
          alert("insert successfully");
        }
        localStorage.setItem("key", JSON.stringify(retrivedata));
      } else {
        data["id"] = 1;
        localStorage.setItem("key", JSON.stringify([data]));
      }
      navigate("/viewData");
    }
    else{
      setFormError(errors);
    }

    
  };

  console.log(formData.transactionDate, "formdddddddddd");
  //const fieldPropsCommon = { values, errors, setValues };

  const { id } = useParams();
  console.log({ id }, "param");
 
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const isvalid = validateForm();
    const data = { ...formData };
    console.log(data, "datuuuu");
    console.log(isvalid, "datuuuu");

  };

  function clearFiles() {
    const img = {...formData,receipt:null}
    setFormData(img);
  }

  useEffect(() => {
    for (const e in retrivedata) {
      if (parseInt(retrivedata[e].id) === parseInt(id)) {
        setFormData(retrivedata[e]);
        console.log(retrivedata, "retrieesfsd");
        break;
      }
    }
  }, []);
  return (
    <>
      <ul>
          <Link to="/ViewData" className="add-btn">ViewData</Link>
      </ul>
      <form onSubmit={handleSubmit}>
        <div className="section">
          <div className="row">
            <div className="container">
              <div className="heading">
                <h3>Validation Form</h3>
              </div>

              <label htmlFor="date">Transaction Date</label>
              <input
                type="date"
                className="input"
                name="transactionDate"
                value={formData.transactionDate}
                onChange={onChangeHandler}
               // {...register("transactionDate")}
              />
              
              <span className="span1">{formError.transactionDate}</span>

              <label>Month Year</label>

              <select
                name="monthYear"
                className="input"
                value={formData.monthYear}
                onChange={onChangeHandler}
               >
                <option value="" disabled>
                  Select Month Year
                </option>

                {monthYearList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="span1">{formError.monthYear}</span>
             

              <label>Transaction Type</label>
              <select
                name="transactionType"
                className="input"
                value={formData.transactionType}
                  onChange={onChangeHandler}
               //   {...register("transactionType")}
              >
                <option value="" disabled>
                  Select transactionType
                </option>

                {transactionTypeList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
             
              <span className="span1">{formError.transactionType}</span>

              <label>From Account</label>
              <select
                name="fromAccount"
                className="input"
                value={formData.fromAccount}
                onChange={onChangeHandler}
              //  {...register("fromAccount")}
              >
                <option value="" disabled>
                  Select From Account
                </option>

                {fromAccountList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
             
              <span className="span1">{formError.fromAccount}</span>

              <label>To Account</label>

              <select
                name="toAccount"
                className="input"
                value={formData.toAccount}
                onChange={onChangeHandler}
              //  {...register("toAccount")}
              >
                <option value="" disabled>
                  Select To Account
                </option>

                {toAccountList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <span className="span1">{formError.toAccount}</span>

              <label htmlFor="amount">Amount </label>
              <input
                type="number"
                className="input"
                name="amount"
                value={formData.amount}
                onChange={onChangeHandler}
              //  {...register("amount")}
              />
              <span className="span1">{formError.amount}</span>

              <label htmlFor="receipt">Receipt </label>
             
              <div>
              {formData.receipt ? (
                  <>
                    <img
                      src={formData.receipt}
                      height={60}
                      width={50}
                      alt=""
                    ></img>
                   <input
                    type="button"
                    className="btn"
                    value="X"
                    onClick={clearFiles}
                  />
                  </>
              ):(
                  <input
                    accept="image/jpg, image/png, image/jpeg"
                    type="file"
                    className="input"
                    name="receipt"
                  //  {...register("receipt")}

                    // value={formData.receipt}
                    onChange={handleImg}
                  />
              )}
                <span className="span1">{formError.receipt}</span>
              </div>

              <label htmlFor="notes">Notes </label>
              <textarea
                className="input"
                name="notes"
                maxLength="250"
              //  {...register("notes")}
                value={formData.notes}
                onChange={onChangeHandler}
              />
              <span className="span1">{formError.notes}</span>

              <div className="bottom">
                <input className="input" type="submit" value="submit" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default TransactionForm;
